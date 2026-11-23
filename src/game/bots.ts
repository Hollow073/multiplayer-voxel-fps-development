import { World, Body, newBody, rayVsEntity } from "./world";
import { RULES, WEAPON_INDEX } from "./weapons";
import { grenadeW, GRENADE_INDEX } from "./equipment";
import type { Ent } from "./types";
import type { V3 } from "./maps";

export interface BotCfg {
  hp: number;
  speed: number;
  dmg: number;
  rpm: number;
  spread: number;
  range: number;
  scale: number;
  melee: boolean;
  react: number;
  // 僵尸特殊行为
  lockRange?: number; // 索敌 / 开火距离（远程僵尸已整体缩短）
  leap?: boolean; // 捕食者：跳过障碍扑向玩家
  dash?: boolean; // 巨型僵尸：锁定玩家后直线冲刺
  acid?: boolean; // 吐酸僵尸：中近距离酸液
  slow?: number; // 命中后减速秒数
}

export const BOT_KINDS: Record<string, BotCfg> = {
  // ── 多人对战机器人 ──
  dm: { hp: 100, speed: 4.7, dmg: 11, rpm: 520, spread: 3.2, range: 75, scale: 1, melee: false, react: 0.45 },
  grunt: { hp: 60, speed: 3.9, dmg: 8, rpm: 420, spread: 4.2, range: 55, scale: 1, melee: false, react: 0.5 },
  rusher: { hp: 45, speed: 6.1, dmg: 16, rpm: 80, spread: 0, range: 3, scale: 1, melee: true, react: 0.1 },
  heavy: { hp: 260, speed: 2.7, dmg: 10, rpm: 700, spread: 4.8, range: 60, scale: 1.22, melee: false, react: 0.6 },

  // ── 据点防守：8 种僵尸 ──
  // 1. 普通僵尸：只会近战，移速缓慢
  normal: { hp: 70, speed: 2.6, dmg: 14, rpm: 60, spread: 0, range: 2.2, scale: 1, melee: true, react: 0.35, lockRange: 22 },
  // 2. 小僵尸：近战，速度快，体型小，血量低
  small: { hp: 34, speed: 5.4, dmg: 8, rpm: 60, spread: 0, range: 1.8, scale: 0.62, melee: true, react: 0.15, lockRange: 24 },
  // 3. 大型僵尸：体型大、血量厚、移速更慢
  large: { hp: 240, speed: 1.9, dmg: 24, rpm: 60, spread: 0, range: 2.4, scale: 1.35, melee: true, react: 0.5, lockRange: 20 },
  // 4. 士兵僵尸：普通僵尸 1.2 倍血量，持有 M4A1 / AK-47
  soldier: { hp: 84, speed: 2.5, dmg: 8, rpm: 420, spread: 3.6, range: 22, scale: 1, melee: false, react: 0.55, lockRange: 23 },
  // 5. 捕食者：可扑跃越过障碍，移速介于普通与小僵尸之间，普通血量
  predator: { hp: 70, speed: 4.2, dmg: 18, rpm: 60, spread: 0, range: 2.2, scale: 0.95, melee: true, react: 0.2, lockRange: 28, leap: true },
  // 6. 吐酸僵尸：中近距离吐酸，伤害 + 1 秒减速
  acid: { hp: 90, speed: 2.3, dmg: 9, rpm: 50, spread: 2.5, range: 16, scale: 1.05, melee: false, react: 0.5, lockRange: 16, acid: true, slow: 1 },
  // 7. 巨型僵尸：体型接近大型，3 倍血量，伤害秒杀，直线冲刺
  giant: { hp: 720, speed: 1.6, dmg: 200, rpm: 40, spread: 0, range: 2.6, scale: 1.85, melee: true, react: 0.4, lockRange: 26, dash: true },
  // 8. 重甲士兵：大型僵尸 1.5 倍血量，持 RPG-7 / 重机枪，移速缓慢
  armored: { hp: 360, speed: 1.5, dmg: 30, rpm: 120, spread: 2.6, range: 26, scale: 1.45, melee: false, react: 0.7, lockRange: 26 },
};

export interface BotCtx {
  world: World;
  diff: number;
  respawns: boolean;
  enemies(bot: Bot): Ent[];
  hit(target: Ent, dmg: number, head: boolean, from: Bot, slow?: number): void;
  shotFx(bot: Bot, end: [number, number, number]): void;
  spawnPoint(team: number): V3;
  onKilled(bot: Bot, fromId: string, w: number, head: boolean): void;
}

function angDiff(a: number, b: number) {
  let d = b - a;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return d;
}

