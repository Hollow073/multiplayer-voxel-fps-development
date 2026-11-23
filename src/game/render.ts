import * as THREE from "three";
import type { Box } from "./maps";
import type { WeaponDef } from "./weapons";

// ───────── 像素纹理 ─────────
let texCache: THREE.CanvasTexture | null = null;
export function pixelTexture(): THREE.CanvasTexture {
  if (texCache) return texCache;
  const cv = document.createElement("canvas");
  cv.width = cv.height = 16;
  const g = cv.getContext("2d")!;
  let seed = 1234;
  const r = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      const v = 214 + Math.floor(r() * 41);
      g.fillStyle = `rgb(${v},${v},${v})`;
      g.fillRect(x, y, 1, 1);
    }
  }
  // 方块砖缝
  g.fillStyle = "rgba(0,0,0,0.12)";
  g.fillRect(0, 0, 16, 1);
  g.fillRect(0, 8, 16, 1);
  g.fillRect(0, 0, 1, 8);
  g.fillRect(8, 8, 1, 8);
  const t = new THREE.CanvasTexture(cv);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.magFilter = THREE.NearestFilter;
  t.minFilter = THREE.NearestMipmapLinearFilter;
  t.colorSpace = THREE.SRGBColorSpace;
  texCache = t;
  return t;
}

const FACES: { v: number[][]; n: number[]; ua: number; va: number }[] = [
  { n: [1, 0, 0], v: [[1, 0, 1], [1, 0, 0], [1, 1, 0], [1, 1, 1]], ua: 2, va: 1 },
  { n: [-1, 0, 0], v: [[0, 0, 0], [0, 0, 1], [0, 1, 1], [0, 1, 0]], ua: 2, va: 1 },
  { n: [0, 1, 0], v: [[0, 1, 1], [1, 1, 1], [1, 1, 0], [0, 1, 0]], ua: 0, va: 2 },
  { n: [0, -1, 0], v: [[0, 0, 0], [1, 0, 0], [1, 0, 1], [0, 0, 1]], ua: 0, va: 2 },
  { n: [0, 0, 1], v: [[0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]], ua: 0, va: 1 },
  { n: [0, 0, -1], v: [[1, 0, 0], [0, 0, 0], [0, 1, 0], [1, 1, 0]], ua: 0, va: 1 },
];

export function buildWorldMesh(boxes: Box[]): THREE.Mesh {
  const pos: number[] = [];
  const nor: number[] = [];
  const uv: number[] = [];
  const col: number[] = [];
  const idx: number[] = [];
  const c = new THREE.Color();
  let vi = 0;
  boxes.forEach((b, bi) => {
    const h = Math.sin(bi * 12.9898) * 43758.5453;
    const f = 0.93 + 0.14 * (h - Math.floor(h));
    c.setHex(b.c);
    const r = c.r * f;
    const g = c.g * f;
    const bl = c.b * f;
    const mn = [b.x0, b.y0, b.z0];
    const mx = [b.x1, b.y1, b.z1];
    for (const fc of FACES) {
      for (const v of fc.v) {
        const p = [v[0] ? mx[0] : mn[0], v[1] ? mx[1] : mn[1], v[2] ? mx[2] : mn[2]];
        pos.push(p[0], p[1], p[2]);
        nor.push(fc.n[0], fc.n[1], fc.n[2]);
        uv.push(p[fc.ua] * 0.5, p[fc.va] * 0.5);
        col.push(r, g, bl);
      }
      idx.push(vi, vi + 1, vi + 2, vi, vi + 2, vi + 3);
      vi += 4;
    }
  });
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3));
  geo.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
  geo.setIndex(new THREE.BufferAttribute(new Uint32Array(idx), 1));
  geo.computeBoundingSphere();
  const mat = new THREE.MeshLambertMaterial({ map: pixelTexture(), vertexColors: true });
  return new THREE.Mesh(geo, mat);
}

