// 四号位：手雷；背包位：功能性背包 / 三号位重武器的弹药背包
// 这里只放数据和纯函数，真正的投掷、计时、伤害逻辑在 engine.ts 中。

export type GrenadeKind = "he" | "smoke" | "incendiary" | "flash";

export interface GrenadeDef {
  id: string;
  kind: GrenadeKind;
  name: string;
  en: string;
  damage: number; // 高爆雷在球形范围内造成的固定伤害
  radius: number; // 球形效果半径 (m)
  fuse: number; // 引信时间(s)：按住 G 时从拿住瞬间开始计时
  duration: number; // 烟雾 / 燃烧地面的持续时间(s)
  burnTime: number; // 燃烧状态持续时间(s)
  burnDps: number; // 燃烧状态每秒伤害
  blindTime: number; // 致盲持续时间(s)
  color: number;
  accent: number;
  desc: string;
}

export const GRENADES: GrenadeDef[] = [
  {
    id: "he",
    kind: "he",
    name: "高爆手雷",
    en: "HE Grenade",
    damage: 70,
    radius: 12, // 直径约 24m；一半半径内满伤，向外线性衰减
    fuse: 3,
    duration: 0,
    burnTime: 0,
    burnDps: 0,
    blindTime: 0,
    color: 0x3f4a32,
    accent: 0xd97706,
    desc: "24m 直径球形爆炸：中心 6m 内 70 点满伤，向外逐渐衰减至 0。",
  },
  {
    id: "smoke",
    kind: "smoke",
    name: "烟雾弹",
    en: "Smoke Grenade",
    damage: 0,
    radius: 16, // 直径约 32m
    fuse: 2.5,
    duration: 10,
    burnTime: 0,
    burnDps: 0,
    blindTime: 0,
    color: 0x59636b,
    accent: 0xbfc8cf,
    desc: "释放 32m 直径的浓密烟雾，持续 10s；无论身处烟雾内外都无法透视，无伤害。",
  },
  {
    id: "incendiary",
    kind: "incendiary",
    name: "燃烧弹",
    en: "Incendiary",
    damage: 0,
    radius: 6, // 直径约 12m
    fuse: 3,
    duration: 7,
    burnTime: 4,
    burnDps: 10,
    blindTime: 0,
    color: 0x7a2a12,
    accent: 0xff7a1a,
    desc: "在地面形成直径 12m 的燃烧区，踩在上面的角色燃烧 4s，每秒 10 点伤害，停留会刷新。",
  },
  {
    id: "flash",
    kind: "flash",
    name: "闪光弹",
    en: "Flashbang",
    damage: 0,
    radius: 30, // 直径 60m
    fuse: 2,
    duration: 0,
    burnTime: 0,
    burnDps: 0,
    blindTime: 3,
    color: 0x8a8f96,
    accent: 0xfff7cc,
    desc: "爆炸后 60m 直径内、视角中能看到闪光弹的角色致盲 3s（仅白屏，UI 正常），无伤害。",
  },
];

export const GRENADE_BY_ID: Record<string, GrenadeDef> = Object.fromEntries(GRENADES.map((g) => [g.id, g]));
export const GRENADE_INDEX: Record<string, number> = Object.fromEntries(GRENADES.map((g, i) => [g.id, i]));
export const DEFAULT_GRENADE = "he";
export const GRENADE_STOCK = 2; // 每次出生携带的手雷数量

// 爆炸 / 燃烧等来源在击杀信息里的武器编号：>= 100 表示手雷
export const GRENADE_W_BASE = 100;
export function grenadeW(idx: number): number {
  return GRENADE_W_BASE + idx;
}
export function grenadeFromW(w: number): GrenadeDef | null {
  if (w < GRENADE_W_BASE || w >= GRENADE_W_BASE + GRENADES.length) return null;
  return GRENADES[w - GRENADE_W_BASE];
}

export type BackpackKind = "supply" | "jet" | "teleport" | "ammo";

export interface BackpackDef {
  id: string;
  name: string;
  en: string;
  kind: BackpackKind;
  charges: number;
  cd: number;
  color: number;
  accent: number;
  desc: string;
}

export const BACKPACKS: BackpackDef[] = [
  {
    id: "supply",
    name: "补给背包",
    en: "Supply Pack",
    kind: "supply",
    charges: 4,
    cd: 0.8,
    color: 0x4a5d3a,
    accent: 0xfacc15,
    desc: "4 个补给：每个把全部武器备弹恢复至初始值，并补充 2 次回血道具。按 E 使用。",
  },
  {
    id: "jet",
    name: "喷射背包",
    en: "Jet Pack",
    kind: "jet",
    charges: 0,
    cd: 15,
    color: 0x37474f,
    accent: 0x38bdf8,
    desc: "按 E 快速上升约 5m 并悬浮 4s；落地后开始计算 15s 冷却。",
  },
  {
    id: "teleport",
    name: "传送背包",
    en: "Teleport Pack",
    kind: "teleport",
    charges: 0,
    cd: 15,
    color: 0x3b3352,
    accent: 0xa78bfa,
    desc: "按 E 沿视角方向跃迁约 20m，可穿越障碍；会自动寻找不会卡墙的落点。15s 冷却。",
  },
];

export const BACKPACK_BY_ID: Record<string, BackpackDef> = Object.fromEntries(BACKPACKS.map((b) => [b.id, b]));
export const DEFAULT_BACKPACK = "supply";

// 三号位中会占用背包位的重武器：背包变成它们的弹药库存
export const AMMO_BACKPACKS: Record<string, BackpackDef> = {
  rpg: {
    id: "ammo_rpg",
    name: "火箭弹背包",
    en: "Rocket Rack",
    kind: "ammo",
    charges: 0,
    cd: 0,
    color: 0x4d5a3a,
    accent: 0xd97706,
    desc: "RPG-7 已占用背包位：背包是火箭弹库存（仅做外观展示，不实时更新数量），无法使用功能性背包。",
  },
  hmg: {
    id: "ammo_hmg",
    name: "弹链背包",
    en: "Ammo Belt",
    kind: "ammo",
    charges: 0,
    cd: 0,
    color: 0x2e3a2e,
    accent: 0xb45309,
    desc: "重机枪已占用背包位：背包是链式弹药库存（仅做外观展示，不实时更新数量），无法使用功能性背包。",
  },
};

export function backpackOccupiedBy(heavyId: string): boolean {
  return !!AMMO_BACKPACKS[heavyId];
}

// 最终生效的背包：RPG/重机枪会覆盖功能性背包
export function resolveBackpack(heavyId: string, chosenId: string | null | undefined): BackpackDef {
  if (AMMO_BACKPACKS[heavyId]) return AMMO_BACKPACKS[heavyId];
  return BACKPACK_BY_ID[chosenId ?? ""] ?? BACKPACK_BY_ID[DEFAULT_BACKPACK];
}

export const JET_RISE = 5; // m
export const JET_HOVER = 4; // s
export const TELEPORT_DIST = 20; // m