export class Bot {
  ent: Ent;
  body: Body;
  cfg: BotCfg;
  path: [number, number, number][] = [];
  pi = 0;
  repathT = 0;
  target: Ent | null = null;
  seen = false;
  seenT = 0;
  scanT = Math.random() * 0.3;
  fireT = 0;
  burst = 0;
  pauseT = 0.3;
  meleeCd = 0;
  strafe = Math.random() < 0.5 ? 1 : -1;
  strafeT = 1;
  hold = 12 + Math.random() * 14;
  stuckT = 0;
  chkT = 0;
  lx = 0;
  lz = 0;
  jumpCd = 0;
  respawnT = 0;
  goalX = 1e9;
  goalZ = 1e9;
  dmgMul: number;
  // 特殊技能状态
  leapCd = 0;
  leapT = 0;
  leapX = 0;
  leapZ = 0;
  dashCd = 0;
  dashT = 0;
  dashX = 0;
  dashZ = 0;
  dashHit = false;
  dashHitIds = new Set<string>();
  acidCd = 0;
  blindT = 0;
  inSmoke = false;
  burnT = 0;
  burnAcc = 0;

  constructor(id: string, name: string, team: number, public kind: string, wpn: string, hpMul = 1, dmgMul = 1) {
    this.cfg = BOT_KINDS[kind] ?? BOT_KINDS.dm;
    this.dmgMul = dmgMul;
    const hp = Math.round(this.cfg.hp * hpMul);
    this.body = newBody();
    this.ent = {
      id, name, team, isBot: true, kind,
      x: 0, y: 0, z: 0, yaw: 0, pitch: 0, stance: 0, scale: this.cfg.scale,
      hp, maxHp: hp, alive: false, speed: 0, wpn: WEAPON_INDEX[wpn] ?? 0, pack: "",
      tx: 0, ty: 0, tz: 0, tyaw: 0, av: null, phase: 0, upd: 0,
    };
  }

  spawn(p: V3) {
    this.body = newBody(p[0], p[1], p[2]);
    this.ent.hp = this.ent.maxHp;
    this.ent.alive = true;
    this.ent.yaw = Math.atan2(p[0], p[2]);
    this.path = [];
    this.target = null;
    this.seenT = 0;
    this.blindT = 0;
    this.burnT = 0;
    this.burnAcc = 0;
    this.sync();
    this.ent.tx = this.ent.x;
    this.ent.ty = this.ent.y;
    this.ent.tz = this.ent.z;
  }

  private sync() {
    const e = this.ent;
    e.x = this.body.x;
    e.y = this.body.y;
    e.z = this.body.z;
    e.speed = Math.hypot(this.body.vx, this.body.vz);
  }

  damage(ctx: BotCtx, amt: number, fromId: string, w: number, head: boolean) {
    if (!this.ent.alive) return;
    this.ent.hp -= amt;
    if (this.seenT < 0.3) this.seenT = 0.3;
    if (this.ent.hp <= 0) {
      this.ent.hp = 0;
      this.ent.alive = false;
      this.respawnT = RULES.respawnTime + 1;
      ctx.onKilled(this, fromId, w, head);
    }
  }

