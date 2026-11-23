"use client";

import { useState } from "react";
import { CATEGORIES, WEAPON_BY_ID, WeaponDef, weaponsOfCat, Loadout, Cat } from "@/game/weapons";
import {
  GRENADES, BACKPACKS, BACKPACK_BY_ID, GrenadeDef, BackpackDef,
  backpackOccupiedBy, AMMO_BACKPACKS, GRENADE_STOCK,
} from "@/game/equipment";

function norm(w: WeaponDef) {
  const melee = w.type === "melee";
  const dmg = Math.min(1, (w.damage * (w.type === "gun" ? w.pellets : 1)) / (w.type === "gun" ? 130 : 170));
  return [
    { k: "伤害", v: Math.max(0.05, dmg) },
    { k: "射速", v: Math.min(1, w.rpm / 1000) },
    { k: "射程", v: melee ? 0.04 : Math.min(1, w.range / 160) },
    { k: "稳定", v: melee ? 1 : 1 - Math.min(0.95, (w.recoilV + w.recoilH) / 5) },
    { k: "机动", v: Math.max(0.05, Math.min(1, (w.moveMul - 0.55) / 0.6)) },
    { k: "弹容", v: melee ? 0 : Math.min(1, w.mag / 100) },
  ];
}

function WeaponCard({ w, active, onClick }: { w: WeaponDef; active: boolean; onClick: () => void }) {
  const st = norm(w);
  const mode = w.type === "melee" ? "近战" : w.auto ? "全自动" : "半自动";
  return (
    <button
      onClick={onClick}
      className={`text-left rounded-md border-2 p-3 transition-all ${
        active ? "border-amber-400 bg-amber-400/10 shadow-[0_0_0_2px_rgba(251,191,36,0.25)]" : "border-white/10 bg-white/5 hover:border-white/30"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-bold text-white text-sm">{w.name}</span>
        <span className="flex items-center gap-1">
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/70">{mode}</span>
        </span>
      </div>
      <div className="mt-1 text-[11px] text-white/50 line-clamp-1">{w.desc}</div>
      <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1">
        {st.map((s) => (
          <div key={s.k} className="flex items-center gap-1.5">
            <span className="w-6 text-[10px] text-white/50">{s.k}</span>
            <div className="h-1.5 flex-1 bg-white/10 rounded-sm overflow-hidden">
              <div className="h-full bg-amber-400" style={{ width: `${Math.round(s.v * 100)}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 text-[10px] text-white/40">
        {w.type === "melee" ? `伤害 ${w.damage} · 无需弹药` : `${w.pellets > 1 ? `${w.damage}×${w.pellets}` : w.damage} 伤害 · ${w.mag}发 × ${w.mags + 1}`}
        {w.radius > 0 ? ` · 爆炸半径 ${w.radius}m` : ""}
      </div>
    </button>
  );
}

function GrenadeCard({ g, active, onClick }: { g: GrenadeDef; active: boolean; onClick: () => void }) {
  const stat = g.kind === "he"
    ? `伤害 ${g.damage} · 球形半径 ${g.radius}m`
    : g.kind === "smoke"
      ? `直径 ${g.radius * 2}m · 持续 ${g.duration}s · 能见度 0.5m`
      : g.kind === "incendiary"
        ? `直径 ${g.radius * 2}m · 燃烧 ${g.burnTime}s · ${g.burnDps}/s`
        : `直径 ${g.radius * 2}m · 致盲 ${g.blindTime}s`;
  return (
    <button
      onClick={onClick}
      className={`text-left rounded-md border-2 p-3 transition-all ${
        active ? "border-amber-400 bg-amber-400/10 shadow-[0_0_0_2px_rgba(251,191,36,0.25)]" : "border-white/10 bg-white/5 hover:border-white/30"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-bold text-white text-sm">{g.name}</span>
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/70">引信 {g.fuse}s</span>
      </div>
      <div className="mt-1 text-[11px] text-white/50 leading-snug">{g.desc}</div>
      <div className="mt-2 text-[10px] text-white/40">{stat} · 每次出生 {GRENADE_STOCK} 枚</div>
    </button>
  );
}

function BackpackCard({ b, active, onClick, occupied }: { b: BackpackDef; active: boolean; onClick: () => void; occupied: boolean }) {
  const stat = b.kind === "supply" ? `${b.charges} 个补给 · 恢复备弹 / 回血 +2`
    : b.kind === "jet" ? `上升约 5m · 悬浮 4s · ${b.cd}s 冷却`
      : b.kind === "teleport" ? `跃迁约 4m · 可穿越障碍 · ${b.cd}s 冷却`
        : b.desc;
  return (
    <button
      onClick={onClick}
      className={`text-left rounded-md border-2 p-3 transition-all ${
        active ? "border-amber-400 bg-amber-400/10 shadow-[0_0_0_2px_rgba(251,191,36,0.25)]" : "border-white/10 bg-white/5 hover:border-white/30"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-bold text-white text-sm">{b.name}</span>
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/70">E 使用</span>
      </div>
      <div className="mt-1 text-[11px] text-white/50 leading-snug">{b.desc}</div>
      <div className="mt-2 text-[10px] text-white/40">{stat}</div>
      {occupied && <div className="mt-1 text-[10px] text-red-300">当前三号位武器占用了背包位，此背包暂不生效</div>}
    </button>
  );
}

type Slot = 1 | 2 | 3 | 4 | 0; // 0 = 背包

export default function LoadoutPicker({ value, onChange }: { value: Loadout; onChange: (l: Loadout) => void }) {
  const [slot, setSlot] = useState<Slot>(1);
  const cats = CATEGORIES.filter((c) => c.slot === slot);
  const cur1 = WEAPON_BY_ID[value.primary]?.cat ?? "rifle";
  const cur2 = WEAPON_BY_ID[value.secondary]?.cat ?? "pistol";
  const [cat1, setCat1] = useState<Cat>(cur1);
  const [cat2, setCat2] = useState<Cat>(cur2);
  const cat = slot === 1 ? cat1 : slot === 2 ? cat2 : "heavy";
  const info = CATEGORIES.find((c) => c.id === cat);
  const list = weaponsOfCat(cat);
  const selected = slot === 1 ? value.primary : slot === 2 ? value.secondary : value.heavy;

  const pick = (w: WeaponDef) => {
    if (slot === 1) onChange({ ...value, primary: w.id });
    else if (slot === 2) onChange({ ...value, secondary: w.id });
    else onChange({ ...value, heavy: w.id });
  };

  const occupied = backpackOccupiedBy(value.heavy);
  const ammoPack = AMMO_BACKPACKS[value.heavy];
  const effectiveBackpack = occupied ? ammoPack?.name ?? "弹药背包" : BACKPACK_BY_ID[value.backpack]?.name ?? "补给背包";
  const tabs: { s: Slot; label: string; name: string }[] = [
    { s: 1, label: "1 号位", name: WEAPON_BY_ID[value.primary]?.name ?? "" },
    { s: 2, label: "2 号位", name: WEAPON_BY_ID[value.secondary]?.name ?? "" },
    { s: 3, label: "3 号位", name: WEAPON_BY_ID[value.heavy]?.name ?? "" },
    { s: 4, label: "4 号位 · 手雷", name: GRENADES.find((g) => g.id === value.grenade)?.name ?? "手雷" },
    { s: 0, label: "背包位", name: effectiveBackpack },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-3">
        {tabs.map((t) => (
          <button
            key={t.s}
            onClick={() => setSlot(t.s)}
            className={`rounded-md border-2 px-3 py-2 text-left ${slot === t.s ? "border-amber-400 bg-amber-400/10" : "border-white/10 bg-white/5 hover:border-white/30"}`}
          >
            <div className="text-[10px] text-white/50">{t.label}</div>
            <div className="text-sm font-bold text-white truncate">{t.name}</div>
          </button>
        ))}
      </div>

      {slot === 4 ? (
        <div>
          <div className="text-[11px] text-white/45 mb-2">
            按住 <kbd className="px-1 rounded bg-white/10 text-amber-300">G</kbd> 拿住手雷并开始引信计时，松手投出；按太久会在手中自爆。按 4 可切到手雷位。
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {GRENADES.map((g) => (
              <GrenadeCard key={g.id} g={g} active={value.grenade === g.id} onClick={() => onChange({ ...value, grenade: g.id })} />
            ))}
          </div>
        </div>
      ) : slot === 0 ? (
        <div>
          <div className={`text-[11px] mb-2 ${occupied ? "text-red-300" : "text-white/45"}`}>
            {occupied
              ? `三号位「${WEAPON_BY_ID[value.heavy]?.name}」占用背包位：背包将显示为${ammoPack?.name ?? "弹药背包"}，功能性背包暂不生效。`
              : "功能性背包按 E 使用；被 RPG / 重机枪占用时背包会变成对应的弹药库存。"}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {BACKPACKS.map((b) => (
              <BackpackCard key={b.id} b={b} active={value.backpack === b.id} onClick={() => onChange({ ...value, backpack: b.id })} occupied={occupied} />
            ))}
          </div>
        </div>
      ) : (
        <>
          {slot !== 3 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {cats.map((c) => (
                <button
                  key={c.id}
                  disabled={c.locked}
                  onClick={() => (slot === 1 ? setCat1(c.id) : setCat2(c.id))}
                  className={`px-3 py-1 rounded text-xs font-bold border ${
                    c.locked
                      ? "border-dashed border-white/15 text-white/25 cursor-not-allowed"
                      : cat === c.id
                        ? "border-amber-400 bg-amber-400 text-black"
                        : "border-white/15 text-white/70 hover:border-white/40"
                  }`}
                  title={c.desc}
                >
                  {c.name}
                  {c.locked ? " 🔒" : ""}
                </button>
              ))}
            </div>
          )}
          <div className="text-[11px] text-white/45 mb-2">{info?.desc}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
            {list.map((w) => (
              <WeaponCard key={w.id} w={w} active={selected === w.id} onClick={() => pick(w)} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