// ───────── 简易材质缓存 ─────────
const matCache = new Map<number, THREE.MeshLambertMaterial>();
export function lmat(color: number): THREE.MeshLambertMaterial {
  let m = matCache.get(color);
  if (!m) {
    m = new THREE.MeshLambertMaterial({ color });
    matCache.set(color, m);
  }
  return m;
}
const boxGeo = new THREE.BoxGeometry(1, 1, 1);
export function bx(w: number, h: number, d: number, x: number, y: number, z: number, color: number, parent?: THREE.Object3D): THREE.Mesh {
  const m = new THREE.Mesh(boxGeo, lmat(color));
  m.scale.set(w, h, d);
  m.position.set(x, y, z);
  if (parent) parent.add(m);
  return m;
}

// ───────── 武器模型 (朝向 -z, 原点在握把附近) ─────────
export function buildGunModel(def: WeaponDef): THREE.Group {
  const g = new THREE.Group();
  const L = def.len;
  const c = def.color;
  const a = def.accent;
  switch (def.cat) {
    case "rifle":
    case "smg": {
      const smg = def.cat === "smg";
      bx(0.06, 0.09, L * 0.55, 0, 0.02, -L * 0.3, c, g);
      bx(0.028, 0.028, L * 0.5, 0, 0.03, -L * 0.78, a, g);
      bx(0.05, 0.1, L * 0.3, 0, -0.01, L * 0.12, c, g);
      bx(0.045, smg ? 0.16 : 0.13, 0.06, 0, -0.1, -L * 0.3, a, g);
      bx(0.04, 0.09, 0.05, 0, -0.08, -L * 0.08, a, g);
      bx(0.03, 0.03, 0.1, 0, 0.075, -L * 0.28, a, g);
      break;
    }
    case "sniper": {
      bx(0.06, 0.09, L * 0.45, 0, 0.02, -L * 0.25, c, g);
      bx(0.024, 0.024, L * 0.62, 0, 0.03, -L * 0.72, a, g);
      bx(0.055, 0.11, L * 0.3, 0, -0.01, L * 0.1, c, g);
      bx(0.055, 0.055, 0.3, 0, 0.11, -L * 0.28, 0x111111, g);
      bx(0.06, 0.06, 0.04, 0, 0.11, -L * 0.28 - 0.17, 0x224466, g);
      bx(0.04, 0.12, 0.05, 0, -0.1, -L * 0.2, a, g);
      break;
    }
    case "shotgun": {
      bx(0.065, 0.08, L * 0.4, 0, 0.02, -L * 0.2, c, g);
      bx(0.035, 0.035, L * 0.62, 0, 0.035, -L * 0.62, a, g);
      bx(0.05, 0.045, 0.2, 0, -0.02, -L * 0.5, c, g);
      bx(0.055, 0.1, L * 0.3, 0, -0.01, L * 0.1, c, g);
      break;
    }
    case "lmg": {
      bx(0.07, 0.1, L * 0.55, 0, 0.02, -L * 0.3, c, g);
      bx(0.03, 0.03, L * 0.5, 0, 0.035, -L * 0.82, a, g);
      bx(0.06, 0.1, L * 0.3, 0, -0.01, L * 0.14, c, g);
      bx(0.12, 0.13, 0.16, 0, -0.12, -L * 0.28, a, g);
      bx(0.02, 0.14, 0.02, 0.05, -0.08, -L * 0.8, a, g);
      bx(0.02, 0.14, 0.02, -0.05, -0.08, -L * 0.8, a, g);
      break;
    }
    case "pistol": {
      bx(0.035, 0.05, L * 0.95, 0, 0.03, -L * 0.45, c, g);
      const gr = bx(0.04, 0.11, 0.055, 0, -0.04, -0.01, a, g);
      gr.rotation.x = -0.15;
      break;
    }
    case "melee": {
      if (def.id === "axe") {
        bx(0.03, 0.03, L, 0, 0, -L * 0.45, def.accent, g);
        bx(0.02, 0.11, 0.15, 0, 0.02, -L * 0.9, def.color, g);
      } else if (def.id === "machete") {
        bx(0.035, 0.035, 0.14, 0, 0, -0.05, a, g);
        bx(0.012, 0.07, L, 0, 0.02, -0.12 - L / 2, c, g);
      } else {
        bx(0.035, 0.035, 0.12, 0, 0, -0.05, a, g);
        bx(0.012, 0.05, L, 0, 0.01, -0.1 - L / 2, c, g);
      }
      break;
    }
    default: {
      if (def.id === "rpg") {
        bx(0.075, 0.075, L * 0.9, 0, 0.03, -L * 0.4, c, g);
        bx(0.13, 0.13, 0.16, 0, 0.03, -L * 0.95, a, g);
        bx(0.1, 0.1, 0.05, 0, 0.03, L * 0.08, a, g);
        bx(0.04, 0.1, 0.05, 0, -0.06, -L * 0.3, a, g);
        bx(0.03, 0.04, 0.12, 0, 0.1, -L * 0.4, a, g);
      } else if (def.id === "hmg") {
        bx(0.09, 0.12, L * 0.5, 0, 0.02, -L * 0.3, c, g);
        bx(0.035, 0.035, L * 0.55, 0, 0.04, -L * 0.8, a, g);
        bx(0.15, 0.14, 0.2, 0.1, -0.1, -L * 0.3, a, g);
        bx(0.07, 0.1, L * 0.25, 0, -0.01, L * 0.12, c, g);
      } else {
        bx(0.07, 0.09, L * 0.5, 0, 0.02, -L * 0.25, c, g);
        bx(0.04, 0.04, L * 0.4, 0, 0.04, -L * 0.7, a, g);
        bx(0.14, 0.14, 0.14, 0, -0.04, -L * 0.28, a, g);
        bx(0.05, 0.1, L * 0.3, 0, -0.01, L * 0.1, c, g);
      }
    }
  }
  g.userData.muzzle = new THREE.Vector3(0, 0.03, -L);
  return g;
}