  update(dt: number, ctx: BotCtx) {
    const e = this.ent;
    if (!e.alive) {
      if (ctx.respawns) {
        this.respawnT -= dt;
        if (this.respawnT <= 0) this.spawn(ctx.spawnPoint(e.team));
      }
      return;
    }
    const b = this.body;
    const cfg = this.cfg;
    const w = ctx.world;
    const eyeY = b.y + 1.55;
    this.jumpCd -= dt;
    this.meleeCd -= dt;
    this.leapCd -= dt;
    this.dashCd -= dt;
    this.acidCd -= dt;
    if (this.blindT > 0) this.blindT = Math.max(0, this.blindT - dt);
    // 身处烟雾中的角色能见度只有 0.5m
    const lockRange = this.inSmoke ? 0.5 : (cfg.lockRange ?? cfg.range);

    // ── 索敌 ──
    this.scanT -= dt;
    if (this.scanT <= 0) {
      this.scanT = 0.25 + Math.random() * 0.1;
      let best: Ent | null = null;
      let bd = 1e9;
      for (const t of ctx.enemies(this)) {
        const d = (t.x - b.x) ** 2 + (t.z - b.z) ** 2 + ((t.y - b.y) * 2) ** 2;
        if (d < bd) {
          bd = d;
          best = t;
        }
      }
      this.target = best;
      if (best) {
        const dist = Math.sqrt(bd);
        const ch = (best.stance === 0 ? 1.15 : best.stance === 1 ? 0.75 : 0.3) * best.scale;
        this.seen = dist < lockRange && (w.hasLOS(b.x, eyeY, b.z, best.x, best.y + ch, best.z) || w.hasLOS(b.x, eyeY, b.z, best.x, best.y + ch + 0.5 * best.scale, best.z));
      } else this.seen = false;
      if (!this.seen) this.seenT = 0;
    }
    if (this.seen) this.seenT += dt;

    const t = this.target;
    let mx = 0;
    let mz = 0;
    let speedMul = 1;
    if (t) {
      const dx = t.x - b.x;
      const dz = t.z - b.z;
      const dist = Math.hypot(dx, dz);
      const ch = (t.stance === 0 ? 1.15 : t.stance === 1 ? 0.75 : 0.3) * t.scale;
      const want = Math.atan2(-dx, -dz);
      const turn = (cfg.melee ? 9 : 5.5) * dt;
      const diff = angDiff(e.yaw, want);
      e.yaw += Math.max(-turn, Math.min(turn, diff));
      const wantPitch = Math.atan2(t.y + ch - eyeY, Math.max(0.1, dist));
      e.pitch += (wantPitch - e.pitch) * Math.min(1, dt * 8);

      let follow = true;
      if (this.seen && !cfg.melee) {
        this.strafeT -= dt;
        if (this.strafeT <= 0) {
          this.strafeT = 1 + Math.random() * 1.8;
          this.strafe = Math.random() < 0.5 ? 1 : -1;
        }
        if (dist < this.hold) {
          follow = false;
          const nx = dx / (dist || 1);
          const nz = dz / (dist || 1);
          mx = -nz * this.strafe;
          mz = nx * this.strafe;
          if (dist < 6) {
            mx -= nx * 0.8;
            mz -= nz * 0.8;
          }
          speedMul = 0.6;
        }
      }
      if (follow) {
        this.repathT -= dt;
        const moved = Math.hypot(t.x - this.goalX, t.z - this.goalZ);
        if (this.repathT <= 0 || moved > 8) {
          this.repathT = 1 + Math.random() * 0.6;
          this.goalX = t.x;
          this.goalZ = t.z;
          const p = w.findPath(b.x, b.y, b.z, t.x, t.y, t.z, 3500);
          this.path = p ?? [];
          this.pi = 0;
        }
        if (this.pi < this.path.length) {
          const wp = this.path[this.pi];
          const px = wp[0] - b.x;
          const pz = wp[2] - b.z;
          const pd = Math.hypot(px, pz);
          if (pd < 0.5) this.pi++;
          else {
            mx = px / pd;
            mz = pz / pd;
          }
          // 跳过过近的后续路点
          if (this.pi + 1 < this.path.length) {
            const n2 = this.path[this.pi + 1];
            if (Math.hypot(n2[0] - b.x, n2[2] - b.z) < 0.9 && Math.abs(n2[1] - b.y) < 0.6) this.pi++;
          }
        } else if (dist > 1.2 && (this.seen || this.path.length === 0)) {
          mx = dx / (dist || 1);
          mz = dz / (dist || 1);
        }
        if (cfg.melee && dist < 1.3) {
          mx = 0;
          mz = 0;
        }
      }

      // ── 射击（被闪光致盲时停止开火） ──
      if (this.blindT > 0) {
        this.burst = 0;
        this.pauseT = Math.max(this.pauseT, 0.4);
      } else if (this.seen && this.seenT > cfg.react * (ctx.diff === 1 ? 1.5 : ctx.diff === 3 ? 0.6 : 1)) {
        if (cfg.melee) {
          if (!(cfg.dash && this.dashT > 0) && dist < Math.max(2.0, cfg.range) && this.meleeCd <= 0) {
            this.meleeCd = 0.8;
            ctx.hit(t, cfg.dmg * this.dmgMul, false, this);
          }
        } else if (cfg.acid) {
          // 吐酸：中近距离直接喷吐，命中后附加 1s 减速
          if (this.acidCd <= 0 && dist < lockRange && Math.abs(angDiff(e.yaw, want)) < 0.3) {
            this.acidCd = 1.7;
            this.shoot(ctx, t, eyeY, ch, cfg.slow);
          }
        } else if (Math.abs(angDiff(e.yaw, want)) < 0.13) {
          if (this.burst > 0) {
            this.fireT -= dt;
            if (this.fireT <= 0) {
              this.fireT += 60 / cfg.rpm;
              this.burst--;
              this.shoot(ctx, t, eyeY, ch);
            }
          } else {
            this.pauseT -= dt;
            if (this.pauseT <= 0) {
              this.burst = 4 + Math.floor(Math.random() * 7);
              this.pauseT = 0.35 + Math.random() * 0.7;
              this.fireT = 0;
            }
          }
        }
      }

      // ── 特殊技能：巨型僵尸直线冲刺 / 捕食者扑跃 ──
      if (cfg.dash && this.dashT <= 0 && this.seen && this.dashCd <= 0 && b.onGround && dist > 3 && dist < lockRange) {
        this.dashCd = 6.5;
        this.dashT = 0.8;
        this.dashX = dx / (dist || 1);
        this.dashZ = dz / (dist || 1);
        this.dashHit = false;
        this.dashHitIds.clear();
      }
      if (this.dashT > 0) {
        this.dashT -= dt;
        // 沿冲刺直线对每个目标只造成一次伤害
        for (const en of ctx.enemies(this)) {
          if (!this.dashHitIds.has(en.id) && Math.hypot(en.x - b.x, en.z - b.z) < 2.5) {
            this.dashHitIds.add(en.id);
            ctx.hit(en, cfg.dmg * this.dmgMul, false, this);
          }
        }
        if (this.dashT <= 0) this.dashT = 0;
      }
      if (cfg.leap && this.leapT <= 0 && this.seen && this.leapCd <= 0 && b.onGround && dist > 3.2 && dist < 13) {
        this.leapCd = 3.2;
        this.leapT = 0.6;
        this.leapX = dx / (dist || 1);
        this.leapZ = dz / (dist || 1);
        b.vy = 7.6;
        b.onGround = false;
      }
      if (this.leapT > 0) this.leapT -= dt;
    } else {
      this.seen = false;
    }

    // ── 移动 ──
    if (this.dashT > 0) {
      b.vx = this.dashX * 15;
      b.vz = this.dashZ * 15;
    } else if (this.leapT > 0) {
      b.vx = this.leapX * 9.5;
      b.vz = this.leapZ * 9.5;
    } else {
      const sp = cfg.speed * speedMul;
      const k = Math.min(1, dt * 9);
      b.vx += (mx * sp - b.vx) * k;
      b.vz += (mz * sp - b.vz) * k;
    }
    w.moveBody(b, dt);

    // 卡住检测
    this.chkT += dt;
    if (this.chkT >= 0.45) {
      const moved = Math.hypot(b.x - this.lx, b.z - this.lz);
      this.lx = b.x;
      this.lz = b.z;
      this.chkT = 0;
      if ((mx !== 0 || mz !== 0) && moved < 0.12) {
        this.stuckT += 1;
        if (b.onGround && this.jumpCd <= 0) {
          b.vy = 8;
          this.jumpCd = 1.2;
        }
        if (this.stuckT >= 2) {
          this.repathT = 0;
          this.stuckT = 0;
          this.strafe = -this.strafe;
        }
      } else this.stuckT = 0;
    }
    e.phase += Math.hypot(b.vx, b.vz) * dt * 1.9;
    this.sync();
  }

