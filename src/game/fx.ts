import * as THREE from "three";

interface Part {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  life: number;
  max: number;
  size: number;
  r: number;
  g: number;
  b: number;
  grav: number;
}

const MAXP = 1000;

export class Fx {
  tracers: { m: THREE.Mesh; life: number; max: number }[] = [];
  parts: Part[] = [];
  inst: THREE.InstancedMesh;
  booms: { m: THREE.Mesh; t: number; r: number }[] = [];
  private dummy = new THREE.Object3D();
  private col = new THREE.Color();
  private sphere = new THREE.IcosahedronGeometry(1, 1);
  private box = new THREE.BoxGeometry(1, 1, 1);

  constructor(private scene: THREE.Scene) {
    for (let i = 0; i < 40; i++) {
      const m = new THREE.Mesh(this.box, new THREE.MeshBasicMaterial({ color: 0xffe9a0, transparent: true, opacity: 0.9 }));
      m.visible = false;
      scene.add(m);
      this.tracers.push({ m, life: 0, max: 0.06 });
    }
    this.inst = new THREE.InstancedMesh(this.box, new THREE.MeshBasicMaterial({ color: 0xffffff }), MAXP);
    this.inst.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(MAXP * 3), 3);
    this.inst.frustumCulled = false;
    this.inst.count = 0;
    scene.add(this.inst);
  }

  tracer(a: THREE.Vector3, b: THREE.Vector3, color = 0xffe9a0, life = 0.07) {
    let t = this.tracers.find((q) => q.life <= 0);
    if (!t) t = this.tracers[0];
    const len = a.distanceTo(b);
    if (len < 0.5) return;
    t.life = t.max = life;
    t.m.visible = true;
    t.m.position.copy(a).add(b).multiplyScalar(0.5);
    t.m.scale.set(0.025, 0.025, len);
    t.m.lookAt(b);
    (t.m.material as THREE.MeshBasicMaterial).color.setHex(color);
  }

  burst(x: number, y: number, z: number, color: number, n: number, speed: number, size: number, life: number, grav = 14) {
    this.col.setHex(color);
    for (let i = 0; i < n; i++) {
      if (this.parts.length >= MAXP) this.parts.shift();
      const a = Math.random() * Math.PI * 2;
      const u = Math.random() * 2 - 1;
      const s = speed * (0.4 + Math.random() * 0.6);
      const k = 0.85 + Math.random() * 0.3;
      this.parts.push({
        x, y, z,
        vx: Math.cos(a) * Math.sqrt(1 - u * u) * s,
        vy: u * s * 0.8 + speed * 0.3,
        vz: Math.sin(a) * Math.sqrt(1 - u * u) * s,
        life: life * (0.6 + Math.random() * 0.6),
        max: life,
        size: size * (0.6 + Math.random() * 0.8),
        r: this.col.r * k, g: this.col.g * k, b: this.col.b * k,
        grav,
      });
    }
  }

  explosion(x: number, y: number, z: number, r: number) {
    const m = new THREE.Mesh(this.sphere, new THREE.MeshBasicMaterial({ color: 0xffa030, transparent: true, opacity: 0.9 }));
    m.position.set(x, y, z);
    m.scale.setScalar(r * 0.2);
    this.scene.add(m);
    this.booms.push({ m, t: 0, r });
    const n = Math.floor(18 + r * 5);
    this.burst(x, y, z, 0xff7a1a, n, r * 2.2, 0.35, 0.7, 6);
    this.burst(x, y, z, 0xffd34a, Math.floor(n * 0.6), r * 1.6, 0.28, 0.5, 4);
    this.burst(x, y + 0.5, z, 0x555555, Math.floor(n * 0.7), r * 1.0, 0.5, 1.3, -1.5);
  }

  update(dt: number) {
    for (const t of this.tracers) {
      if (t.life > 0) {
        t.life -= dt;
        if (t.life <= 0) t.m.visible = false;
        else (t.m.material as THREE.MeshBasicMaterial).opacity = (t.life / t.max) * 0.9;
      }
    }
    for (let i = this.booms.length - 1; i >= 0; i--) {
      const b = this.booms[i];
      b.t += dt;
      const k = b.t / 0.4;
      if (k >= 1) {
        this.scene.remove(b.m);
        (b.m.material as THREE.Material).dispose();
        this.booms.splice(i, 1);
        continue;
      }
      b.m.scale.setScalar(b.r * (0.2 + 0.8 * Math.sqrt(k)));
      (b.m.material as THREE.MeshBasicMaterial).opacity = 0.9 * (1 - k);
    }
    let n = 0;
    for (let i = this.parts.length - 1; i >= 0; i--) {
      const p = this.parts[i];
      p.life -= dt;
      if (p.life <= 0) {
        this.parts[i] = this.parts[this.parts.length - 1];
        this.parts.pop();
        continue;
      }
      p.vy -= p.grav * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.z += p.vz * dt;
      if (p.y < 0.03) {
        p.y = 0.03;
        p.vy *= -0.3;
        p.vx *= 0.7;
        p.vz *= 0.7;
      }
    }
    for (const p of this.parts) {
      const s = p.size * Math.min(1, (p.life / p.max) * 2);
      this.dummy.position.set(p.x, p.y, p.z);
      this.dummy.scale.setScalar(s);
      this.dummy.updateMatrix();
      this.inst.setMatrixAt(n, this.dummy.matrix);
      this.col.setRGB(p.r, p.g, p.b);
      this.inst.setColorAt(n, this.col);
      n++;
    }
    this.inst.count = n;
    this.inst.instanceMatrix.needsUpdate = true;
    if (this.inst.instanceColor) this.inst.instanceColor.needsUpdate = true;
  }
}
