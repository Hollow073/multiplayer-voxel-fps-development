import type { MapData } from "./maps";

export interface Body {
  x: number;
  y: number; // 脚底
  z: number;
  vx: number;
  vy: number;
  vz: number;
  hw: number; // 半宽
  h: number; // 高度
  onGround: boolean;
}

export function newBody(x = 0, y = 0, z = 0): Body {
  return { x, y, z, vx: 0, vy: 0, vz: 0, hw: 0.3, h: 1.8, onGround: false };
}

export const GRAVITY = 24;
export const STEP_H = 0.55;

const DIRS: [number, number][] = [
  [1, 0], [-1, 0], [0, 1], [0, -1],
  [1, 1], [1, -1], [-1, 1], [-1, -1],
];

export class World {
  n: number;
  b: Float32Array;
  hx: number;
  hz: number;
  private cell = 4;
  private ox: number;
  private oz: number;
  private cw: number;
  private ch: number;
  private grid: number[][];
  private stamp: Int32Array;
  private stampId = 0;
  private tmp: number[] = [];
  private tmp2: number[] = [];
  navW: number;
  navH: number;
  private surf = new Map<number, number[]>();

  constructor(public map: MapData) {
    const bs = map.boxes.filter((b) => !b.nc);
    this.n = bs.length;
    this.b = new Float32Array(this.n * 6);
    this.hx = map.hx;
    this.hz = map.hz;
    this.ox = -(map.hx + 4);
    this.oz = -(map.hz + 4);
    this.cw = Math.ceil((2 * (map.hx + 4)) / this.cell) + 1;
    this.ch = Math.ceil((2 * (map.hz + 4)) / this.cell) + 1;
    this.grid = Array.from({ length: this.cw * this.ch }, () => []);
    this.stamp = new Int32Array(this.n);
    bs.forEach((bx, i) => {
      const o = i * 6;
      this.b[o] = bx.x0;
      this.b[o + 1] = bx.y0;
      this.b[o + 2] = bx.z0;
      this.b[o + 3] = bx.x1;
      this.b[o + 4] = bx.y1;
      this.b[o + 5] = bx.z1;
      const cx0 = this.ci(bx.x0, this.ox, this.cw);
      const cx1 = this.ci(bx.x1, this.ox, this.cw);
      const cz0 = this.ci(bx.z0, this.oz, this.ch);
      const cz1 = this.ci(bx.z1, this.oz, this.ch);
      for (let cz = cz0; cz <= cz1; cz++) for (let cx = cx0; cx <= cx1; cx++) this.grid[cz * this.cw + cx].push(i);
    });
    this.navW = Math.floor(map.hx * 2);
    this.navH = Math.floor(map.hz * 2);
  }

  private ci(v: number, o: number, n: number) {
    return Math.max(0, Math.min(n - 1, Math.floor((v - o) / this.cell)));
  }

  query(x0: number, z0: number, x1: number, z1: number, out: number[]) {
    out.length = 0;
    this.stampId++;
    const cx0 = this.ci(x0, this.ox, this.cw);
    const cx1 = this.ci(x1, this.ox, this.cw);
    const cz0 = this.ci(z0, this.oz, this.ch);
    const cz1 = this.ci(z1, this.oz, this.ch);
    for (let cz = cz0; cz <= cz1; cz++) {
      for (let cx = cx0; cx <= cx1; cx++) {
        const g = this.grid[cz * this.cw + cx];
        for (let k = 0; k < g.length; k++) {
          const id = g[k];
          if (this.stamp[id] !== this.stampId) {
            this.stamp[id] = this.stampId;
            out.push(id);
          }
        }
      }
    }
  }

  fits(x: number, y: number, z: number, hw: number, h: number): boolean {
    this.query(x - hw, z - hw, x + hw, z + hw, this.tmp2);
    const B = this.b;
    for (let k = 0; k < this.tmp2.length; k++) {
      const i = this.tmp2[k] * 6;
      if (x + hw <= B[i] || x - hw >= B[i + 3] || z + hw <= B[i + 2] || z - hw >= B[i + 5]) continue;
      if (y + h <= B[i + 1] || y >= B[i + 4]) continue;
      return false;
    }
    return true;
  }

