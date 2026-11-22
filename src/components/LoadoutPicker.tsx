"use client";

import { useState } from "react";
import { CATEGORIES, WEAPON_BY_ID, WeaponDef, weaponsOfCat, Loadout, Cat } from "@/game/weapons";

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
          {w.weight && (
            <span className={`text-[10px] px-1.5 py-0.5 rounded ${w.weight === "heavy" ? "bg-red-500/25 text-red-300" : "bg-emerald-500/25 text-emerald-300"}`}>
              {w.weight === "heavy" ? "重型 · 移速75%" : "轻型 · 无惩罚"}
            </span>
          )}
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

export default function LoadoutPicker({ value, onChange }: { value: Loadout; onChange: (l: Loadout) => void }) {
  const [slot, setSlot] = useState<1 | 2 | 3>(1);
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

  return (
    <div>
      <div className="flex gap-2 mb-3">
        {([1, 2, 3] as const).map((s) => {
          const id = s === 1 ? value.primary : s === 2 ? value.secondary : value.heavy;
          return (
            <button
              key={s}
              onClick={() => setSlot(s)}
              className={`flex-1 rounded-md border-2 px-3 py-2 text-left ${slot === s ? "border-amber-400 bg-amber-400/10" : "border-white/10 bg-white/5 hover:border-white/30"}`}
            >
              <div className="text-[10px] text-white/50">
                {s} 号位
                {s === 3 && WEAPON_BY_ID[id]?.weight ? (WEAPON_BY_ID[id].weight === "heavy" ? " · 重型" : " · 轻型") : ""}
              </div>
              <div className="text-sm font-bold text-white truncate">{WEAPON_BY_ID[id]?.name}</div>
            </button>
          );
        })}
      </div>
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
    </div>
  );
}
