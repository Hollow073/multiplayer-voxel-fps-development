"use client";
/* eslint-disable react-hooks/set-state-in-effect -- 首屏从 localStorage / 服务器读取初始状态 */

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { MAP_LIST, buildMap, getMapInfo } from "@/game/maps";
import { renderMapCanvas } from "@/game/minimap";
import { DEFAULT_LOADOUT, Loadout, sanitizeLoadout } from "@/game/weapons";
import { BIND_META, BindAction, KeyBinds, DEFAULT_BINDS, bindConflict, codeLabel, loadBinds, saveBinds } from "@/game/keybinds";
import type { GameConfig } from "@/game/types";
import LoadoutPicker from "@/components/LoadoutPicker";

const GameView = dynamic(() => import("@/components/GameView"), { ssr: false });

interface RoomRow {
  id: string;
  name: string;
  mapId: string;
  mode: string;
  players: number;
  max: number;
  bots: number;
  score: number;
  diff: number;
}
interface StatRow {
  name: string;
  kills: number;
  deaths: number;
  headshots: number;
  matches: number;
  bestWave: number;
}

const MODE_NAME: Record<string, string> = { tdm: "双方对战", ffa4: "四方混战", defense: "据点防守" };
const TAG_COLOR: Record<string, string> = { duel: "bg-sky-500", ffa: "bg-fuchsia-500", defense: "bg-emerald-500" };
const FILTERS: [string, string][] = [
  ["all", "全部地图"],
  ["duel", "双方对抗"],
  ["ffa", "四方混战"],
  ["defense", "据点防守"],
];

function MapPreview({ id, size = 280 }: { id: string; size?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const src = renderMapCanvas(buildMap(id), size, true);
    cv.width = src.width;
    cv.height = src.height;
    cv.getContext("2d")!.drawImage(src, 0, 0);
  }, [id, size]);
  return <canvas ref={ref} className="w-full rounded border border-white/20 bg-black/30" style={{ imageRendering: "pixelated" }} />;
}

function KeyBindRow({ action, label, hint, value, onChange, conflict }: { action: BindAction; label: string; hint?: string; value: string; onChange: (code: string) => void; conflict: BindAction | null }) {
  const [listening, setListening] = useState(false);
  return (
    <div className="flex items-center gap-2">
      <div className="w-36 text-right text-sm text-white/80 pr-2">{label}</div>
      {hint && <div className="w-40 text-xs text-white/40">{hint}</div>}
      <button
        onClick={() => setListening(true)}
        onKeyDown={(e) => {
          if (!listening) return;
          e.preventDefault();
          const code = e.code || (e.key === " " ? "Space" : e.key);
          if (code && code !== "Escape") onChange(code);
          setListening(false);
        }}
        onBlur={() => setListening(false)}
        className={`flex-1 max-w-[160px] px-3 py-1.5 rounded border-2 text-sm font-mono text-center transition ${listening ? "border-amber-400 bg-amber-400/10 text-amber-300" : conflict ? "border-red-400/60 bg-red-400/10 text-red-300" : "border-white/15 bg-white/5 text-white hover:border-white/30"}`}
        tabIndex={0}
      >
        {listening ? "按任意键…" : codeLabel(value)}
      </button>
      {conflict && <span className="text-[10px] text-red-400" title={`与 ${BIND_META.find(m => m.key === conflict)?.label} 冲突`}>⚠ 冲突</span>}
    </div>
  );
}

function Seg<T extends string | number>({ value, options, onChange }: { value: T; options: [T, string][]; onChange: (v: T) => void }) {
  return (
    <div className="flex gap-1.5 flex-wrap">
      {options.map(([v, n]) => (
        <button key={String(v)} onClick={() => onChange(v)} className={`px-3 py-1.5 rounded text-xs font-bold border-2 ${value === v ? "border-amber-400 bg-amber-400 text-black" : "border-white/15 text-white/75 hover:border-white/40"}`}>
          {n}
        </button>
      ))}
    </div>
  );
}

