import * as THREE from "three";
import { World, newBody, Body, rayVsEntity } from "./world";
import { buildMap, MapData, V3 } from "./maps";
import { WEAPONS, WEAPON_BY_ID, WEAPON_INDEX, RULES, WeaponDef, Loadout, sanitizeLoadout, TEAM_COLORS, TEAM_NAMES } from "./weapons";
import { buildWorldMesh, buildGunModel, makeAvatar, setAvatarWeapon, animateAvatar, makeTag, bx } from "./render";
import { Net, NetMsg } from "./net";
import { sfx, initAudio, Sfx } from "./audio";
import { renderMapCanvas } from "./minimap";
import { Fx } from "./fx";
import { Bot, BotCtx } from "./bots";
import { loadBinds, KeyBinds, DEFAULT_BINDS } from "./keybinds";
import type { Ent, GameConfig, HudState, FeedItem, BoardRow, WeaponHud } from "./types";

interface WState {
  def: WeaponDef;
  mag: number;
  reserve: number;
  cd: number;
  reloadT: number;
}
interface Proj {
  id: string;
  mine: boolean;
  kind: string;
  def: WeaponDef;
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  grav: number;
  life: number;
  mesh: THREE.Object3D;
  wIdx: number;
}

const r2 = (v: number) => Math.round(v * 100) / 100;
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
function angDiff(a: number, b: number) {
  let d = b - a;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return d;
}
function wrapPi(a: number) {
  while (a > Math.PI) a -= Math.PI * 2;
  while (a < -Math.PI) a += Math.PI * 2;
  return a;
}
const BOT_NAMES = ["Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Golf", "Hotel", "India", "Juliet", "Kilo", "Lima", "Mike", "Nova", "Oscar", "Papa", "Quebec", "Romeo", "Sierra", "Tango", "Victor", "Whiskey", "Xray", "Zulu"];
const DM_WEAPONS = ["m4a1", "ak47", "mp5", "famas", "scarh", "vector", "p90"];
const ENEMY_TEAM = 5;
const HEIGHTS = [1.8, 1.3, 0.55];
const EYES = [1.65, 1.15, 0.5];

export class Game {
  hud: HudState;
  private cfg: GameConfig;
  private container: HTMLElement;
  private renderer: THREE.WebGLRenderer | null = null;
  private scene = new THREE.Scene();
  private vmScene = new THREE.Scene();
  private cam = new THREE.PerspectiveCamera(78, 1, 0.08, 400);
  private vmCam = new THREE.PerspectiveCamera(58, 1, 0.01, 10);
  private fx!: Fx;
  private world!: World;
  private map!: MapData;
  private net!: Net;
  private raf = 0;
  private lastT = 0;
  private time = 0;
  private disposed = false;
  private fpsAcc = 0;
  private fpsN = 0;

  // 房间
  private room: any = null;
  private isHost = false;
  private mode = "tdm";
  private team = 0;
  private teamCount = 2;
  private players = new Map<string, { name: string; team: number }>();
  private ents = new Map<string, Ent>();
  private bots = new Map<string, Bot>();
  private selfEnt!: Ent;
  private game: { sc: number[]; wave: number; phase: string; en: number; st: Record<string, [number, number]>; win: number } = { sc: [0, 0, 0, 0], wave: 0, phase: "play", en: 0, st: {}, win: -1 };

  // 本地玩家
  private p = {
    body: newBody(),
    yaw: 0,
    pitch: 0,
    kickP: 0,
    kickY: 0,
    hp: 100,
    alive: false,
    stance: 0,
    slide: 0,
    slideCd: 0,
    slideX: 0,
    slideZ: 0,
    stamina: 100,
    exhausted: false,
    sprinting: false,
    staminaDelay: 0,
    slowT: 0,
    slot: 0,
    w: [] as WState[],
    switchT: 0,
    healCharges: RULES.healUses,
    healT: 0,
    healAcc: 0,
    eye: 1.65,
    stepOff: 0,
    bob: 0,
    ads: 0,
    respawnT: 0,
    waiting: false,
    protect: 0,
    bloom: 0,
    meleeT: 0,
    swing: 0,
    vmKick: 0,
    fireBuf: 0,
    flash: 0,
    last: { from: "", w: 0, head: false },
    kills: 0,
    deaths: 0,
    hs: 0,
    speed: 0,
    reloadTotal: 1,
  };
  private pendingLoadout: Loadout;
  private loadout: Loadout;

  // 输入
  private keys = new Set<string>();
  private binds: KeyBinds = { ...DEFAULT_BINDS };
  private skipMouse = 0;
  private mouseL = false;
  private mouseR = false;
  private locked = false;
  private canvas: HTMLCanvasElement | null = null;

  // 视图模型
  private vmRoot = new THREE.Group();
  private vmWeapons: THREE.Group[] = [];
  private vmFlash: THREE.Mesh[] = [];
  private vmBuiltFor: string[] = [];

  // 战斗
  private projs: Proj[] = [];
  private projSeq = 0;
  private shake = 0;
  private feedSeq = 0;
  private feed: FeedItem[] = [];
  private banner = "";
  private bannerT = 0;
  private hitSeq = 0;
  private hitHead = false;
  private killSeq = 0;
  private dmgFlash = 0;
  private dmgAngle = 0;
  private showBoard = false;
  private statusErr = "";
  private status: HudState["status"] = "connecting";

  // 小地图
  private miniCv: HTMLCanvasElement | null = null;
  private miniBase: HTMLCanvasElement | null = null;
  private miniT = 0;

  // 房主逻辑
  private netT = 0;
  private botNetT = 0;
  private gameNetT = 0;
  private botSeq = 0;
  private shotParity = 0;
  private wave = {
    n: 0,
    state: "break" as "break" | "fight",
    breakT: 6,
    queue: [] as string[],
    spawnT: 0,
    overT: 0,
  };
  private roundOverT = 0;
  private botCtx!: BotCtx;
  private deadBotAt = new Map<string, number>();
  onExit: (reason: string) => void = () => {};

  constructor(container: HTMLElement, cfg: GameConfig) {
    this.container = container;
    this.cfg = cfg;
    this.binds = loadBinds();
    this.loadout = sanitizeLoadout(cfg.loadout);
    this.pendingLoadout = this.loadout;
    this.hud = {
      status: "connecting", error: "", locked: false, hp: 100, stamina: 100, exhausted: false, sprinting: false, stance: 0, sliding: false,
      slot: 0, weapons: [], reloadProg: 0, heal: RULES.healUses, healing: false, healProg: 0, alive: false, respawnIn: 0, waiting: false,
      hitSeq: 0, hitHead: false, killSeq: 0, dmgFlash: 0, dmgAngle: 0, ads: false, scope: false, spread: 2, feed: [], mode: "tdm", mapName: "",
      teamCount: 2, scores: [0, 0, 0, 0], scoreLimit: 30, myTeam: 0, wave: 0, enemiesLeft: 0, banner: "", bannerT: 0, phase: "play",
      board: [], showBoard: false, roomId: cfg.roomId, players: 1, fps: 0, kills: 0, deaths: 0, headshots: 0, protect: false, isHost: false,
    };
  }

  // ───────────────────────── 启动 / 销毁 ─────────────────────────
  async start() {
    this.setupRenderer();
    this.net = new Net(this.cfg.pid, this.cfg.roomId);
    this.net.onMsg = (m) => this.onNet(m);
    this.net.onClose = (r) => this.fatal(r);
    try {
      const w = await this.net.connect(this.cfg.name, this.cfg.team);
      if (this.disposed) return;
      this.onWelcome(w);
    } catch (e: any) {
      this.status = "error";
      this.statusErr = e?.message || "连接失败";
      return;
    }
    this.status = "playing";
    this.lastT = performance.now() / 1000;
    this.raf = requestAnimationFrame(this.loop);
  }

