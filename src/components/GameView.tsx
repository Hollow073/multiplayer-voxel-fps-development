"use client";

import { useEffect, useRef, useState } from "react";
import { Game } from "@/game/engine";
import type { GameConfig, HudState } from "@/game/types";
import { Loadout, RULES, TEAM_CSS, TEAM_NAMES } from "@/game/weapons";
import { codeLabel, KeyBinds, loadBinds } from "@/game/keybinds";
import LoadoutPicker from "./LoadoutPicker";

const STANCE = ["站立", "蹲下", "趴下"];

function helpList(b: KeyBinds): [string, string][] {
  return [
    [`${codeLabel(b.forward)} ${codeLabel(b.back)} ${codeLabel(b.left)} ${codeLabel(b.right)}`, "移动"],
    [codeLabel(b.jump), "跳跃"],
    [codeLabel(b.sprint), "冲刺 (体力 5 秒)"],
    [codeLabel(b.crouch), "蹲下"],
    [codeLabel(b.prone), "趴下"],
    [`${codeLabel(b.sprint)} + ${codeLabel(b.crouch)}`, "滑铲 (消耗 25 体力)"],
    ["左键 / 右键", "开火 / 瞄准"],
    [codeLabel(b.reload), "换弹"],
    [`${codeLabel(b.slot1)} / ${codeLabel(b.slot2)} / ${codeLabel(b.slot3)}`, "切换武器"],
    [codeLabel(b.heal), "使用回血道具"],
    [codeLabel(b.scoreboard), "计分板"],
    ["Esc", "暂停 / 菜单"],
  ];
}