export default function Home() {
  const [name, setName] = useState("玩家");
  const [loadout, setLoadout] = useState<Loadout>(DEFAULT_LOADOUT);
  const [mapId, setMapId] = useState("duel-town");
  const [filter, setFilter] = useState("all");
  const [ffaMode, setFfaMode] = useState<"ffa4" | "tdm">("ffa4");
  const [bots, setBots] = useState(2);
  const [score, setScore] = useState(30);
  const [diff, setDiff] = useState(2);
  const [roomName, setRoomName] = useState("");
  const [tab, setTab] = useState<"create" | "join">("create");
  const [rooms, setRooms] = useState<RoomRow[]>([]);
  const [lan, setLan] = useState<{ ips: string[]; port: string }>({ ips: [], port: "" });
  const [stats, setStats] = useState<StatRow[]>([]);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [cfg, setCfg] = useState<GameConfig | null>(null);
  const [showLoadout, setShowLoadout] = useState(false);
  const [origin, setOrigin] = useState("");
  const [binds, setBinds] = useState<KeyBinds>(DEFAULT_BINDS);
  const [bindsErr, setBindsErr] = useState("");
  const [listening, setListening] = useState<BindAction | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  const resetBinds = () => {
    setBinds({ ...DEFAULT_BINDS });
    setBindsErr("");
    saveBinds(DEFAULT_BINDS);
  };

  useEffect(() => {
    setOrigin(window.location.origin);
    const n = localStorage.getItem("bs_name");
    setName(n || `玩家${Math.floor(Math.random() * 900 + 100)}`);
    setBinds(loadBinds());
    try {
      const l = localStorage.getItem("bs_loadout");
      if (l) setLoadout(sanitizeLoadout(JSON.parse(l)));
    } catch {
      /* ignore */
    }
  }, []);

  // 设置面板：按下任意键绑定到当前动作；与已有键冲突时自动交换
  useEffect(() => {
    if (!listening) return;
    const onKey = (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.code === "Escape") {
        setListening(null);
        return;
      }
      // 忽略无法识别的按键（部分自动化/输入法会给出空 code）
      if (!e.code || e.code === "Unidentified") return;
      const conflict = bindConflict(binds, listening, e.code);
      const next = { ...binds, [listening]: e.code } as KeyBinds;
      if (conflict) next[conflict] = binds[listening];
      setBinds(next);
      saveBinds(next);
      setBindsErr(conflict ? `已与「${BIND_META.find((m) => m.key === conflict)?.label ?? ""}」交换按键` : "");
      setListening(null);
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [listening, binds]);

  const refresh = useCallback(async () => {
    try {
      const r = await fetch("/api/net/rooms", { cache: "no-store" });
      const j = await r.json();
      setRooms(Array.isArray(j.rooms) ? j.rooms : []);
      setLan({
        ips: Array.isArray(j.lan) ? j.lan.filter((v: unknown) => typeof v === "string") : [],
        port: typeof j.port === "string" ? j.port : String(j.port ?? ""),
      });
    } catch {
      /* ignore */
    }
  }, []);
  const loadStats = useCallback(async () => {
    try {
      const r = await fetch("/api/stats", { cache: "no-store" });
      const j = await r.json();
      setStats(j.rows ?? []);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (cfg) return;
    refresh();
    loadStats();
    const id = setInterval(refresh, 2500);
    return () => clearInterval(id);
  }, [cfg, refresh, loadStats]);

  const map = getMapInfo(mapId);
  const mode = map.type === "defense" ? "defense" : map.type === "duel" ? "tdm" : ffaMode;
  const cleanName = name.trim().slice(0, 14) || "玩家";

  const begin = (roomId: string) => {
    localStorage.setItem("bs_name", cleanName);
    localStorage.setItem("bs_loadout", JSON.stringify(loadout));
    setCfg({ roomId, pid: Math.random().toString(36).slice(2, 10), name: cleanName, team: -1, loadout });
  };

  const create = async () => {
    setBusy(true);
    setErr("");
    const pid = Math.random().toString(36).slice(2, 10);
    try {
      const r = await fetch("/api/net/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pid, name: roomName || `${cleanName} 的战场`, mapId, mode, bots, score, diff }),
      });
      const j = await r.json();
      if (!j.ok) throw new Error("创建失败");
      localStorage.setItem("bs_name", cleanName);
      localStorage.setItem("bs_loadout", JSON.stringify(loadout));
      setCfg({ roomId: j.id, pid, name: cleanName, team: -1, loadout });
    } catch {
      setErr("创建房间失败，请重试");
    }
    setBusy(false);
  };

  if (cfg) {
    return (
      <GameView
        key={cfg.pid}
        cfg={cfg}
        onExit={() => setCfg(null)}
        onLoadoutChange={(l) => {
          setLoadout(l);
          localStorage.setItem("bs_loadout", JSON.stringify(l));
        }}
      />
    );
  }

  const shown = MAP_LIST.filter((m) => filter === "all" || m.type === filter);
  // 优先使用服务端探测到的局域网 IP；拿不到时退回到当前访问地址
  const urls = lan.ips.length > 0 ? lan.ips.map((ip) => (lan.port ? `http://${ip}:${lan.port}` : `http://${ip}`)) : origin ? [origin] : [];

  return (
    <main className="min-h-screen text-white bg-[#0b1220] bg-[radial-gradient(circle_at_20%_0%,rgba(251,191,36,0.12),transparent_45%),radial-gradient(circle_at_90%_30%,rgba(56,189,248,0.1),transparent_40%)]">
      <div className="mx-auto max-w-[1400px] px-4 py-6">
        {/* 标题 */}
        <header className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="pixel-title text-4xl sm:text-5xl font-black tracking-widest">
              <span className="text-amber-400">BLOCK</span> <span className="text-white">STRIKE</span>
            </h1>
            <p className="mt-1 text-sm text-white/60">3D 方块 FPS · 局域网联机 · {MAP_LIST.length} 张地图 · 多人对抗 / 据点防守</p>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-white/60">昵称</label>
            <input value={name} maxLength={14} onChange={(e) => setName(e.target.value)} className="w-40 rounded bg-white/10 border border-white/20 px-3 py-2 text-sm font-bold focus:outline-none focus:border-amber-400" />
            <button
              onClick={() => {
                setBindsErr("");
                setListening(null);
                setShowSettings(true);
              }}
              className="px-3 py-2 rounded border-2 border-white/20 bg-white/5 hover:bg-white/15 text-sm font-bold whitespace-nowrap"
              title="修改默认键位"
            >
              ⚙ 设置
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_440px] gap-6">
          {/* 地图选择 */}
          <section>
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <h2 className="text-lg font-black tracking-wider">选择地图</h2>
              <Seg value={filter} options={FILTERS} onChange={setFilter} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {shown.map((m) => (
                <button key={m.id} onClick={() => setMapId(m.id)} className={`text-left rounded-lg border-2 p-2.5 transition-all ${mapId === m.id ? "border-amber-400 bg-amber-400/10 shadow-[0_0_24px_rgba(251,191,36,0.2)]" : "border-white/10 bg-white/5 hover:border-white/35"}`}>
                  <MapPreview id={m.id} size={240} />
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-black">{m.name}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${TAG_COLOR[m.type]} text-black`}>{m.tag}</span>
                  </div>
                  <p className="mt-1 text-[11px] leading-snug text-white/55 line-clamp-2">{m.desc}</p>
                </button>
              ))}
            </div>

            {/* 配装 */}
            <div className="mt-6 rounded-lg border border-white/15 bg-white/5 p-4">
              <button onClick={() => setShowLoadout((v) => !v)} className="w-full flex items-center justify-between">
                <h2 className="text-lg font-black tracking-wider">武器配装</h2>
                <span className="text-xs text-white/60">{showLoadout ? "收起 ▲" : "展开 ▼  一号位 / 二号位 / 三号位"}</span>
              </button>
              {showLoadout && (
                <div className="mt-3">
                  <LoadoutPicker value={loadout} onChange={setLoadout} />
                </div>
              )}
            </div>
          </section>

          {/* 右侧面板 */}
          <aside className="space-y-4">
            <div className="rounded-lg border border-white/15 bg-white/5 p-4">
              <div className="flex gap-2 mb-4">
                <button onClick={() => setTab("create")} className={`flex-1 py-2 rounded font-black text-sm ${tab === "create" ? "bg-amber-400 text-black" : "bg-white/10 hover:bg-white/20"}`}>
                  创建房间
                </button>
                <button onClick={() => setTab("join")} className={`flex-1 py-2 rounded font-black text-sm ${tab === "join" ? "bg-amber-400 text-black" : "bg-white/10 hover:bg-white/20"}`}>
                  加入房间 ({rooms.length})
                </button>
              </div>

              {tab === "create" ? (
                <div className="space-y-3">
                  <MapPreview id={mapId} size={380} />
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-black text-lg">{map.name}</div>
                      <div className="text-xs text-white/55">{map.desc}</div>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-white/60">房间名称</label>
                    <input value={roomName} maxLength={20} onChange={(e) => setRoomName(e.target.value)} placeholder={`${cleanName} 的战场`} className="mt-1 w-full rounded bg-white/10 border border-white/20 px-3 py-2 text-sm focus:outline-none focus:border-amber-400" />
                  </div>
                  <div>
                    <div className="text-xs text-white/60 mb-1">模式</div>
                    {map.type === "ffa" ? (
                      <Seg value={ffaMode} options={[["ffa4", "四方混战"], ["tdm", "双方对战 (对角出生)"]]} onChange={setFfaMode} />
                    ) : (
                      <div className="text-sm font-bold text-amber-300">{MODE_NAME[mode]}{map.type === "duel" ? " · 红队 vs 蓝队" : " · 守住据点，抵御四角来袭的敌人"}</div>
                    )}
                  </div>
                  {mode !== "defense" && (
                    <>
                      <div>
                        <div className="text-xs text-white/60 mb-1">每队 AI 机器人：{bots}</div>
                        <input type="range" min={0} max={8} value={bots} onChange={(e) => setBots(+e.target.value)} className="w-full accent-amber-400" />
                      </div>
                      <div>
                        <div className="text-xs text-white/60 mb-1">胜利所需击杀</div>
                        <Seg value={score} options={[[20, "20"], [30, "30"], [50, "50"], [75, "75"], [100, "100"]]} onChange={setScore} />
                      </div>
                    </>
                  )}
                  <div>
                    <div className="text-xs text-white/60 mb-1">{mode === "defense" ? "敌人强度" : "AI 难度"}</div>
                    <Seg value={diff} options={[[1, "简单"], [2, "普通"], [3, "困难"]]} onChange={setDiff} />
                  </div>
                  {err && <div className="text-sm text-red-400">{err}</div>}
                  <button disabled={busy} onClick={create} className="w-full py-3 rounded bg-amber-400 hover:bg-amber-300 disabled:opacity-60 text-black font-black text-lg tracking-widest">
                    {busy ? "创建中…" : "▶ 创建并开始"}
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} maxLength={5} placeholder="输入 5 位房间码" className="flex-1 rounded bg-white/10 border border-white/20 px-3 py-2 text-sm font-mono tracking-widest focus:outline-none focus:border-amber-400" />
                    <button disabled={code.length < 4} onClick={() => begin(code)} className="px-4 rounded bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-black font-black text-sm">
                      加入
                    </button>
                  </div>
                  <div className="space-y-2 max-h-[420px] overflow-auto pr-1">
                    {rooms.length === 0 && <div className="text-center text-sm text-white/45 py-8">暂无房间，去创建一个吧！</div>}
                    {rooms.map((r) => (
                      <div key={r.id} className="flex items-center gap-3 rounded border border-white/15 bg-black/30 p-2.5">
                        <div className="flex-1 min-w-0">
                          <div className="font-bold truncate">{r.name}</div>
                          <div className="text-[11px] text-white/55">
                            {getMapInfo(r.mapId).name} · {MODE_NAME[r.mode]} · <span className="font-mono">{r.id}</span>
                          </div>
                        </div>
                        <div className="text-xs text-white/70">
                          {r.players}/{r.max}
                        </div>
                        <button disabled={r.players >= r.max} onClick={() => begin(r.id)} className="px-3 py-1.5 rounded bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-black font-black text-xs">
                          加入
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 局域网 */}
            <div className="rounded-lg border border-emerald-400/30 bg-emerald-400/5 p-4">
              <h3 className="font-black text-emerald-300 mb-1">局域网联机</h3>
              <p className="text-xs text-white/60 leading-relaxed">让同一网络下的朋友在浏览器中打开下面任一地址，在「加入房间」里选择你创建的房间即可。</p>
              <div className="mt-2 space-y-1 font-mono text-sm">
                {urls.length === 0 ? <div className="text-white/45">{origin || "加载中…"}</div> : urls.map((u) => (
                  <div key={u} className="flex items-center gap-2">
                    <span className="text-emerald-200 select-all">{u}</span>
                    <button onClick={() => navigator.clipboard?.writeText(u)} className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white/70">
                      复制
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 战绩榜 */}
            <div className="rounded-lg border border-white/15 bg-white/5 p-4">
              <h3 className="font-black mb-2">累计战绩榜</h3>
              {stats.length === 0 ? (
                <div className="text-xs text-white/45">暂无数据，完成一局后将记录在此。</div>
              ) : (
                <table className="w-full text-xs font-mono">
                  <thead className="text-white/45">
                    <tr>
                      <th className="text-left font-normal">#玩家</th>
                      <th className="text-right font-normal">击杀</th>
                      <th className="text-right font-normal">死亡</th>
                      <th className="text-right font-normal">爆头</th>
                      <th className="text-right font-normal">最高波</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.map((s, i) => (
                      <tr key={s.name} className="border-t border-white/10">
                        <td className="py-1">
                          <span className="text-amber-300">{i + 1}</span> {s.name}
                        </td>
                        <td className="text-right">{s.kills}</td>
                        <td className="text-right text-white/60">{s.deaths}</td>
                        <td className="text-right text-white/60">{s.headshots}</td>
                        <td className="text-right text-white/60">{s.bestWave || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </aside>
        </div>

        <footer className="mt-8 text-center text-[11px] text-white/35 leading-relaxed">
          {codeLabel(binds.forward)} {codeLabel(binds.back)} {codeLabel(binds.left)} {codeLabel(binds.right)} 移动 · {codeLabel(binds.jump)} 跳跃 · {codeLabel(binds.sprint)} 冲刺 · {codeLabel(binds.crouch)} 蹲 · {codeLabel(binds.prone)} 趴 · {codeLabel(binds.sprint)}+{codeLabel(binds.crouch)} 滑铲 · 左键开火 · 右键瞄准 · {codeLabel(binds.reload)} 换弹 · {codeLabel(binds.slot1)}/{codeLabel(binds.slot2)}/{codeLabel(binds.slot3)} 切枪 · {codeLabel(binds.heal)} 回血 · {codeLabel(binds.scoreboard)} 计分板
        </footer>
      </div>

      {/* 设置：自定义键位 */}
      {showSettings && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => {
            if (!listening) setShowSettings(false);
          }}
        >
          <div className="w-[min(720px,96vw)] max-h-[90vh] overflow-auto rounded-lg border-2 border-white/20 bg-slate-900/95 p-5 text-white" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-xl font-black tracking-wider">按键设置</h2>
              <button
                onClick={() => {
                  setListening(null);
                  setShowSettings(false);
                }}
                className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-sm font-bold"
              >
                关闭
              </button>
            </div>
            <p className="text-xs text-white/55 mb-3">点击右侧按键后，按下新的按键即可重新绑定；若与其它动作冲突会自动交换。设置保存在本机浏览器中。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {BIND_META.map((m) => (
                <div key={m.key} className="flex items-center gap-2 rounded bg-white/5 border border-white/10 px-3 py-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold">{m.label}</div>
                    {m.hint && <div className="text-[10px] text-white/45">{m.hint}</div>}
                  </div>
                  <button
                    onClick={() => {
                      setBindsErr("");
                      setListening(m.key);
                    }}
                    className={`min-w-[92px] px-3 py-1.5 rounded border-2 font-mono text-xs font-bold transition-colors ${
                      listening === m.key ? "border-amber-400 bg-amber-400/20 text-amber-300 animate-pulse" : "border-white/20 bg-black/30 text-white/85 hover:border-amber-400"
                    }`}
                  >
                    {listening === m.key ? "按下按键…" : codeLabel(binds[m.key])}
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3">
              <button onClick={resetBinds} className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 font-bold text-sm border border-white/20">
                恢复默认键位
              </button>
              {bindsErr && <span className="text-xs text-amber-300">{bindsErr}</span>}
              <span className="ml-auto text-[11px] text-white/40">Esc 取消当前绑定</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