// ───────── 方块人物 ─────────
export interface AvatarKind {
  torso: number;
  skin: number;
  legs: number;
  helmet: number;
  scale: number;
}
export interface Avatar {
  group: THREE.Group;
  model: THREE.Group;
  // 双腿拆成大腿 / 小腿 / 脚掌，蹲下时用屈膝代替整体压扁
  thighL: THREE.Group;
  thighR: THREE.Group;
  shinL: THREE.Group;
  shinR: THREE.Group;
  footL: THREE.Group;
  footR: THREE.Group;
  upperL: THREE.Group;
  upperR: THREE.Group;
  foreL: THREE.Group;
  foreR: THREE.Group;
  weapon: THREE.Group;
  weaponId: string;
  pack: THREE.Group;
  packId: string;
  tag: THREE.Sprite | null;
  hpBar: THREE.Mesh | null;
  crouchK: number;
  proneK: number;
}

const UPPER = 0.43;
const FORE = 0.42;
const DOWN = new THREE.Vector3(0, -1, 0);
const SHOULDER_R = new THREE.Vector3(0.34, 1.37, 0);
const SHOULDER_L = new THREE.Vector3(-0.34, 1.37, 0);
const HAND_R = new THREE.Vector3(0.12, 1.06, -0.4);
const HAND_L = new THREE.Vector3(0.03, 1.08, -0.72);

function aimSegment(g: THREE.Object3D, from: THREE.Vector3, to: THREE.Vector3) {
  g.position.copy(from);
  const dir = to.clone().sub(from);
  if (dir.lengthSq() < 1e-8) return;
  dir.normalize();
  g.quaternion.setFromUnitVectors(DOWN, dir);
}

