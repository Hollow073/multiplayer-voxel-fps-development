// 武器数据：一号位(主武器) / 二号位(副武器) / 三号位(重武器)

export type Cat =
  | "rifle"
  | "smg"
  | "sniper"
  | "shotgun"
  | "lmg"
  | "special"
  | "pistol"
  | "melee"
  | "heavy";
export type WType = "gun" | "melee" | "rocket" | "grenade";
// 三号位重量：重型武器持握时移动速度降为 75%，轻型无惩罚
export type Weight = "light" | "heavy";

export interface WeaponDef {
  id: string;
  name: string;
  en: string;
  slot: 1 | 2 | 3;
  cat: Cat;
  type: WType;
  weight?: Weight;
  damage: number; // 单发/单颗弹丸伤害 (爆炸物为中心伤害)
  pellets: number;
  rpm: number;
  auto: boolean;
  mag: number; // 弹匣容量
  mags: number; // 备弹弹匣数
  reload: number; // 换弹时间(s)
  spread: number; // 腰射散布(度)
  adsSpread: number; // 瞄准散布(度)
  recoilV: number;
  recoilH: number;
  range: number; // 伤害开始衰减距离
  maxRange: number; // 最大有效距离
  minMul: number; // 最远处伤害倍率
  moveMul: number;
  zoom: number; // 开镜放大倍数
  scope: boolean;
  radius: number; // 爆炸半径
  speed: number; // 弹体速度
  color: number;
  accent: number;
  len: number; // 模型长度
  desc: string;
}

export const RULES = {
  maxHp: 100,
  headMul: 1.5,
  bodyMul: 1.0,
  healUses: 4,
  healTickEvery: 0.01, // 每 0.01s 恢复 1 点
  healDuration: 2, // 持续 2s
  sprintSeconds: 5, // 满体力持续冲刺 5s
  staminaRegenMul: 3, // 恢复速度为消耗速度的 3 倍（原 1.5 倍的两倍）
  staminaRegenDelay: 0.5, // 停止冲刺/滑铲后 0.5s 才开始恢复
  slideCost: 25, // 滑铲消耗 1/4 体力
  heavyMoveMul: 0.75, // 重型三号位武器持握时的移动速度
  respawnTime: 4,
};

function mk(p: Partial<WeaponDef> & Pick<WeaponDef, "id" | "name" | "en" | "slot" | "cat">): WeaponDef {
  return {
    type: "gun",
    damage: 20,
    pellets: 1,
    rpm: 600,
    auto: true,
    mag: 30,
    mags: 6,
    reload: 2.2,
    spread: 2.5,
    adsSpread: 0.3,
    recoilV: 1,
    recoilH: 0.4,
    range: 40,
    maxRange: 120,
    minMul: 0.7,
    moveMul: 1,
    zoom: 1.35,
    scope: false,
    radius: 0,
    speed: 0,
    color: 0x2b2f36,
    accent: 0x555c66,
    len: 0.8,
    desc: "",
    ...p,
  };
}

