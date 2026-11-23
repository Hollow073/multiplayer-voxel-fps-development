// 程序化音效 (WebAudio)，无需任何外部资源
let ctx: AudioContext | null = null;
let noiseBuf: AudioBuffer | null = null;
let master: GainNode | null = null;

export function initAudio() {
  if (typeof window === "undefined") return;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.5;
    master.connect(ctx.destination);
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  if (ctx.state === "suspended") ctx.resume();
}

export function setVolume(v: number) {
  if (master) master.gain.value = v;
}

function burst(dur: number, freq: number, q: number, gain: number, type: BiquadFilterType = "lowpass", thump = 0) {
  if (!ctx || !noiseBuf || !master) return;
  const t = ctx.currentTime;
  const src = ctx.createBufferSource();
  src.buffer = noiseBuf;
  src.playbackRate.value = 0.8 + Math.random() * 0.4;
  const f = ctx.createBiquadFilter();
  f.type = type;
  f.frequency.value = freq;
  f.Q.value = q;
  const g = ctx.createGain();
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  src.connect(f).connect(g).connect(master);
  src.start(t, Math.random() * 0.5, dur + 0.05);
  if (thump > 0) {
    const o = ctx.createOscillator();
    const og = ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(thump, t);
    o.frequency.exponentialRampToValueAtTime(30, t + dur);
    og.gain.setValueAtTime(gain * 0.9, t);
    og.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(og).connect(master);
    o.start(t);
    o.stop(t + dur + 0.05);
  }
}

function tone(freq: number, dur: number, gain: number, type: OscillatorType = "square", slideTo = 0) {
  if (!ctx || !master) return;
  const t = ctx.currentTime;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  o.connect(g).connect(master);
  o.start(t);
  o.stop(t + dur + 0.02);
}

export type Sfx =
  | "rifle" | "smg" | "sniper" | "shotgun" | "pistol" | "lmg" | "heavy" | "rocket"
  | "boom" | "hit" | "head" | "reload" | "melee" | "hurt" | "heal" | "empty" | "switch" | "kill" | "flash";

export function sfx(name: Sfx, vol = 1) {
  if (!ctx) return;
  const v = Math.max(0, Math.min(1, vol));
  if (v < 0.02) return;
  switch (name) {
    case "rifle": burst(0.16, 2600, 0.7, 0.8 * v, "lowpass", 140); break;
    case "smg": burst(0.1, 3400, 0.7, 0.55 * v, "lowpass", 180); break;
    case "pistol": burst(0.12, 3000, 0.9, 0.6 * v, "lowpass", 200); break;
    case "sniper": burst(0.5, 1500, 0.6, 1.0 * v, "lowpass", 90); break;
    case "shotgun": burst(0.32, 1400, 0.5, 1.0 * v, "lowpass", 100); break;
    case "lmg": burst(0.14, 2000, 0.6, 0.85 * v, "lowpass", 110); break;
    case "heavy": burst(0.2, 1200, 0.5, 1.0 * v, "lowpass", 70); break;
    case "rocket": burst(0.5, 900, 0.5, 0.8 * v, "lowpass", 60); break;
    case "boom": burst(1.1, 520, 0.4, 1.2 * v, "lowpass", 55); break;
    case "hit": tone(1200, 0.06, 0.25 * v, "square"); break;
    case "head": tone(1800, 0.09, 0.3 * v, "square"); tone(2400, 0.07, 0.2 * v, "triangle"); break;
    case "kill": tone(900, 0.12, 0.3 * v, "square", 1800); break;
    case "reload": burst(0.05, 4000, 2, 0.4 * v, "bandpass"); setTimeout(() => burst(0.06, 2500, 2, 0.4 * v, "bandpass"), 220); break;
    case "melee": burst(0.12, 1800, 1, 0.5 * v, "bandpass"); break;
    case "hurt": tone(160, 0.18, 0.35 * v, "sawtooth", 80); break;
    case "heal": tone(500, 0.3, 0.2 * v, "sine", 900); break;
    case "empty": tone(300, 0.04, 0.2 * v, "square"); break;
    case "switch": burst(0.06, 3000, 1.5, 0.3 * v, "bandpass"); break;
    case "flash": tone(2600, 0.5, 0.5 * v, "sine", 240); burst(0.35, 6000, 0.8, 0.5 * v, "highpass"); break;
  }
}