// 两骨骼 IK：给定肩、手位置，解出肘部，避免手臂反向或穿模
function solveElbow(shoulder: THREE.Vector3, hand: THREE.Vector3, hint: THREE.Vector3): THREE.Vector3 {
  const delta = hand.clone().sub(shoulder);
  let d = delta.length();
  if (d < 1e-4) return shoulder.clone();
  const maxD = UPPER + FORE - 0.002;
  const minD = Math.abs(UPPER - FORE) + 0.002;
  d = Math.max(minD, Math.min(maxD, d));
  const dir = delta.normalize();
  const a = (UPPER * UPPER - FORE * FORE + d * d) / (2 * d);
  const h = Math.sqrt(Math.max(0, UPPER * UPPER - a * a));
  const perp = hint.clone().addScaledVector(dir, -hint.dot(dir));
  if (perp.lengthSq() < 1e-6) perp.set(0, -1, 0);
  perp.normalize();
  return shoulder.clone().addScaledVector(dir, a).addScaledVector(perp, h);
}

export function makeAvatar(k: AvatarKind): Avatar {
  const group = new THREE.Group();
  const model = new THREE.Group();
  group.add(model);
  // 每条腿：髋关节 → 大腿 → 膝关节 → 小腿 → 踝关节 → 脚掌
  const mkLeg = (x: number) => {
    const thigh = new THREE.Group();
    thigh.position.set(x, 0.75, 0);
    bx(0.27, 0.375, 0.28, 0, -0.1875, 0, k.legs, thigh);
    const shin = new THREE.Group();
    shin.position.set(0, -0.375, 0);
    bx(0.27, 0.255, 0.28, 0, -0.1275, 0, k.legs, shin);
    const foot = new THREE.Group();
    foot.position.set(0, -0.255, 0);
    bx(0.27, 0.12, 0.4, 0, -0.06, -0.06, k.legs, foot);
    shin.add(foot);
    thigh.add(shin);
    model.add(thigh);
    return { thigh, shin, foot };
  };
  const legL = mkLeg(-0.155);
  const legR = mkLeg(0.155);
  bx(0.64, 0.66, 0.34, 0, 1.08, 0, k.torso, model);
  bx(0.66, 0.1, 0.36, 0, 0.78, 0, 0x2b2b2b, model);
  bx(0.42, 0.42, 0.42, 0, 1.62, 0, k.skin, model);
  bx(0.46, 0.15, 0.46, 0, 1.79, 0, k.helmet, model);
  bx(0.3, 0.07, 0.02, 0, 1.64, -0.215, 0x1b1b1b, model);

  // 上臂：从肩部向肘部；前臂：从肘部向手部
  const mkUpper = () => {
    const p = new THREE.Group();
    bx(0.19, UPPER, 0.19, 0, -UPPER / 2, 0, k.torso, p);
    model.add(p);
    return p;
  };
  const mkFore = () => {
    const p = new THREE.Group();
    bx(0.16, FORE, 0.16, 0, -FORE / 2, 0, k.torso, p);
    bx(0.18, 0.15, 0.18, 0, -FORE, 0, k.skin, p);
    model.add(p);
    return p;
  };
  const upperL = mkUpper();
  const upperR = mkUpper();
  const foreL = mkFore();
  const foreR = mkFore();

  const weapon = new THREE.Group();
  weapon.position.copy(HAND_R);
  model.add(weapon);
  const pack = new THREE.Group();
  model.add(pack);
  group.scale.setScalar(k.scale);
  const a: Avatar = {
    group,
    model,
    thighL: legL.thigh,
    shinL: legL.shin,
    footL: legL.foot,
    thighR: legR.thigh,
    shinR: legR.shin,
    footR: legR.foot,
    upperL,
    upperR,
    foreL,
    foreR,
    weapon,
    weaponId: "",
    pack,
    packId: "",
    tag: null,
    hpBar: null,
    crouchK: 0,
    proneK: 0,
  };
  poseArms(a, false, 0);
  return a;
}

