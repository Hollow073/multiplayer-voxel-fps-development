import type { Loadout } from "./weapons";
import type { Avatar } from "./render";

export type Mode = "tdm" | "ffa4" | "defense";

export interface GameConfig {
  roomId: string;
  pid: string;
  name: string;
  team: number; // -1 自动
  loadout: Loadout;
}

export interface Ent {
  id: string;
  name: string;
  team: number;
  isBot: boolean;
  kind: string;
  x: number;
  y: number;
  z: number;
  yaw: number;
  pitch: number;
  stance: number;
  scale: number;
  hp: number;
  maxHp: number;
  alive: boolean;
  speed: number;
  wpn: number;
  tx: number;
  ty: number;
  tz: number;
  tyaw: number;
  av: Avatar | null;
  phase: number;
  upd: number;
}

export interface WeaponHud {
  id: string;
  name: string;
  slot: number;
  cat: string;
  mag: number;
  reserve: number;
  magSize: number;
  reloading: boolean;
  melee: boolean;
}
export interface GrenadeHud {
  id: string;
  name: string;
  kind: string;
  count: number;
  maxCount: number;
  fuse: number;
  maxFuse: number;
  holding: boolean;
}
export interface BackpackHud {
  id: string;
  name: string;
  kind: string;
  charges: number;
  maxCharges: number;
  cd: number;
  ready: boolean;
  occupied: boolean;
  ammo: string;
  state: string;
}
export interface FeedItem {
  id: number;
  t: number;
  killer: string;
  victim: string;
  w: string;
  head: boolean;
  kt: number;
  vt: number;
  me: boolean;
  died: boolean;
}
export interface BoardRow {
  id: string;
  name: string;
  team: number;
  k: number;
  d: number;
  bot: boolean;
  me: boolean;
}

export interface HudState {
  status: "connecting" | "playing" | "error";
  error: string;
  locked: boolean;
  hp: number;
  stamina: number;
  exhausted: boolean;
  sprinting: boolean;
  stance: number;
  sliding: boolean;
  slot: number;
  weapons: WeaponHud[];
  reloadProg: number;
  heal: number;
  healing: boolean;
  healProg: number;
  alive: boolean;
  respawnIn: number;
  waiting: boolean;
  hitSeq: number;
  hitHead: boolean;
  killSeq: number;
  dmgFlash: number;
  dmgAngle: number;
  ads: boolean;
  scope: boolean;
  spread: number;
  feed: FeedItem[];
  mode: string;
  mapName: string;
  teamCount: number;
  scores: number[];
  scoreLimit: number;
  myTeam: number;
  wave: number;
  enemiesLeft: number;
  banner: string;
  bannerT: number;
  phase: string;
  board: BoardRow[];
  showBoard: boolean;
  roomId: string;
  players: number;
  fps: number;
  kills: number;
  deaths: number;
  headshots: number;
  protect: boolean;
  protectT: number;
  isHost: boolean;
  grenade: GrenadeHud;
  backpack: BackpackHud;
  burning: number;
  blind: number;
  inSmoke: boolean;
  notice: string;
}