  private shoot(ctx: BotCtx, t: Ent, eyeY: number, ch: number, slow = 0) {
    const b = this.body;
    let dx = t.x - b.x;
    let dy = t.y + ch - eyeY;
    let dz = t.z - b.z;
    const len = Math.hypot(dx, dy, dz) || 1;
    dx /= len;
    dy /= len;
    dz /= len;
    const sp = (this.cfg.spread * (ctx.diff === 1 ? 1.35 : ctx.diff === 3 ? 0.8 : 1) * Math.PI) / 180;
    const a = Math.random() * Math.PI * 2;
    const r = Math.tan(sp) * Math.sqrt(Math.random());
    // 构造与方向垂直的两个轴
    let rx = -dz;
    let rz = dx;
    const rl = Math.hypot(rx, rz) || 1;
    rx /= rl;
    rz /= rl;
    const ux = dy * rz;
    const uy = dz * rx - dx * rz;
    const uz = -dy * rx;
    let fx = dx + (rx * Math.cos(a) + ux * Math.sin(a)) * r;
    let fy = dy + uy * Math.sin(a) * r;
    let fz = dz + (rz * Math.cos(a) + uz * Math.sin(a)) * r;
    const fl = Math.hypot(fx, fy, fz) || 1;
    fx /= fl;
    fy /= fl;
    fz /= fl;
    const maxR = this.cfg.range + 15;
    const tw = ctx.world.raycast(b.x, eyeY, b.z, fx, fy, fz, maxR);
    let bestT = tw;
    let bestEnt: Ent | null = null;
    let head = false;
    for (const en of ctx.enemies(this)) {
      const h = rayVsEntity(b.x, eyeY, b.z, fx, fy, fz, en, Math.min(tw, maxR));
      if (h && h.t < bestT) {
        bestT = h.t;
        bestEnt = en;
        head = h.head;
      }
    }
    if (bestEnt) ctx.hit(bestEnt, this.cfg.dmg * this.dmgMul * (head ? RULES.headMul : RULES.bodyMul), head, this, slow);
    ctx.shotFx(this, [b.x + fx * bestT, eyeY + fy * bestT, b.z + fz * bestT]);
  }
}