  moveBody(b: Body, dt: number) {
    const steps = Math.max(1, Math.ceil(dt / (1 / 120)));
    const h = dt / steps;
    for (let i = 0; i < steps; i++) this.stepBody(b, h);
  }

  private stepBody(b: Body, dt: number) {
    b.vy -= GRAVITY * dt;
    if (b.vy < -40) b.vy = -40;
    const was = b.onGround;
    this.moveH(b, b.vx * dt, 0, was);
    this.moveH(b, 0, b.vz * dt, was);
    this.moveV(b, b.vy * dt);
    // 边界保护
    const lx = this.hx - 0.5;
    const lz = this.hz - 0.5;
    if (b.x > lx) b.x = lx;
    if (b.x < -lx) b.x = -lx;
    if (b.z > lz) b.z = lz;
    if (b.z < -lz) b.z = -lz;
    if (b.y < -20) {
      b.y = 5;
      b.vy = 0;
    }
  }

  private moveH(b: Body, dx: number, dz: number, canStep: boolean) {
    if (dx === 0 && dz === 0) return;
    const px = b.x;
    const py = b.y;
    const pz = b.z;
    b.x += dx;
    b.z += dz;
    const hw = b.hw;
    const B = this.b;
    let blockedX = false;
    let blockedZ = false;
    // 多次迭代：一次推动可能把身体挤进另一面墙（墙角常见），
    // 迭代求解直到不再相交，最后仍相交则整体回退。
    for (let pass = 0; pass < 3; pass++) {
      this.query(b.x - hw, b.z - hw, b.x + hw, b.z + hw, this.tmp);
      let hit = false;
      for (let k = 0; k < this.tmp.length; k++) {
        const i = this.tmp[k] * 6;
        const x0 = B[i], y0 = B[i + 1], z0 = B[i + 2], x1 = B[i + 3], y1 = B[i + 4], z1 = B[i + 5];
        if (b.x + hw <= x0 + 1e-5 || b.x - hw >= x1 - 1e-5 || b.z + hw <= z0 + 1e-5 || b.z - hw >= z1 - 1e-5) continue;
        if (b.y + b.h <= y0 || b.y >= y1) continue;
        const rise = y1 - b.y;
        if (canStep && rise > 0 && rise <= STEP_H && this.fits(b.x, y1 + 0.001, b.z, hw, b.h)) {
          b.y = y1;
          continue;
        }
        hit = true;
        if (dx > 0) {
          b.x = Math.min(b.x, x0 - hw - 0.001);
          blockedX = true;
        } else if (dx < 0) {
          b.x = Math.max(b.x, x1 + hw + 0.001);
          blockedX = true;
        }
        if (dz > 0) {
          b.z = Math.min(b.z, z0 - hw - 0.001);
          blockedZ = true;
        } else if (dz < 0) {
          b.z = Math.max(b.z, z1 + hw + 0.001);
          blockedZ = true;
        }
      }
      if (!hit) break;
    }
    if (!this.fits(b.x, b.y, b.z, hw, b.h)) {
      b.x = px;
      b.y = py;
      b.z = pz;
      blockedX = dx !== 0;
      blockedZ = dz !== 0;
    }
    if (blockedX) b.vx = 0;
    if (blockedZ) b.vz = 0;
  }

  private moveV(b: Body, dy: number) {
    b.y += dy;
    b.onGround = false;
    const hw = b.hw - 0.01;
    this.query(b.x - hw, b.z - hw, b.x + hw, b.z + hw, this.tmp);
    const B = this.b;
    for (let k = 0; k < this.tmp.length; k++) {
      const i = this.tmp[k] * 6;
      const x0 = B[i], y0 = B[i + 1], z0 = B[i + 2], x1 = B[i + 3], y1 = B[i + 4], z1 = B[i + 5];
      if (b.x + hw <= x0 || b.x - hw >= x1 || b.z + hw <= z0 || b.z - hw >= z1) continue;
      if (b.y + b.h <= y0 || b.y >= y1) continue;
      if (dy <= 0 && b.y - dy >= y1 - 0.02) {
        b.y = y1;
        if (b.vy < 0) b.vy = 0;
        b.onGround = true;
      } else if (dy > 0 && b.y + b.h - dy <= y0 + 0.02) {
        b.y = y0 - b.h;
        if (b.vy > 0) b.vy = 0;
      }
    }
  }