export const WEAPONS: WeaponDef[] = [
  // ───────── 步枪 (全自动 / 中距离 / 均衡) ─────────
  mk({ id: "m4a1", name: "M4A1 卡宾枪", en: "M4A1", slot: 1, cat: "rifle", damage: 25, rpm: 750, mag: 30, reload: 2.1, spread: 2.2, adsSpread: 0.25, recoilV: 0.9, recoilH: 0.35, range: 45, maxRange: 130, minMul: 0.7, moveMul: 0.95, zoom: 1.4, color: 0x2d3138, accent: 0x6b7280, len: 0.85, desc: "均衡可靠的标准突击步枪，易于控制。" }),
  mk({ id: "ak47", name: "AK-47 突击步枪", en: "AK-47", slot: 1, cat: "rifle", damage: 31, rpm: 600, mag: 30, reload: 2.5, spread: 2.7, adsSpread: 0.35, recoilV: 1.4, recoilH: 0.6, range: 42, maxRange: 130, minMul: 0.7, moveMul: 0.93, zoom: 1.35, color: 0x4a3322, accent: 0x2b2b2b, len: 0.9, desc: "威力大、后坐力强，需要压枪。" }),
  mk({ id: "famas", name: "FAMAS 无托步枪", en: "FAMAS", slot: 1, cat: "rifle", damage: 22, rpm: 950, mag: 25, reload: 2.2, spread: 2.3, adsSpread: 0.3, recoilV: 0.8, recoilH: 0.3, range: 40, maxRange: 120, minMul: 0.65, moveMul: 0.97, zoom: 1.4, color: 0x3a4a3a, accent: 0x20262b, len: 0.75, desc: "射速极高，适合快速压制。" }),
  mk({ id: "scarh", name: "SCAR-H 战斗步枪", en: "SCAR-H", slot: 1, cat: "rifle", damage: 34, rpm: 520, mag: 20, reload: 2.4, spread: 2.4, adsSpread: 0.25, recoilV: 1.6, recoilH: 0.5, range: 50, maxRange: 150, minMul: 0.75, moveMul: 0.92, zoom: 1.5, color: 0x8a7a55, accent: 0x2b2f36, len: 0.88, desc: "大口径战斗步枪，射程远、单发威力高。" }),

  // ───────── 冲锋枪 (全自动 / 近距离 / 高射速 / 快换弹 / 低后坐) ─────────
  mk({ id: "mp5", name: "MP5 冲锋枪", en: "MP5", slot: 1, cat: "smg", damage: 19, rpm: 800, mag: 30, reload: 1.6, spread: 2.4, adsSpread: 0.6, recoilV: 0.45, recoilH: 0.2, range: 22, maxRange: 75, minMul: 0.5, moveMul: 1.04, zoom: 1.25, color: 0x1f2328, accent: 0x4b5563, len: 0.6, desc: "稳定的近距离冲锋枪。" }),
  mk({ id: "vector", name: "Vector 冲锋枪", en: "Vector", slot: 1, cat: "smg", damage: 16, rpm: 1150, mag: 25, reload: 1.5, spread: 2.8, adsSpread: 0.8, recoilV: 0.5, recoilH: 0.25, range: 18, maxRange: 65, minMul: 0.5, moveMul: 1.05, zoom: 1.2, color: 0x6d5a3a, accent: 0x20242a, len: 0.55, desc: "超高射速，近距离秒杀利器。" }),
  mk({ id: "p90", name: "P90 冲锋枪", en: "P90", slot: 1, cat: "smg", damage: 17, rpm: 900, mag: 50, reload: 2.0, spread: 2.6, adsSpread: 0.7, recoilV: 0.4, recoilH: 0.2, range: 24, maxRange: 80, minMul: 0.55, moveMul: 1.03, zoom: 1.25, color: 0x3b3f46, accent: 0xd97706, len: 0.55, desc: "大容量弹匣，持续火力出色。" }),

  // ───────── 狙击枪 (半自动 / 远距离 / 威力大) ─────────
  mk({ id: "awm", name: "AWM 狙击枪", en: "AWM", slot: 1, cat: "sniper", damage: 105, rpm: 42, auto: false, mag: 5, mags: 5, reload: 3.6, spread: 9, adsSpread: 0.02, recoilV: 3.5, recoilH: 0.4, range: 200, maxRange: 400, minMul: 1, moveMul: 0.85, zoom: 4, scope: true, color: 0x2f4f3a, accent: 0x111111, len: 1.25, desc: "一击毙命的重型狙击枪，射速慢。" }),
  mk({ id: "svd", name: "SVD 半自动狙击枪", en: "SVD", slot: 1, cat: "sniper", damage: 72, rpm: 150, auto: false, mag: 10, mags: 5, reload: 3.2, spread: 7, adsSpread: 0.06, recoilV: 2.4, recoilH: 0.4, range: 150, maxRange: 350, minMul: 0.95, moveMul: 0.9, zoom: 3.2, scope: true, color: 0x5a4632, accent: 0x1a1a1a, len: 1.15, desc: "半自动精确射手步枪，爆头一击致命。" }),

  // ───────── 散弹枪 (近距离 / 散射大) ─────────
  mk({ id: "m870", name: "M870 泵动霰弹枪", en: "M870", slot: 1, cat: "shotgun", damage: 12, pellets: 10, rpm: 70, auto: false, mag: 6, mags: 6, reload: 3.0, spread: 3.2, adsSpread: 2.2, recoilV: 4, recoilH: 0.8, range: 10, maxRange: 32, minMul: 0.2, moveMul: 0.98, zoom: 1.15, color: 0x4b3a2a, accent: 0x303030, len: 0.85, desc: "半自动(泵动)，近距离威力巨大。" }),
  mk({ id: "spas", name: "SPAS-12 战术霰弹枪", en: "SPAS-12", slot: 1, cat: "shotgun", damage: 11, pellets: 9, rpm: 130, auto: false, mag: 8, mags: 5, reload: 3.2, spread: 3.6, adsSpread: 2.5, recoilV: 3, recoilH: 0.7, range: 11, maxRange: 34, minMul: 0.2, moveMul: 0.97, zoom: 1.15, color: 0x2a2a2a, accent: 0x6b7280, len: 0.85, desc: "半自动，连射速度较快。" }),
  mk({ id: "aa12", name: "AA-12 全自动霰弹枪", en: "AA-12", slot: 1, cat: "shotgun", damage: 7.5, pellets: 8, rpm: 300, auto: true, mag: 20, mags: 4, reload: 3.6, spread: 4.2, adsSpread: 3.0, recoilV: 2.2, recoilH: 1, range: 9, maxRange: 30, minMul: 0.2, moveMul: 0.93, zoom: 1.15, color: 0x3a3f2a, accent: 0x202020, len: 0.8, desc: "全自动霰弹枪，泼水般的火力。" }),

  // ───────── 轻机枪 (中远距离 / 大弹容 / 换弹慢 / 高伤害) ─────────
  mk({ id: "m249", name: "M249 SAW", en: "M249", slot: 1, cat: "lmg", damage: 30, rpm: 720, mag: 100, mags: 3, reload: 5.5, spread: 3, adsSpread: 0.9, recoilV: 0.8, recoilH: 0.5, range: 50, maxRange: 140, minMul: 0.7, moveMul: 0.82, zoom: 1.3, color: 0x30343a, accent: 0x4d5a3a, len: 1.0, desc: "100发弹链，持续压制火力。" }),
  mk({ id: "rpk", name: "RPK 轻机枪", en: "RPK", slot: 1, cat: "lmg", damage: 35, rpm: 600, mag: 75, mags: 3, reload: 5.0, spread: 3, adsSpread: 0.7, recoilV: 1.1, recoilH: 0.5, range: 52, maxRange: 150, minMul: 0.7, moveMul: 0.85, zoom: 1.35, color: 0x4a3322, accent: 0x222222, len: 0.98, desc: "伤害较高，精度不错的轻机枪。" }),
  mk({ id: "pkm", name: "PKM 通用机枪", en: "PKM", slot: 1, cat: "lmg", damage: 40, rpm: 640, mag: 100, mags: 3, reload: 6.2, spread: 3.4, adsSpread: 1.0, recoilV: 1.3, recoilH: 0.7, range: 55, maxRange: 160, minMul: 0.7, moveMul: 0.78, zoom: 1.3, color: 0x2b3a2b, accent: 0x15191c, len: 1.05, desc: "高伤害轻机枪，机动性最差。" }),

  // ───────── 二号位：手枪 ─────────
  mk({ id: "m1911", name: "M1911 手枪", en: "M1911", slot: 2, cat: "pistol", damage: 34, rpm: 330, auto: false, mag: 8, mags: 6, reload: 1.5, spread: 2.2, adsSpread: 0.4, recoilV: 1.4, recoilH: 0.3, range: 25, maxRange: 80, minMul: 0.55, moveMul: 1.06, zoom: 1.15, color: 0x555a63, accent: 0x2c2c2c, len: 0.35, desc: "经典.45口径，单发伤害高。" }),
  mk({ id: "g17", name: "G17 手枪", en: "G17", slot: 2, cat: "pistol", damage: 24, rpm: 480, auto: false, mag: 17, mags: 5, reload: 1.6, spread: 2.0, adsSpread: 0.4, recoilV: 0.9, recoilH: 0.25, range: 22, maxRange: 75, minMul: 0.5, moveMul: 1.07, zoom: 1.15, color: 0x25282d, accent: 0x3b3f46, len: 0.33, desc: "弹容大、射速快的半自动手枪。" }),
  mk({ id: "deagle", name: "沙漠之鹰", en: "Desert Eagle", slot: 2, cat: "pistol", damage: 58, rpm: 190, auto: false, mag: 7, mags: 5, reload: 2.0, spread: 2.6, adsSpread: 0.5, recoilV: 3.0, recoilH: 0.6, range: 30, maxRange: 95, minMul: 0.6, moveMul: 1.03, zoom: 1.15, color: 0xb8b8b8, accent: 0x222222, len: 0.4, desc: "手炮级别威力，两发击杀。" }),

  // ───────── 二号位：近战 ─────────
  mk({ id: "knife", name: "战术小刀", en: "Combat Knife", slot: 2, cat: "melee", type: "melee", damage: 55, rpm: 150, auto: true, mag: 0, mags: 0, reload: 0, range: 2.3, maxRange: 2.3, minMul: 1, moveMul: 1.12, color: 0x9aa3ad, accent: 0x1f1f1f, len: 0.4, desc: "轻快迅速，两刀毙命。" }),
  mk({ id: "axe", name: "战斧", en: "Tomahawk", slot: 2, cat: "melee", type: "melee", damage: 78, rpm: 70, auto: true, mag: 0, mags: 0, reload: 0, range: 2.7, maxRange: 2.7, minMul: 1, moveMul: 1.06, color: 0x8b8f96, accent: 0x6b4a2b, len: 0.55, desc: "挥动较慢，但伤害极高。" }),
  mk({ id: "machete", name: "砍刀", en: "Machete", slot: 2, cat: "melee", type: "melee", damage: 65, rpm: 100, auto: true, mag: 0, mags: 0, reload: 0, range: 2.5, maxRange: 2.5, minMul: 1, moveMul: 1.08, color: 0xb0b6bd, accent: 0x2d2d2d, len: 0.55, desc: "速度与威力兼顾的丛林砍刀。" }),

  // ───────── 三号位：重武器 ─────────
  mk({ id: "rpg", name: "RPG-7 火箭筒", en: "RPG-7", slot: 3, cat: "heavy", type: "rocket", weight: "heavy", damage: 170, rpm: 40, auto: false, mag: 1, mags: 3, reload: 3.4, spread: 0.8, adsSpread: 0.1, recoilV: 4, recoilH: 0.5, range: 400, maxRange: 400, minMul: 1, moveMul: 0.75, zoom: 1.5, radius: 7, speed: 42, color: 0x4d5a3a, accent: 0x3a3a3a, len: 1.1, desc: "火箭弹，大范围爆炸伤害。重型：持握时移速 75%。" }),
  mk({ id: "hmg", name: "M2 重机枪", en: "M2HB", slot: 3, cat: "heavy", type: "gun", weight: "heavy", damage: 48, rpm: 480, auto: true, mag: 100, mags: 2, reload: 7.5, spread: 3.6, adsSpread: 1.8, recoilV: 0.9, recoilH: 0.6, range: 70, maxRange: 180, minMul: 0.7, moveMul: 0.75, zoom: 1.25, color: 0x2e3a2e, accent: 0x15181a, len: 1.15, desc: "重型机枪，火力凶猛但极其笨重。重型：持握时移速 75%。" }),
  mk({ id: "gl", name: "M32 榴弹发射器", en: "M32 MGL", slot: 3, cat: "heavy", type: "grenade", weight: "light", damage: 115, rpm: 110, auto: false, mag: 10, mags: 3, reload: 4.5, spread: 1.2, adsSpread: 0.3, recoilV: 3, recoilH: 0.4, range: 300, maxRange: 300, minMul: 1, moveMul: 1, zoom: 1.35, radius: 5, speed: 30, color: 0x3d4a35, accent: 0x222222, len: 0.8, desc: "3个备用弹链，每链10发榴弹。轻型：无移动惩罚。" }),
];