// 背包模型：每个功能性背包与 RPG/重机枪弹药背包都有独立外观
export function setAvatarPack(a: Avatar, packId: string) {
  const kind =
    packId === "supply" || packId === "jet" || packId === "teleport" || packId === "ammo_rpg" || packId === "ammo_hmg"
      ? packId
      : "";
  if (a.packId === kind) return;
  a.packId = kind;
  while (a.pack.children.length) a.pack.remove(a.pack.children[0]);
  if (!kind) return;

  const mat = (color: number, emissive = 0) => new THREE.MeshLambertMaterial({ color, emissive });
  const cyl = (r: number, h: number, x: number, y: number, z: number, color: number, parent: THREE.Object3D, emissive = 0) => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 10), mat(color, emissive));
    m.position.set(x, y, z);
    parent.add(m);
    return m;
  };

  if (kind === "supply") {
    // 补给背包：军绿主包 + 三个弹药袋 + 医疗十字
    bx(0.52, 0.56, 0.2, 0, 1.06, 0.27, 0x4a5d3a, a.pack);
    bx(0.54, 0.1, 0.22, 0, 1.36, 0.27, 0x2f3d26, a.pack);
    bx(0.5, 0.07, 0.06, 0, 0.78, 0.36, 0x2b2b2b, a.pack);
    for (let i = -1; i <= 1; i++) {
      bx(0.13, 0.15, 0.1, i * 0.15, 0.94, 0.39, 0x7a6a45, a.pack);
      bx(0.12, 0.03, 0.02, i * 0.15, 1.01, 0.445, 0xd8c7a6, a.pack);
    }
    bx(0.17, 0.055, 0.02, 0, 1.18, 0.39, 0xe74c3c, a.pack);
    bx(0.055, 0.17, 0.02, 0, 1.18, 0.39, 0xe74c3c, a.pack);
    cyl(0.055, 0.3, 0.31, 1.0, 0.3, 0x8d9a6a, a.pack);
  } else if (kind === "jet") {
    // 喷射背包：双筒推进器 + 蓝色喷口
    bx(0.4, 0.48, 0.16, 0, 1.06, 0.27, 0x37474f, a.pack);
    bx(0.46, 0.1, 0.2, 0, 1.34, 0.27, 0x263238, a.pack);
    for (const x of [-0.19, 0.19]) {
      cyl(0.11, 0.52, x, 1.07, 0.34, 0x546e7a, a.pack, 0x0b2734);
      cyl(0.125, 0.09, x, 0.8, 0.34, 0x1f2a30, a.pack);
      const glow = bx(0.035, 0.4, 0.02, x, 1.07, 0.405, 0x38bdf8, a.pack);
      glow.material = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const nozzle = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.16, 8), mat(0x263238));
      nozzle.position.set(x, 0.71, 0.34);
      nozzle.rotation.x = Math.PI;
      a.pack.add(nozzle);
    }
    bx(0.3, 0.06, 0.06, 0, 1.42, 0.27, 0x90a4ae, a.pack);
  } else if (kind === "teleport") {
    // 传送背包：深紫能量核心 + 双环线圈
    bx(0.46, 0.5, 0.16, 0, 1.06, 0.27, 0x3b3352, a.pack);
    bx(0.5, 0.08, 0.2, 0, 1.34, 0.27, 0x241f33, a.pack);
    for (const y of [0.94, 1.18]) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.022, 6, 18), new THREE.MeshBasicMaterial({ color: 0xa78bfa }));
      ring.position.set(0, y, 0.39);
      a.pack.add(ring);
    }
    bx(0.12, 0.2, 0.05, 0, 1.06, 0.39, 0x7c3aed, a.pack);
    const core = bx(0.07, 0.07, 0.03, 0, 1.06, 0.43, 0xe9d5ff, a.pack);
    core.material = new THREE.MeshBasicMaterial({ color: 0xe9d5ff });
    for (const x of [-0.28, 0.28]) cyl(0.035, 0.34, x, 1.05, 0.31, 0x6d5a8a, a.pack);
    bx(0.03, 0.22, 0.03, 0.2, 1.44, 0.29, 0x9f7aea, a.pack);
  } else if (kind === "ammo_rpg") {
    // 火箭弹背包：三枚 RPG 弹头
    bx(0.52, 0.56, 0.2, 0, 1.06, 0.27, 0x3a4030, a.pack);
    bx(0.54, 0.08, 0.22, 0, 1.36, 0.27, 0x262b22, a.pack);
    for (let i = 0; i < 3; i++) {
      const x = (i - 1) * 0.15;
      bx(0.11, 0.11, 0.62, x, 1.12, 0.27, 0x5a6b45, a.pack);
      bx(0.12, 0.12, 0.1, x, 1.12, 0.57, 0xc0392b, a.pack);
    }
    bx(0.5, 0.06, 0.06, 0, 0.88, 0.37, 0x8a6a18, a.pack);
  } else {
    // 重机枪弹链背包
    bx(0.52, 0.56, 0.2, 0, 1.06, 0.27, 0x3a4030, a.pack);
    bx(0.54, 0.08, 0.22, 0, 1.36, 0.27, 0x262b22, a.pack);
    for (let i = 0; i < 7; i++) {
      bx(0.05, 0.09, 0.05, -0.21 + i * 0.07, 0.86, 0.39, 0xc9a227, a.pack);
    }
    bx(0.5, 0.08, 0.06, 0, 0.93, 0.39, 0x8a6a18, a.pack);
    bx(0.14, 0.2, 0.08, 0.25, 1.16, 0.37, 0x5a4a2a, a.pack);
  }
}

