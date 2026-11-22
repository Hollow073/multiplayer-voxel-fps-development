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
  legL: THREE.Group;
  legR: THREE.Group;
  upperL: THREE.Group;
  upperR: THREE.Group;
  foreL: THREE.Group;
  foreR: THREE.Group;
  weapon: THREE.Group;
  weaponId: string;
  tag: THREE.Sprite | null;
  hpBar: THREE.Mesh | null;
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
  const mkLeg = (x: number) => {
    const p = new THREE.Group();
    p.position.set(x, 0.75, 0);
    bx(0.27, 0.75, 0.28, 0, -0.375, 0, k.legs, p);
    model.add(p);
    return p;
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
  group.scale.setScalar(k.scale);
  const a: Avatar = { group, model, legL, legR, upperL, upperR, foreL, foreR, weapon, weaponId: "", tag: null, hpBar: null };
  poseArms(a, false, 0);
  return a;
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
function poseArms(a: Avatar, melee: boolean, bob: number) {
  if (melee) {
    a.weapon.position.set(0.3, 1.1, -0.3);
    a.weapon.rotation.set(0.35, 0, 0);
    // 近战：右手持武器，左手自然下垂
    const handR = new THREE.Vector3(0.3, 1.1, -0.3).add(new THREE.Vector3(0, bob * 0.4, bob * 0.15));
    const handL = new THREE.Vector3(-0.4, 0.98, 0.02).add(new THREE.Vector3(0, bob * 0.4, bob * 0.2));
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
  const handR = new THREE.Vector3(0.08, 1.06, -0.35).add(new THREE.Vector3(0, bob * 0.4, bob * 0.15));
  const handL = new THREE.Vector3(-0.15, 1.02, -0.65).add(new THREE.Vector3(0, bob * 0.4, bob * 0.2));
  a.weapon.position.copy(handR);
  a.weapon.rotation.set(0, 0, 0);
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
  const amp = Math.min(1, speed / 4) * 0.9;
  const s = Math.sin(phase) * amp;
  a.legL.rotation.x = s;
  a.legR.rotation.x = -s;
  const m = a.model;
  if (stance === 2) {
    m.rotation.x = THREE.MathUtils.lerp(m.rotation.x, -Math.PI / 2, Math.min(1, dt * 12 * lerpK));
    m.position.set(0, 0.04, 0.9);
    m.scale.y = 1;
  } else {
    m.rotation.x = THREE.MathUtils.lerp(m.rotation.x, 0, Math.min(1, dt * 12 * lerpK));
    m.position.set(0, 0, 0);
    m.scale.y = THREE.MathUtils.lerp(m.scale.y, stance === 0 ? 1 : 0.72, Math.min(1, dt * 12 * lerpK));
  }
  // 持枪时手臂随步伐轻微起伏
  const bob = Math.sin(phase * 2) * 0.012 * amp;
  poseArms(a, melee, bob);
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