export const WEAPON_BY_ID: Record<string, WeaponDef> = Object.fromEntries(WEAPONS.map((w) => [w.id, w]));
export const WEAPON_INDEX: Record<string, number> = Object.fromEntries(WEAPONS.map((w, i) => [w.id, i]));

export interface CatInfo {
  id: Cat;
  name: string;
  slot: 1 | 2 | 3;
  locked?: boolean;
  desc: string;
}

export const CATEGORIES: CatInfo[] = [
  { id: "rifle", name: "突击步枪", slot: 1, desc: "全自动 · 中距离 · 属性均衡" },
  { id: "smg", name: "冲锋枪", slot: 1, desc: "全自动 · 近距离 · 高射速 · 快换弹" },
  { id: "sniper", name: "狙击枪", slot: 1, desc: "半自动 · 远距离 · 威力大" },
  { id: "shotgun", name: "散弹枪", slot: 1, desc: "近距离 · 威力大 · 散射高" },
  { id: "lmg", name: "轻机枪", slot: 1, desc: "中远距离 · 大弹容 · 换弹慢" },
  { id: "special", name: "特殊武器", slot: 1, locked: true, desc: "预留位置 · 敬请期待" },
  { id: "pistol", name: "远程武器 (手枪)", slot: 2, desc: "半自动 · 切枪迅速" },
  { id: "melee", name: "近战武器", slot: 2, desc: "无需弹药 · 近距离致命" },
  { id: "heavy", name: "重武器", slot: 3, desc: "RPG / 重机枪（重型，持握移速 75%）· 榴弹发射器（轻型，无惩罚）" },
];

export function weaponsOfCat(cat: Cat): WeaponDef[] {
  return WEAPONS.filter((w) => w.cat === cat);
}

export interface Loadout {
  primary: string;
  secondary: string;
  heavy: string;
}

export const DEFAULT_LOADOUT: Loadout = { primary: "m4a1", secondary: "m1911", heavy: "rpg" };

export function sanitizeLoadout(l: Partial<Loadout> | null | undefined): Loadout {
  const p = l?.primary && WEAPON_BY_ID[l.primary]?.slot === 1 ? l.primary : DEFAULT_LOADOUT.primary;
  const s = l?.secondary && WEAPON_BY_ID[l.secondary]?.slot === 2 ? l.secondary : DEFAULT_LOADOUT.secondary;
  const h = l?.heavy && WEAPON_BY_ID[l.heavy]?.slot === 3 ? l.heavy : DEFAULT_LOADOUT.heavy;
  return { primary: p, secondary: s, heavy: h };
}

export const TEAM_COLORS = [0xe74c3c, 0x3b82f6, 0x22c55e, 0xeab308];
export const TEAM_NAMES = ["红队", "蓝队", "绿队", "黄队"];
export const TEAM_CSS = ["#ef4444", "#3b82f6", "#22c55e", "#eab308"];