export function setAvatarWeapon(a: Avatar, def: WeaponDef) {
  if (a.weaponId === def.id) return;
  a.weaponId = def.id;
  while (a.weapon.children.length) a.weapon.remove(a.weapon.children[0]);
  const m = buildGunModel(def);
  m.scale.setScalar(def.cat === "melee" ? 1.2 : 1.1);
  if (def.cat === "melee") m.rotation.x = 0.5;
  a.weapon.add(m);
}

// 双手持枪姿势：右手握把、左手托护木；近战只用右手
// prone = 0 站立/蹲下，1 趴下：手臂向前伸、枪身放平
function poseArms(a: Avatar, melee: boolean, bob: number, prone = 0) {
  const bobR = new THREE.Vector3(0, bob * 0.4, bob * 0.15);
  const bobL = new THREE.Vector3(0, bob * 0.4, bob * 0.2);
  if (melee) {
    const handR = new THREE.Vector3(0.3, 1.1, -0.3).add(bobR).lerp(new THREE.Vector3(0.24, 1.78, -0.06), prone);
    const handL = new THREE.Vector3(-0.4, 0.98, 0.02).add(bobL).lerp(new THREE.Vector3(-0.12, 2.0, -0.06), prone);
    a.weapon.position.copy(handR);
    a.weapon.rotation.set(0.35 * (1 - prone) + (Math.PI / 2) * prone, 0, 0);
    // 近战：右手持武器，左手自然下垂
    aimSegment(a.upperR, SHOULDER_R, handR);
    const er = solveElbow(SHOULDER_R, handR, new THREE.Vector3(0.8, -0.5, 0));
    aimSegment(a.foreR, er, handR);
    aimSegment(a.upperL, SHOULDER_L, handL);
    const el = solveElbow(SHOULDER_L, handL, new THREE.Vector3(-0.7, -0.6, 0.2));
    aimSegment(a.foreL, el, handL);
    return;
  }
  // 正确的持枪手部位置：右手在握把位置，左手在护木/前部位置
  // 枪模型原点在握把附近，朝向 -Z
  const handR = new THREE.Vector3(0.08, 1.06, -0.35).add(bobR).lerp(new THREE.Vector3(0.22, 1.82, -0.06), prone);
  const handL = new THREE.Vector3(-0.15, 1.02, -0.65).add(bobL).lerp(new THREE.Vector3(-0.05, 2.08, -0.06), prone);
  a.weapon.position.copy(handR);
  a.weapon.rotation.set((Math.PI / 2) * prone, 0, 0);
  // 右臂：上臂指向肘部，前臂指向手（握把）
  const er = solveElbow(SHOULDER_R, handR, new THREE.Vector3(0.6, -0.5, 0));
  aimSegment(a.upperR, SHOULDER_R, er);
  aimSegment(a.foreR, er, handR);
  // 左臂：上臂指向肘部，前臂指向手（护木）
  const el = solveElbow(SHOULDER_L, handL, new THREE.Vector3(-0.4, -0.6, 0.1));
  aimSegment(a.upperL, SHOULDER_L, el);
  aimSegment(a.foreL, el, handL);
}