  // 射线：返回最近命中距离 (未命中返回 maxT)
  raycast(ox: number, oy: number, oz: number, dx: number, dy: number, dz: number, maxT: number): number {
    let best = maxT;
    const B = this.b;
    const ix = dx === 0 ? 1e30 : 1 / dx;
    const iy = dy === 0 ? 1e30 : 1 / dy;
    const iz = dz === 0 ? 1e30 : 1 / dz;
    for (let i = 0; i < this.n; i++) {
      const o = i * 6;
      let t1 = (B[o] - ox) * ix;
      let t2 = (B[o + 3] - ox) * ix;
      let tmin = t1 < t2 ? t1 : t2;
      let tmax = t1 < t2 ? t2 : t1;
      t1 = (B[o + 1] - oy) * iy;
      t2 = (B[o + 4] - oy) * iy;
      tmin = Math.max(tmin, t1 < t2 ? t1 : t2);
      tmax = Math.min(tmax, t1 < t2 ? t2 : t1);
      if (tmin > tmax) continue;
      t1 = (B[o + 2] - oz) * iz;
      t2 = (B[o + 5] - oz) * iz;
      tmin = Math.max(tmin, t1 < t2 ? t1 : t2);
      tmax = Math.min(tmax, t1 < t2 ? t2 : t1);
      if (tmin > tmax || tmax < 0) continue;
      const t = tmin < 0 ? 0 : tmin;
      if (t < best) best = t;
    }
    return best;
  }

  hasLOS(ax: number, ay: number, az: number, bx: number, by: number, bz: number): boolean {
    const dx = bx - ax, dy = by - ay, dz = bz - az;
    const len = Math.hypot(dx, dy, dz);
    if (len < 0.01) return true;
    return this.raycast(ax, ay, az, dx / len, dy / len, dz / len, len - 0.05) >= len - 0.05;
  }

  // ───────────── 导航 (多层楼面 A*) ─────────────
  surfaces(ix: number, iz: number): number[] {
    if (ix < 0 || iz < 0 || ix >= this.navW || iz >= this.navH) return [];
    const key = iz * this.navW + ix;
    const hit = this.surf.get(key);
    if (hit) return hit;
    const cx = ix - this.hx + 0.5;
    const cz = iz - this.hz + 0.5;
    const pr = 0.32;
    const list: number[] = [];
    this.query(cx - pr, cz - pr, cx + pr, cz + pr, list);
    const B = this.b;
    const tops: number[] = [];
    const ov: number[] = [];
    for (const id of list) {
      const i = id * 6;
      if (cx + pr <= B[i] || cx - pr >= B[i + 3] || cz + pr <= B[i + 2] || cz - pr >= B[i + 5]) continue;
      ov.push(id);
      const t = B[i + 4];
      if (t > -0.5 && t < 30 && !tops.some((q) => Math.abs(q - t) < 0.04)) tops.push(t);
    }
    tops.sort((a, b) => a - b);
    const res: number[] = [];
    for (const t of tops) {
      let ok = true;
      for (const id of ov) {
        const i = id * 6;
        if (B[i + 1] < t + 1.8 - 0.01 && B[i + 4] > t + 0.03) {
          ok = false;
          break;
        }
      }
      if (ok && res.length < 8) res.push(t);
    }
    this.surf.set(key, res);
    return res;
  }

  cellOf(x: number, z: number): [number, number] {
    return [Math.floor(x + this.hx), Math.floor(z + this.hz)];
  }

  private bestSurface(ix: number, iz: number, y: number): number {
    const s = this.surfaces(ix, iz);
    let bi = -1;
    let bd = 1e9;
    for (let k = 0; k < s.length; k++) {
      const d = Math.abs(s[k] - y);
      if (d < bd) {
        bd = d;
        bi = k;
      }
    }
    return bd < 1.6 ? bi : -1;
  }