  private fatal(reason: string) {
    if (this.disposed) return;
    this.status = "error";
    this.statusErr = reason;
    this.onExit(reason);
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.onResize);
    document.removeEventListener("keydown", this.onKeyDown);
    document.removeEventListener("keyup", this.onKeyUp);
    document.removeEventListener("pointerlockchange", this.onLockChange);
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("mousedown", this.onMouseDown);
    document.removeEventListener("mouseup", this.onMouseUp);
    document.removeEventListener("wheel", this.onWheel);
    window.removeEventListener("blur", this.onBlur);
    if (document.pointerLockElement) document.exitPointerLock();
    this.net?.close();
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.domElement.remove();
    }
  }

  private setupRenderer() {
    const r = new THREE.WebGLRenderer({ antialias: false, powerPreference: "high-performance" });
    r.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
    r.setSize(this.container.clientWidth, this.container.clientHeight);
    r.autoClear = false;
    r.domElement.style.cssText = "display:block;width:100%;height:100%;";
    this.container.appendChild(r.domElement);
    this.renderer = r;
    this.canvas = r.domElement;
    window.addEventListener("resize", this.onResize);
    document.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("keyup", this.onKeyUp);
    document.addEventListener("pointerlockchange", this.onLockChange);
    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("mousedown", this.onMouseDown);
    document.addEventListener("mouseup", this.onMouseUp);
    document.addEventListener("wheel", this.onWheel, { passive: false });
    window.addEventListener("blur", this.onBlur);
    r.domElement.addEventListener("contextmenu", (e) => e.preventDefault());
    this.onResize();
  }

  private onResize = () => {
    if (!this.renderer) return;
    const w = this.container.clientWidth || window.innerWidth;
    const h = this.container.clientHeight || window.innerHeight;
    this.renderer.setSize(w, h);
    this.cam.aspect = w / h;
    this.cam.updateProjectionMatrix();
    this.vmCam.aspect = w / h;
    this.vmCam.updateProjectionMatrix();
  };

  private onWelcome(m: NetMsg) {
    this.room = m.room;
    this.isHost = m.room.hostId === this.cfg.pid;
    this.mode = m.room.mode;
    this.team = m.you.team;
    this.teamCount = this.mode === "ffa4" ? 4 : this.mode === "defense" ? 1 : 2;
    for (const p of m.players) this.players.set(p.id, { name: p.name, team: p.team });
    this.players.set(this.cfg.pid, { name: this.cfg.name, team: this.team });
    this.net.onMsg = (x) => this.onNet(x);

    this.map = buildMap(m.room.mapId);
    this.world = new World(this.map);
    this.initScene();
    this.selfEnt = {
      id: this.cfg.pid, name: this.cfg.name, team: this.team, isBot: false, kind: "human",
      x: 0, y: 0, z: 0, yaw: 0, pitch: 0, stance: 0, scale: 1, hp: 100, maxHp: 100, alive: false, speed: 0, wpn: 0,
      tx: 0, ty: 0, tz: 0, tyaw: 0, av: null, phase: 0, upd: 0,
    };
    this.miniBase = renderMapCanvas(this.map, 220, false);
    this.respawn();
    if (this.isHost) this.hostInit();
    this.showBannerLocal(this.mode === "defense" ? "坚守据点！敌人即将从四个角落来袭" : "战斗开始！", 4);
  }

  private initScene() {
    const map = this.map;
    this.scene.background = new THREE.Color(map.sky);
    this.scene.fog = new THREE.Fog(map.fog, 50, 190);
    this.scene.add(new THREE.HemisphereLight(0xffffff, 0x9aa7b5, 1.55));
    const sun = new THREE.DirectionalLight(0xffffff, 1.9);
    sun.position.set(60, 120, 40);
    this.scene.add(sun);
    this.scene.add(buildWorldMesh(map.boxes));
    // 方块云
    const cm = new THREE.MeshBasicMaterial({ color: 0xffffff, fog: false, transparent: true, opacity: 0.92 });
    const cg = new THREE.BoxGeometry(1, 1, 1);
    for (let i = 0; i < 22; i++) {
      const c = new THREE.Mesh(cg, cm);
      c.scale.set(14 + Math.random() * 26, 3, 9 + Math.random() * 14);
      c.position.set((Math.random() - 0.5) * 340, 70 + Math.random() * 25, (Math.random() - 0.5) * 340);
      this.scene.add(c);
    }
    this.vmScene.add(new THREE.HemisphereLight(0xffffff, 0x8899aa, 2.0));
    const vs = new THREE.DirectionalLight(0xffffff, 1.4);
    vs.position.set(1, 2, 1);
    this.vmScene.add(vs);
    this.vmScene.add(this.vmRoot);
    this.fx = new Fx(this.scene);
    this.cam.rotation.order = "YXZ";
  }

  // ───────────────────────── 网络 ─────────────────────────
  private onNet(m: NetMsg) {
    switch (m.t) {
      case "join":
        this.players.set(m.p.id, { name: m.p.name, team: m.p.team });
        this.pushFeedText(`${m.p.name} 加入了战场`);
        break;
      case "leave": {
        const info = this.players.get(m.id);
        this.players.delete(m.id);
        this.removeEnt(m.id);
        if (info) this.pushFeedText(`${info.name} 离开了战场`);
        break;
      }
      case "team": {
        const pl = this.players.get(m.id);
        if (pl) pl.team = m.team;
        const e = this.ents.get(m.id);
        if (e) e.team = m.team;
        break;
      }
      case "st":
        this.updateRemote(m);
        break;
      case "bots":
        this.updateBots(m.l);
        break;
      case "ev":
        this.onEvent(m.from, m.d);
        break;
    }
  }

  private evAll(d: any) {
    this.net.ev("all", d);
  }

  private onEvent(from: string, d: any) {
    switch (d.k) {
      case "hit":
        if (d.v === this.cfg.pid) this.damageSelf(d.dmg, d.head, d.from, d.w, d.sx, d.sz, d.slow);
        else if (this.isHost) this.bots.get(d.v)?.damage(this.botCtx, d.dmg, d.from, d.w, d.head);
        break;
      case "kill":
        this.onKill(d);
        break;
      case "shot": {
        const o = new THREE.Vector3(d.o[0], d.o[1], d.o[2]);
        const w = WEAPONS[d.w] ?? WEAPONS[0];
        for (const e of d.e) this.fx.tracer(o, new THREE.Vector3(e[0], e[1], e[2]), 0xffe9a0);
        this.playPos(this.sfxFor(w), o.x, o.z, 0.8);
        break;
      }
      case "proj":
        this.spawnProj(d.id, false, d.kind, WEAPONS[d.w] ?? WEAPONS[0], new THREE.Vector3(d.p[0], d.p[1], d.p[2]), new THREE.Vector3(d.v[0], d.v[1], d.v[2]), d.g, d.w);
        break;
      case "boom": {
        const i = this.projs.findIndex((q) => q.id === d.id);
        if (i >= 0) this.removeProj(i);
        this.explodeVisual(d.p[0], d.p[1], d.p[2], d.r);
        break;
      }
      case "game":
        this.game = { sc: d.sc, wave: d.wave, phase: d.phase, en: d.en, st: d.st, win: d.win };
        break;
      case "banner":
        this.showBannerLocal(d.text, d.secs);
        break;
      case "revive":
        if (!this.p.alive) this.respawn();
        if (d.restock) this.restock();
        break;
      case "reset":
        this.p.kills = 0;
        this.p.deaths = 0;
        this.respawn();
        break;
    }
  }

  private sfxFor(w: WeaponDef): Sfx {
    if (w.id === "rpg") return "rocket";
    if (w.id === "hmg") return "heavy";
    if (w.cat === "pistol") return "pistol";
    if (w.cat === "melee") return "melee";
    return w.cat as Sfx;
  }

  private playPos(s: Sfx, x: number, z: number, base = 1) {
    const b = this.p.body;
    const d = Math.hypot(x - b.x, z - b.z);
    const v = Math.pow(clamp(1 - d / 90, 0, 1), 1.5) * base;
    sfx(s, v);
  }

  // ───────────────────────── 实体 (远程玩家 / 机器人) ─────────────────────────
  private entKind(e: Ent) {
    const hs = (c: number) => c;
    if (e.isBot && e.team === ENEMY_TEAM) {
      if (e.kind === "rusher") return { torso: hs(0x8a2a2a), skin: 0xa8d07a, legs: 0x3a1f1f, helmet: 0x552222, scale: e.scale };
      if (e.kind === "heavy") return { torso: hs(0x3a3f46), skin: 0x8fbf7a, legs: 0x22262b, helmet: 0x15181c, scale: e.scale };
      return { torso: hs(0x5b3a2e), skin: 0x8fbf7a, legs: 0x2b2b2b, helmet: 0x3a2a2a, scale: e.scale };
    }
    const tc = TEAM_COLORS[e.team % 4];
    return { torso: tc, skin: 0xe0b48a, legs: 0x2e3440, helmet: new THREE.Color(tc).multiplyScalar(0.55).getHex(), scale: 1 };
  }

  private ensureAvatar(e: Ent) {
    if (e.av) return e.av;
    const av = makeAvatar(this.entKind(e));
    this.scene.add(av.group);
    e.av = av;
    return av;
  }

  private removeEnt(id: string) {
    const e = this.ents.get(id);
    if (e?.av) this.scene.remove(e.av.group);
    this.ents.delete(id);
  }

  private newRemote(id: string, isBot: boolean): Ent {
    const info = this.players.get(id);
    const e: Ent = {
      id, name: info?.name ?? (isBot ? "BOT" : "玩家"), team: info?.team ?? 0, isBot, kind: isBot ? "dm" : "human",
      x: 0, y: 0, z: 0, yaw: 0, pitch: 0, stance: 0, scale: 1, hp: 100, maxHp: 100, alive: false, speed: 0, wpn: 0,
      tx: 0, ty: 0, tz: 0, tyaw: 0, av: null, phase: 0, upd: this.time,
    };
    this.ents.set(id, e);
    return e;
  }

  private setAlive(e: Ent, alive: boolean) {
    if (e.alive && !alive) {
      const c = e.isBot && e.team === ENEMY_TEAM ? 0x7a2a2a : TEAM_COLORS[e.team % 4];
      this.fx.burst(e.x, e.y + 1, e.z, c, 16, 4.5, 0.2, 0.9);
    }
    e.alive = alive;
  }

  private updateRemote(m: NetMsg) {
    let e = this.ents.get(m.id);
    if (!e) e = this.newRemote(m.id, false);
    const info = this.players.get(m.id);
    if (info) {
      e.name = info.name;
      e.team = info.team;
    }
    const wasAlive = e.alive;
    e.tx = m.x;
    e.ty = m.y;
    e.tz = m.z;
    e.tyaw = m.yw;
    e.pitch = m.pt;
    e.stance = m.s;
    e.wpn = m.w;
    e.hp = m.hp;
    e.speed = m.sp;
    e.upd = this.time;
    if (m.al && !wasAlive) {
      e.x = m.x;
      e.y = m.y;
      e.z = m.z;
      e.yaw = m.yw;
      e.alive = true;
    } else if (!m.al && wasAlive) this.setAlive(e, false);
  }

  private updateBots(list: any[]) {
    if (this.isHost) return;
    const seen = new Set<string>();
    for (const b of list) {
      const [id, x, y, z, yaw, pitch, stance, hp, al, wpn, sp, kind, team, name] = b;
      seen.add(id);
      let e = this.ents.get(id);
      if (!e) {
        e = this.newRemote(id, true);
        e.kind = kind;
        e.team = team;
        e.name = name;
        e.scale = kind === "heavy" ? 1.22 : 1;
      }
      const wasAlive = e.alive;
      e.tx = x;
      e.ty = y;
      e.tz = z;
      e.tyaw = yaw;
      e.pitch = pitch;
      e.stance = stance;
      e.hp = hp;
      e.wpn = wpn;
      e.speed = sp;
      e.upd = this.time;
      if (al && !wasAlive) {
        e.x = x;
        e.y = y;
        e.z = z;
        e.yaw = yaw;
        e.alive = true;
      } else if (!al && wasAlive) this.setAlive(e, false);
    }
    for (const [id, e] of Array.from(this.ents)) if (e.isBot && !seen.has(id)) this.removeEnt(id);
  }

  private updateEnts(dt: number) {
    const k = 1 - Math.exp(-dt * 14);
    for (const e of this.ents.values()) {
      const own = this.isHost && e.isBot;
      if (!own) {
        e.x += (e.tx - e.x) * k;
        e.y += (e.ty - e.y) * k;
        e.z += (e.tz - e.z) * k;
        e.yaw += angDiff(e.yaw, e.tyaw) * k;
        if (Math.hypot(e.tx - e.x, e.tz - e.z) > 6) {
          e.x = e.tx;
          e.z = e.tz;
          e.y = e.ty;
        }
        e.phase += e.speed * dt * 1.9;
      }
      if (e.alive) {
        const av = this.ensureAvatar(e);
        av.group.visible = true;
        av.group.position.set(e.x, e.y, e.z);
        av.group.rotation.y = e.yaw;
        setAvatarWeapon(av, WEAPONS[e.wpn] ?? WEAPONS[0]);
        animateAvatar(av, e.phase, e.speed, e.stance === 3 ? 1 : e.stance, dt, 1, (WEAPONS[e.wpn] ?? WEAPONS[0]).cat === "melee");
        // 队友名牌
        if (!e.isBot && e.team === this.team && !av.tag) {
          av.tag = makeTag(e.name, "#" + TEAM_COLORS[e.team % 4].toString(16).padStart(6, "0"));
          av.group.add(av.tag);
        }
        if (av.tag) av.tag.visible = e.team === this.team;
      } else if (e.av) e.av.group.visible = false;
    }
  }

  // 与本局敌对的存活实体
  private hostiles(team: number, includeSelf = true): Ent[] {
    const out: Ent[] = [];
    for (const e of this.ents.values()) if (e.alive && e.team !== team) out.push(e);
    if (includeSelf && this.p.alive && this.team !== team) out.push(this.selfEnt);
    return out;
  }

  // ───────────────────────── 武器 / 出生 ─────────────────────────
  private mkW(id: string): WState {
    const def = WEAPON_BY_ID[id];
    return { def, mag: def.mag, reserve: def.mag * def.mags, cd: 0, reloadT: 0 };
  }

  setLoadout(l: Loadout) {
    this.pendingLoadout = sanitizeLoadout(l);
    if (!this.p.alive && !this.p.waiting) return;
  }

  private restock() {
    for (const w of this.p.w) {
      w.mag = w.def.mag;
      w.reserve = w.def.mag * w.def.mags;
      w.reloadT = 0;
    }
    this.p.healCharges = RULES.healUses;
    this.p.hp = RULES.maxHp;
  }

  private applyLoadout() {
    this.loadout = this.pendingLoadout;
    const ids = [this.loadout.primary, this.loadout.secondary, this.loadout.heavy];
    this.p.w = ids.map((i) => this.mkW(i));
    this.buildViewModels(ids);
  }

  private buildViewModels(ids: string[]) {
    ids.forEach((id, i) => {
      if (this.vmBuiltFor[i] === id) return;
      this.vmBuiltFor[i] = id;
      if (this.vmWeapons[i]) this.vmRoot.remove(this.vmWeapons[i]);
      const def = WEAPON_BY_ID[id];
      const g = new THREE.Group();
      const model = buildGunModel(def);
      g.add(model);
      const sk = 0xe0b48a;
      const sl = 0x36402f;
      if (def.cat === "melee") {
        bx(0.08, 0.08, 0.45, 0.02, -0.08, 0.2, sl, g);
        bx(0.08, 0.08, 0.1, 0, -0.01, 0.02, sk, g);
      } else {
        bx(0.08, 0.08, 0.5, 0.03, -0.13, 0.22, sl, g);
        bx(0.075, 0.075, 0.1, 0.0, -0.075, -0.02, sk, g);
        if (def.cat !== "pistol") {
          bx(0.08, 0.08, 0.5, -0.1, -0.14, -def.len * 0.2 + 0.28, sl, g);
          bx(0.075, 0.075, 0.1, -0.005, -0.075, -def.len * 0.5, sk, g);
        }
      }
      const fl = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.12), new THREE.MeshBasicMaterial({ color: 0xffdd66 }));
      fl.position.set(0, 0.03, -def.len - 0.06);
      fl.visible = false;
      g.add(fl);
      g.visible = false;
      this.vmFlash[i] = fl;
      this.vmWeapons[i] = g;
      this.vmRoot.add(g);
    });
  }

  private spawnList(team: number): V3[] {
    const m = this.map;
    if (m.type === "defense") return m.defSpawns;
    const idx = m.type === "ffa" && this.mode === "tdm" ? [0, 2][team] ?? 0 : team;
    return m.spawns[idx] ?? m.spawns[0];
  }

  private pickSpawn(team: number): V3 {
    const list = this.spawnList(team);
    const foes = this.hostiles(team, true);
    let best = list[0];
    let bd = -1;
    for (let i = 0; i < 5; i++) {
      const c = list[Math.floor(Math.random() * list.length)];
      let md = 1e9;
      for (const e of foes) md = Math.min(md, Math.hypot(c[0] - e.x, c[2] - e.z));
      if (md > bd) {
        bd = md;
        best = c;
      }
    }
    return best;
  }

  private respawn() {
    const p = this.p;
    this.applyLoadout();
    const s = this.pickSpawn(this.team);
    p.body = newBody(s[0], s[1], s[2]);
    p.yaw = Math.atan2(s[0], s[2]);
    p.pitch = 0;
    p.kickP = p.kickY = 0;
    p.hp = RULES.maxHp;
    p.stamina = 100;
    p.exhausted = false;
    p.staminaDelay = 0;
    p.slowT = 0;
    p.stance = 0;
    p.slide = 0;
    p.healCharges = RULES.healUses;
    p.healT = 0;
    p.slot = 0;
    p.switchT = 0.4;
    p.alive = true;
    p.waiting = false;
    p.respawnT = 0;
    p.protect = 2.5;
    p.ads = 0;
    p.eye = EYES[0];
    this.selfEnt.team = this.team;
    this.selfEnt.alive = true;
    this.pushState();
  }

  private pushState() {
    const p = this.p;
    const b = p.body;
    this.net.state({
      t: "st", x: r2(b.x), y: r2(b.y), z: r2(b.z), yw: r2(p.yaw), pt: r2(p.pitch),
      s: p.slide > 0 ? 1 : p.stance, w: WEAPON_INDEX[p.w[p.slot]?.def.id ?? "m4a1"], hp: Math.round(p.hp), al: p.alive ? 1 : 0, sp: r2(p.speed),
    });
  }

  switchTeam(t: number) {
    if (this.mode === "defense" || t === this.team || t < 0 || t >= this.teamCount) return;
    this.team = t;
    this.players.set(this.cfg.pid, { name: this.cfg.name, team: t });
    this.net.raw({ t: "team", team: t });
    this.p.alive = false;
    this.respawn();
  }

  // ───────────────────────── 输入 ─────────────────────────
  lock() {
    initAudio();
    this.canvas?.requestPointerLock();
  }

  private onLockChange = () => {
    this.locked = document.pointerLockElement === this.canvas;
    if (this.locked) this.skipMouse = 3;
    else {
      this.mouseL = false;
      this.mouseR = false;
      this.keys.clear();
      this.showBoard = false;
    }
  };

  private onBlur = () => {
    this.keys.clear();
    this.mouseL = this.mouseR = false;
  };

  private onMouseMove = (e: MouseEvent) => {
    if (!this.locked || !this.p.alive) return;
    // 指针锁定切换 / 浏览器光标回绕时 movementX 会出现巨大跳变，
    // 直接使用会导致视角瞬间转向反方向。这里忽略最初几个事件并限幅。
    if (this.skipMouse > 0) {
      this.skipMouse--;
      return;
    }
    const mx = clamp(e.movementX, -160, 160);
    const my = clamp(e.movementY, -160, 160);
    if (mx === 0 && my === 0) return;
    const w = this.p.w[this.p.slot]?.def;
    const zoom = w ? 1 + (w.zoom - 1) * this.p.ads : 1;
    const sens = 0.0021 / Math.pow(zoom, 0.85);
    this.p.yaw = wrapPi(this.p.yaw - mx * sens);
    this.p.pitch = clamp(this.p.pitch - my * sens, -1.52, 1.52);
  };

  private onMouseDown = (e: MouseEvent) => {
    if (!this.locked) return;
    if (e.button === 0) {
      this.mouseL = true;
      this.p.fireBuf = 0.18;
    } else if (e.button === 2) this.mouseR = true;
    e.preventDefault();
  };
  private onMouseUp = (e: MouseEvent) => {
    if (e.button === 0) this.mouseL = false;
    else if (e.button === 2) this.mouseR = false;
  };
  private onWheel = (e: WheelEvent) => {
    if (!this.locked) return;
    e.preventDefault();
    const d = e.deltaY > 0 ? 1 : -1;
    this.switchSlot((this.p.slot + d + 3) % 3);
  };

  private onKeyDown = (e: KeyboardEvent) => {
    if (!this.locked) return;
    const c = e.code;
    const bound = Object.values(this.binds).includes(c) || ["Space", "Tab", "ArrowUp", "ArrowDown"].includes(c);
    if (bound) e.preventDefault();
    if (e.repeat) return;
    this.keys.add(c);
    const p = this.p;
    const b = this.binds;
    if (!p.alive) {
      if (c === b.scoreboard) this.showBoard = true;
      return;
    }
    if (c === b.slot1) this.switchSlot(0);
    else if (c === b.slot2) this.switchSlot(1);
    else if (c === b.slot3) this.switchSlot(2);
    else if (c === b.reload) this.startReload();
    else if (c === b.heal) this.useHeal();
    else if (c === b.scoreboard) this.showBoard = true;
    else if (c === b.prone) {
      p.slide = 0;
      this.setStance(p.stance === 2 ? 0 : 2);
    } else if (c === b.crouch) {
      if (this.key(b.sprint)) this.trySlide();
      else {
        p.slide = 0;
        this.setStance(p.stance === 1 ? 0 : 1);
      }
    }
  };
  private onKeyUp = (e: KeyboardEvent) => {
    this.keys.delete(e.code);
    if (e.code === this.binds.scoreboard) this.showBoard = false;
  };

  private key(c: string) {
    return this.keys.has(c);
  }

  private act(a: keyof KeyBinds) {
    return this.keys.has(this.binds[a]);
  }

  private setStance(s: number) {
    const p = this.p;
    const b = p.body;
    if (s === p.stance && !(p.slide > 0)) return;
    const h = HEIGHTS[s];
    if (h > b.h && !this.world.fits(b.x, b.y + 0.001, b.z, b.hw, h)) return;
    p.stance = s;
    b.h = h;
  }

  private trySlide() {
    const p = this.p;
    const bd = p.body;
    if (p.slideCd > 0 || !bd.onGround || p.stance !== 0) return;
    if (p.stamina < RULES.slideCost) return;
    const fwd = (this.act("forward") ? 1 : 0) - (this.act("back") ? 1 : 0);
    const str = (this.act("right") ? 1 : 0) - (this.act("left") ? 1 : 0);
    if (fwd <= 0 && str === 0) return;
    const fx = -Math.sin(p.yaw);
    const fz = -Math.cos(p.yaw);
    const rx = Math.cos(p.yaw);
    const rz = -Math.sin(p.yaw);
    let dx = fx * fwd + rx * str;
    let dz = fz * fwd + rz * str;
    const l = Math.hypot(dx, dz) || 1;
    dx /= l;
    dz /= l;
    p.slide = 0.85;
    p.slideCd = 1.4;
    p.slideX = dx;
    p.slideZ = dz;
    p.stance = 1;
    bd.h = HEIGHTS[1];
    p.sprinting = false;
    // 滑铲消耗 1/4 体力，并在结束后延迟恢复
    p.stamina = Math.max(0, p.stamina - RULES.slideCost);
    p.staminaDelay = RULES.staminaRegenDelay;
  }

  // ───────────────────────── 武器逻辑 ─────────────────────────
  private cur() {
    return this.p.w[this.p.slot];
  }

  private switchSlot(s: number) {
    const p = this.p;
    if (s === p.slot || !p.alive || !p.w[s]) return;
    p.w[p.slot].reloadT = 0;
    p.slot = s;
    p.switchT = 0.4;
    p.ads = 0;
    p.healT = Math.max(0, p.healT);
    sfx("switch", 0.6);
  }

  private startReload() {
    const p = this.p;
    const w = this.cur();
    if (!w || !p.alive || w.reloadT > 0 || w.def.type === "melee") return;
    if (w.mag >= w.def.mag || w.reserve <= 0 || p.healT > 0 || p.switchT > 0) return;
    w.reloadT = w.def.reload;
    p.reloadTotal = w.def.reload;
    sfx("reload", 0.7);
  }

  private useHeal() {
    const p = this.p;
    if (!p.alive || p.healCharges <= 0 || p.healT > 0 || p.hp >= RULES.maxHp) return;
    p.healCharges--;
    p.healT = RULES.healDuration;
    p.healAcc = 0;
    this.cur().reloadT = 0;
    sfx("heal", 0.8);
  }

  private camBasis() {
    const p = this.p;
    const pitch = clamp(p.pitch + p.kickP, -1.55, 1.55);
    const yaw = p.yaw + p.kickY;
    const cp = Math.cos(pitch);
    const f = new THREE.Vector3(-Math.sin(yaw) * cp, Math.sin(pitch), -Math.cos(yaw) * cp);
    const r = new THREE.Vector3(Math.cos(yaw), 0, -Math.sin(yaw));
    const u = new THREE.Vector3().crossVectors(r, f).normalize();
    return { f, r, u };
  }

  private eyePos() {
    const b = this.p.body;
    return new THREE.Vector3(b.x, b.y + this.p.eye, b.z);
  }

  private currentSpread() {
    const p = this.p;
    const d = this.cur()?.def;
    if (!d) return 2;
    let sp = d.spread + (d.adsSpread - d.spread) * p.ads;
    const sf = clamp(p.speed / 6, 0, 1);
    sp *= 1 + sf * 0.9 * (1 - p.ads);
    if (!p.body.onGround) sp *= 2.2;
    if (p.stance === 1) sp *= 0.8;
    if (p.stance === 2) sp *= 0.6;
    return sp;
  }

  private fire() {
    const p = this.p;
    const w = this.cur();
    const d = w.def;
    const wIdx = WEAPON_INDEX[d.id];
    w.mag--;
    w.cd = 60 / d.rpm;
    p.fireBuf = 0;
    const eye = this.eyePos();
    const { f, r, u } = this.camBasis();
    const muzzle = eye.clone().addScaledVector(f, 0.75).addScaledVector(r, 0.2).addScaledVector(u, -0.14);
    let sp = this.currentSpread();
    if (d.pellets === 1) sp += p.bloom * (1 - p.ads * 0.7);
    // 后坐力（视角上跳 + 少量随机水平偏移；视觉 kick 单独限幅，避免累积成抖动）
    const rad = Math.PI / 180;
    p.pitch = clamp(p.pitch + d.recoilV * 0.6 * rad * (0.8 + Math.random() * 0.4), -1.52, 1.52);
    p.yaw = wrapPi(p.yaw + (Math.random() * 2 - 1) * d.recoilH * 0.6 * rad);
    p.kickP = clamp(p.kickP + d.recoilV * 0.22 * rad, -0.12, 0.12);
    p.kickY = clamp(p.kickY + (Math.random() * 2 - 1) * d.recoilH * 0.18 * rad, -0.07, 0.07);
    p.bloom = Math.min(2.5, p.bloom + 0.12 * d.recoilV);
    p.vmKick = 1;
    p.flash = 0.045;
    this.vmFlash[p.slot].visible = true;
    sfx(this.sfxFor(d), 1);

    if (d.type === "rocket" || d.type === "grenade") {
      const dir = this.spreadDir(f, r, u, sp);
      const id = `${this.cfg.pid}-${this.projSeq++}`;
      const grav = d.type === "grenade" ? 12 : 0;
      const vel = dir.clone().multiplyScalar(d.speed);
      this.spawnProj(id, true, d.type, d, muzzle.clone(), vel, grav, wIdx);
      this.evAll({ k: "proj", id, kind: d.type, w: wIdx, p: [muzzle.x, muzzle.y, muzzle.z], v: [vel.x, vel.y, vel.z], g: grav });
      this.evAll({ k: "shot", id: this.cfg.pid, o: [muzzle.x, muzzle.y, muzzle.z], e: [], w: wIdx });
      return;
    }

    const hits = new Map<string, { ent: Ent; dmg: number; head: boolean }>();
    const ends: number[][] = [];
    const foes = this.hostiles(this.team, false);
    for (let i = 0; i < d.pellets; i++) {
      const dir = this.spreadDir(f, r, u, sp);
      const maxR = d.maxRange;
      const tw = this.world.raycast(eye.x, eye.y, eye.z, dir.x, dir.y, dir.z, maxR);
      let bt = tw;
      let hit: Ent | null = null;
      let head = false;
      for (const e of foes) {
        const h = rayVsEntity(eye.x, eye.y, eye.z, dir.x, dir.y, dir.z, e, bt);
        if (h && h.t < bt) {
          bt = h.t;
          hit = e;
          head = h.head;
        }
      }
      const px = eye.x + dir.x * bt;
      const py = eye.y + dir.y * bt;
      const pz = eye.z + dir.z * bt;
      if (hit) {
        const fall = bt <= d.range ? 1 : 1 - (1 - d.minMul) * Math.min(1, (bt - d.range) / Math.max(1, d.maxRange - d.range));
        const dmg = d.damage * fall * (head ? RULES.headMul : RULES.bodyMul);
        const cur = hits.get(hit.id);
        if (cur) {
          cur.dmg += dmg;
          cur.head = cur.head || head;
        } else hits.set(hit.id, { ent: hit, dmg, head });
        this.fx.burst(px, py, pz, head ? 0xff2222 : 0xb02a2a, head ? 8 : 5, 3.5, 0.1, 0.4);
      } else if (bt < maxR - 0.01) this.fx.burst(px, py, pz, 0xd8d2c0, 4, 3, 0.07, 0.35);
      if (i < 3 || d.pellets === 1) ends.push([r2(px), r2(py), r2(pz)]);
      if (i < 3) this.fx.tracer(muzzle, new THREE.Vector3(px, py, pz), d.cat === "sniper" ? 0xfff6c0 : 0xffe9a0);
    }
    hits.forEach((h) => {
      this.applyHit(h.ent, h.dmg, h.head, wIdx);
      this.hitSeq++;
      this.hitHead = h.head;
      sfx(h.head ? "head" : "hit", 0.8);
    });
    this.evAll({ k: "shot", id: this.cfg.pid, o: [r2(muzzle.x), r2(muzzle.y), r2(muzzle.z)], e: ends, w: wIdx });
  }

  private spreadDir(f: THREE.Vector3, r: THREE.Vector3, u: THREE.Vector3, spDeg: number) {
    const sp = (spDeg * Math.PI) / 180;
    const a = Math.random() * Math.PI * 2;
    const rr = Math.tan(sp) * Math.sqrt(Math.random());
    return f.clone().addScaledVector(r, Math.cos(a) * rr).addScaledVector(u, Math.sin(a) * rr).normalize();
  }

  // 对目标造成伤害 (本地射击者调用)
  private applyHit(t: Ent, dmg: number, head: boolean, wIdx: number) {
    const b = this.p.body;
    if (t.isBot) {
      if (this.isHost) this.bots.get(t.id)?.damage(this.botCtx, dmg, this.cfg.pid, wIdx, head);
      else this.net.ev("host", { k: "hit", v: t.id, dmg: r2(dmg), head, from: this.cfg.pid, w: wIdx });
    } else {
      this.net.ev(t.id, { k: "hit", v: t.id, dmg: r2(dmg), head, from: this.cfg.pid, w: wIdx, sx: r2(b.x), sz: r2(b.z) });
    }
  }

  private meleeAttack() {
    const p = this.p;
    const w = this.cur();
    const d = w.def;
    w.cd = 60 / d.rpm;
    p.swing = Math.min(0.3, w.cd * 0.7);
    p.meleeT = 0.1;
    sfx("melee", 0.7);
  }

  private meleeHit() {
    const p = this.p;
    const d = this.cur().def;
    const eye = this.eyePos();
    const foes = this.hostiles(this.team, false);
    let best: { e: Ent; t: number; head: boolean } | null = null;
    for (const off of [0, -0.14, 0.14]) {
      const yaw = p.yaw + off;
      const cp = Math.cos(p.pitch);
      const dx = -Math.sin(yaw) * cp;
      const dy = Math.sin(p.pitch);
      const dz = -Math.cos(yaw) * cp;
      const tw = this.world.raycast(eye.x, eye.y, eye.z, dx, dy, dz, d.range);
      for (const e of foes) {
        const h = rayVsEntity(eye.x, eye.y, eye.z, dx, dy, dz, e, Math.min(tw, d.range));
        if (h && (!best || h.t < best.t)) best = { e, t: h.t, head: h.head };
      }
      if (best) break;
    }
    if (best) {
      const dmg = d.damage * (best.head ? RULES.headMul : RULES.bodyMul);
      this.applyHit(best.e, dmg, best.head, WEAPON_INDEX[d.id]);
      this.hitSeq++;
      this.hitHead = best.head;
      sfx(best.head ? "head" : "hit", 0.9);
      this.fx.burst(best.e.x, best.e.y + 1.2, best.e.z, 0xb02a2a, 8, 3, 0.1, 0.4);
    }
  }

  // ───────────────────────── 投射物 ─────────────────────────
  private spawnProj(id: string, mine: boolean, kind: string, def: WeaponDef, pos: THREE.Vector3, vel: THREE.Vector3, grav: number, wIdx: number) {
    const g = new THREE.Group();
    if (kind === "rocket") {
      bx(0.1, 0.1, 0.55, 0, 0, 0, 0x5a6b45, g);
      bx(0.14, 0.14, 0.18, 0, 0, -0.3, 0xc0392b, g);
      bx(0.06, 0.06, 0.2, 0, 0, 0.35, 0xffa030, g);
    } else bx(0.24, 0.24, 0.24, 0, 0, 0, 0x3d5a35, g);
    g.position.copy(pos);
    this.scene.add(g);
    this.projs.push({ id, mine, kind, def, pos, vel, grav, life: kind === "rocket" ? 6 : 3.2, mesh: g, wIdx });
  }

  private removeProj(i: number) {
    this.scene.remove(this.projs[i].mesh);
    this.projs.splice(i, 1);
  }

  private updateProjs(dt: number) {
    for (let i = this.projs.length - 1; i >= 0; i--) {
      const pr = this.projs[i];
      pr.life -= dt;
      pr.vel.y -= pr.grav * dt;
      const sp = pr.vel.length();
      const len = sp * dt;
      const dir = pr.vel.clone().divideScalar(sp || 1);
      const tw = this.world.raycast(pr.pos.x, pr.pos.y, pr.pos.z, dir.x, dir.y, dir.z, len);
      let bt = tw;
      let hitEnt = false;
      if (pr.mine) {
        for (const e of this.hostiles(this.team, false)) {
          const h = rayVsEntity(pr.pos.x, pr.pos.y, pr.pos.z, dir.x, dir.y, dir.z, e, bt);
          if (h && h.t < bt) {
            bt = h.t;
            hitEnt = true;
          }
        }
      }
      if (bt < len || pr.life <= 0) {
        const t = Math.min(bt, len);
        const x = pr.pos.x + dir.x * t - dir.x * 0.15;
        const y = pr.pos.y + dir.y * t - dir.y * 0.15;
        const z = pr.pos.z + dir.z * t - dir.z * 0.15;
        void hitEnt;
        this.explodeProj(pr, x, y, z);
        this.removeProj(i);
        continue;
      }
      pr.pos.addScaledVector(dir, len);
      pr.mesh.position.copy(pr.pos);
      pr.mesh.lookAt(pr.pos.clone().add(dir));
      if (pr.kind === "rocket") this.fx.burst(pr.pos.x - dir.x * 0.4, pr.pos.y - dir.y * 0.4, pr.pos.z - dir.z * 0.4, 0x999999, 1, 0.6, 0.22, 0.5, -1);
    }
  }

  private explodeVisual(x: number, y: number, z: number, r: number) {
    this.fx.explosion(x, y, z, r);
    this.playPos("boom", x, z, 1);
    const b = this.p.body;
    const d = Math.hypot(x - b.x, y - b.y, z - b.z);
    this.shake = Math.max(this.shake, clamp(1 - d / (r * 4), 0, 1) * 1.2);
  }

  private explodeProj(pr: Proj, x: number, y: number, z: number) {
    const R = pr.def.radius || 5;
    this.explodeVisual(x, y, z, R);
    if (!pr.mine) return;
    const base = pr.def.damage;
    const check = (cx: number, cy: number, cz: number) => {
      const d = Math.hypot(cx - x, cy - y, cz - z);
      if (d >= R) return -1;
      if (!this.world.hasLOS(x, y, z, cx, cy, cz)) return -1;
      return base * Math.max(0.12, 1 - d / R);
    };
    for (const e of this.hostiles(this.team, false)) {
      const dmg = Math.max(check(e.x, e.y + 0.9 * e.scale, e.z), check(e.x, e.y + 0.3, e.z));
      if (dmg > 0) {
        this.applyHit(e, dmg, false, pr.wIdx);
        this.hitSeq++;
        this.hitHead = false;
        sfx("hit", 0.6);
      }
    }
    const b = this.p.body;
    if (this.p.alive) {
      const dmg = Math.max(check(b.x, b.y + 0.9, b.z), check(b.x, b.y + 0.2, b.z));
      if (dmg > 0) this.damageSelf(dmg * 0.5, false, this.cfg.pid, pr.wIdx, x, z);
    }
    this.evAll({ k: "boom", id: pr.id, p: [r2(x), r2(y), r2(z)], r: R });
  }

  // ───────────────────────── 伤害 / 死亡 ─────────────────────────
  private damageSelf(dmg: number, head: boolean, from: string, w: number, sx?: number, sz?: number, slow?: number) {
    const p = this.p;
    if (!p.alive || p.protect > 0 || !(dmg > 0)) return;
    p.hp -= dmg;
    if (slow && slow > 0) p.slowT = Math.max(p.slowT, slow);
    p.last = { from, w, head };
    this.dmgFlash = Math.min(1, this.dmgFlash + 0.5 + dmg / 80);
    if (sx !== undefined && sz !== undefined) {
      const b = p.body;
      const dx = sx - b.x;
      const dz = sz - b.z;
      const world = Math.atan2(-dx, -dz);
      this.dmgAngle = angDiff(p.yaw, world);
    }
    sfx("hurt", 0.7);
    if (p.hp <= 0) this.die();
  }

  private nameOf(id: string): string {
    if (id === this.cfg.pid) return this.cfg.name;
    return this.players.get(id)?.name ?? this.ents.get(id)?.name ?? "未知";
  }
  private teamOf(id: string): number {
    if (id === this.cfg.pid) return this.team;
    return this.players.get(id)?.team ?? this.ents.get(id)?.team ?? 0;
  }

  private die() {
    const p = this.p;
    p.alive = false;
    p.hp = 0;
    p.deaths++;
    p.healT = 0;
    p.sprinting = false;
    p.slide = 0;
    p.slowT = 0;
    p.ads = 0;
    this.selfEnt.alive = false;
    const killer = p.last.from || this.cfg.pid;
    const d = { k: "kill", killer, victim: this.cfg.pid, w: p.last.w, head: p.last.head, kn: this.nameOf(killer), vn: this.cfg.name, kt: this.teamOf(killer), vt: this.team };
    this.evAll(d);
    this.onKill(d);
    this.fx.burst(p.body.x, p.body.y + 1, p.body.z, TEAM_COLORS[this.team % 4], 14, 4, 0.2, 0.8);
    if (this.mode === "defense") {
      p.waiting = true;
      p.respawnT = 0;
    } else p.respawnT = RULES.respawnTime;
    this.pushState();
  }

  private onKill(d: any) {
    const me = d.killer === this.cfg.pid && d.victim !== this.cfg.pid;
    this.feed.push({ id: this.feedSeq++, t: this.time, killer: d.kn, victim: d.vn, w: WEAPONS[d.w]?.name ?? "", head: !!d.head, kt: d.kt, vt: d.vt, me, died: d.victim === this.cfg.pid });
    if (this.feed.length > 6) this.feed.shift();
    if (me) {
      this.p.kills++;
      if (d.head) this.p.hs++;
      this.killSeq++;
      sfx("kill", 0.8);
    }
    if (this.isHost) {
      const st = this.game.st;
      if (d.killer && d.killer !== d.victim) (st[d.killer] ||= [0, 0])[0]++;
      (st[d.victim] ||= [0, 0])[1]++;
      if (this.mode !== "defense" && d.killer !== d.victim && d.kt !== d.vt && d.kt >= 0 && d.kt < 4) {
        this.game.sc[d.kt]++;
        if (this.game.phase === "play" && this.game.sc[d.kt] >= this.room.score) {
          this.game.phase = "over";
          this.game.win = d.kt;
          this.roundOverT = 10;
          this.hostBanner(`${TEAM_NAMES[d.kt]} 获胜！`, 9);
        }
      }
      this.gameNetT = 0;
    }
  }

  private pushFeedText(t: string) {
    this.feed.push({ id: this.feedSeq++, t: this.time, killer: t, victim: "", w: "", head: false, kt: -1, vt: -1, me: false, died: false });
    if (this.feed.length > 6) this.feed.shift();
  }

  private showBannerLocal(text: string, secs: number) {
    this.banner = text;
    this.bannerT = secs;
  }
  private hostBanner(text: string, secs: number) {
    this.showBannerLocal(text, secs);
    this.evAll({ k: "banner", text, secs });
  }

  // ───────────────────────── 房主逻辑：机器人 / 模式 ─────────────────────────
  private hostInit() {
    const diff = this.room.diff;
    this.botCtx = {
      world: this.world,
      diff,
      respawns: this.mode !== "defense",
      enemies: (b) => this.hostiles(b.ent.team, true),
      hit: (t, dmg, head, from, slow) => {
        if (t.id === this.cfg.pid) this.damageSelf(dmg, head, from.ent.id, from.ent.wpn, from.ent.x, from.ent.z, slow);
        else if (t.isBot) this.bots.get(t.id)?.damage(this.botCtx, dmg, from.ent.id, from.ent.wpn, head);
        else this.net.ev(t.id, { k: "hit", v: t.id, dmg: r2(dmg), head, from: from.ent.id, w: from.ent.wpn, sx: r2(from.ent.x), sz: r2(from.ent.z), slow });
      },
      shotFx: (bot, end) => {
        const e = bot.ent;
        const o = new THREE.Vector3(e.x, e.y + 1.45, e.z);
        const en = new THREE.Vector3(end[0], end[1], end[2]);
        this.fx.tracer(o, en, 0xffb090);
        if (this.shotParity++ % 2 === 0) {
          this.playPos(this.sfxFor(WEAPONS[e.wpn] ?? WEAPONS[0]), e.x, e.z, 0.7);
          this.evAll({ k: "shot", id: e.id, o: [r2(o.x), r2(o.y), r2(o.z)], e: [[r2(end[0]), r2(end[1]), r2(end[2])]], w: e.wpn });
        }
      },
      spawnPoint: (team) => this.pickSpawn(team),
      onKilled: (bot, fromId, w, head) => {
        const e = bot.ent;
        this.setAlive(e, false);
        const d = { k: "kill", killer: fromId, victim: e.id, w, head, kn: this.nameOf(fromId), vn: e.name, kt: this.teamOf(fromId), vt: e.team };
        this.evAll(d);
        this.onKill(d);
        if (this.mode === "defense") this.deadBotAt.set(e.id, this.time);
      },
    };
    this.game.sc = [0, 0, 0, 0];
    if (this.mode !== "defense") {
      const n = this.room.bots;
      for (let t = 0; t < this.teamCount; t++) for (let i = 0; i < n; i++) this.addDmBot(t);
    }
  }

  private addDmBot(team: number) {
    const id = `b${this.botSeq}`;
    const name = `BOT-${BOT_NAMES[this.botSeq % BOT_NAMES.length]}`;
    this.botSeq++;
    const diff = this.room.diff;
    const bot = new Bot(id, name, team, "dm", DM_WEAPONS[Math.floor(Math.random() * DM_WEAPONS.length)], 1, diff === 1 ? 0.75 : diff === 3 ? 1.2 : 1);
    this.bots.set(id, bot);
    this.ents.set(id, bot.ent);
    bot.spawn(this.pickSpawn(team));
  }

  private spawnEnemy(kind: string) {
    const id = `e${this.botSeq++}`;
    const hpMul = 1 + this.wave.n * 0.06;
    const diff = this.room.diff;
    const dmgMul = (diff === 1 ? 0.8 : diff === 3 ? 1.2 : 1) * (1 + this.wave.n * 0.015);
    const defs: Record<string, { wpn: string; name: string }> = {
      normal: { wpn: "knife", name: "行尸" },
      small: { wpn: "knife", name: "爬行幼体" },
      large: { wpn: "knife", name: "巨躯" },
      soldier: { wpn: Math.random() < 0.5 ? "m4a1" : "ak47", name: "丧尸士兵" },
      predator: { wpn: "knife", name: "猎手" },
      acid: { wpn: "mp5", name: "喷酸者" },
      giant: { wpn: "knife", name: "暴君" },
      armored: { wpn: Math.random() < 0.5 ? "rpg" : "hmg", name: "重装丧尸" },
    };
    const d = defs[kind] ?? defs.normal;
    const bot = new Bot(id, d.name, ENEMY_TEAM, kind, d.wpn, hpMul, dmgMul);
    this.bots.set(id, bot);
    this.ents.set(id, bot.ent);
    const c = Math.floor(Math.random() * 4);
    const sp = this.map.enemySpawns[c * 6 + Math.floor(Math.random() * 6)];
    bot.spawn(sp);
  }

  private startWave(n: number) {
    const w = this.wave;
    w.n = n;
    w.state = "fight";
    const diff = this.room.diff;
    const total = Math.min(60, Math.floor((7 + n * 3.2) * (0.8 + 0.2 * diff)));
    const q: string[] = [];
    // 随波次逐步解锁 8 种僵尸
    for (let i = 0; i < total; i++) {
      const r = Math.random();
      let kind = "normal";
      if (n >= 2 && r < 0.2) kind = "small";
      else if (n >= 3 && r < 0.32) kind = "soldier";
      else if (n >= 4 && r < 0.4) kind = "predator";
      else if (n >= 4 && r < 0.47) kind = "acid";
      else if (n >= 5 && r < 0.54) kind = "large";
      else if (n >= 7 && r < 0.58) kind = "armored";
      q.push(kind);
    }
    // 巨型僵尸：第 6 波起每波至少 1 只
    if (n >= 6) q.splice(Math.floor(Math.random() * q.length), 0, "giant");
    w.queue = q;
    w.spawnT = 0;
    this.game.wave = n;
    this.evAll({ k: "revive", restock: n > 1 });
    if (!this.p.alive) this.respawn();
    if (n > 1) this.restock();
    this.hostBanner(`第 ${n} 波 · 敌人数量 ${total + 0}`, 4);
  }

  private defenseUpdate(dt: number) {
    const w = this.wave;
    // 清理尸体
    for (const [id, t] of Array.from(this.deadBotAt)) {
      if (this.time - t > 2.5) {
        this.deadBotAt.delete(id);
        this.bots.delete(id);
        this.removeEnt(id);
      }
    }
    if (this.game.phase === "over") {
      this.roundOverT -= dt;
      if (this.roundOverT <= 0) this.resetRound();
      return;
    }
    let alive = 0;
    for (const b of this.bots.values()) if (b.ent.alive) alive++;
    this.game.en = alive + w.queue.length;
    if (w.state === "break") {
      w.breakT -= dt;
      if (w.breakT <= 0) this.startWave(w.n + 1);
      return;
    }
    w.spawnT -= dt;
    // 同屏僵尸上限：控制性能开销
    const cap = Math.min(26, 12 + w.n * 2);
    if (w.queue.length > 0 && w.spawnT <= 0 && alive < cap) {
      w.spawnT = 0.75;
      this.spawnEnemy(w.queue.shift()!);
    }
    if (w.queue.length === 0 && alive === 0) {
      w.state = "break";
      w.breakT = 10;
      this.hostBanner(`第 ${w.n} 波已清除！10 秒后下一波，倒下的队友将复活`, 5);
    }
    // 全员阵亡
    let humansAlive = this.p.alive ? 1 : 0;
    for (const e of this.ents.values()) if (!e.isBot && e.alive) humansAlive++;
    if (humansAlive === 0) {
      this.game.phase = "over";
      this.roundOverT = 9;
      this.hostBanner(`全军覆没！你们坚持到了第 ${w.n} 波`, 8);
    }
  }

  private resetRound() {
    this.game.sc = [0, 0, 0, 0];
    this.game.st = {};
    this.game.phase = "play";
    this.game.win = -1;
    this.wave.n = 0;
    this.wave.state = "break";
    this.wave.breakT = 5;
    this.wave.queue = [];
    if (this.mode === "defense") {
      for (const id of Array.from(this.bots.keys())) {
        this.bots.delete(id);
        this.removeEnt(id);
      }
      this.deadBotAt.clear();
      this.game.wave = 0;
    } else {
      for (const b of this.bots.values()) {
        b.respawnT = 0.5;
        b.ent.alive = false;
      }
    }
    this.p.kills = this.p.deaths = 0;
    this.evAll({ k: "reset" });
    this.respawn();
    this.hostBanner(this.mode === "defense" ? "新一轮防守开始" : "新的一局开始！", 4);
  }

  private hostUpdate(dt: number) {
    for (const b of this.bots.values()) b.update(dt, this.botCtx);
    this.botNetT -= dt;
    if (this.botNetT <= 0 && this.bots.size > 0) {
      this.botNetT = 0.066;
      const l: any[] = [];
      for (const b of this.bots.values()) {
        const e = b.ent;
        l.push([e.id, r2(e.x), r2(e.y), r2(e.z), r2(e.yaw), r2(e.pitch), e.stance, Math.round(e.hp), e.alive ? 1 : 0, e.wpn, r2(e.speed), e.kind, e.team, e.name]);
      }
      this.net.bots({ t: "bots", l });
    }
    if (this.mode === "defense") this.defenseUpdate(dt);
    else if (this.game.phase === "over") {
      this.roundOverT -= dt;
      if (this.roundOverT <= 0) this.resetRound();
    }
    this.gameNetT -= dt;
    if (this.gameNetT <= 0) {
      this.gameNetT = 0.25;
      this.evAll({ k: "game", sc: this.game.sc, wave: this.game.wave, phase: this.game.phase, en: this.game.en, st: this.game.st, win: this.game.win });
    }
  }

  // ───────────────────────── 主循环 ─────────────────────────
  private loop = (ms: number) => {
    if (this.disposed) return;
    this.raf = requestAnimationFrame(this.loop);
    const now = ms / 1000;
    const dt = Math.min(0.05, Math.max(0.0001, now - this.lastT));
    this.lastT = now;
    this.time += dt;
    this.fpsAcc += dt;
    this.fpsN++;
    if (this.fpsAcc >= 0.5) {
      this.hud.fps = Math.round(this.fpsN / this.fpsAcc);
      this.fpsAcc = 0;
      this.fpsN = 0;
    }
    this.update(dt);
    this.render(dt);
  };

  private update(dt: number) {
    const p = this.p;
    this.updatePlayer(dt);
    this.updateWeapons(dt);
    this.updateProjs(dt);
    this.updateEnts(dt);
    if (this.isHost) this.hostUpdate(dt);
    this.fx.update(dt);
    // 自身实体
    const e = this.selfEnt;
    e.x = p.body.x;
    e.y = p.body.y;
    e.z = p.body.z;
    e.yaw = p.yaw;
    e.stance = p.slide > 0 ? 1 : p.stance;
    e.alive = p.alive;
    e.hp = p.hp;
    // 复活
    if (!p.alive && !p.waiting) {
      p.respawnT -= dt;
      if (p.respawnT <= 0) this.respawn();
    }
    if (p.protect > 0) p.protect -= dt;
    this.dmgFlash = Math.max(0, this.dmgFlash - dt * 1.6);
    this.shake = Math.max(0, this.shake - dt * 2.5);
    if (this.bannerT > 0) this.bannerT -= dt;
    // 网络状态
    this.netT -= dt;
    if (this.netT <= 0) {
      this.netT = 0.05;
      this.pushState();
    }
  }

  private updatePlayer(dt: number) {
    const p = this.p;
    const b = p.body;
    p.slideCd = Math.max(0, p.slideCd - dt);
    p.kickP *= Math.exp(-dt * 9);
    p.kickY *= Math.exp(-dt * 9);
    p.bloom = Math.max(0, p.bloom - dt * 3.2);
    p.vmKick = Math.max(0, p.vmKick - dt * 9);
    p.swing = Math.max(0, p.swing - dt);
    p.flash = Math.max(0, p.flash - dt);
    p.stepOff *= Math.exp(-dt * 10);
    if (!p.alive) {
      b.vx *= 0.9;
      b.vz *= 0.9;
      this.world.moveBody(b, dt);
      p.speed = 0;
      return;
    }
    const w = this.cur();
    const fwd = (this.act("forward") ? 1 : 0) - (this.act("back") ? 1 : 0);
    const str = (this.act("right") ? 1 : 0) - (this.act("left") ? 1 : 0);
    const moving = fwd !== 0 || str !== 0;
    const shift = this.act("sprint");

    // 体力 / 冲刺
    if (p.exhausted && p.stamina >= 15) p.exhausted = false;
    const want = shift && fwd > 0 && p.stance === 0 && p.slide <= 0 && !this.mouseL && p.healT <= 0 && w.reloadT <= 0 && !this.mouseR;
    p.sprinting = want && !p.exhausted && p.stamina > 0 && b.onGround;
    const drain = 100 / RULES.sprintSeconds;
    if (p.sprinting) {
      p.stamina -= drain * dt;
      p.staminaDelay = RULES.staminaRegenDelay;
      if (p.stamina <= 0) {
        p.stamina = 0;
        p.exhausted = true;
        p.sprinting = false;
      }
    } else {
      if (p.slide > 0) p.staminaDelay = RULES.staminaRegenDelay;
      else p.staminaDelay = Math.max(0, p.staminaDelay - dt);
      if (p.staminaDelay <= 0) p.stamina = Math.min(100, p.stamina + drain * RULES.staminaRegenMul * dt);
    }

    // 速度
    let speed = p.stance === 0 ? 5.2 : p.stance === 1 ? 2.8 : 1.4;
    if (p.sprinting) speed = 8.4;
    speed *= w.def.moveMul;
    // 重型三号位武器持握时移速 75%
    if (w.def.weight === "heavy") speed *= RULES.heavyMoveMul;
    if (p.ads > 0.1) speed *= 1 - 0.4 * p.ads;
    if (p.healT > 0) speed *= 0.75;
    if (p.slowT > 0) speed *= 0.55; // 酸液减速

    // 跳跃
    if (this.act("jump") && b.onGround) {
      if (p.stance !== 0) {
        this.setStance(0);
      }
      if (p.stance === 0 || this.world.fits(b.x, b.y + 0.001, b.z, b.hw, HEIGHTS[0])) {
        b.vy = 8.4;
        b.onGround = false;
        if (p.slide > 0) {
          p.slide = 0;
          this.setStance(0);
        }
      }
    }

    const fx = -Math.sin(p.yaw);
    const fz = -Math.cos(p.yaw);
    const rx = Math.cos(p.yaw);
    const rz = -Math.sin(p.yaw);
    let tx = 0;
    let tz = 0;
    if (p.slide > 0) {
      p.slide -= dt;
      const k = Math.max(0, p.slide) / 0.85;
      const sp = 3.2 + 7.6 * k * k;
      b.vx = p.slideX * sp;
      b.vz = p.slideZ * sp;
      if (p.slide <= 0) {
        p.slide = 0;
        // 滑铲结束自动站起（若头顶有空间）
        if (p.stance === 1) this.setStance(0);
      }
    } else {
      if (moving) {
        tx = fx * fwd + rx * str;
        tz = fz * fwd + rz * str;
        const l = Math.hypot(tx, tz);
        tx = (tx / l) * speed;
        tz = (tz / l) * speed;
      }
      const rate = b.onGround ? 13 : 2.6;
      const k = Math.min(1, rate * dt);
      b.vx += (tx - b.vx) * k;
      b.vz += (tz - b.vz) * k;
    }
    const y0 = b.y;
    const wasGround = b.onGround;
    this.world.moveBody(b, dt);
    if (wasGround && b.onGround && b.y - y0 > 0.04 && b.vy <= 0) p.stepOff += b.y - y0;
    p.speed = Math.hypot(b.vx, b.vz);
    if (p.slowT > 0) p.slowT = Math.max(0, p.slowT - dt);
    if (b.onGround) p.bob += p.speed * dt * (p.sprinting ? 1.25 : 1.6);
    const targetEye = EYES[p.slide > 0 ? 1 : p.stance] ;
    p.eye += (targetEye - p.eye) * Math.min(1, dt * 12);

    // 回血道具：每 0.01s 恢复 1 点，持续 2s
    if (p.healT > 0) {
      p.healT -= dt;
      p.healAcc += dt;
      while (p.healAcc >= RULES.healTickEvery) {
        p.healAcc -= RULES.healTickEvery;
        if (p.hp < RULES.maxHp) p.hp += 1;
      }
      if (p.healT <= 0) p.healT = 0;
    }
  }

  private updateWeapons(dt: number) {
    const p = this.p;
    for (const w of p.w) if (w.cd > 0) w.cd -= dt;
    p.fireBuf = Math.max(0, p.fireBuf - dt);
    p.switchT = Math.max(0, p.switchT - dt);
    if (!p.alive) return;
    const w = this.cur();
    const d = w.def;
    if (w.reloadT > 0) {
      w.reloadT -= dt;
      if (w.reloadT <= 0) {
        w.reloadT = 0;
        const need = d.mag - w.mag;
        const take = Math.min(need, w.reserve);
        w.mag += take;
        w.reserve -= take;
      }
    }
    const wantAds = this.mouseR && !p.sprinting && w.reloadT <= 0 && p.healT <= 0 && d.type !== "melee" && p.switchT <= 0 && p.slide <= 0;
    p.ads += ((wantAds ? 1 : 0) - p.ads) * Math.min(1, dt * (d.scope ? 9 : 12));
    if (p.meleeT > 0) {
      p.meleeT -= dt;
      if (p.meleeT <= 0) this.meleeHit();
    }
    const trigger = d.auto ? this.mouseL : p.fireBuf > 0;
    if (trigger && this.locked && p.switchT <= 0 && p.healT <= 0 && w.cd <= 0 && w.reloadT <= 0) {
      if (d.type === "melee") this.meleeAttack();
      else if (w.mag > 0) this.fire();
      else if (w.reserve > 0) this.startReload();
      else if (p.fireBuf > 0 || this.mouseL) {
        sfx("empty", 0.5);
        w.cd = 0.25;
        p.fireBuf = 0;
      }
    }
    if (w.mag === 0 && w.reserve > 0 && w.reloadT <= 0 && d.type !== "melee" && !this.mouseL && p.switchT <= 0) this.startReload();
  }

  // ───────────────────────── 渲染 ─────────────────────────
  private render(dt: number) {
    const r = this.renderer;
    if (!r) return;
    const p = this.p;
    const b = p.body;
    const d = this.cur()?.def;
    const zoom = d ? 1 + (d.zoom - 1) * p.ads : 1;
    const sprintFov = p.sprinting ? 5 : 0;
    this.cam.fov = (78 + sprintFov) / zoom;
    this.cam.updateProjectionMatrix();
    const sh = this.shake;
    let cy = b.y + p.eye - p.stepOff;
    let roll = 0;
    let pitch = p.pitch + p.kickP;
    if (!p.alive) {
      cy = b.y + 0.35;
      roll = 0.7;
      pitch = -0.3;
    }
    this.cam.position.set(b.x + (Math.random() - 0.5) * sh * 0.25, cy + (Math.random() - 0.5) * sh * 0.25, b.z + (Math.random() - 0.5) * sh * 0.25);
    this.cam.rotation.set(clamp(pitch, -1.55, 1.55), p.yaw + p.kickY, roll);
    this.updateViewModel(dt);
    r.clear();
    r.render(this.scene, this.cam);
    if (!(d?.scope && p.ads > 0.92) && p.alive) {
      r.clearDepth();
      r.render(this.vmScene, this.vmCam);
    }
    this.miniT -= dt;
    if (this.miniT <= 0) {
      this.miniT = 0.06;
      this.drawMinimap();
    }
  }

  private updateViewModel(dt: number) {
    const p = this.p;
    this.vmWeapons.forEach((g, i) => (g.visible = i === p.slot && p.alive));
    const g = this.vmWeapons[p.slot];
    if (!g) return;
    const w = this.cur();
    const d = w.def;
    const fl = this.vmFlash[p.slot];
    if (fl) fl.visible = p.flash > 0;
    const ads = p.ads;
    const sf = clamp(p.speed / 6, 0, 1.4);
    const bobX = Math.sin(p.bob) * 0.012 * sf * (1 - ads * 0.85);
    const bobY = Math.abs(Math.cos(p.bob)) * 0.012 * sf * (1 - ads * 0.85);
    let x = 0.22 + (0 - 0.22) * ads + bobX;
    let y = -0.22 + (-0.115 + 0.22) * ads - bobY;
    let z = -0.42 + (-0.33 + 0.42) * ads + p.vmKick * 0.05;
    let rx = p.vmKick * 0.06;
    let ry = 0;
    let rz = 0;
    if (d.cat === "melee") {
      x = 0.26;
      y = -0.26;
      z = -0.5;
      rx = 0.3;
      if (p.swing > 0) {
        const s = 1 - p.swing / 0.3;
        rz = -Math.sin(s * Math.PI) * 1.3;
        rx = 0.3 - Math.sin(s * Math.PI) * 0.7;
        x -= Math.sin(s * Math.PI) * 0.12;
      }
    }
    if (p.sprinting) {
      x -= 0.06;
      y -= 0.06;
      ry = 0.55;
      rx = -0.12;
    }
    if (p.switchT > 0) y -= 0.4 * (p.switchT / 0.4);
    if (w.reloadT > 0) {
      const prog = 1 - w.reloadT / p.reloadTotal;
      const dip = Math.sin(prog * Math.PI);
      y -= 0.14 * dip;
      rx += 0.55 * dip;
      rz += 0.25 * dip;
    }
    if (p.healT > 0) {
      y -= 0.3;
      rx += 0.4;
    }
    g.position.set(x, y, z);
    g.rotation.set(rx, ry, rz);
    void dt;
  }

  private drawMinimap() {
    const cv = this.miniCv;
    if (!cv || !this.miniBase) return;
    const g = cv.getContext("2d");
    if (!g) return;
    const W = cv.width;
    const H = cv.height;
    g.clearRect(0, 0, W, H);
    g.drawImage(this.miniBase, 0, 0, W, H);
    const m = this.map;
    const sx = W / (m.hx * 2);
    const sz = H / (m.hz * 2);
    const dot = (x: number, z: number, c: string, rr: number) => {
      g.fillStyle = c;
      g.beginPath();
      g.arc((x + m.hx) * sx, (z + m.hz) * sz, rr, 0, Math.PI * 2);
      g.fill();
    };
    for (const e of this.ents.values()) {
      if (!e.alive) continue;
      if (e.team === this.team) dot(e.x, e.z, "#" + TEAM_COLORS[e.team % 4].toString(16).padStart(6, "0"), 3);
      else if (this.mode === "defense") dot(e.x, e.z, "#ff3b30", 2.4);
    }
    const b = this.p.body;
    g.save();
    g.translate((b.x + m.hx) * sx, (b.z + m.hz) * sz);
    g.rotate(Math.atan2(-Math.cos(this.p.yaw), -Math.sin(this.p.yaw)));
    g.fillStyle = "#fff";
    g.strokeStyle = "#000";
    g.lineWidth = 1;
    g.beginPath();
    g.moveTo(6, 0);
    g.lineTo(-4, 4);
    g.lineTo(-2, 0);
    g.lineTo(-4, -4);
    g.closePath();
    g.fill();
    g.stroke();
    g.restore();
  }

  attachMinimap(cv: HTMLCanvasElement | null) {
    this.miniCv = cv;
  }

  // ───────────────────────── HUD 快照 ─────────────────────────
  getHud(): HudState {
    const p = this.p;
    const h = this.hud;
    h.status = this.status;
    h.error = this.statusErr;
    h.locked = this.locked;
    h.hp = Math.max(0, Math.ceil(p.hp));
    h.stamina = p.stamina;
    h.exhausted = p.exhausted;
    h.sprinting = p.sprinting;
    h.stance = p.stance;
    h.sliding = p.slide > 0;
    h.slot = p.slot;
    h.weapons = p.w.map((w): WeaponHud => ({ id: w.def.id, name: w.def.name, slot: w.def.slot, cat: w.def.cat, mag: w.mag, reserve: w.reserve, magSize: w.def.mag, reloading: w.reloadT > 0, melee: w.def.type === "melee" }));
    const cw = this.cur();
    h.reloadProg = cw && cw.reloadT > 0 ? 1 - cw.reloadT / p.reloadTotal : 0;
    h.heal = p.healCharges;
    h.healing = p.healT > 0;
    h.healProg = p.healT > 0 ? 1 - p.healT / RULES.healDuration : 0;
    h.alive = p.alive;
    h.respawnIn = Math.max(0, p.respawnT);
    h.waiting = p.waiting;
    h.hitSeq = this.hitSeq;
    h.hitHead = this.hitHead;
    h.killSeq = this.killSeq;
    h.dmgFlash = this.dmgFlash;
    h.dmgAngle = this.dmgAngle;
    h.ads = p.ads > 0.5;
    h.scope = !!cw?.def.scope && p.ads > 0.92 && p.alive;
    h.spread = this.status === "playing" && cw ? this.currentSpread() + p.bloom * 0.6 : 2;
    this.feed = this.feed.filter((f) => this.time - f.t < 7);
    h.feed = this.feed.slice();
    if (this.room) {
      h.mode = this.mode;
      h.mapName = this.map?.name ?? "";
      h.teamCount = this.teamCount;
      h.scoreLimit = this.room.score;
      h.roomId = this.room.id;
    }
    h.myTeam = this.team;
    h.scores = this.game.sc.slice();
    h.wave = this.game.wave;
    h.enemiesLeft = this.game.en;
    h.banner = this.bannerT > 0 ? this.banner : "";
    h.bannerT = this.bannerT;
    h.phase = this.game.phase;
    h.showBoard = this.showBoard;
    h.players = this.players.size;
    h.kills = p.kills;
    h.deaths = p.deaths;
    h.headshots = p.hs;
    h.protect = p.protect > 0;
    h.isHost = this.isHost;
    h.board = this.showBoard ? this.buildBoard() : [];
    return { ...h };
  }

  private buildBoard(): BoardRow[] {
    const rows: BoardRow[] = [];
    const st = this.game.st;
    this.players.forEach((pl, id) => rows.push({ id, name: pl.name, team: id === this.cfg.pid ? this.team : pl.team, k: st[id]?.[0] ?? 0, d: st[id]?.[1] ?? 0, bot: false, me: id === this.cfg.pid }));
    if (this.mode !== "defense") for (const e of this.ents.values()) if (e.isBot) rows.push({ id: e.id, name: e.name, team: e.team, k: st[e.id]?.[0] ?? 0, d: st[e.id]?.[1] ?? 0, bot: true, me: false });
    rows.sort((a, b) => b.k - a.k || a.d - b.d);
    return rows;
  }

  getSessionStats() {
    return { kills: this.p.kills, deaths: this.p.deaths, headshots: this.p.hs, wave: this.game.wave };
  }
}