export function animateAvatar(a: Avatar, phase: number, speed: number, stance: number, dt: number, lerpK = 1, melee = false) {
  const k = Math.min(1, dt * 12 * lerpK);
  // 蹲下 / 趴下分别做平滑过渡，避免姿势瞬间跳变
  a.crouchK = THREE.MathUtils.lerp(a.crouchK, stance === 1 ? 1 : 0, k);
  a.proneK = THREE.MathUtils.lerp(a.proneK, stance === 2 ? 1 : 0, k);
  const pk = a.proneK;
  const ck = a.crouchK * (1 - pk);

  const amp = Math.min(1, speed / 4) * 0.75;
  const s = Math.sin(phase) * amp;
  const swing = s * (1 - pk) * (1 - 0.35 * ck);

  // 蹲下：屈膝下蹲（大腿前摆、小腿回折），身体整体下沉，脚掌保持水平贴地
  const squat = 0.95 * ck;
  a.thighL.rotation.x = squat + swing;
  a.thighR.rotation.x = squat - swing;
  a.shinL.rotation.x = -2 * squat - Math.max(0, -swing) * 0.9;
  a.shinR.rotation.x = -2 * squat - Math.max(0, swing) * 0.9;
  // 脚掌反向旋转，抵消大腿+小腿的角度，始终平放在地面上
  a.footL.rotation.x = -(a.thighL.rotation.x + a.shinL.rotation.x);
  a.footR.rotation.x = -(a.thighR.rotation.x + a.shinR.rotation.x);

  // 趴下：绕身体中部放平，抬高到地面之上，并前后居中
  const m = a.model;
  m.rotation.x = (-Math.PI / 2) * pk;
  m.position.set(0, 0.24 * pk - 0.264 * ck, 0.9 * pk);

  // 持枪时手臂随步伐轻微起伏
  const bob = Math.sin(phase * 2) * 0.012 * amp;
  poseArms(a, melee, bob, pk);
}

const tagCache = new Map<string, THREE.SpriteMaterial>();
export function makeTag(text: string, color: string): THREE.Sprite {
  const key = text + color;
  let mat = tagCache.get(key);
  if (!mat) {
    const cv = document.createElement("canvas");
    cv.width = 256;
    cv.height = 64;
    const g = cv.getContext("2d")!;
    g.font = "bold 30px monospace";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.lineWidth = 6;
    g.strokeStyle = "rgba(0,0,0,0.85)";
    g.strokeText(text, 128, 34);
    g.fillStyle = color;
    g.fillText(text, 128, 34);
    const t = new THREE.CanvasTexture(cv);
    t.colorSpace = THREE.SRGBColorSpace;
    mat = new THREE.SpriteMaterial({ map: t, depthTest: false, transparent: true });
    tagCache.set(key, mat);
  }
  const s = new THREE.Sprite(mat);
  s.scale.set(1.8, 0.45, 1);
  s.position.y = 2.35;
  s.renderOrder = 10;
  return s;
}