  private findNode(x: number, y: number, z: number): number {
    const [cx, cz] = this.cellOf(x, z);
    for (let r = 0; r <= 2; r++) {
      let best = -1;
      let bd = 1e9;
      for (let dz = -r; dz <= r; dz++) {
        for (let dx = -r; dx <= r; dx++) {
          if (Math.max(Math.abs(dx), Math.abs(dz)) !== r) continue;
          const k = this.bestSurface(cx + dx, cz + dz, y);
          if (k < 0) continue;
          const d = Math.hypot(dx, dz);
          if (d < bd) {
            bd = d;
            best = ((cz + dz) * this.navW + (cx + dx)) * 8 + k;
          }
        }
      }
      if (best >= 0) return best;
    }
    return -1;
  }

  nodePos(id: number): [number, number, number] {
    const si = id % 8;
    const cell = (id - si) / 8;
    const ix = cell % this.navW;
    const iz = (cell - ix) / this.navW;
    return [ix - this.hx + 0.5, this.surfaces(ix, iz)[si], iz - this.hz + 0.5];
  }

  findPath(sx: number, sy: number, sz: number, gx: number, gy: number, gz: number, maxExp = 5000): [number, number, number][] | null {
    const s = this.findNode(sx, sy, sz);
    const g = this.findNode(gx, gy, gz);
    if (s < 0 || g < 0) return null;
    if (s === g) return [];
    const gp = this.nodePos(g);
    const heur = (id: number) => {
      const p = this.nodePos(id);
      return Math.hypot(p[0] - gp[0], p[2] - gp[2]) + Math.abs(p[1] - gp[1]) * 0.3;
    };
    const gs = new Map<number, number>();
    const parent = new Map<number, number>();
    const closed = new Set<number>();
    // 二叉堆
    const hp: [number, number][] = [];
    const push = (f: number, id: number) => {
      hp.push([f, id]);
      let i = hp.length - 1;
      while (i > 0) {
        const p = (i - 1) >> 1;
        if (hp[p][0] <= hp[i][0]) break;
        [hp[p], hp[i]] = [hp[i], hp[p]];
        i = p;
      }
    };
    const pop = (): [number, number] => {
      const top = hp[0];
      const last = hp.pop()!;
      if (hp.length > 0) {
        hp[0] = last;
        let i = 0;
        for (;;) {
          const l = i * 2 + 1;
          const r = l + 1;
          let m = i;
          if (l < hp.length && hp[l][0] < hp[m][0]) m = l;
          if (r < hp.length && hp[r][0] < hp[m][0]) m = r;
          if (m === i) break;
          [hp[m], hp[i]] = [hp[i], hp[m]];
          i = m;
        }
      }
      return top;
    };
    gs.set(s, 0);
    push(heur(s), s);
    let exp = 0;
    let bestId = s;
    let bestH = heur(s);
    let found = false;
    while (hp.length > 0 && exp < maxExp) {
      const [, cur] = pop();
      if (closed.has(cur)) continue;
      closed.add(cur);
      exp++;
      if (cur === g) {
        found = true;
        break;
      }
      const si = cur % 8;
      const cell = (cur - si) / 8;
      const ix = cell % this.navW;
      const iz = (cell - ix) / this.navW;
      const h = this.surfaces(ix, iz)[si];
      const cg = gs.get(cur)!;
      for (const [dx, dz] of DIRS) {
        const nx = ix + dx;
        const nz = iz + dz;
        if (dx !== 0 && dz !== 0) {
          if (!this.passable(ix + dx, iz, h) || !this.passable(ix, iz + dz, h)) continue;
        }
        const ss = this.surfaces(nx, nz);
        for (let k = 0; k < ss.length; k++) {
          const dh = ss[k] - h;
          if (dh > 0.56 || dh < -0.6) continue;
          const nid = (nz * this.navW + nx) * 8 + k;
          if (closed.has(nid)) continue;
          const ng = cg + (dx !== 0 && dz !== 0 ? 1.414 : 1) + Math.abs(dh) * 0.3;
          const old = gs.get(nid);
          if (old !== undefined && old <= ng) continue;
          gs.set(nid, ng);
          parent.set(nid, cur);
          const hh = heur(nid);
          if (hh < bestH) {
            bestH = hh;
            bestId = nid;
          }
          push(ng + hh, nid);
        }
      }
    }
    const end = found ? g : bestId;
    if (end === s) return null;
    const path: [number, number, number][] = [];
    let c = end;
    while (c !== s) {
      path.push(this.nodePos(c));
      const p = parent.get(c);
      if (p === undefined) break;
      c = p;
    }
    path.reverse();
    return path;
  }