export default function GameView({ cfg, onExit, onLoadoutChange }: { cfg: GameConfig; onExit: (reason?: string) => void; onLoadoutChange: (l: Loadout) => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const mini = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game | null>(null);
  const sentRef = useRef(false);
  const [hud, setHud] = useState<HudState | null>(null);
  const [loadout, setLoadout] = useState<Loadout>(cfg.loadout);
  const [tab, setTab] = useState<"main" | "loadout" | "team">("main");
  const [binds] = useState<KeyBinds>(() => loadBinds());

  const finish = () => {
    if (sentRef.current || !gameRef.current) return;
    sentRef.current = true;
    const s = gameRef.current.getSessionStats();
    try {
      fetch("/api/stats", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: cfg.name, ...s }), keepalive: true }).catch(() => {});
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    const g = new Game(wrap.current!, cfg);
    gameRef.current = g;
    if (process.env.NODE_ENV !== "production") {
      (window as unknown as { __bsGame?: Game }).__bsGame = g;
    }
    g.start();
    g.attachMinimap(mini.current);
    const id = setInterval(() => setHud(g.getHud()), 33);
    const onHide = () => {
      finish();
      g.dispose();
    };
    window.addEventListener("pagehide", onHide);
    return () => {
      clearInterval(id);
      window.removeEventListener("pagehide", onHide);
      finish();
      g.dispose();
      gameRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const leave = () => {
    finish();
    onExit();
  };

  const h = hud;
  const playing = h?.status === "playing";
  const showMenu = playing && !h.locked;
  const lowHp = h ? h.hp <= 30 : false;
  const gap = h ? Math.max(4, Math.min(70, 4 + h.spread * 4.5)) : 8;
  const cw = h?.weapons[h.slot];

  return (
    <div className="fixed inset-0 bg-black select-none overflow-hidden">
      <div ref={wrap} className="absolute inset-0" />

      {/* 小地图 */}
      <div className="absolute left-3 top-3 pointer-events-none">
        <div className="rounded-md border-2 border-white/30 bg-black/40 p-1 backdrop-blur-sm">
          <canvas ref={mini} width={190} height={190} className="block" style={{ width: 190, height: 190, imageRendering: "pixelated" }} />
        </div>
        {h && (
          <div className="mt-1 text-[11px] font-mono text-white/70 leading-tight">
            <div>
              房间 <span className="text-amber-300 font-bold tracking-widest">{h.roomId}</span> · {h.mapName}
            </div>
            <div>
              玩家 {h.players} · {h.fps} FPS {h.isHost ? "· 房主" : ""}
            </div>
          </div>
        )}
      </div>

      {h && playing && (
        <>
          {/* 顶部比分 */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center gap-1">
            {h.mode === "defense" ? (
              <div className="px-5 py-1.5 rounded bg-black/55 border border-white/20 font-mono text-white text-sm tracking-wider">
                第 <span className="text-amber-300 text-lg font-black">{h.wave}</span> 波 · 剩余敌人 <span className="text-red-400 font-bold">{h.enemiesLeft}</span>
              </div>
            ) : (
              <div className="flex items-stretch gap-1.5">
                {Array.from({ length: h.teamCount }).map((_, t) => (
                  <div key={t} className="min-w-16 text-center px-3 py-1 rounded font-mono border-2" style={{ borderColor: TEAM_CSS[t], background: "rgba(0,0,0,0.55)" }}>
                    <div className="text-[10px]" style={{ color: TEAM_CSS[t] }}>
                      {TEAM_NAMES[t]}
                      {t === h.myTeam ? " (我)" : ""}
                    </div>
                    <div className="text-2xl font-black text-white leading-none">{h.scores[t]}</div>
                  </div>
                ))}
              </div>
            )}
            {h.mode !== "defense" && <div className="text-[10px] font-mono text-white/60">目标击杀 {h.scoreLimit}</div>}
          </div>

          {/* 击杀信息 */}
          <div className="absolute right-3 top-3 flex flex-col items-end gap-1 pointer-events-none max-w-[45vw]">
            {h.feed.map((f) =>
              f.victim === "" ? (
                <div key={f.id} className="px-2 py-0.5 rounded bg-black/50 text-white/70 text-xs font-mono">
                  {f.killer}
                </div>
              ) : (
                <div key={f.id} className={`px-2 py-0.5 rounded text-xs font-mono flex items-center gap-1.5 ${f.me ? "bg-amber-500/40 border border-amber-300" : f.died ? "bg-red-600/40 border border-red-400" : "bg-black/55"}`}>
                  <span style={{ color: f.kt >= 0 && f.kt < 4 ? TEAM_CSS[f.kt] : "#ff6b6b" }} className="font-bold">
                    {f.killer}
                  </span>
                  <span className="text-white/60">[{f.w}]</span>
                  {f.head && <span className="text-red-400 font-black">爆头</span>}
                  <span style={{ color: f.vt >= 0 && f.vt < 4 ? TEAM_CSS[f.vt] : "#ff6b6b" }} className="font-bold">
                    {f.victim}
                  </span>
                </div>
              ),
            )}
          </div>

          {/* 受伤红屏 + 方向 */}
          {h.dmgFlash > 0.01 && (
            <>
              <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at center, rgba(255,0,0,0) 40%, rgba(220,0,0,${Math.min(0.7, h.dmgFlash * 0.7)}) 100%)` }} />
              <div className="absolute left-1/2 top-1/2 pointer-events-none" style={{ transform: `translate(-50%,-50%) rotate(${-h.dmgAngle}rad)`, opacity: Math.min(1, h.dmgFlash * 1.4) }}>
                <div style={{ width: 0, height: 0, marginTop: -150, borderLeft: "26px solid transparent", borderRight: "26px solid transparent", borderBottom: "40px solid rgba(255,40,40,0.85)", filter: "blur(1px)" }} />
              </div>
            </>
          )}
          {lowHp && h.alive && <div className="absolute inset-0 pointer-events-none animate-pulse" style={{ boxShadow: "inset 0 0 120px rgba(255,0,0,0.45)" }} />}

          {/* 准星 */}
          {h.alive && !h.scope && (
            <div className="absolute left-1/2 top-1/2 pointer-events-none" style={{ transform: "translate(-50%,-50%)" }}>
              <div className="absolute bg-white/90" style={{ width: 2, height: 2, left: -1, top: -1 }} />
              {[0, 90, 180, 270].map((a) => (
                <div key={a} className="absolute" style={{ transform: `rotate(${a}deg) translateY(${-gap}px)`, left: -1, top: -7 }}>
                  <div className="bg-white" style={{ width: 2, height: 9, boxShadow: "0 0 2px #000" }} />
                </div>
              ))}
            </div>
          )}
          {/* 命中标记 */}
          {h.hitSeq > 0 && (
            <div key={h.hitSeq} className="absolute left-1/2 top-1/2 pointer-events-none hit-anim" style={{ transform: "translate(-50%,-50%)" }}>
              <svg width="44" height="44" viewBox="-22 -22 44 44">
                {[45, 135, 225, 315].map((a) => (
                  <line key={a} x1="6" y1="0" x2="14" y2="0" stroke={h.hitHead ? "#ff3030" : "#ffffff"} strokeWidth="3" transform={`rotate(${a})`} />
                ))}
              </svg>
            </div>
          )}
          {/* 狙击镜 */}
          {h.scope && (
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at center, transparent 0, transparent 30vh, rgba(0,0,0,0.96) 31vh)" }}>
              <div className="absolute left-0 right-0 top-1/2 h-px bg-black/80" />
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-black/80" />
              <div className="absolute left-1/2 top-1/2 w-1 h-1 -ml-0.5 -mt-0.5 bg-red-500 rounded-full" />
            </div>
          )}

          {/* 左下：生命/体力/回血 */}
          <div className="absolute left-4 bottom-4 w-72 pointer-events-none font-mono">
            <div className="flex items-end justify-between mb-1">
              <div className="text-white/70 text-xs">HP</div>
              <div className={`text-4xl font-black leading-none ${lowHp ? "text-red-400" : "text-white"}`}>{h.hp}</div>
            </div>
            <div className="h-4 bg-black/60 border border-white/30 rounded-sm overflow-hidden">
              <div className="h-full transition-[width] duration-100" style={{ width: `${(h.hp / RULES.maxHp) * 100}%`, background: h.hp > 60 ? "#4ade80" : h.hp > 30 ? "#facc15" : "#ef4444" }} />
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-[10px] text-white/60 w-8">体力</span>
              <div className="h-2.5 flex-1 bg-black/60 border border-white/20 rounded-sm overflow-hidden">
                <div className="h-full" style={{ width: `${h.stamina}%`, background: h.exhausted ? "#ef4444" : h.sprinting ? "#22d3ee" : "#38bdf8" }} />
              </div>
              <span className="text-[10px] text-white/70 w-8 text-right">{Math.round(h.stamina)}%</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-[10px] text-white/60 w-8">回血</span>
              <div className="flex gap-1">
                {Array.from({ length: RULES.healUses }).map((_, i) => (
                  <div key={i} className="w-5 h-5 rounded-sm border flex items-center justify-center text-[11px]" style={{ borderColor: i < h.heal ? "#4ade80" : "#ffffff30", background: i < h.heal ? "rgba(74,222,128,0.25)" : "transparent", color: "#4ade80" }}>
                    {i < h.heal ? "✚" : ""}
                  </div>
                ))}
              </div>
              <span className="text-[10px] text-white/50">[{codeLabel(binds.heal)}]</span>
              <span className="ml-auto text-[10px] text-white/70">{h.sliding ? "滑铲" : STANCE[h.stance]}</span>
            </div>
            {h.healing && (
              <div className="mt-1 h-1.5 bg-black/60 rounded-sm overflow-hidden">
                <div className="h-full bg-green-400" style={{ width: `${h.healProg * 100}%` }} />
              </div>
            )}
            {h.protect && (
              <div className="mt-1 text-[10px] text-cyan-300 font-bold">
                无敌保护 {Math.max(0, h.protectT).toFixed(1)}s
              </div>
            )}
          </div>

          {/* 右下：武器/弹药 */}
          <div className="absolute right-4 bottom-4 w-72 pointer-events-none font-mono">
            {cw && (
              <div className="text-right">
                <div className="text-white/80 text-sm">{cw.name}</div>
                {cw.melee ? (
                  <div className="text-3xl font-black text-white">近战</div>
                ) : (
                  <div className="leading-none">
                    <span className={`text-5xl font-black ${cw.mag === 0 ? "text-red-400" : "text-white"}`}>{cw.mag}</span>
                    <span className="text-xl text-white/60 ml-1">/ {cw.reserve}</span>
                  </div>
                )}
                {cw.reloading && (
                  <div className="mt-1">
                    <div className="text-[10px] text-amber-300">换弹中…</div>
                    <div className="h-1.5 bg-black/60 rounded-sm overflow-hidden">
                      <div className="h-full bg-amber-400" style={{ width: `${h.reloadProg * 100}%` }} />
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="mt-2 flex flex-col gap-1">
              {h.weapons.map((w, i) => (
                <div key={i} className={`flex items-center gap-2 px-2 py-1 rounded border ${i === h.slot ? "bg-amber-400/20 border-amber-300 text-white" : "bg-black/45 border-white/10 text-white/60"}`}>
                  <span className="w-4 text-center font-black text-amber-300">{i + 1}</span>
                  <span className="text-xs flex-1 truncate">{w.name}</span>
                  <span className="text-[11px]">{w.melee ? "∞" : `${w.mag}/${w.reserve}`}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 横幅 */}
          {h.banner && (
            <div key={h.banner} className="absolute left-1/2 top-[22%] -translate-x-1/2 pointer-events-none banner-in">
              <div className="px-8 py-3 bg-black/60 border-y-2 border-amber-400 text-white text-2xl font-black tracking-wider text-center">{h.banner}</div>
            </div>
          )}

          {/* 死亡 */}
          {!h.alive && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center" style={{ background: "radial-gradient(circle, rgba(80,0,0,0.25), rgba(40,0,0,0.75))" }}>
              <div className="text-center font-mono">
                <div className="text-5xl font-black text-red-400 tracking-widest">你已阵亡</div>
                <div className="mt-3 text-lg text-white/90">{h.waiting ? "等待下一波开始时复活…" : `${Math.ceil(h.respawnIn)} 秒后复活`}</div>
                <div className="mt-1 text-xs text-white/50">按住 Tab 查看计分板</div>
              </div>
            </div>
          )}

          {/* 计分板 */}
          {h.showBoard && (
            <div className="absolute left-1/2 top-[14%] -translate-x-1/2 w-[min(640px,92vw)] bg-black/80 border border-white/25 rounded-md p-3 font-mono pointer-events-none">
              <div className="text-center text-amber-300 font-black tracking-widest mb-2">计分板</div>
              <div className="grid grid-cols-[1fr_60px_60px_60px] text-[11px] text-white/50 px-2 mb-1">
                <span>玩家</span>
                <span className="text-center">队伍</span>
                <span className="text-center">击杀</span>
                <span className="text-center">死亡</span>
              </div>
              {h.board.map((r) => (
                <div key={r.id} className={`grid grid-cols-[1fr_60px_60px_60px] px-2 py-1 text-sm rounded ${r.me ? "bg-amber-400/20" : ""}`}>
                  <span className="truncate" style={{ color: TEAM_CSS[r.team % 4] }}>
                    {r.name}
                    {r.bot ? " 🤖" : ""}
                  </span>
                  <span className="text-center text-white/60 text-xs">{h.mode === "defense" ? "—" : TEAM_NAMES[r.team % 4]}</span>
                  <span className="text-center text-white">{r.k}</span>
                  <span className="text-center text-white/70">{r.d}</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* 连接中 / 错误 */}
      {h?.status !== "playing" && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/95 text-white font-mono">
          {h?.status === "error" ? (
            <div className="text-center">
              <div className="text-red-400 text-2xl font-black mb-2">连接中断</div>
              <div className="text-white/70 mb-5">{h.error}</div>
              <button onClick={leave} className="px-6 py-2 bg-amber-400 text-black font-bold rounded hover:bg-amber-300">
                返回大厅
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-10 h-10 mx-auto mb-4 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
              正在载入战场…
            </div>
          )}
        </div>
      )}

      {/* 暂停 / 点击进入 */}
      {showMenu && h && (
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-auto">
          <div className="w-[min(920px,96vw)] max-h-[92vh] overflow-auto rounded-lg border-2 border-white/20 bg-slate-900/95 p-5 text-white">
            <div className="flex items-center gap-2 mb-4">
              {(
                [
                  ["main", "继续游戏"],
                  ["loadout", "配装 (下次复活生效)"],
                  ...(h.teamCount > 1 ? [["team", "切换队伍"]] : []),
                ] as [typeof tab, string][]
              ).map(([k, n]) => (
                <button key={k} onClick={() => setTab(k)} className={`px-4 py-1.5 rounded font-bold text-sm ${tab === k ? "bg-amber-400 text-black" : "bg-white/10 hover:bg-white/20"}`}>
                  {n}
                </button>
              ))}
              <button onClick={leave} className="ml-auto px-4 py-1.5 rounded font-bold text-sm bg-red-600 hover:bg-red-500">
                退出到大厅
              </button>
            </div>
            {tab === "main" && (
              <div>
                <button onClick={() => gameRef.current?.lock()} className="w-full py-4 rounded-md bg-amber-400 hover:bg-amber-300 text-black text-xl font-black tracking-widest">
                  ▶ 点击进入战场（锁定鼠标）
                </button>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {helpList(binds).map(([k, v]) => (
                    <div key={k} className="flex items-center gap-2 bg-white/5 rounded px-2 py-1.5">
                      <kbd className="px-2 py-0.5 rounded bg-white/15 border border-white/20 text-xs font-mono text-amber-300 whitespace-nowrap">{k}</kbd>
                      <span className="text-xs text-white/75">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-xs text-white/50 leading-relaxed">
                  头部伤害 150%，其余部位 100%。回血道具共 4 次，每次 2 秒内每 0.01 秒恢复 1 点生命（使用时无法开火）。局域网内其他玩家在浏览器输入本机 IP 即可加入。
                </div>
              </div>
            )}
            {tab === "loadout" && (
              <LoadoutPicker
                value={loadout}
                onChange={(l) => {
                  setLoadout(l);
                  gameRef.current?.setLoadout(l);
                  onLoadoutChange(l);
                }}
              />
            )}
            {tab === "team" && (
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: h.teamCount }).map((_, t) => (
                  <button
                    key={t}
                    onClick={() => {
                      gameRef.current?.switchTeam(t);
                      setTab("main");
                    }}
                    className="py-6 rounded-md font-black text-xl border-4"
                    style={{ borderColor: TEAM_CSS[t], background: t === h.myTeam ? TEAM_CSS[t] + "55" : "transparent", color: TEAM_CSS[t] }}
                  >
                    {TEAM_NAMES[t]} {t === h.myTeam ? "（当前）" : ""}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