  private passable(ix: number, iz: number, h: number): boolean {
    const ss = this.surfaces(ix, iz);
    for (const t of ss) {
      const d = t - h;
      if (d <= 0.56 && d >= -0.6) return true;
    }
    return false;
  }
}

// ───────────── 命中盒 (头部/身体) ─────────────
export interface HitTarget {
  x: number;
  y: number;
  z: number;
  yaw: number;
  stance: number; // 0 站 1 蹲 2 趴 3 滑铲(同蹲)
  scale: number;
}

const BOXES: Record<number, { body: number[]; head: number[] }> = {
  0: { body: [-0.34, 0, -0.27, 0.34, 1.4, 0.27], head: [-0.24, 1.4, -0.24, 0.24, 1.82, 0.24] },
  1: { body: [-0.34, 0, -0.27, 0.34, 0.95, 0.27], head: [-0.24, 0.95, -0.24, 0.24, 1.32, 0.24] },
  2: { body: [-0.34, 0, -0.4, 0.34, 0.42, 0.9], head: [-0.24, 0, -0.92, 0.24, 0.52, -0.4] },
};

function rayBox(ox: number, oy: number, oz: number, ix: number, iy: number, iz: number, b: number[], maxT: number): number {
  let t1 = (b[0] - ox) * ix;
  let t2 = (b[3] - ox) * ix;
  let tmin = Math.min(t1, t2);
  let tmax = Math.max(t1, t2);
  t1 = (b[1] - oy) * iy;
  t2 = (b[4] - oy) * iy;
  tmin = Math.max(tmin, Math.min(t1, t2));
  tmax = Math.min(tmax, Math.max(t1, t2));
  t1 = (b[2] - oz) * iz;
  t2 = (b[5] - oz) * iz;
  tmin = Math.max(tmin, Math.min(t1, t2));
  tmax = Math.min(tmax, Math.max(t1, t2));
  if (tmin > tmax || tmax < 0) return -1;
  const t = tmin < 0 ? 0 : tmin;
  return t <= maxT ? t : -1;
}

export function rayVsEntity(ox: number, oy: number, oz: number, dx: number, dy: number, dz: number, e: HitTarget, maxT: number): { t: number; head: boolean } | null {
  const c = Math.cos(e.yaw);
  const s = Math.sin(e.yaw);
  const rx = ox - e.x;
  const rz = oz - e.z;
  const sc = e.scale || 1;
  const lox = (c * rx - s * rz) / sc;
  const loz = (s * rx + c * rz) / sc;
  const loy = (oy - e.y) / sc;
  const ldx = (c * dx - s * dz) / sc;
  const ldz = (s * dx + c * dz) / sc;
  const ldy = dy / sc;
  const ix = ldx === 0 ? 1e30 : 1 / ldx;
  const iy = ldy === 0 ? 1e30 : 1 / ldy;
  const iz = ldz === 0 ? 1e30 : 1 / ldz;
  const bx = BOXES[e.stance === 2 ? 2 : e.stance === 0 ? 0 : 1];
  const th = rayBox(lox, loy, loz, ix, iy, iz, bx.head, maxT * 4);
  const tb = rayBox(lox, loy, loz, ix, iy, iz, bx.body, maxT * 4);
  // 由于缩放后参数 t 与缩放前相同 (整体线性缩放)，直接比较即可
  if (th >= 0 && (tb < 0 || th <= tb + 0.0001)) return th <= maxT ? { t: th, head: true } : null;
  if (tb >= 0) return tb <= maxT ? { t: tb, head: false } : null;
  return null;
}
