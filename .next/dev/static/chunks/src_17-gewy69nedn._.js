(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
(()=>{"use strict";return[
"[project]/src/components/GameView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GameView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/engine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/weapons.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadoutPicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/LoadoutPicker.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const STANCE = [
    "站立",
    "蹲下",
    "趴下"
];
const HELP = [
    [
        "W A S D",
        "移动"
    ],
    [
        "空格",
        "跳跃"
    ],
    [
        "Shift",
        "冲刺 (体力 5 秒)"
    ],
    [
        "C",
        "蹲下"
    ],
    [
        "Z",
        "趴下"
    ],
    [
        "Shift + C",
        "滑铲"
    ],
    [
        "左键 / 右键",
        "开火 / 瞄准"
    ],
    [
        "R",
        "换弹"
    ],
    [
        "1 / 2 / 3",
        "切换武器"
    ],
    [
        "Q",
        "使用回血道具"
    ],
    [
        "Tab",
        "计分板"
    ],
    [
        "Esc",
        "暂停 / 菜单"
    ]
];
function GameView({ cfg, onExit, onLoadoutChange }) {
    _s();
    const wrap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mini = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const gameRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const sentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const [hud, setHud] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loadout, setLoadout] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(cfg.loadout);
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("main");
    const finish = ()=>{
        if (sentRef.current || !gameRef.current) return;
        sentRef.current = true;
        const s = gameRef.current.getSessionStats();
        try {
            fetch("/api/stats", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: cfg.name,
                    ...s
                }),
                keepalive: true
            }).catch(()=>{});
        } catch  {
        /* ignore */ }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GameView.useEffect": ()=>{
            const g = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Game"](wrap.current, cfg);
            gameRef.current = g;
            g.start();
            g.attachMinimap(mini.current);
            const id = setInterval({
                "GameView.useEffect.id": ()=>setHud(g.getHud())
            }["GameView.useEffect.id"], 33);
            const onHide = {
                "GameView.useEffect.onHide": ()=>{
                    finish();
                    g.dispose();
                }
            }["GameView.useEffect.onHide"];
            window.addEventListener("pagehide", onHide);
            return ({
                "GameView.useEffect": ()=>{
                    clearInterval(id);
                    window.removeEventListener("pagehide", onHide);
                    finish();
                    g.dispose();
                    gameRef.current = null;
                }
            })["GameView.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["GameView.useEffect"], []);
    const leave = ()=>{
        finish();
        onExit();
    };
    const h = hud;
    const playing = h?.status === "playing";
    const showMenu = playing && !h.locked;
    const lowHp = h ? h.hp <= 30 : false;
    const gap = h ? Math.max(4, Math.min(70, 4 + h.spread * 4.5)) : 8;
    const cw = h?.weapons[h.slot];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black select-none overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: wrap,
                className: "absolute inset-0"
            }, void 0, false, {
                fileName: "[project]/src/components/GameView.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute left-3 top-3 pointer-events-none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-md border-2 border-white/30 bg-black/40 p-1 backdrop-blur-sm",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                            ref: mini,
                            width: 190,
                            height: 190,
                            className: "block",
                            style: {
                                width: 190,
                                height: 190,
                                imageRendering: "pixelated"
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/GameView.tsx",
                            lineNumber: 85,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameView.tsx",
                        lineNumber: 84,
                        columnNumber: 9
                    }, this),
                    h && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-1 text-[11px] font-mono text-white/70 leading-tight",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    "房间 ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-amber-300 font-bold tracking-widest",
                                        children: h.roomId
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/GameView.tsx",
                                        lineNumber: 90,
                                        columnNumber: 18
                                    }, this),
                                    " · ",
                                    h.mapName
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/GameView.tsx",
                                lineNumber: 89,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    "玩家 ",
                                    h.players,
                                    " · ",
                                    h.fps,
                                    " FPS ",
                                    h.isHost ? "· 房主" : ""
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/GameView.tsx",
                                lineNumber: 92,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/GameView.tsx",
                        lineNumber: 88,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/GameView.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this),
            h && playing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-3 left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center gap-1",
                        children: [
                            h.mode === "defense" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-5 py-1.5 rounded bg-black/55 border border-white/20 font-mono text-white text-sm tracking-wider",
                                children: [
                                    "第 ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-amber-300 text-lg font-black",
                                        children: h.wave
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/GameView.tsx",
                                        lineNumber: 105,
                                        columnNumber: 19
                                    }, this),
                                    " 波 · 剩余敌人 ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-red-400 font-bold",
                                        children: h.enemiesLeft
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/GameView.tsx",
                                        lineNumber: 105,
                                        columnNumber: 96
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/GameView.tsx",
                                lineNumber: 104,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-stretch gap-1.5",
                                children: Array.from({
                                    length: h.teamCount
                                }).map((_, t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-16 text-center px-3 py-1 rounded font-mono border-2",
                                        style: {
                                            borderColor: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEAM_CSS"][t],
                                            background: "rgba(0,0,0,0.55)"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[10px]",
                                                style: {
                                                    color: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEAM_CSS"][t]
                                                },
                                                children: [
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEAM_NAMES"][t],
                                                    t === h.myTeam ? " (我)" : ""
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/GameView.tsx",
                                                lineNumber: 111,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-2xl font-black text-white leading-none",
                                                children: h.scores[t]
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/GameView.tsx",
                                                lineNumber: 115,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, t, true, {
                                        fileName: "[project]/src/components/GameView.tsx",
                                        lineNumber: 110,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/GameView.tsx",
                                lineNumber: 108,
                                columnNumber: 15
                            }, this),
                            h.mode !== "defense" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[10px] font-mono text-white/60",
                                children: [
                                    "目标击杀 ",
                                    h.scoreLimit
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/GameView.tsx",
                                lineNumber: 120,
                                columnNumber: 38
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/GameView.tsx",
                        lineNumber: 102,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute right-3 top-3 flex flex-col items-end gap-1 pointer-events-none max-w-[45vw]",
                        children: h.feed.map((f)=>f.victim === "" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-2 py-0.5 rounded bg-black/50 text-white/70 text-xs font-mono",
                                children: f.killer
                            }, f.id, false, {
                                fileName: "[project]/src/components/GameView.tsx",
                                lineNumber: 127,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `px-2 py-0.5 rounded text-xs font-mono flex items-center gap-1.5 ${f.me ? "bg-amber-500/40 border border-amber-300" : f.died ? "bg-red-600/40 border border-red-400" : "bg-black/55"}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: f.kt >= 0 && f.kt < 4 ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEAM_CSS"][f.kt] : "#ff6b6b"
                                        },
                                        className: "font-bold",
                                        children: f.killer
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/GameView.tsx",
                                        lineNumber: 132,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white/60",
                                        children: [
                                            "[",
                                            f.w,
                                            "]"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/GameView.tsx",
                                        lineNumber: 135,
                                        columnNumber: 19
                                    }, this),
                                    f.head && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-red-400 font-black",
                                        children: "爆头"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/GameView.tsx",
                                        lineNumber: 136,
                                        columnNumber: 30
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: f.vt >= 0 && f.vt < 4 ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEAM_CSS"][f.vt] : "#ff6b6b"
                                        },
                                        className: "font-bold",
                                        children: f.victim
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/GameView.tsx",
                                        lineNumber: 137,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, f.id, true, {
                                fileName: "[project]/src/components/GameView.tsx",
                                lineNumber: 131,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameView.tsx",
                        lineNumber: 124,
                        columnNumber: 11
                    }, this),
                    h.dmgFlash > 0.01 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 pointer-events-none",
                                style: {
                                    background: `radial-gradient(ellipse at center, rgba(255,0,0,0) 40%, rgba(220,0,0,${Math.min(0.7, h.dmgFlash * 0.7)}) 100%)`
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/GameView.tsx",
                                lineNumber: 148,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute left-1/2 top-1/2 pointer-events-none",
                                style: {
                                    transform: `translate(-50%,-50%) rotate(${-h.dmgAngle}rad)`,
                                    opacity: Math.min(1, h.dmgFlash * 1.4)
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: 0,
                                        height: 0,
                                        marginTop: -150,
                                        borderLeft: "26px solid transparent",
                                        borderRight: "26px solid transparent",
                                        borderBottom: "40px solid rgba(255,40,40,0.85)",
                                        filter: "blur(1px)"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/GameView.tsx",
                                    lineNumber: 150,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/GameView.tsx",
                                lineNumber: 149,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/GameView.tsx",
                        lineNumber: 147,
                        columnNumber: 13
                    }, this),
                    lowHp && h.alive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 pointer-events-none animate-pulse",
                        style: {
                            boxShadow: "inset 0 0 120px rgba(255,0,0,0.45)"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameView.tsx",
                        lineNumber: 154,
                        columnNumber: 32
                    }, this),
                    h.alive && !h.scope && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute left-1/2 top-1/2 pointer-events-none",
                        style: {
                            transform: "translate(-50%,-50%)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute bg-white/90",
                                style: {
                                    width: 2,
                                    height: 2,
                                    left: -1,
                                    top: -1
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/GameView.tsx",
                                lineNumber: 159,
                                columnNumber: 15
                            }, this),
                            [
                                0,
                                90,
                                180,
                                270
                            ].map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute",
                                    style: {
                                        transform: `rotate(${a}deg) translateY(${-gap}px)`,
                                        left: -1,
                                        top: -7
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white",
                                        style: {
                                            width: 2,
                                            height: 9,
                                            boxShadow: "0 0 2px #000"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/GameView.tsx",
                                        lineNumber: 162,
                                        columnNumber: 19
                                    }, this)
                                }, a, false, {
                                    fileName: "[project]/src/components/GameView.tsx",
                                    lineNumber: 161,
                                    columnNumber: 17
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/GameView.tsx",
                        lineNumber: 158,
                        columnNumber: 13
                    }, this),
                    h.hitSeq > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute left-1/2 top-1/2 pointer-events-none hit-anim",
                        style: {
                            transform: "translate(-50%,-50%)"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "44",
                            height: "44",
                            viewBox: "-22 -22 44 44",
                            children: [
                                45,
                                135,
                                225,
                                315
                            ].map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                    x1: "6",
                                    y1: "0",
                                    x2: "14",
                                    y2: "0",
                                    stroke: h.hitHead ? "#ff3030" : "#ffffff",
                                    strokeWidth: "3",
                                    transform: `rotate(${a})`
                                }, a, false, {
                                    fileName: "[project]/src/components/GameView.tsx",
                                    lineNumber: 172,
                                    columnNumber: 19
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/GameView.tsx",
                            lineNumber: 170,
                            columnNumber: 15
                        }, this)
                    }, h.hitSeq, false, {
                        fileName: "[project]/src/components/GameView.tsx",
                        lineNumber: 169,
                        columnNumber: 13
                    }, this),
                    h.scope && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 pointer-events-none",
                        style: {
                            background: "radial-gradient(circle at center, transparent 0, transparent 30vh, rgba(0,0,0,0.96) 31vh)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute left-0 right-0 top-1/2 h-px bg-black/80"
                            }, void 0, false, {
                                fileName: "[project]/src/components/GameView.tsx",
                                lineNumber: 180,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-0 bottom-0 left-1/2 w-px bg-black/80"
                            }, void 0, false, {
                                fileName: "[project]/src/components/GameView.tsx",
                                lineNumber: 181,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute left-1/2 top-1/2 w-1 h-1 -ml-0.5 -mt-0.5 bg-red-500 rounded-full"
                            }, void 0, false, {
                                fileName: "[project]/src/components/GameView.tsx",
                                lineNumber: 182,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/GameView.tsx",
                        lineNumber: 179,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute left-4 bottom-4 w-72 pointer-events-none font-mono",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-end justify-between mb-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-white/70 text-xs",
                                        children: "HP"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/GameView.tsx",
                                        lineNumber: 189,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `text-4xl font-black leading-none ${lowHp ? "text-red-400" : "text-white"}`,
                                        children: h.hp
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/GameView.tsx",
                                        lineNumber: 190,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/GameView.tsx",
                                lineNumber: 188,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-4 bg-black/60 border border-white/30 rounded-sm overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-full transition-[width] duration-100",
                                    style: {
                                        width: `${h.hp / __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULES"].maxHp * 100}%`,
                                        background: h.hp > 60 ? "#4ade80" : h.hp > 30 ? "#facc15" : "#ef4444"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/GameView.tsx",
                                    lineNumber: 193,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/GameView.tsx",
                                lineNumber: 192,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-white/60 w-8",
                                        children: "体力"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/GameView.tsx",
                                        lineNumber: 196,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-2.5 flex-1 bg-black/60 border border-white/20 rounded-sm overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-full",
                                            style: {
                                                width: `${h.stamina}%`,
                                                background: h.exhausted ? "#ef4444" : h.sprinting ? "#22d3ee" : "#38bdf8"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/GameView.tsx",
                                            lineNumber: 198,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/GameView.tsx",
                                        lineNumber: 197,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-white/70 w-8 text-right",
                                        children: [
                                            Math.round(h.stamina),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/GameView.tsx",
                                        lineNumber: 200,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/GameView.tsx",
                                lineNumber: 195,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-white/60 w-8",
                                        children: "回血"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/GameView.tsx",
                                        lineNumber: 203,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-1",
                                        children: Array.from({
                                            length: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULES"].healUses
                                        }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-5 h-5 rounded-sm border flex items-center justify-center text-[11px]",
                                                style: {
                                                    borderColor: i < h.heal ? "#4ade80" : "#ffffff30",
                                                    background: i < h.heal ? "rgba(74,222,128,0.25)" : "transparent",
                                                    color: "#4ade80"
                                                },
                                                children: i < h.heal ? "✚" : ""
                                            }, i, false, {
                                                fileName: "[project]/src/components/GameView.tsx",
                                                lineNumber: 206,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/GameView.tsx",
                                        lineNumber: 204,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-white/50",
                                        children: "[Q]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/GameView.tsx",
                                        lineNumber: 211,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-auto text-[10px] text-white/70",
                                        children: h.sliding ? "滑铲" : STANCE[h.stance]
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/GameView.tsx",
                                        lineNumber: 212,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/GameView.tsx",
                                lineNumber: 202,
                                columnNumber: 13
                            }, this),
                            h.healing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-1 h-1.5 bg-black/60 rounded-sm overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-full bg-green-400",
                                    style: {
                                        width: `${h.healProg * 100}%`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/GameView.tsx",
                                    lineNumber: 216,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/GameView.tsx",
                                lineNumber: 215,
                                columnNumber: 15
                            }, this),
                            h.protect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-1 text-[10px] text-cyan-300",
                                children: "复活保护中…"
                            }, void 0, false, {
                                fileName: "[project]/src/components/GameView.tsx",
                                lineNumber: 219,
                                columnNumber: 27
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/GameView.tsx",
                        lineNumber: 187,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute right-4 bottom-4 w-72 pointer-events-none font-mono",
                        children: [
                            cw && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-right",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-white/80 text-sm",
                                        children: cw.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/GameView.tsx",
                                        lineNumber: 226,
                                        columnNumber: 17
                                    }, this),
                                    cw.melee ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-3xl font-black text-white",
                                        children: "近战"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/GameView.tsx",
                                        lineNumber: 228,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "leading-none",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `text-5xl font-black ${cw.mag === 0 ? "text-red-400" : "text-white"}`,
                                                children: cw.mag
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/GameView.tsx",
                                                lineNumber: 231,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xl text-white/60 ml-1",
                                                children: [
                                                    "/ ",
                                                    cw.reserve
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/GameView.tsx",
                                                lineNumber: 232,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/GameView.tsx",
                                        lineNumber: 230,
                                        columnNumber: 19
                                    }, this),
                                    cw.reloading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[10px] text-amber-300",
                                                children: "换弹中…"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/GameView.tsx",
                                                lineNumber: 237,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-1.5 bg-black/60 rounded-sm overflow-hidden",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-full bg-amber-400",
                                                    style: {
                                                        width: `${h.reloadProg * 100}%`
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/GameView.tsx",
                                                    lineNumber: 239,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/GameView.tsx",
                                                lineNumber: 238,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/GameView.tsx",
                                        lineNumber: 236,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/GameView.tsx",
                                lineNumber: 225,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 flex flex-col gap-1",
                                children: h.weapons.map((w, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `flex items-center gap-2 px-2 py-1 rounded border ${i === h.slot ? "bg-amber-400/20 border-amber-300 text-white" : "bg-black/45 border-white/10 text-white/60"}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-4 text-center font-black text-amber-300",
                                                children: i + 1
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/GameView.tsx",
                                                lineNumber: 248,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs flex-1 truncate",
                                                children: w.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/GameView.tsx",
                                                lineNumber: 249,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[11px]",
                                                children: w.melee ? "∞" : `${w.mag}/${w.reserve}`
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/GameView.tsx",
                                                lineNumber: 250,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/src/components/GameView.tsx",
                                        lineNumber: 247,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/GameView.tsx",
                                lineNumber: 245,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/GameView.tsx",
                        lineNumber: 223,
                        columnNumber: 11
                    }, this),
                    h.banner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute left-1/2 top-[22%] -translate-x-1/2 pointer-events-none banner-in",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-8 py-3 bg-black/60 border-y-2 border-amber-400 text-white text-2xl font-black tracking-wider text-center",
                            children: h.banner
                        }, void 0, false, {
                            fileName: "[project]/src/components/GameView.tsx",
                            lineNumber: 259,
                            columnNumber: 15
                        }, this)
                    }, h.banner, false, {
                        fileName: "[project]/src/components/GameView.tsx",
                        lineNumber: 258,
                        columnNumber: 13
                    }, this),
                    !h.alive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 pointer-events-none flex items-center justify-center",
                        style: {
                            background: "radial-gradient(circle, rgba(80,0,0,0.25), rgba(40,0,0,0.75))"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center font-mono",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-5xl font-black text-red-400 tracking-widest",
                                    children: "你已阵亡"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/GameView.tsx",
                                    lineNumber: 267,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 text-lg text-white/90",
                                    children: h.waiting ? "等待下一波开始时复活…" : `${Math.ceil(h.respawnIn)} 秒后复活`
                                }, void 0, false, {
                                    fileName: "[project]/src/components/GameView.tsx",
                                    lineNumber: 268,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-1 text-xs text-white/50",
                                    children: "按住 Tab 查看计分板"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/GameView.tsx",
                                    lineNumber: 269,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/GameView.tsx",
                            lineNumber: 266,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameView.tsx",
                        lineNumber: 265,
                        columnNumber: 13
                    }, this),
                    h.showBoard && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute left-1/2 top-[14%] -translate-x-1/2 w-[min(640px,92vw)] bg-black/80 border border-white/25 rounded-md p-3 font-mono pointer-events-none",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center text-amber-300 font-black tracking-widest mb-2",
                                children: "计分板"
                            }, void 0, false, {
                                fileName: "[project]/src/components/GameView.tsx",
                                lineNumber: 277,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-[1fr_60px_60px_60px] text-[11px] text-white/50 px-2 mb-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "玩家"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/GameView.tsx",
                                        lineNumber: 279,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-center",
                                        children: "队伍"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/GameView.tsx",
                                        lineNumber: 280,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-center",
                                        children: "击杀"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/GameView.tsx",
                                        lineNumber: 281,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-center",
                                        children: "死亡"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/GameView.tsx",
                                        lineNumber: 282,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/GameView.tsx",
                                lineNumber: 278,
                                columnNumber: 15
                            }, this),
                            h.board.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `grid grid-cols-[1fr_60px_60px_60px] px-2 py-1 text-sm rounded ${r.me ? "bg-amber-400/20" : ""}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "truncate",
                                            style: {
                                                color: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEAM_CSS"][r.team % 4]
                                            },
                                            children: [
                                                r.name,
                                                r.bot ? " 🤖" : ""
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/GameView.tsx",
                                            lineNumber: 286,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-center text-white/60 text-xs",
                                            children: h.mode === "defense" ? "—" : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEAM_NAMES"][r.team % 4]
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/GameView.tsx",
                                            lineNumber: 290,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-center text-white",
                                            children: r.k
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/GameView.tsx",
                                            lineNumber: 291,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-center text-white/70",
                                            children: r.d
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/GameView.tsx",
                                            lineNumber: 292,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, r.id, true, {
                                    fileName: "[project]/src/components/GameView.tsx",
                                    lineNumber: 285,
                                    columnNumber: 17
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/GameView.tsx",
                        lineNumber: 276,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/GameView.tsx",
                lineNumber: 100,
                columnNumber: 9
            }, this),
            h?.status !== "playing" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 flex items-center justify-center bg-slate-950/95 text-white font-mono",
                children: h?.status === "error" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-red-400 text-2xl font-black mb-2",
                            children: "连接中断"
                        }, void 0, false, {
                            fileName: "[project]/src/components/GameView.tsx",
                            lineNumber: 305,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-white/70 mb-5",
                            children: h.error
                        }, void 0, false, {
                            fileName: "[project]/src/components/GameView.tsx",
                            lineNumber: 306,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: leave,
                            className: "px-6 py-2 bg-amber-400 text-black font-bold rounded hover:bg-amber-300",
                            children: "返回大厅"
                        }, void 0, false, {
                            fileName: "[project]/src/components/GameView.tsx",
                            lineNumber: 307,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/GameView.tsx",
                    lineNumber: 304,
                    columnNumber: 13
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-10 h-10 mx-auto mb-4 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"
                        }, void 0, false, {
                            fileName: "[project]/src/components/GameView.tsx",
                            lineNumber: 313,
                            columnNumber: 15
                        }, this),
                        "正在载入战场…"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/GameView.tsx",
                    lineNumber: 312,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/GameView.tsx",
                lineNumber: 302,
                columnNumber: 9
            }, this),
            showMenu && h && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-[min(920px,96vw)] max-h-[92vh] overflow-auto rounded-lg border-2 border-white/20 bg-slate-900/95 p-5 text-white",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 mb-4",
                            children: [
                                [
                                    [
                                        "main",
                                        "继续游戏"
                                    ],
                                    [
                                        "loadout",
                                        "配装 (下次复活生效)"
                                    ],
                                    ...h.teamCount > 1 ? [
                                        [
                                            "team",
                                            "切换队伍"
                                        ]
                                    ] : []
                                ].map(([k, n])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setTab(k),
                                        className: `px-4 py-1.5 rounded font-bold text-sm ${tab === k ? "bg-amber-400 text-black" : "bg-white/10 hover:bg-white/20"}`,
                                        children: n
                                    }, k, false, {
                                        fileName: "[project]/src/components/GameView.tsx",
                                        lineNumber: 332,
                                        columnNumber: 17
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: leave,
                                    className: "ml-auto px-4 py-1.5 rounded font-bold text-sm bg-red-600 hover:bg-red-500",
                                    children: "退出到大厅"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/GameView.tsx",
                                    lineNumber: 336,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/GameView.tsx",
                            lineNumber: 324,
                            columnNumber: 13
                        }, this),
                        tab === "main" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>gameRef.current?.lock(),
                                    className: "w-full py-4 rounded-md bg-amber-400 hover:bg-amber-300 text-black text-xl font-black tracking-widest",
                                    children: "▶ 点击进入战场（锁定鼠标）"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/GameView.tsx",
                                    lineNumber: 342,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2",
                                    children: HELP.map(([k, v])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 bg-white/5 rounded px-2 py-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                                                    className: "px-2 py-0.5 rounded bg-white/15 border border-white/20 text-xs font-mono text-amber-300 whitespace-nowrap",
                                                    children: k
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/GameView.tsx",
                                                    lineNumber: 348,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-white/75",
                                                    children: v
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/GameView.tsx",
                                                    lineNumber: 349,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, k, true, {
                                            fileName: "[project]/src/components/GameView.tsx",
                                            lineNumber: 347,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/GameView.tsx",
                                    lineNumber: 345,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 text-xs text-white/50 leading-relaxed",
                                    children: "头部伤害 150%，其余部位 100%。回血道具共 4 次，每次 2 秒内每 0.01 秒恢复 1 点生命（使用时无法开火）。局域网内其他玩家在浏览器输入本机 IP 即可加入。"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/GameView.tsx",
                                    lineNumber: 353,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/GameView.tsx",
                            lineNumber: 341,
                            columnNumber: 15
                        }, this),
                        tab === "loadout" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadoutPicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            value: loadout,
                            onChange: (l)=>{
                                setLoadout(l);
                                gameRef.current?.setLoadout(l);
                                onLoadoutChange(l);
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/GameView.tsx",
                            lineNumber: 359,
                            columnNumber: 15
                        }, this),
                        tab === "team" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 gap-3",
                            children: Array.from({
                                length: h.teamCount
                            }).map((_, t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        gameRef.current?.switchTeam(t);
                                        setTab("main");
                                    },
                                    className: "py-6 rounded-md font-black text-xl border-4",
                                    style: {
                                        borderColor: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEAM_CSS"][t],
                                        background: t === h.myTeam ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEAM_CSS"][t] + "55" : "transparent",
                                        color: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEAM_CSS"][t]
                                    },
                                    children: [
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEAM_NAMES"][t],
                                        " ",
                                        t === h.myTeam ? "（当前）" : ""
                                    ]
                                }, t, true, {
                                    fileName: "[project]/src/components/GameView.tsx",
                                    lineNumber: 371,
                                    columnNumber: 19
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/GameView.tsx",
                            lineNumber: 369,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/GameView.tsx",
                    lineNumber: 323,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/GameView.tsx",
                lineNumber: 322,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/GameView.tsx",
        lineNumber: 79,
        columnNumber: 5
    }, this);
}
_s(GameView, "BSvVCPujyFY504KOb9jb0PyaGHw=");
_c = GameView;
var _c;
__turbopack_context__.k.register(_c, "GameView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/game/audio.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initAudio",
    ()=>initAudio,
    "setVolume",
    ()=>setVolume,
    "sfx",
    ()=>sfx
]);
// 程序化音效 (WebAudio)，无需任何外部资源
let ctx = null;
let noiseBuf = null;
let master = null;
function initAudio() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (!ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        ctx = new AC();
        master = ctx.createGain();
        master.gain.value = 0.5;
        master.connect(ctx.destination);
        noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
        const d = noiseBuf.getChannelData(0);
        for(let i = 0; i < d.length; i++)d[i] = Math.random() * 2 - 1;
    }
    if (ctx.state === "suspended") ctx.resume();
}
function setVolume(v) {
    if (master) master.gain.value = v;
}
function burst(dur, freq, q, gain, type = "lowpass", thump = 0) {
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
function tone(freq, dur, gain, type = "square", slideTo = 0) {
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
function sfx(name, vol = 1) {
    if (!ctx) return;
    const v = Math.max(0, Math.min(1, vol));
    if (v < 0.02) return;
    switch(name){
        case "rifle":
            burst(0.16, 2600, 0.7, 0.8 * v, "lowpass", 140);
            break;
        case "smg":
            burst(0.1, 3400, 0.7, 0.55 * v, "lowpass", 180);
            break;
        case "pistol":
            burst(0.12, 3000, 0.9, 0.6 * v, "lowpass", 200);
            break;
        case "sniper":
            burst(0.5, 1500, 0.6, 1.0 * v, "lowpass", 90);
            break;
        case "shotgun":
            burst(0.32, 1400, 0.5, 1.0 * v, "lowpass", 100);
            break;
        case "lmg":
            burst(0.14, 2000, 0.6, 0.85 * v, "lowpass", 110);
            break;
        case "heavy":
            burst(0.2, 1200, 0.5, 1.0 * v, "lowpass", 70);
            break;
        case "rocket":
            burst(0.5, 900, 0.5, 0.8 * v, "lowpass", 60);
            break;
        case "boom":
            burst(1.1, 520, 0.4, 1.2 * v, "lowpass", 55);
            break;
        case "hit":
            tone(1200, 0.06, 0.25 * v, "square");
            break;
        case "head":
            tone(1800, 0.09, 0.3 * v, "square");
            tone(2400, 0.07, 0.2 * v, "triangle");
            break;
        case "kill":
            tone(900, 0.12, 0.3 * v, "square", 1800);
            break;
        case "reload":
            burst(0.05, 4000, 2, 0.4 * v, "bandpass");
            setTimeout(()=>burst(0.06, 2500, 2, 0.4 * v, "bandpass"), 220);
            break;
        case "melee":
            burst(0.12, 1800, 1, 0.5 * v, "bandpass");
            break;
        case "hurt":
            tone(160, 0.18, 0.35 * v, "sawtooth", 80);
            break;
        case "heal":
            tone(500, 0.3, 0.2 * v, "sine", 900);
            break;
        case "empty":
            tone(300, 0.04, 0.2 * v, "square");
            break;
        case "switch":
            burst(0.06, 3000, 1.5, 0.3 * v, "bandpass");
            break;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/game/bots.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BOT_KINDS",
    ()=>BOT_KINDS,
    "Bot",
    ()=>Bot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$world$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/world.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/weapons.ts [app-client] (ecmascript)");
;
;
const BOT_KINDS = {
    dm: {
        hp: 100,
        speed: 4.7,
        dmg: 11,
        rpm: 520,
        spread: 3.2,
        range: 75,
        scale: 1,
        melee: false,
        react: 0.45
    },
    grunt: {
        hp: 60,
        speed: 3.9,
        dmg: 8,
        rpm: 420,
        spread: 4.2,
        range: 55,
        scale: 1,
        melee: false,
        react: 0.5
    },
    rusher: {
        hp: 45,
        speed: 6.1,
        dmg: 16,
        rpm: 80,
        spread: 0,
        range: 3,
        scale: 1,
        melee: true,
        react: 0.1
    },
    heavy: {
        hp: 260,
        speed: 2.7,
        dmg: 10,
        rpm: 700,
        spread: 4.8,
        range: 60,
        scale: 1.22,
        melee: false,
        react: 0.6
    }
};
function angDiff(a, b) {
    let d = b - a;
    while(d > Math.PI)d -= Math.PI * 2;
    while(d < -Math.PI)d += Math.PI * 2;
    return d;
}
class Bot {
    kind;
    ent;
    body;
    cfg;
    path;
    pi;
    repathT;
    target;
    seen;
    seenT;
    scanT;
    fireT;
    burst;
    pauseT;
    meleeCd;
    strafe;
    strafeT;
    hold;
    stuckT;
    chkT;
    lx;
    lz;
    jumpCd;
    respawnT;
    goalX;
    goalZ;
    dmgMul;
    constructor(id, name, team, kind, wpn, hpMul = 1, dmgMul = 1){
        this.kind = kind;
        this.path = [];
        this.pi = 0;
        this.repathT = 0;
        this.target = null;
        this.seen = false;
        this.seenT = 0;
        this.scanT = Math.random() * 0.3;
        this.fireT = 0;
        this.burst = 0;
        this.pauseT = 0.3;
        this.meleeCd = 0;
        this.strafe = Math.random() < 0.5 ? 1 : -1;
        this.strafeT = 1;
        this.hold = 12 + Math.random() * 14;
        this.stuckT = 0;
        this.chkT = 0;
        this.lx = 0;
        this.lz = 0;
        this.jumpCd = 0;
        this.respawnT = 0;
        this.goalX = 1e9;
        this.goalZ = 1e9;
        this.cfg = BOT_KINDS[kind] ?? BOT_KINDS.dm;
        this.dmgMul = dmgMul;
        const hp = Math.round(this.cfg.hp * hpMul);
        this.body = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$world$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["newBody"])();
        this.ent = {
            id,
            name,
            team,
            isBot: true,
            kind,
            x: 0,
            y: 0,
            z: 0,
            yaw: 0,
            pitch: 0,
            stance: 0,
            scale: this.cfg.scale,
            hp,
            maxHp: hp,
            alive: false,
            speed: 0,
            wpn: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WEAPON_INDEX"][wpn] ?? 0,
            tx: 0,
            ty: 0,
            tz: 0,
            tyaw: 0,
            av: null,
            phase: 0,
            upd: 0
        };
    }
    spawn(p) {
        this.body = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$world$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["newBody"])(p[0], p[1], p[2]);
        this.ent.hp = this.ent.maxHp;
        this.ent.alive = true;
        this.ent.yaw = Math.atan2(p[0], p[2]);
        this.path = [];
        this.target = null;
        this.seenT = 0;
        this.sync();
        this.ent.tx = this.ent.x;
        this.ent.ty = this.ent.y;
        this.ent.tz = this.ent.z;
    }
    sync() {
        const e = this.ent;
        e.x = this.body.x;
        e.y = this.body.y;
        e.z = this.body.z;
        e.speed = Math.hypot(this.body.vx, this.body.vz);
    }
    damage(ctx, amt, fromId, w, head) {
        if (!this.ent.alive) return;
        this.ent.hp -= amt;
        if (this.seenT < 0.3) this.seenT = 0.3;
        if (this.ent.hp <= 0) {
            this.ent.hp = 0;
            this.ent.alive = false;
            this.respawnT = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULES"].respawnTime + 1;
            ctx.onKilled(this, fromId, w, head);
        }
    }
    update(dt, ctx) {
        const e = this.ent;
        if (!e.alive) {
            if (ctx.respawns) {
                this.respawnT -= dt;
                if (this.respawnT <= 0) this.spawn(ctx.spawnPoint(e.team));
            }
            return;
        }
        const b = this.body;
        const cfg = this.cfg;
        const w = ctx.world;
        const eyeY = b.y + 1.55;
        this.jumpCd -= dt;
        this.meleeCd -= dt;
        // ── 索敌 ──
        this.scanT -= dt;
        if (this.scanT <= 0) {
            this.scanT = 0.25 + Math.random() * 0.1;
            let best = null;
            let bd = 1e9;
            for (const t of ctx.enemies(this)){
                const d = (t.x - b.x) ** 2 + (t.z - b.z) ** 2 + ((t.y - b.y) * 2) ** 2;
                if (d < bd) {
                    bd = d;
                    best = t;
                }
            }
            this.target = best;
            if (best) {
                const dist = Math.sqrt(bd);
                const ch = (best.stance === 0 ? 1.15 : best.stance === 1 ? 0.75 : 0.3) * best.scale;
                this.seen = dist < cfg.range && (w.hasLOS(b.x, eyeY, b.z, best.x, best.y + ch, best.z) || w.hasLOS(b.x, eyeY, b.z, best.x, best.y + ch + 0.5 * best.scale, best.z));
            } else this.seen = false;
            if (!this.seen) this.seenT = 0;
        }
        if (this.seen) this.seenT += dt;
        const t = this.target;
        let mx = 0;
        let mz = 0;
        let speedMul = 1;
        if (t) {
            const dx = t.x - b.x;
            const dz = t.z - b.z;
            const dist = Math.hypot(dx, dz);
            const ch = (t.stance === 0 ? 1.15 : t.stance === 1 ? 0.75 : 0.3) * t.scale;
            const want = Math.atan2(-dx, -dz);
            const turn = (cfg.melee ? 9 : 5.5) * dt;
            const diff = angDiff(e.yaw, want);
            e.yaw += Math.max(-turn, Math.min(turn, diff));
            const wantPitch = Math.atan2(t.y + ch - eyeY, Math.max(0.1, dist));
            e.pitch += (wantPitch - e.pitch) * Math.min(1, dt * 8);
            let follow = true;
            if (this.seen && !cfg.melee) {
                this.strafeT -= dt;
                if (this.strafeT <= 0) {
                    this.strafeT = 1 + Math.random() * 1.8;
                    this.strafe = Math.random() < 0.5 ? 1 : -1;
                }
                if (dist < this.hold) {
                    follow = false;
                    const nx = dx / (dist || 1);
                    const nz = dz / (dist || 1);
                    mx = -nz * this.strafe;
                    mz = nx * this.strafe;
                    if (dist < 6) {
                        mx -= nx * 0.8;
                        mz -= nz * 0.8;
                    }
                    speedMul = 0.6;
                }
            }
            if (follow) {
                this.repathT -= dt;
                const moved = Math.hypot(t.x - this.goalX, t.z - this.goalZ);
                if (this.repathT <= 0 || moved > 8) {
                    this.repathT = 1 + Math.random() * 0.6;
                    this.goalX = t.x;
                    this.goalZ = t.z;
                    const p = w.findPath(b.x, b.y, b.z, t.x, t.y, t.z, 3500);
                    this.path = p ?? [];
                    this.pi = 0;
                }
                if (this.pi < this.path.length) {
                    const wp = this.path[this.pi];
                    const px = wp[0] - b.x;
                    const pz = wp[2] - b.z;
                    const pd = Math.hypot(px, pz);
                    if (pd < 0.5) this.pi++;
                    else {
                        mx = px / pd;
                        mz = pz / pd;
                    }
                    // 跳过过近的后续路点
                    if (this.pi + 1 < this.path.length) {
                        const n2 = this.path[this.pi + 1];
                        if (Math.hypot(n2[0] - b.x, n2[2] - b.z) < 0.9 && Math.abs(n2[1] - b.y) < 0.6) this.pi++;
                    }
                } else if (dist > 1.2 && (this.seen || this.path.length === 0)) {
                    mx = dx / (dist || 1);
                    mz = dz / (dist || 1);
                }
                if (cfg.melee && dist < 1.3) {
                    mx = 0;
                    mz = 0;
                }
            }
            // ── 射击 ──
            if (this.seen && this.seenT > cfg.react * (ctx.diff === 1 ? 1.5 : ctx.diff === 3 ? 0.6 : 1)) {
                if (cfg.melee) {
                    if (dist < 2.0 && this.meleeCd <= 0) {
                        this.meleeCd = 0.8;
                        ctx.hit(t, cfg.dmg * this.dmgMul, false, this);
                    }
                } else if (Math.abs(angDiff(e.yaw, want)) < 0.13) {
                    if (this.burst > 0) {
                        this.fireT -= dt;
                        if (this.fireT <= 0) {
                            this.fireT += 60 / cfg.rpm;
                            this.burst--;
                            this.shoot(ctx, t, eyeY, ch);
                        }
                    } else {
                        this.pauseT -= dt;
                        if (this.pauseT <= 0) {
                            this.burst = 4 + Math.floor(Math.random() * 7);
                            this.pauseT = 0.35 + Math.random() * 0.7;
                            this.fireT = 0;
                        }
                    }
                }
            }
        } else {
            this.seen = false;
        }
        // ── 移动 ──
        const sp = cfg.speed * speedMul;
        const k = Math.min(1, dt * 9);
        b.vx += (mx * sp - b.vx) * k;
        b.vz += (mz * sp - b.vz) * k;
        w.moveBody(b, dt);
        // 卡住检测
        this.chkT += dt;
        if (this.chkT >= 0.45) {
            const moved = Math.hypot(b.x - this.lx, b.z - this.lz);
            this.lx = b.x;
            this.lz = b.z;
            this.chkT = 0;
            if ((mx !== 0 || mz !== 0) && moved < 0.12) {
                this.stuckT += 1;
                if (b.onGround && this.jumpCd <= 0) {
                    b.vy = 8;
                    this.jumpCd = 1.2;
                }
                if (this.stuckT >= 2) {
                    this.repathT = 0;
                    this.stuckT = 0;
                    this.strafe = -this.strafe;
                }
            } else this.stuckT = 0;
        }
        e.phase += Math.hypot(b.vx, b.vz) * dt * 1.9;
        this.sync();
    }
    shoot(ctx, t, eyeY, ch) {
        const b = this.body;
        let dx = t.x - b.x;
        let dy = t.y + ch - eyeY;
        let dz = t.z - b.z;
        const len = Math.hypot(dx, dy, dz) || 1;
        dx /= len;
        dy /= len;
        dz /= len;
        const sp = this.cfg.spread * (ctx.diff === 1 ? 1.35 : ctx.diff === 3 ? 0.8 : 1) * Math.PI / 180;
        const a = Math.random() * Math.PI * 2;
        const r = Math.tan(sp) * Math.sqrt(Math.random());
        // 构造与方向垂直的两个轴
        let rx = -dz;
        let rz = dx;
        const rl = Math.hypot(rx, rz) || 1;
        rx /= rl;
        rz /= rl;
        const ux = dy * rz;
        const uy = dz * rx - dx * rz;
        const uz = -dy * rx;
        let fx = dx + (rx * Math.cos(a) + ux * Math.sin(a)) * r;
        let fy = dy + uy * Math.sin(a) * r;
        let fz = dz + (rz * Math.cos(a) + uz * Math.sin(a)) * r;
        const fl = Math.hypot(fx, fy, fz) || 1;
        fx /= fl;
        fy /= fl;
        fz /= fl;
        const maxR = this.cfg.range + 15;
        const tw = ctx.world.raycast(b.x, eyeY, b.z, fx, fy, fz, maxR);
        let bestT = tw;
        let bestEnt = null;
        let head = false;
        for (const en of ctx.enemies(this)){
            const h = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$world$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rayVsEntity"])(b.x, eyeY, b.z, fx, fy, fz, en, Math.min(tw, maxR));
            if (h && h.t < bestT) {
                bestT = h.t;
                bestEnt = en;
                head = h.head;
            }
        }
        if (bestEnt) ctx.hit(bestEnt, this.cfg.dmg * this.dmgMul * (head ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULES"].headMul : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULES"].bodyMul), head, this);
        ctx.shotFx(this, [
            b.x + fx * bestT,
            eyeY + fy * bestT,
            b.z + fz * bestT
        ]);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/game/engine.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Game",
    ()=>Game
]);
/* eslint-disable @typescript-eslint/no-explicit-any */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.module.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$world$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/world.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$maps$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/maps.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/weapons.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$render$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/render.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$net$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/net.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/audio.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$minimap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/minimap.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$fx$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/fx.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$bots$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/bots.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$keybinds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/keybinds.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
;
;
;
;
const r2 = (v)=>Math.round(v * 100) / 100;
const clamp = (v, a, b)=>Math.max(a, Math.min(b, v));
function angDiff(a, b) {
    let d = b - a;
    while(d > Math.PI)d -= Math.PI * 2;
    while(d < -Math.PI)d += Math.PI * 2;
    return d;
}
function wrapPi(a) {
    while(a > Math.PI)a -= Math.PI * 2;
    while(a < -Math.PI)a += Math.PI * 2;
    return a;
}
const BOT_NAMES = [
    "Alpha",
    "Bravo",
    "Charlie",
    "Delta",
    "Echo",
    "Foxtrot",
    "Golf",
    "Hotel",
    "India",
    "Juliet",
    "Kilo",
    "Lima",
    "Mike",
    "Nova",
    "Oscar",
    "Papa",
    "Quebec",
    "Romeo",
    "Sierra",
    "Tango",
    "Victor",
    "Whiskey",
    "Xray",
    "Zulu"
];
const DM_WEAPONS = [
    "m4a1",
    "ak47",
    "mp5",
    "famas",
    "scarh",
    "vector",
    "p90"
];
const ENEMY_TEAM = 5;
const HEIGHTS = [
    1.8,
    1.3,
    0.55
];
const EYES = [
    1.65,
    1.15,
    0.5
];
class Game {
    hud;
    cfg;
    container;
    renderer = null;
    scene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scene"]();
    vmScene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scene"]();
    cam = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"](78, 1, 0.08, 400);
    vmCam = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"](58, 1, 0.01, 10);
    fx;
    world;
    map;
    net;
    raf = 0;
    lastT = 0;
    time = 0;
    disposed = false;
    fpsAcc = 0;
    fpsN = 0;
    // 房间
    room = null;
    isHost = false;
    mode = "tdm";
    team = 0;
    teamCount = 2;
    players = new Map();
    ents = new Map();
    bots = new Map();
    selfEnt;
    game = {
        sc: [
            0,
            0,
            0,
            0
        ],
        wave: 0,
        phase: "play",
        en: 0,
        st: {},
        win: -1
    };
    // 本地玩家
    p = {
        body: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$world$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["newBody"])(),
        yaw: 0,
        pitch: 0,
        kickP: 0,
        kickY: 0,
        hp: 100,
        alive: false,
        stance: 0,
        slide: 0,
        slideCd: 0,
        slideX: 0,
        slideZ: 0,
        stamina: 100,
        exhausted: false,
        sprinting: false,
        staminaDelay: 0,
        slot: 0,
        w: [],
        switchT: 0,
        healCharges: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULES"].healUses,
        healT: 0,
        healAcc: 0,
        eye: 1.65,
        stepOff: 0,
        bob: 0,
        ads: 0,
        respawnT: 0,
        waiting: false,
        protect: 0,
        bloom: 0,
        meleeT: 0,
        swing: 0,
        vmKick: 0,
        fireBuf: 0,
        flash: 0,
        last: {
            from: "",
            w: 0,
            head: false
        },
        kills: 0,
        deaths: 0,
        hs: 0,
        speed: 0,
        reloadTotal: 1
    };
    pendingLoadout;
    loadout;
    // 输入
    keys = new Set();
    binds = {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$keybinds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_BINDS"]
    };
    skipMouse = 0;
    mouseL = false;
    mouseR = false;
    locked = false;
    canvas = null;
    // 视图模型
    vmRoot = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
    vmWeapons = [];
    vmFlash = [];
    vmBuiltFor = [];
    // 战斗
    projs = [];
    projSeq = 0;
    shake = 0;
    feedSeq = 0;
    feed = [];
    banner = "";
    bannerT = 0;
    hitSeq = 0;
    hitHead = false;
    killSeq = 0;
    dmgFlash = 0;
    dmgAngle = 0;
    showBoard = false;
    statusErr = "";
    status = "connecting";
    // 小地图
    miniCv = null;
    miniBase = null;
    miniT = 0;
    // 房主逻辑
    netT = 0;
    botNetT = 0;
    gameNetT = 0;
    botSeq = 0;
    shotParity = 0;
    wave = {
        n: 0,
        state: "break",
        breakT: 6,
        queue: [],
        spawnT: 0,
        overT: 0
    };
    roundOverT = 0;
    botCtx;
    deadBotAt = new Map();
    onExit = ()=>{};
    constructor(container, cfg){
        this.container = container;
        this.cfg = cfg;
        this.binds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$keybinds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadBinds"])();
        this.loadout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sanitizeLoadout"])(cfg.loadout);
        this.pendingLoadout = this.loadout;
        this.hud = {
            status: "connecting",
            error: "",
            locked: false,
            hp: 100,
            stamina: 100,
            exhausted: false,
            sprinting: false,
            stance: 0,
            sliding: false,
            slot: 0,
            weapons: [],
            reloadProg: 0,
            heal: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULES"].healUses,
            healing: false,
            healProg: 0,
            alive: false,
            respawnIn: 0,
            waiting: false,
            hitSeq: 0,
            hitHead: false,
            killSeq: 0,
            dmgFlash: 0,
            dmgAngle: 0,
            ads: false,
            scope: false,
            spread: 2,
            feed: [],
            mode: "tdm",
            mapName: "",
            teamCount: 2,
            scores: [
                0,
                0,
                0,
                0
            ],
            scoreLimit: 30,
            myTeam: 0,
            wave: 0,
            enemiesLeft: 0,
            banner: "",
            bannerT: 0,
            phase: "play",
            board: [],
            showBoard: false,
            roomId: cfg.roomId,
            players: 1,
            fps: 0,
            kills: 0,
            deaths: 0,
            headshots: 0,
            protect: false,
            isHost: false
        };
    }
    // ───────────────────────── 启动 / 销毁 ─────────────────────────
    async start() {
        this.setupRenderer();
        this.net = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$net$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Net"](this.cfg.pid, this.cfg.roomId);
        this.net.onMsg = (m)=>this.onNet(m);
        this.net.onClose = (r)=>this.fatal(r);
        try {
            const w = await this.net.connect(this.cfg.name, this.cfg.team);
            if (this.disposed) return;
            this.onWelcome(w);
        } catch (e) {
            this.status = "error";
            this.statusErr = e?.message || "连接失败";
            return;
        }
        this.status = "playing";
        this.lastT = performance.now() / 1000;
        this.raf = requestAnimationFrame(this.loop);
    }
    fatal(reason) {
        if (this.disposed) return;
        this.status = "error";
        this.statusErr = reason;
        this.onExit(reason);
    }
    dispose() {
        this.disposed = true;
        cancelAnimationFrame(this.raf);
        window.removeEventListener("resize", this.onResize);
        document.removeEventListener("keydown", this.onKeyDown);
        document.removeEventListener("keyup", this.onKeyUp);
        document.removeEventListener("pointerlockchange", this.onLockChange);
        document.removeEventListener("mousemove", this.onMouseMove);
        document.removeEventListener("mousedown", this.onMouseDown);
        document.removeEventListener("mouseup", this.onMouseUp);
        document.removeEventListener("wheel", this.onWheel);
        window.removeEventListener("blur", this.onBlur);
        if (document.pointerLockElement) document.exitPointerLock();
        this.net?.close();
        if (this.renderer) {
            this.renderer.dispose();
            this.renderer.domElement.remove();
        }
    }
    setupRenderer() {
        const r = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["WebGLRenderer"]({
            antialias: false,
            powerPreference: "high-performance"
        });
        r.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
        r.setSize(this.container.clientWidth, this.container.clientHeight);
        r.autoClear = false;
        r.domElement.style.cssText = "display:block;width:100%;height:100%;";
        this.container.appendChild(r.domElement);
        this.renderer = r;
        this.canvas = r.domElement;
        window.addEventListener("resize", this.onResize);
        document.addEventListener("keydown", this.onKeyDown);
        document.addEventListener("keyup", this.onKeyUp);
        document.addEventListener("pointerlockchange", this.onLockChange);
        document.addEventListener("mousemove", this.onMouseMove);
        document.addEventListener("mousedown", this.onMouseDown);
        document.addEventListener("mouseup", this.onMouseUp);
        document.addEventListener("wheel", this.onWheel, {
            passive: false
        });
        window.addEventListener("blur", this.onBlur);
        r.domElement.addEventListener("contextmenu", (e)=>e.preventDefault());
        this.onResize();
    }
    onResize = ()=>{
        if (!this.renderer) return;
        const w = this.container.clientWidth || window.innerWidth;
        const h = this.container.clientHeight || window.innerHeight;
        this.renderer.setSize(w, h);
        this.cam.aspect = w / h;
        this.cam.updateProjectionMatrix();
        this.vmCam.aspect = w / h;
        this.vmCam.updateProjectionMatrix();
    };
    onWelcome(m) {
        this.room = m.room;
        this.isHost = m.room.hostId === this.cfg.pid;
        this.mode = m.room.mode;
        this.team = m.you.team;
        this.teamCount = this.mode === "ffa4" ? 4 : this.mode === "defense" ? 1 : 2;
        for (const p of m.players)this.players.set(p.id, {
            name: p.name,
            team: p.team
        });
        this.players.set(this.cfg.pid, {
            name: this.cfg.name,
            team: this.team
        });
        this.net.onMsg = (x)=>this.onNet(x);
        this.map = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$maps$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildMap"])(m.room.mapId);
        this.world = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$world$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["World"](this.map);
        this.initScene();
        this.selfEnt = {
            id: this.cfg.pid,
            name: this.cfg.name,
            team: this.team,
            isBot: false,
            kind: "human",
            x: 0,
            y: 0,
            z: 0,
            yaw: 0,
            pitch: 0,
            stance: 0,
            scale: 1,
            hp: 100,
            maxHp: 100,
            alive: false,
            speed: 0,
            wpn: 0,
            tx: 0,
            ty: 0,
            tz: 0,
            tyaw: 0,
            av: null,
            phase: 0,
            upd: 0
        };
        this.miniBase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$minimap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderMapCanvas"])(this.map, 220, false);
        this.respawn();
        if (this.isHost) this.hostInit();
        this.showBannerLocal(this.mode === "defense" ? "坚守据点！敌人即将从四个角落来袭" : "战斗开始！", 4);
    }
    initScene() {
        const map = this.map;
        this.scene.background = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](map.sky);
        this.scene.fog = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fog"](map.fog, 50, 190);
        this.scene.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HemisphereLight"](0xffffff, 0x9aa7b5, 1.55));
        const sun = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DirectionalLight"](0xffffff, 1.9);
        sun.position.set(60, 120, 40);
        this.scene.add(sun);
        this.scene.add((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$render$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildWorldMesh"])(map.boxes));
        // 方块云
        const cm = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
            color: 0xffffff,
            fog: false,
            transparent: true,
            opacity: 0.92
        });
        const cg = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](1, 1, 1);
        for(let i = 0; i < 22; i++){
            const c = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](cg, cm);
            c.scale.set(14 + Math.random() * 26, 3, 9 + Math.random() * 14);
            c.position.set((Math.random() - 0.5) * 340, 70 + Math.random() * 25, (Math.random() - 0.5) * 340);
            this.scene.add(c);
        }
        this.vmScene.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HemisphereLight"](0xffffff, 0x8899aa, 2.0));
        const vs = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DirectionalLight"](0xffffff, 1.4);
        vs.position.set(1, 2, 1);
        this.vmScene.add(vs);
        this.vmScene.add(this.vmRoot);
        this.fx = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$fx$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fx"](this.scene);
        this.cam.rotation.order = "YXZ";
    }
    // ───────────────────────── 网络 ─────────────────────────
    onNet(m) {
        switch(m.t){
            case "join":
                this.players.set(m.p.id, {
                    name: m.p.name,
                    team: m.p.team
                });
                this.pushFeedText(`${m.p.name} 加入了战场`);
                break;
            case "leave":
                {
                    const info = this.players.get(m.id);
                    this.players.delete(m.id);
                    this.removeEnt(m.id);
                    if (info) this.pushFeedText(`${info.name} 离开了战场`);
                    break;
                }
            case "team":
                {
                    const pl = this.players.get(m.id);
                    if (pl) pl.team = m.team;
                    const e = this.ents.get(m.id);
                    if (e) e.team = m.team;
                    break;
                }
            case "st":
                this.updateRemote(m);
                break;
            case "bots":
                this.updateBots(m.l);
                break;
            case "ev":
                this.onEvent(m.from, m.d);
                break;
        }
    }
    evAll(d) {
        this.net.ev("all", d);
    }
    onEvent(from, d) {
        switch(d.k){
            case "hit":
                if (d.v === this.cfg.pid) this.damageSelf(d.dmg, d.head, d.from, d.w, d.sx, d.sz);
                else if (this.isHost) this.bots.get(d.v)?.damage(this.botCtx, d.dmg, d.from, d.w, d.head);
                break;
            case "kill":
                this.onKill(d);
                break;
            case "shot":
                {
                    const o = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](d.o[0], d.o[1], d.o[2]);
                    const w = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WEAPONS"][d.w] ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WEAPONS"][0];
                    for (const e of d.e)this.fx.tracer(o, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](e[0], e[1], e[2]), 0xffe9a0);
                    this.playPos(this.sfxFor(w), o.x, o.z, 0.8);
                    break;
                }
            case "proj":
                this.spawnProj(d.id, false, d.kind, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WEAPONS"][d.w] ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WEAPONS"][0], new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](d.p[0], d.p[1], d.p[2]), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](d.v[0], d.v[1], d.v[2]), d.g, d.w);
                break;
            case "boom":
                {
                    const i = this.projs.findIndex((q)=>q.id === d.id);
                    if (i >= 0) this.removeProj(i);
                    this.explodeVisual(d.p[0], d.p[1], d.p[2], d.r);
                    break;
                }
            case "game":
                this.game = {
                    sc: d.sc,
                    wave: d.wave,
                    phase: d.phase,
                    en: d.en,
                    st: d.st,
                    win: d.win
                };
                break;
            case "banner":
                this.showBannerLocal(d.text, d.secs);
                break;
            case "revive":
                if (!this.p.alive) this.respawn();
                if (d.restock) this.restock();
                break;
            case "reset":
                this.p.kills = 0;
                this.p.deaths = 0;
                this.respawn();
                break;
        }
    }
    sfxFor(w) {
        if (w.id === "rpg") return "rocket";
        if (w.id === "hmg") return "heavy";
        if (w.cat === "pistol") return "pistol";
        if (w.cat === "melee") return "melee";
        return w.cat;
    }
    playPos(s, x, z, base = 1) {
        const b = this.p.body;
        const d = Math.hypot(x - b.x, z - b.z);
        const v = Math.pow(clamp(1 - d / 90, 0, 1), 1.5) * base;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sfx"])(s, v);
    }
    // ───────────────────────── 实体 (远程玩家 / 机器人) ─────────────────────────
    entKind(e) {
        const hs = (c)=>c;
        if (e.isBot && e.team === ENEMY_TEAM) {
            if (e.kind === "rusher") return {
                torso: hs(0x8a2a2a),
                skin: 0xa8d07a,
                legs: 0x3a1f1f,
                helmet: 0x552222,
                scale: e.scale
            };
            if (e.kind === "heavy") return {
                torso: hs(0x3a3f46),
                skin: 0x8fbf7a,
                legs: 0x22262b,
                helmet: 0x15181c,
                scale: e.scale
            };
            return {
                torso: hs(0x5b3a2e),
                skin: 0x8fbf7a,
                legs: 0x2b2b2b,
                helmet: 0x3a2a2a,
                scale: e.scale
            };
        }
        const tc = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEAM_COLORS"][e.team % 4];
        return {
            torso: tc,
            skin: 0xe0b48a,
            legs: 0x2e3440,
            helmet: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](tc).multiplyScalar(0.55).getHex(),
            scale: 1
        };
    }
    ensureAvatar(e) {
        if (e.av) return e.av;
        const av = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$render$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeAvatar"])(this.entKind(e));
        this.scene.add(av.group);
        e.av = av;
        return av;
    }
    removeEnt(id) {
        const e = this.ents.get(id);
        if (e?.av) this.scene.remove(e.av.group);
        this.ents.delete(id);
    }
    newRemote(id, isBot) {
        const info = this.players.get(id);
        const e = {
            id,
            name: info?.name ?? (isBot ? "BOT" : "玩家"),
            team: info?.team ?? 0,
            isBot,
            kind: isBot ? "dm" : "human",
            x: 0,
            y: 0,
            z: 0,
            yaw: 0,
            pitch: 0,
            stance: 0,
            scale: 1,
            hp: 100,
            maxHp: 100,
            alive: false,
            speed: 0,
            wpn: 0,
            tx: 0,
            ty: 0,
            tz: 0,
            tyaw: 0,
            av: null,
            phase: 0,
            upd: this.time
        };
        this.ents.set(id, e);
        return e;
    }
    setAlive(e, alive) {
        if (e.alive && !alive) {
            const c = e.isBot && e.team === ENEMY_TEAM ? 0x7a2a2a : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEAM_COLORS"][e.team % 4];
            this.fx.burst(e.x, e.y + 1, e.z, c, 16, 4.5, 0.2, 0.9);
        }
        e.alive = alive;
    }
    updateRemote(m) {
        let e = this.ents.get(m.id);
        if (!e) e = this.newRemote(m.id, false);
        const info = this.players.get(m.id);
        if (info) {
            e.name = info.name;
            e.team = info.team;
        }
        const wasAlive = e.alive;
        e.tx = m.x;
        e.ty = m.y;
        e.tz = m.z;
        e.tyaw = m.yw;
        e.pitch = m.pt;
        e.stance = m.s;
        e.wpn = m.w;
        e.hp = m.hp;
        e.speed = m.sp;
        e.upd = this.time;
        if (m.al && !wasAlive) {
            e.x = m.x;
            e.y = m.y;
            e.z = m.z;
            e.yaw = m.yw;
            e.alive = true;
        } else if (!m.al && wasAlive) this.setAlive(e, false);
    }
    updateBots(list) {
        if (this.isHost) return;
        const seen = new Set();
        for (const b of list){
            const [id, x, y, z, yaw, pitch, stance, hp, al, wpn, sp, kind, team, name] = b;
            seen.add(id);
            let e = this.ents.get(id);
            if (!e) {
                e = this.newRemote(id, true);
                e.kind = kind;
                e.team = team;
                e.name = name;
                e.scale = kind === "heavy" ? 1.22 : 1;
            }
            const wasAlive = e.alive;
            e.tx = x;
            e.ty = y;
            e.tz = z;
            e.tyaw = yaw;
            e.pitch = pitch;
            e.stance = stance;
            e.hp = hp;
            e.wpn = wpn;
            e.speed = sp;
            e.upd = this.time;
            if (al && !wasAlive) {
                e.x = x;
                e.y = y;
                e.z = z;
                e.yaw = yaw;
                e.alive = true;
            } else if (!al && wasAlive) this.setAlive(e, false);
        }
        for (const [id, e] of Array.from(this.ents))if (e.isBot && !seen.has(id)) this.removeEnt(id);
    }
    updateEnts(dt) {
        const k = 1 - Math.exp(-dt * 14);
        for (const e of this.ents.values()){
            const own = this.isHost && e.isBot;
            if (!own) {
                e.x += (e.tx - e.x) * k;
                e.y += (e.ty - e.y) * k;
                e.z += (e.tz - e.z) * k;
                e.yaw += angDiff(e.yaw, e.tyaw) * k;
                if (Math.hypot(e.tx - e.x, e.tz - e.z) > 6) {
                    e.x = e.tx;
                    e.z = e.tz;
                    e.y = e.ty;
                }
                e.phase += e.speed * dt * 1.9;
            }
            if (e.alive) {
                const av = this.ensureAvatar(e);
                av.group.visible = true;
                av.group.position.set(e.x, e.y, e.z);
                av.group.rotation.y = e.yaw;
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$render$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setAvatarWeapon"])(av, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WEAPONS"][e.wpn] ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WEAPONS"][0]);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$render$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["animateAvatar"])(av, e.phase, e.speed, e.stance === 3 ? 1 : e.stance, dt, 1, (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WEAPONS"][e.wpn] ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WEAPONS"][0]).cat === "melee");
                // 队友名牌
                if (!e.isBot && e.team === this.team && !av.tag) {
                    av.tag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$render$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeTag"])(e.name, "#" + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEAM_COLORS"][e.team % 4].toString(16).padStart(6, "0"));
                    av.group.add(av.tag);
                }
                if (av.tag) av.tag.visible = e.team === this.team;
            } else if (e.av) e.av.group.visible = false;
        }
    }
    // 与本局敌对的存活实体
    hostiles(team, includeSelf = true) {
        const out = [];
        for (const e of this.ents.values())if (e.alive && e.team !== team) out.push(e);
        if (includeSelf && this.p.alive && this.team !== team) out.push(this.selfEnt);
        return out;
    }
    // ───────────────────────── 武器 / 出生 ─────────────────────────
    mkW(id) {
        const def = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WEAPON_BY_ID"][id];
        return {
            def,
            mag: def.mag,
            reserve: def.mag * def.mags,
            cd: 0,
            reloadT: 0
        };
    }
    setLoadout(l) {
        this.pendingLoadout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sanitizeLoadout"])(l);
        if (!this.p.alive && !this.p.waiting) return;
    }
    restock() {
        for (const w of this.p.w){
            w.mag = w.def.mag;
            w.reserve = w.def.mag * w.def.mags;
            w.reloadT = 0;
        }
        this.p.healCharges = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULES"].healUses;
        this.p.hp = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULES"].maxHp;
    }
    applyLoadout() {
        this.loadout = this.pendingLoadout;
        const ids = [
            this.loadout.primary,
            this.loadout.secondary,
            this.loadout.heavy
        ];
        this.p.w = ids.map((i)=>this.mkW(i));
        this.buildViewModels(ids);
    }
    buildViewModels(ids) {
        ids.forEach((id, i)=>{
            if (this.vmBuiltFor[i] === id) return;
            this.vmBuiltFor[i] = id;
            if (this.vmWeapons[i]) this.vmRoot.remove(this.vmWeapons[i]);
            const def = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WEAPON_BY_ID"][id];
            const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
            const model = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$render$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildGunModel"])(def);
            g.add(model);
            const sk = 0xe0b48a;
            const sl = 0x36402f;
            if (def.cat === "melee") {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$render$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bx"])(0.08, 0.08, 0.45, 0.02, -0.08, 0.2, sl, g);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$render$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bx"])(0.08, 0.08, 0.1, 0, -0.01, 0.02, sk, g);
            } else {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$render$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bx"])(0.08, 0.08, 0.5, 0.03, -0.13, 0.22, sl, g);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$render$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bx"])(0.075, 0.075, 0.1, 0.0, -0.075, -0.02, sk, g);
                if (def.cat !== "pistol") {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$render$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bx"])(0.08, 0.08, 0.5, -0.1, -0.14, -def.len * 0.2 + 0.28, sl, g);
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$render$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bx"])(0.075, 0.075, 0.1, -0.005, -0.075, -def.len * 0.5, sk, g);
                }
            }
            const fl = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.1, 0.1, 0.12), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: 0xffdd66
            }));
            fl.position.set(0, 0.03, -def.len - 0.06);
            fl.visible = false;
            g.add(fl);
            g.visible = false;
            this.vmFlash[i] = fl;
            this.vmWeapons[i] = g;
            this.vmRoot.add(g);
        });
    }
    spawnList(team) {
        const m = this.map;
        if (m.type === "defense") return m.defSpawns;
        const idx = m.type === "ffa" && this.mode === "tdm" ? [
            0,
            2
        ][team] ?? 0 : team;
        return m.spawns[idx] ?? m.spawns[0];
    }
    pickSpawn(team) {
        const list = this.spawnList(team);
        const foes = this.hostiles(team, true);
        let best = list[0];
        let bd = -1;
        for(let i = 0; i < 5; i++){
            const c = list[Math.floor(Math.random() * list.length)];
            let md = 1e9;
            for (const e of foes)md = Math.min(md, Math.hypot(c[0] - e.x, c[2] - e.z));
            if (md > bd) {
                bd = md;
                best = c;
            }
        }
        return best;
    }
    respawn() {
        const p = this.p;
        this.applyLoadout();
        const s = this.pickSpawn(this.team);
        p.body = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$world$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["newBody"])(s[0], s[1], s[2]);
        p.yaw = Math.atan2(s[0], s[2]);
        p.pitch = 0;
        p.kickP = p.kickY = 0;
        p.hp = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULES"].maxHp;
        p.stamina = 100;
        p.exhausted = false;
        p.staminaDelay = 0;
        p.stance = 0;
        p.slide = 0;
        p.healCharges = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULES"].healUses;
        p.healT = 0;
        p.slot = 0;
        p.switchT = 0.4;
        p.alive = true;
        p.waiting = false;
        p.respawnT = 0;
        p.protect = 2.5;
        p.ads = 0;
        p.eye = EYES[0];
        this.selfEnt.team = this.team;
        this.selfEnt.alive = true;
        this.pushState();
    }
    pushState() {
        const p = this.p;
        const b = p.body;
        this.net.state({
            t: "st",
            x: r2(b.x),
            y: r2(b.y),
            z: r2(b.z),
            yw: r2(p.yaw),
            pt: r2(p.pitch),
            s: p.slide > 0 ? 1 : p.stance,
            w: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WEAPON_INDEX"][p.w[p.slot]?.def.id ?? "m4a1"],
            hp: Math.round(p.hp),
            al: p.alive ? 1 : 0,
            sp: r2(p.speed)
        });
    }
    switchTeam(t) {
        if (this.mode === "defense" || t === this.team || t < 0 || t >= this.teamCount) return;
        this.team = t;
        this.players.set(this.cfg.pid, {
            name: this.cfg.name,
            team: t
        });
        this.net.raw({
            t: "team",
            team: t
        });
        this.p.alive = false;
        this.respawn();
    }
    // ───────────────────────── 输入 ─────────────────────────
    lock() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initAudio"])();
        this.canvas?.requestPointerLock();
    }
    onLockChange = ()=>{
        this.locked = document.pointerLockElement === this.canvas;
        if (this.locked) this.skipMouse = 3;
        else {
            this.mouseL = false;
            this.mouseR = false;
            this.keys.clear();
            this.showBoard = false;
        }
    };
    onBlur = ()=>{
        this.keys.clear();
        this.mouseL = this.mouseR = false;
    };
    onMouseMove = (e)=>{
        if (!this.locked || !this.p.alive) return;
        // 指针锁定切换 / 浏览器光标回绕时 movementX 会出现巨大跳变，
        // 直接使用会导致视角瞬间转向反方向。这里忽略最初几个事件并限幅。
        if (this.skipMouse > 0) {
            this.skipMouse--;
            return;
        }
        const mx = clamp(e.movementX, -160, 160);
        const my = clamp(e.movementY, -160, 160);
        if (mx === 0 && my === 0) return;
        const w = this.p.w[this.p.slot]?.def;
        const zoom = w ? 1 + (w.zoom - 1) * this.p.ads : 1;
        const sens = 0.0021 / Math.pow(zoom, 0.85);
        this.p.yaw = wrapPi(this.p.yaw - mx * sens);
        this.p.pitch = clamp(this.p.pitch - my * sens, -1.52, 1.52);
    };
    onMouseDown = (e)=>{
        if (!this.locked) return;
        if (e.button === 0) {
            this.mouseL = true;
            this.p.fireBuf = 0.18;
        } else if (e.button === 2) this.mouseR = true;
        e.preventDefault();
    };
    onMouseUp = (e)=>{
        if (e.button === 0) this.mouseL = false;
        else if (e.button === 2) this.mouseR = false;
    };
    onWheel = (e)=>{
        if (!this.locked) return;
        e.preventDefault();
        const d = e.deltaY > 0 ? 1 : -1;
        this.switchSlot((this.p.slot + d + 3) % 3);
    };
    onKeyDown = _s((e)=>{
        _s();
        if (!this.locked) return;
        const c = e.code;
        const bound = Object.values(this.binds).includes(c) || [
            "Space",
            "Tab",
            "ArrowUp",
            "ArrowDown"
        ].includes(c);
        if (bound) e.preventDefault();
        if (e.repeat) return;
        this.keys.add(c);
        const p = this.p;
        const b = this.binds;
        if (!p.alive) {
            if (c === b.scoreboard) this.showBoard = true;
            return;
        }
        if (c === b.slot1) this.switchSlot(0);
        else if (c === b.slot2) this.switchSlot(1);
        else if (c === b.slot3) this.switchSlot(2);
        else if (c === b.reload) this.startReload();
        else if (c === b.heal) this.useHeal();
        else if (c === b.scoreboard) this.showBoard = true;
        else if (c === b.prone) {
            p.slide = 0;
            this.setStance(p.stance === 2 ? 0 : 2);
        } else if (c === b.crouch) {
            if (this.key(b.sprint)) this.trySlide();
            else {
                p.slide = 0;
                this.setStance(p.stance === 1 ? 0 : 1);
            }
        }
    }, "aANiBLfxcxvWiwXnd34uF67X544=");
    onKeyUp = (e)=>{
        this.keys.delete(e.code);
        if (e.code === this.binds.scoreboard) this.showBoard = false;
    };
    key(c) {
        return this.keys.has(c);
    }
    act(a) {
        return this.keys.has(this.binds[a]);
    }
    setStance(s) {
        const p = this.p;
        const b = p.body;
        if (s === p.stance && !(p.slide > 0)) return;
        const h = HEIGHTS[s];
        if (h > b.h && !this.world.fits(b.x, b.y + 0.001, b.z, b.hw, h)) return;
        p.stance = s;
        b.h = h;
    }
    trySlide() {
        const p = this.p;
        const bd = p.body;
        if (p.slideCd > 0 || !bd.onGround || p.stance !== 0) return;
        if (p.stamina < __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULES"].slideCost) return;
        const fwd = (this.act("forward") ? 1 : 0) - (this.act("back") ? 1 : 0);
        const str = (this.act("right") ? 1 : 0) - (this.act("left") ? 1 : 0);
        if (fwd <= 0 && str === 0) return;
        const fx = -Math.sin(p.yaw);
        const fz = -Math.cos(p.yaw);
        const rx = Math.cos(p.yaw);
        const rz = -Math.sin(p.yaw);
        let dx = fx * fwd + rx * str;
        let dz = fz * fwd + rz * str;
        const l = Math.hypot(dx, dz) || 1;
        dx /= l;
        dz /= l;
        p.slide = 0.85;
        p.slideCd = 1.4;
        p.slideX = dx;
        p.slideZ = dz;
        p.stance = 1;
        bd.h = HEIGHTS[1];
        p.sprinting = false;
        // 滑铲消耗 1/4 体力，并在结束后延迟恢复
        p.stamina = Math.max(0, p.stamina - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULES"].slideCost);
        p.staminaDelay = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULES"].staminaRegenDelay;
    }
    // ───────────────────────── 武器逻辑 ─────────────────────────
    cur() {
        return this.p.w[this.p.slot];
    }
    switchSlot(s) {
        const p = this.p;
        if (s === p.slot || !p.alive || !p.w[s]) return;
        p.w[p.slot].reloadT = 0;
        p.slot = s;
        p.switchT = 0.4;
        p.ads = 0;
        p.healT = Math.max(0, p.healT);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sfx"])("switch", 0.6);
    }
    startReload() {
        const p = this.p;
        const w = this.cur();
        if (!w || !p.alive || w.reloadT > 0 || w.def.type === "melee") return;
        if (w.mag >= w.def.mag || w.reserve <= 0 || p.healT > 0 || p.switchT > 0) return;
        w.reloadT = w.def.reload;
        p.reloadTotal = w.def.reload;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sfx"])("reload", 0.7);
    }
    useHeal() {
        const p = this.p;
        if (!p.alive || p.healCharges <= 0 || p.healT > 0 || p.hp >= __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULES"].maxHp) return;
        p.healCharges--;
        p.healT = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULES"].healDuration;
        p.healAcc = 0;
        this.cur().reloadT = 0;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sfx"])("heal", 0.8);
    }
    camBasis() {
        const p = this.p;
        const pitch = clamp(p.pitch + p.kickP, -1.55, 1.55);
        const yaw = p.yaw + p.kickY;
        const cp = Math.cos(pitch);
        const f = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](-Math.sin(yaw) * cp, Math.sin(pitch), -Math.cos(yaw) * cp);
        const r = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](Math.cos(yaw), 0, -Math.sin(yaw));
        const u = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]().crossVectors(r, f).normalize();
        return {
            f,
            r,
            u
        };
    }
    eyePos() {
        const b = this.p.body;
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](b.x, b.y + this.p.eye, b.z);
    }
    currentSpread() {
        const p = this.p;
        const d = this.cur()?.def;
        if (!d) return 2;
        let sp = d.spread + (d.adsSpread - d.spread) * p.ads;
        const sf = clamp(p.speed / 6, 0, 1);
        sp *= 1 + sf * 0.9 * (1 - p.ads);
        if (!p.body.onGround) sp *= 2.2;
        if (p.stance === 1) sp *= 0.8;
        if (p.stance === 2) sp *= 0.6;
        return sp;
    }
    fire() {
        const p = this.p;
        const w = this.cur();
        const d = w.def;
        const wIdx = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WEAPON_INDEX"][d.id];
        w.mag--;
        w.cd = 60 / d.rpm;
        p.fireBuf = 0;
        const eye = this.eyePos();
        const { f, r, u } = this.camBasis();
        const muzzle = eye.clone().addScaledVector(f, 0.75).addScaledVector(r, 0.2).addScaledVector(u, -0.14);
        let sp = this.currentSpread();
        if (d.pellets === 1) sp += p.bloom * (1 - p.ads * 0.7);
        // 后坐力（视角上跳 + 少量随机水平偏移；视觉 kick 单独限幅，避免累积成抖动）
        const rad = Math.PI / 180;
        p.pitch = clamp(p.pitch + d.recoilV * 0.6 * rad * (0.8 + Math.random() * 0.4), -1.52, 1.52);
        p.yaw = wrapPi(p.yaw + (Math.random() * 2 - 1) * d.recoilH * 0.6 * rad);
        p.kickP = clamp(p.kickP + d.recoilV * 0.22 * rad, -0.12, 0.12);
        p.kickY = clamp(p.kickY + (Math.random() * 2 - 1) * d.recoilH * 0.18 * rad, -0.07, 0.07);
        p.bloom = Math.min(2.5, p.bloom + 0.12 * d.recoilV);
        p.vmKick = 1;
        p.flash = 0.045;
        this.vmFlash[p.slot].visible = true;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sfx"])(this.sfxFor(d), 1);
        if (d.type === "rocket" || d.type === "grenade") {
            const dir = this.spreadDir(f, r, u, sp);
            const id = `${this.cfg.pid}-${this.projSeq++}`;
            const grav = d.type === "grenade" ? 12 : 0;
            const vel = dir.clone().multiplyScalar(d.speed);
            this.spawnProj(id, true, d.type, d, muzzle.clone(), vel, grav, wIdx);
            this.evAll({
                k: "proj",
                id,
                kind: d.type,
                w: wIdx,
                p: [
                    muzzle.x,
                    muzzle.y,
                    muzzle.z
                ],
                v: [
                    vel.x,
                    vel.y,
                    vel.z
                ],
                g: grav
            });
            this.evAll({
                k: "shot",
                id: this.cfg.pid,
                o: [
                    muzzle.x,
                    muzzle.y,
                    muzzle.z
                ],
                e: [],
                w: wIdx
            });
            return;
        }
        const hits = new Map();
        const ends = [];
        const foes = this.hostiles(this.team, false);
        for(let i = 0; i < d.pellets; i++){
            const dir = this.spreadDir(f, r, u, sp);
            const maxR = d.maxRange;
            const tw = this.world.raycast(eye.x, eye.y, eye.z, dir.x, dir.y, dir.z, maxR);
            let bt = tw;
            let hit = null;
            let head = false;
            for (const e of foes){
                const h = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$world$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rayVsEntity"])(eye.x, eye.y, eye.z, dir.x, dir.y, dir.z, e, bt);
                if (h && h.t < bt) {
                    bt = h.t;
                    hit = e;
                    head = h.head;
                }
            }
            const px = eye.x + dir.x * bt;
            const py = eye.y + dir.y * bt;
            const pz = eye.z + dir.z * bt;
            if (hit) {
                const fall = bt <= d.range ? 1 : 1 - (1 - d.minMul) * Math.min(1, (bt - d.range) / Math.max(1, d.maxRange - d.range));
                const dmg = d.damage * fall * (head ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULES"].headMul : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULES"].bodyMul);
                const cur = hits.get(hit.id);
                if (cur) {
                    cur.dmg += dmg;
                    cur.head = cur.head || head;
                } else hits.set(hit.id, {
                    ent: hit,
                    dmg,
                    head
                });
                this.fx.burst(px, py, pz, head ? 0xff2222 : 0xb02a2a, head ? 8 : 5, 3.5, 0.1, 0.4);
            } else if (bt < maxR - 0.01) this.fx.burst(px, py, pz, 0xd8d2c0, 4, 3, 0.07, 0.35);
            if (i < 3 || d.pellets === 1) ends.push([
                r2(px),
                r2(py),
                r2(pz)
            ]);
            if (i < 3) this.fx.tracer(muzzle, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](px, py, pz), d.cat === "sniper" ? 0xfff6c0 : 0xffe9a0);
        }
        hits.forEach((h)=>{
            this.applyHit(h.ent, h.dmg, h.head, wIdx);
            this.hitSeq++;
            this.hitHead = h.head;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sfx"])(h.head ? "head" : "hit", 0.8);
        });
        this.evAll({
            k: "shot",
            id: this.cfg.pid,
            o: [
                r2(muzzle.x),
                r2(muzzle.y),
                r2(muzzle.z)
            ],
            e: ends,
            w: wIdx
        });
    }
    spreadDir(f, r, u, spDeg) {
        const sp = spDeg * Math.PI / 180;
        const a = Math.random() * Math.PI * 2;
        const rr = Math.tan(sp) * Math.sqrt(Math.random());
        return f.clone().addScaledVector(r, Math.cos(a) * rr).addScaledVector(u, Math.sin(a) * rr).normalize();
    }
    // 对目标造成伤害 (本地射击者调用)
    applyHit(t, dmg, head, wIdx) {
        const b = this.p.body;
        if (t.isBot) {
            if (this.isHost) this.bots.get(t.id)?.damage(this.botCtx, dmg, this.cfg.pid, wIdx, head);
            else this.net.ev("host", {
                k: "hit",
                v: t.id,
                dmg: r2(dmg),
                head,
                from: this.cfg.pid,
                w: wIdx
            });
        } else {
            this.net.ev(t.id, {
                k: "hit",
                v: t.id,
                dmg: r2(dmg),
                head,
                from: this.cfg.pid,
                w: wIdx,
                sx: r2(b.x),
                sz: r2(b.z)
            });
        }
    }
    meleeAttack() {
        const p = this.p;
        const w = this.cur();
        const d = w.def;
        w.cd = 60 / d.rpm;
        p.swing = Math.min(0.3, w.cd * 0.7);
        p.meleeT = 0.1;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sfx"])("melee", 0.7);
    }
    meleeHit() {
        const p = this.p;
        const d = this.cur().def;
        const eye = this.eyePos();
        const foes = this.hostiles(this.team, false);
        let best = null;
        for (const off of [
            0,
            -0.14,
            0.14
        ]){
            const yaw = p.yaw + off;
            const cp = Math.cos(p.pitch);
            const dx = -Math.sin(yaw) * cp;
            const dy = Math.sin(p.pitch);
            const dz = -Math.cos(yaw) * cp;
            const tw = this.world.raycast(eye.x, eye.y, eye.z, dx, dy, dz, d.range);
            for (const e of foes){
                const h = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$world$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rayVsEntity"])(eye.x, eye.y, eye.z, dx, dy, dz, e, Math.min(tw, d.range));
                if (h && (!best || h.t < best.t)) best = {
                    e,
                    t: h.t,
                    head: h.head
                };
            }
            if (best) break;
        }
        if (best) {
            const dmg = d.damage * (best.head ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULES"].headMul : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULES"].bodyMul);
            this.applyHit(best.e, dmg, best.head, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WEAPON_INDEX"][d.id]);
            this.hitSeq++;
            this.hitHead = best.head;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sfx"])(best.head ? "head" : "hit", 0.9);
            this.fx.burst(best.e.x, best.e.y + 1.2, best.e.z, 0xb02a2a, 8, 3, 0.1, 0.4);
        }
    }
    // ───────────────────────── 投射物 ─────────────────────────
    spawnProj(id, mine, kind, def, pos, vel, grav, wIdx) {
        const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
        if (kind === "rocket") {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$render$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bx"])(0.1, 0.1, 0.55, 0, 0, 0, 0x5a6b45, g);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$render$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bx"])(0.14, 0.14, 0.18, 0, 0, -0.3, 0xc0392b, g);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$render$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bx"])(0.06, 0.06, 0.2, 0, 0, 0.35, 0xffa030, g);
        } else (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$render$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bx"])(0.24, 0.24, 0.24, 0, 0, 0, 0x3d5a35, g);
        g.position.copy(pos);
        this.scene.add(g);
        this.projs.push({
            id,
            mine,
            kind,
            def,
            pos,
            vel,
            grav,
            life: kind === "rocket" ? 6 : 3.2,
            mesh: g,
            wIdx
        });
    }
    removeProj(i) {
        this.scene.remove(this.projs[i].mesh);
        this.projs.splice(i, 1);
    }
    updateProjs(dt) {
        for(let i = this.projs.length - 1; i >= 0; i--){
            const pr = this.projs[i];
            pr.life -= dt;
            pr.vel.y -= pr.grav * dt;
            const sp = pr.vel.length();
            const len = sp * dt;
            const dir = pr.vel.clone().divideScalar(sp || 1);
            const tw = this.world.raycast(pr.pos.x, pr.pos.y, pr.pos.z, dir.x, dir.y, dir.z, len);
            let bt = tw;
            let hitEnt = false;
            if (pr.mine) {
                for (const e of this.hostiles(this.team, false)){
                    const h = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$world$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rayVsEntity"])(pr.pos.x, pr.pos.y, pr.pos.z, dir.x, dir.y, dir.z, e, bt);
                    if (h && h.t < bt) {
                        bt = h.t;
                        hitEnt = true;
                    }
                }
            }
            if (bt < len || pr.life <= 0) {
                const t = Math.min(bt, len);
                const x = pr.pos.x + dir.x * t - dir.x * 0.15;
                const y = pr.pos.y + dir.y * t - dir.y * 0.15;
                const z = pr.pos.z + dir.z * t - dir.z * 0.15;
                void hitEnt;
                this.explodeProj(pr, x, y, z);
                this.removeProj(i);
                continue;
            }
            pr.pos.addScaledVector(dir, len);
            pr.mesh.position.copy(pr.pos);
            pr.mesh.lookAt(pr.pos.clone().add(dir));
            if (pr.kind === "rocket") this.fx.burst(pr.pos.x - dir.x * 0.4, pr.pos.y - dir.y * 0.4, pr.pos.z - dir.z * 0.4, 0x999999, 1, 0.6, 0.22, 0.5, -1);
        }
    }
    explodeVisual(x, y, z, r) {
        this.fx.explosion(x, y, z, r);
        this.playPos("boom", x, z, 1);
        const b = this.p.body;
        const d = Math.hypot(x - b.x, y - b.y, z - b.z);
        this.shake = Math.max(this.shake, clamp(1 - d / (r * 4), 0, 1) * 1.2);
    }
    explodeProj(pr, x, y, z) {
        const R = pr.def.radius || 5;
        this.explodeVisual(x, y, z, R);
        if (!pr.mine) return;
        const base = pr.def.damage;
        const check = (cx, cy, cz)=>{
            const d = Math.hypot(cx - x, cy - y, cz - z);
            if (d >= R) return -1;
            if (!this.world.hasLOS(x, y, z, cx, cy, cz)) return -1;
            return base * Math.max(0.12, 1 - d / R);
        };
        for (const e of this.hostiles(this.team, false)){
            const dmg = Math.max(check(e.x, e.y + 0.9 * e.scale, e.z), check(e.x, e.y + 0.3, e.z));
            if (dmg > 0) {
                this.applyHit(e, dmg, false, pr.wIdx);
                this.hitSeq++;
                this.hitHead = false;
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sfx"])("hit", 0.6);
            }
        }
        const b = this.p.body;
        if (this.p.alive) {
            const dmg = Math.max(check(b.x, b.y + 0.9, b.z), check(b.x, b.y + 0.2, b.z));
            if (dmg > 0) this.damageSelf(dmg * 0.5, false, this.cfg.pid, pr.wIdx, x, z);
        }
        this.evAll({
            k: "boom",
            id: pr.id,
            p: [
                r2(x),
                r2(y),
                r2(z)
            ],
            r: R
        });
    }
    // ───────────────────────── 伤害 / 死亡 ─────────────────────────
    damageSelf(dmg, head, from, w, sx, sz) {
        const p = this.p;
        if (!p.alive || p.protect > 0 || !(dmg > 0)) return;
        p.hp -= dmg;
        p.last = {
            from,
            w,
            head
        };
        this.dmgFlash = Math.min(1, this.dmgFlash + 0.5 + dmg / 80);
        if (sx !== undefined && sz !== undefined) {
            const b = p.body;
            const dx = sx - b.x;
            const dz = sz - b.z;
            const world = Math.atan2(-dx, -dz);
            this.dmgAngle = angDiff(p.yaw, world);
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sfx"])("hurt", 0.7);
        if (p.hp <= 0) this.die();
    }
    nameOf(id) {
        if (id === this.cfg.pid) return this.cfg.name;
        return this.players.get(id)?.name ?? this.ents.get(id)?.name ?? "未知";
    }
    teamOf(id) {
        if (id === this.cfg.pid) return this.team;
        return this.players.get(id)?.team ?? this.ents.get(id)?.team ?? 0;
    }
    die() {
        const p = this.p;
        p.alive = false;
        p.hp = 0;
        p.deaths++;
        p.healT = 0;
        p.sprinting = false;
        p.slide = 0;
        p.ads = 0;
        this.selfEnt.alive = false;
        const killer = p.last.from || this.cfg.pid;
        const d = {
            k: "kill",
            killer,
            victim: this.cfg.pid,
            w: p.last.w,
            head: p.last.head,
            kn: this.nameOf(killer),
            vn: this.cfg.name,
            kt: this.teamOf(killer),
            vt: this.team
        };
        this.evAll(d);
        this.onKill(d);
        this.fx.burst(p.body.x, p.body.y + 1, p.body.z, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEAM_COLORS"][this.team % 4], 14, 4, 0.2, 0.8);
        if (this.mode === "defense") {
            p.waiting = true;
            p.respawnT = 0;
        } else p.respawnT = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULES"].respawnTime;
        this.pushState();
    }
    onKill(d) {
        const me = d.killer === this.cfg.pid && d.victim !== this.cfg.pid;
        this.feed.push({
            id: this.feedSeq++,
            t: this.time,
            killer: d.kn,
            victim: d.vn,
            w: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WEAPONS"][d.w]?.name ?? "",
            head: !!d.head,
            kt: d.kt,
            vt: d.vt,
            me,
            died: d.victim === this.cfg.pid
        });
        if (this.feed.length > 6) this.feed.shift();
        if (me) {
            this.p.kills++;
            if (d.head) this.p.hs++;
            this.killSeq++;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sfx"])("kill", 0.8);
        }
        if (this.isHost) {
            const st = this.game.st;
            if (d.killer && d.killer !== d.victim) (st[d.killer] ||= [
                0,
                0
            ])[0]++;
            (st[d.victim] ||= [
                0,
                0
            ])[1]++;
            if (this.mode !== "defense" && d.killer !== d.victim && d.kt !== d.vt && d.kt >= 0 && d.kt < 4) {
                this.game.sc[d.kt]++;
                if (this.game.phase === "play" && this.game.sc[d.kt] >= this.room.score) {
                    this.game.phase = "over";
                    this.game.win = d.kt;
                    this.roundOverT = 10;
                    this.hostBanner(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEAM_NAMES"][d.kt]} 获胜！`, 9);
                }
            }
            this.gameNetT = 0;
        }
    }
    pushFeedText(t) {
        this.feed.push({
            id: this.feedSeq++,
            t: this.time,
            killer: t,
            victim: "",
            w: "",
            head: false,
            kt: -1,
            vt: -1,
            me: false,
            died: false
        });
        if (this.feed.length > 6) this.feed.shift();
    }
    showBannerLocal(text, secs) {
        this.banner = text;
        this.bannerT = secs;
    }
    hostBanner(text, secs) {
        this.showBannerLocal(text, secs);
        this.evAll({
            k: "banner",
            text,
            secs
        });
    }
    // ───────────────────────── 房主逻辑：机器人 / 模式 ─────────────────────────
    hostInit() {
        const diff = this.room.diff;
        this.botCtx = {
            world: this.world,
            diff,
            respawns: this.mode !== "defense",
            enemies: (b)=>this.hostiles(b.ent.team, true),
            hit: (t, dmg, head, from)=>{
                if (t.id === this.cfg.pid) this.damageSelf(dmg, head, from.ent.id, from.ent.wpn, from.ent.x, from.ent.z);
                else if (t.isBot) this.bots.get(t.id)?.damage(this.botCtx, dmg, from.ent.id, from.ent.wpn, head);
                else this.net.ev(t.id, {
                    k: "hit",
                    v: t.id,
                    dmg: r2(dmg),
                    head,
                    from: from.ent.id,
                    w: from.ent.wpn,
                    sx: r2(from.ent.x),
                    sz: r2(from.ent.z)
                });
            },
            shotFx: (bot, end)=>{
                const e = bot.ent;
                const o = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](e.x, e.y + 1.45, e.z);
                const en = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](end[0], end[1], end[2]);
                this.fx.tracer(o, en, 0xffb090);
                if (this.shotParity++ % 2 === 0) {
                    this.playPos(this.sfxFor(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WEAPONS"][e.wpn] ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WEAPONS"][0]), e.x, e.z, 0.7);
                    this.evAll({
                        k: "shot",
                        id: e.id,
                        o: [
                            r2(o.x),
                            r2(o.y),
                            r2(o.z)
                        ],
                        e: [
                            [
                                r2(end[0]),
                                r2(end[1]),
                                r2(end[2])
                            ]
                        ],
                        w: e.wpn
                    });
                }
            },
            spawnPoint: (team)=>this.pickSpawn(team),
            onKilled: (bot, fromId, w, head)=>{
                const e = bot.ent;
                this.setAlive(e, false);
                const d = {
                    k: "kill",
                    killer: fromId,
                    victim: e.id,
                    w,
                    head,
                    kn: this.nameOf(fromId),
                    vn: e.name,
                    kt: this.teamOf(fromId),
                    vt: e.team
                };
                this.evAll(d);
                this.onKill(d);
                if (this.mode === "defense") this.deadBotAt.set(e.id, this.time);
            }
        };
        this.game.sc = [
            0,
            0,
            0,
            0
        ];
        if (this.mode !== "defense") {
            const n = this.room.bots;
            for(let t = 0; t < this.teamCount; t++)for(let i = 0; i < n; i++)this.addDmBot(t);
        }
    }
    addDmBot(team) {
        const id = `b${this.botSeq}`;
        const name = `BOT-${BOT_NAMES[this.botSeq % BOT_NAMES.length]}`;
        this.botSeq++;
        const diff = this.room.diff;
        const bot = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$bots$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bot"](id, name, team, "dm", DM_WEAPONS[Math.floor(Math.random() * DM_WEAPONS.length)], 1, diff === 1 ? 0.75 : diff === 3 ? 1.2 : 1);
        this.bots.set(id, bot);
        this.ents.set(id, bot.ent);
        bot.spawn(this.pickSpawn(team));
    }
    spawnEnemy(kind) {
        const id = `e${this.botSeq++}`;
        const hpMul = 1 + this.wave.n * 0.08;
        const diff = this.room.diff;
        const dmgMul = (diff === 1 ? 0.75 : diff === 3 ? 1.25 : 1) * (1 + this.wave.n * 0.02);
        const wpn = kind === "rusher" ? "knife" : kind === "heavy" ? "m249" : "ak47";
        const names = {
            grunt: "丧尸兵",
            rusher: "突袭者",
            heavy: "重装兵"
        };
        const bot = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$bots$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bot"](id, names[kind] ?? "敌人", ENEMY_TEAM, kind, wpn, hpMul, dmgMul);
        this.bots.set(id, bot);
        this.ents.set(id, bot.ent);
        const c = Math.floor(Math.random() * 4);
        const sp = this.map.enemySpawns[c * 6 + Math.floor(Math.random() * 6)];
        bot.spawn(sp);
    }
    startWave(n) {
        const w = this.wave;
        w.n = n;
        w.state = "fight";
        const diff = this.room.diff;
        const total = Math.min(60, Math.floor((7 + n * 3.2) * (0.8 + 0.2 * diff)));
        const heavies = n >= 3 ? Math.min(6, Math.floor(n / 3)) : 0;
        const q = [];
        for(let i = 0; i < total; i++)q.push(n >= 2 && Math.random() < 0.28 ? "rusher" : "grunt");
        for(let i = 0; i < heavies; i++)q.splice(Math.floor(Math.random() * q.length), 0, "heavy");
        w.queue = q;
        w.spawnT = 0;
        this.game.wave = n;
        this.evAll({
            k: "revive",
            restock: n > 1
        });
        if (!this.p.alive) this.respawn();
        if (n > 1) this.restock();
        this.hostBanner(`第 ${n} 波 · 敌人数量 ${total + 0}`, 4);
    }
    defenseUpdate(dt) {
        const w = this.wave;
        // 清理尸体
        for (const [id, t] of Array.from(this.deadBotAt)){
            if (this.time - t > 2.5) {
                this.deadBotAt.delete(id);
                this.bots.delete(id);
                this.removeEnt(id);
            }
        }
        if (this.game.phase === "over") {
            this.roundOverT -= dt;
            if (this.roundOverT <= 0) this.resetRound();
            return;
        }
        let alive = 0;
        for (const b of this.bots.values())if (b.ent.alive) alive++;
        this.game.en = alive + w.queue.length;
        if (w.state === "break") {
            w.breakT -= dt;
            if (w.breakT <= 0) this.startWave(w.n + 1);
            return;
        }
        w.spawnT -= dt;
        const cap = 14 + w.n * 2;
        if (w.queue.length > 0 && w.spawnT <= 0 && alive < cap) {
            w.spawnT = 0.7;
            this.spawnEnemy(w.queue.shift());
        }
        if (w.queue.length === 0 && alive === 0) {
            w.state = "break";
            w.breakT = 10;
            this.hostBanner(`第 ${w.n} 波已清除！10 秒后下一波，倒下的队友将复活`, 5);
        }
        // 全员阵亡
        let humansAlive = this.p.alive ? 1 : 0;
        for (const e of this.ents.values())if (!e.isBot && e.alive) humansAlive++;
        if (humansAlive === 0) {
            this.game.phase = "over";
            this.roundOverT = 9;
            this.hostBanner(`全军覆没！你们坚持到了第 ${w.n} 波`, 8);
        }
    }
    resetRound() {
        this.game.sc = [
            0,
            0,
            0,
            0
        ];
        this.game.st = {};
        this.game.phase = "play";
        this.game.win = -1;
        this.wave.n = 0;
        this.wave.state = "break";
        this.wave.breakT = 5;
        this.wave.queue = [];
        if (this.mode === "defense") {
            for (const id of Array.from(this.bots.keys())){
                this.bots.delete(id);
                this.removeEnt(id);
            }
            this.deadBotAt.clear();
            this.game.wave = 0;
        } else {
            for (const b of this.bots.values()){
                b.respawnT = 0.5;
                b.ent.alive = false;
            }
        }
        this.p.kills = this.p.deaths = 0;
        this.evAll({
            k: "reset"
        });
        this.respawn();
        this.hostBanner(this.mode === "defense" ? "新一轮防守开始" : "新的一局开始！", 4);
    }
    hostUpdate(dt) {
        for (const b of this.bots.values())b.update(dt, this.botCtx);
        this.botNetT -= dt;
        if (this.botNetT <= 0 && this.bots.size > 0) {
            this.botNetT = 0.066;
            const l = [];
            for (const b of this.bots.values()){
                const e = b.ent;
                l.push([
                    e.id,
                    r2(e.x),
                    r2(e.y),
                    r2(e.z),
                    r2(e.yaw),
                    r2(e.pitch),
                    e.stance,
                    Math.round(e.hp),
                    e.alive ? 1 : 0,
                    e.wpn,
                    r2(e.speed),
                    e.kind,
                    e.team,
                    e.name
                ]);
            }
            this.net.bots({
                t: "bots",
                l
            });
        }
        if (this.mode === "defense") this.defenseUpdate(dt);
        else if (this.game.phase === "over") {
            this.roundOverT -= dt;
            if (this.roundOverT <= 0) this.resetRound();
        }
        this.gameNetT -= dt;
        if (this.gameNetT <= 0) {
            this.gameNetT = 0.25;
            this.evAll({
                k: "game",
                sc: this.game.sc,
                wave: this.game.wave,
                phase: this.game.phase,
                en: this.game.en,
                st: this.game.st,
                win: this.game.win
            });
        }
    }
    // ───────────────────────── 主循环 ─────────────────────────
    loop = (ms)=>{
        if (this.disposed) return;
        this.raf = requestAnimationFrame(this.loop);
        const now = ms / 1000;
        const dt = Math.min(0.05, Math.max(0.0001, now - this.lastT));
        this.lastT = now;
        this.time += dt;
        this.fpsAcc += dt;
        this.fpsN++;
        if (this.fpsAcc >= 0.5) {
            this.hud.fps = Math.round(this.fpsN / this.fpsAcc);
            this.fpsAcc = 0;
            this.fpsN = 0;
        }
        this.update(dt);
        this.render(dt);
    };
    update(dt) {
        const p = this.p;
        this.updatePlayer(dt);
        this.updateWeapons(dt);
        this.updateProjs(dt);
        this.updateEnts(dt);
        if (this.isHost) this.hostUpdate(dt);
        this.fx.update(dt);
        // 自身实体
        const e = this.selfEnt;
        e.x = p.body.x;
        e.y = p.body.y;
        e.z = p.body.z;
        e.yaw = p.yaw;
        e.stance = p.slide > 0 ? 1 : p.stance;
        e.alive = p.alive;
        e.hp = p.hp;
        // 复活
        if (!p.alive && !p.waiting) {
            p.respawnT -= dt;
            if (p.respawnT <= 0) this.respawn();
        }
        if (p.protect > 0) p.protect -= dt;
        this.dmgFlash = Math.max(0, this.dmgFlash - dt * 1.6);
        this.shake = Math.max(0, this.shake - dt * 2.5);
        if (this.bannerT > 0) this.bannerT -= dt;
        // 网络状态
        this.netT -= dt;
        if (this.netT <= 0) {
            this.netT = 0.05;
            this.pushState();
        }
    }
    updatePlayer(dt) {
        const p = this.p;
        const b = p.body;
        p.slideCd = Math.max(0, p.slideCd - dt);
        p.kickP *= Math.exp(-dt * 9);
        p.kickY *= Math.exp(-dt * 9);
        p.bloom = Math.max(0, p.bloom - dt * 3.2);
        p.vmKick = Math.max(0, p.vmKick - dt * 9);
        p.swing = Math.max(0, p.swing - dt);
        p.flash = Math.max(0, p.flash - dt);
        p.stepOff *= Math.exp(-dt * 10);
        if (!p.alive) {
            b.vx *= 0.9;
            b.vz *= 0.9;
            this.world.moveBody(b, dt);
            p.speed = 0;
            return;
        }
        const w = this.cur();
        const fwd = (this.act("forward") ? 1 : 0) - (this.act("back") ? 1 : 0);
        const str = (this.act("right") ? 1 : 0) - (this.act("left") ? 1 : 0);
        const moving = fwd !== 0 || str !== 0;
        const shift = this.act("sprint");
        // 体力 / 冲刺
        if (p.exhausted && p.stamina >= 15) p.exhausted = false;
        const want = shift && fwd > 0 && p.stance === 0 && p.slide <= 0 && !this.mouseL && p.healT <= 0 && w.reloadT <= 0 && !this.mouseR;
        p.sprinting = want && !p.exhausted && p.stamina > 0 && b.onGround;
        const drain = 100 / __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULES"].sprintSeconds;
        if (p.sprinting) {
            p.stamina -= drain * dt;
            p.staminaDelay = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULES"].staminaRegenDelay;
            if (p.stamina <= 0) {
                p.stamina = 0;
                p.exhausted = true;
                p.sprinting = false;
            }
        } else {
            if (p.slide > 0) p.staminaDelay = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULES"].staminaRegenDelay;
            else p.staminaDelay = Math.max(0, p.staminaDelay - dt);
            if (p.staminaDelay <= 0) p.stamina = Math.min(100, p.stamina + drain * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULES"].staminaRegenMul * dt);
        }
        // 速度
        let speed = p.stance === 0 ? 5.2 : p.stance === 1 ? 2.8 : 1.4;
        if (p.sprinting) speed = 8.4;
        speed *= w.def.moveMul;
        if (p.ads > 0.1) speed *= 1 - 0.4 * p.ads;
        if (p.healT > 0) speed *= 0.75;
        // 跳跃
        if (this.act("jump") && b.onGround) {
            if (p.stance !== 0) {
                this.setStance(0);
            }
            if (p.stance === 0 || this.world.fits(b.x, b.y + 0.001, b.z, b.hw, HEIGHTS[0])) {
                b.vy = 8.4;
                b.onGround = false;
                if (p.slide > 0) {
                    p.slide = 0;
                    this.setStance(0);
                }
            }
        }
        const fx = -Math.sin(p.yaw);
        const fz = -Math.cos(p.yaw);
        const rx = Math.cos(p.yaw);
        const rz = -Math.sin(p.yaw);
        let tx = 0;
        let tz = 0;
        if (p.slide > 0) {
            p.slide -= dt;
            const k = Math.max(0, p.slide) / 0.85;
            const sp = 3.2 + 7.6 * k * k;
            b.vx = p.slideX * sp;
            b.vz = p.slideZ * sp;
            if (p.slide <= 0) {
                p.slide = 0;
                // 滑铲结束自动站起（若头顶有空间）
                if (p.stance === 1) this.setStance(0);
            }
        } else {
            if (moving) {
                tx = fx * fwd + rx * str;
                tz = fz * fwd + rz * str;
                const l = Math.hypot(tx, tz);
                tx = tx / l * speed;
                tz = tz / l * speed;
            }
            const rate = b.onGround ? 13 : 2.6;
            const k = Math.min(1, rate * dt);
            b.vx += (tx - b.vx) * k;
            b.vz += (tz - b.vz) * k;
        }
        const y0 = b.y;
        const wasGround = b.onGround;
        this.world.moveBody(b, dt);
        if (wasGround && b.onGround && b.y - y0 > 0.04 && b.vy <= 0) p.stepOff += b.y - y0;
        p.speed = Math.hypot(b.vx, b.vz);
        if (b.onGround) p.bob += p.speed * dt * (p.sprinting ? 1.25 : 1.6);
        const targetEye = EYES[p.slide > 0 ? 1 : p.stance];
        p.eye += (targetEye - p.eye) * Math.min(1, dt * 12);
        // 回血道具：每 0.01s 恢复 1 点，持续 2s
        if (p.healT > 0) {
            p.healT -= dt;
            p.healAcc += dt;
            while(p.healAcc >= __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULES"].healTickEvery){
                p.healAcc -= __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULES"].healTickEvery;
                if (p.hp < __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULES"].maxHp) p.hp += 1;
            }
            if (p.healT <= 0) p.healT = 0;
        }
    }
    updateWeapons(dt) {
        const p = this.p;
        for (const w of p.w)if (w.cd > 0) w.cd -= dt;
        p.fireBuf = Math.max(0, p.fireBuf - dt);
        p.switchT = Math.max(0, p.switchT - dt);
        if (!p.alive) return;
        const w = this.cur();
        const d = w.def;
        if (w.reloadT > 0) {
            w.reloadT -= dt;
            if (w.reloadT <= 0) {
                w.reloadT = 0;
                const need = d.mag - w.mag;
                const take = Math.min(need, w.reserve);
                w.mag += take;
                w.reserve -= take;
            }
        }
        const wantAds = this.mouseR && !p.sprinting && w.reloadT <= 0 && p.healT <= 0 && d.type !== "melee" && p.switchT <= 0 && p.slide <= 0;
        p.ads += ((wantAds ? 1 : 0) - p.ads) * Math.min(1, dt * (d.scope ? 9 : 12));
        if (p.meleeT > 0) {
            p.meleeT -= dt;
            if (p.meleeT <= 0) this.meleeHit();
        }
        const trigger = d.auto ? this.mouseL : p.fireBuf > 0;
        if (trigger && this.locked && p.switchT <= 0 && p.healT <= 0 && w.cd <= 0 && w.reloadT <= 0) {
            if (d.type === "melee") this.meleeAttack();
            else if (w.mag > 0) this.fire();
            else if (w.reserve > 0) this.startReload();
            else if (p.fireBuf > 0 || this.mouseL) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sfx"])("empty", 0.5);
                w.cd = 0.25;
                p.fireBuf = 0;
            }
        }
        if (w.mag === 0 && w.reserve > 0 && w.reloadT <= 0 && d.type !== "melee" && !this.mouseL && p.switchT <= 0) this.startReload();
    }
    // ───────────────────────── 渲染 ─────────────────────────
    render(dt) {
        const r = this.renderer;
        if (!r) return;
        const p = this.p;
        const b = p.body;
        const d = this.cur()?.def;
        const zoom = d ? 1 + (d.zoom - 1) * p.ads : 1;
        const sprintFov = p.sprinting ? 5 : 0;
        this.cam.fov = (78 + sprintFov) / zoom;
        this.cam.updateProjectionMatrix();
        const sh = this.shake;
        let cy = b.y + p.eye - p.stepOff;
        let roll = 0;
        let pitch = p.pitch + p.kickP;
        if (!p.alive) {
            cy = b.y + 0.35;
            roll = 0.7;
            pitch = -0.3;
        }
        this.cam.position.set(b.x + (Math.random() - 0.5) * sh * 0.25, cy + (Math.random() - 0.5) * sh * 0.25, b.z + (Math.random() - 0.5) * sh * 0.25);
        this.cam.rotation.set(clamp(pitch, -1.55, 1.55), p.yaw + p.kickY, roll);
        this.updateViewModel(dt);
        r.clear();
        r.render(this.scene, this.cam);
        if (!(d?.scope && p.ads > 0.92) && p.alive) {
            r.clearDepth();
            r.render(this.vmScene, this.vmCam);
        }
        this.miniT -= dt;
        if (this.miniT <= 0) {
            this.miniT = 0.06;
            this.drawMinimap();
        }
    }
    updateViewModel(dt) {
        const p = this.p;
        this.vmWeapons.forEach((g, i)=>g.visible = i === p.slot && p.alive);
        const g = this.vmWeapons[p.slot];
        if (!g) return;
        const w = this.cur();
        const d = w.def;
        const fl = this.vmFlash[p.slot];
        if (fl) fl.visible = p.flash > 0;
        const ads = p.ads;
        const sf = clamp(p.speed / 6, 0, 1.4);
        const bobX = Math.sin(p.bob) * 0.012 * sf * (1 - ads * 0.85);
        const bobY = Math.abs(Math.cos(p.bob)) * 0.012 * sf * (1 - ads * 0.85);
        let x = 0.22 + (0 - 0.22) * ads + bobX;
        let y = -0.22 + (-0.115 + 0.22) * ads - bobY;
        let z = -0.42 + (-0.33 + 0.42) * ads + p.vmKick * 0.05;
        let rx = p.vmKick * 0.06;
        let ry = 0;
        let rz = 0;
        if (d.cat === "melee") {
            x = 0.26;
            y = -0.26;
            z = -0.5;
            rx = 0.3;
            if (p.swing > 0) {
                const s = 1 - p.swing / 0.3;
                rz = -Math.sin(s * Math.PI) * 1.3;
                rx = 0.3 - Math.sin(s * Math.PI) * 0.7;
                x -= Math.sin(s * Math.PI) * 0.12;
            }
        }
        if (p.sprinting) {
            x -= 0.06;
            y -= 0.06;
            ry = 0.55;
            rx = -0.12;
        }
        if (p.switchT > 0) y -= 0.4 * (p.switchT / 0.4);
        if (w.reloadT > 0) {
            const prog = 1 - w.reloadT / p.reloadTotal;
            const dip = Math.sin(prog * Math.PI);
            y -= 0.14 * dip;
            rx += 0.55 * dip;
            rz += 0.25 * dip;
        }
        if (p.healT > 0) {
            y -= 0.3;
            rx += 0.4;
        }
        g.position.set(x, y, z);
        g.rotation.set(rx, ry, rz);
        void dt;
    }
    drawMinimap() {
        const cv = this.miniCv;
        if (!cv || !this.miniBase) return;
        const g = cv.getContext("2d");
        if (!g) return;
        const W = cv.width;
        const H = cv.height;
        g.clearRect(0, 0, W, H);
        g.drawImage(this.miniBase, 0, 0, W, H);
        const m = this.map;
        const sx = W / (m.hx * 2);
        const sz = H / (m.hz * 2);
        const dot = (x, z, c, rr)=>{
            g.fillStyle = c;
            g.beginPath();
            g.arc((x + m.hx) * sx, (z + m.hz) * sz, rr, 0, Math.PI * 2);
            g.fill();
        };
        for (const e of this.ents.values()){
            if (!e.alive) continue;
            if (e.team === this.team) dot(e.x, e.z, "#" + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEAM_COLORS"][e.team % 4].toString(16).padStart(6, "0"), 3);
            else if (this.mode === "defense") dot(e.x, e.z, "#ff3b30", 2.4);
        }
        const b = this.p.body;
        g.save();
        g.translate((b.x + m.hx) * sx, (b.z + m.hz) * sz);
        g.rotate(Math.atan2(-Math.cos(this.p.yaw), -Math.sin(this.p.yaw)));
        g.fillStyle = "#fff";
        g.strokeStyle = "#000";
        g.lineWidth = 1;
        g.beginPath();
        g.moveTo(6, 0);
        g.lineTo(-4, 4);
        g.lineTo(-2, 0);
        g.lineTo(-4, -4);
        g.closePath();
        g.fill();
        g.stroke();
        g.restore();
    }
    attachMinimap(cv) {
        this.miniCv = cv;
    }
    // ───────────────────────── HUD 快照 ─────────────────────────
    getHud() {
        const p = this.p;
        const h = this.hud;
        h.status = this.status;
        h.error = this.statusErr;
        h.locked = this.locked;
        h.hp = Math.max(0, Math.ceil(p.hp));
        h.stamina = p.stamina;
        h.exhausted = p.exhausted;
        h.sprinting = p.sprinting;
        h.stance = p.stance;
        h.sliding = p.slide > 0;
        h.slot = p.slot;
        h.weapons = p.w.map((w)=>({
                id: w.def.id,
                name: w.def.name,
                slot: w.def.slot,
                cat: w.def.cat,
                mag: w.mag,
                reserve: w.reserve,
                magSize: w.def.mag,
                reloading: w.reloadT > 0,
                melee: w.def.type === "melee"
            }));
        const cw = this.cur();
        h.reloadProg = cw && cw.reloadT > 0 ? 1 - cw.reloadT / p.reloadTotal : 0;
        h.heal = p.healCharges;
        h.healing = p.healT > 0;
        h.healProg = p.healT > 0 ? 1 - p.healT / __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULES"].healDuration : 0;
        h.alive = p.alive;
        h.respawnIn = Math.max(0, p.respawnT);
        h.waiting = p.waiting;
        h.hitSeq = this.hitSeq;
        h.hitHead = this.hitHead;
        h.killSeq = this.killSeq;
        h.dmgFlash = this.dmgFlash;
        h.dmgAngle = this.dmgAngle;
        h.ads = p.ads > 0.5;
        h.scope = !!cw?.def.scope && p.ads > 0.92 && p.alive;
        h.spread = this.status === "playing" && cw ? this.currentSpread() + p.bloom * 0.6 : 2;
        this.feed = this.feed.filter((f)=>this.time - f.t < 7);
        h.feed = this.feed.slice();
        if (this.room) {
            h.mode = this.mode;
            h.mapName = this.map?.name ?? "";
            h.teamCount = this.teamCount;
            h.scoreLimit = this.room.score;
            h.roomId = this.room.id;
        }
        h.myTeam = this.team;
        h.scores = this.game.sc.slice();
        h.wave = this.game.wave;
        h.enemiesLeft = this.game.en;
        h.banner = this.bannerT > 0 ? this.banner : "";
        h.bannerT = this.bannerT;
        h.phase = this.game.phase;
        h.showBoard = this.showBoard;
        h.players = this.players.size;
        h.kills = p.kills;
        h.deaths = p.deaths;
        h.headshots = p.hs;
        h.protect = p.protect > 0;
        h.isHost = this.isHost;
        h.board = this.showBoard ? this.buildBoard() : [];
        return {
            ...h
        };
    }
    buildBoard() {
        const rows = [];
        const st = this.game.st;
        this.players.forEach((pl, id)=>rows.push({
                id,
                name: pl.name,
                team: id === this.cfg.pid ? this.team : pl.team,
                k: st[id]?.[0] ?? 0,
                d: st[id]?.[1] ?? 0,
                bot: false,
                me: id === this.cfg.pid
            }));
        if (this.mode !== "defense") {
            for (const e of this.ents.values())if (e.isBot) rows.push({
                id: e.id,
                name: e.name,
                team: e.team,
                k: st[e.id]?.[0] ?? 0,
                d: st[e.id]?.[1] ?? 0,
                bot: true,
                me: false
            });
        }
        rows.sort((a, b)=>b.k - a.k || a.d - b.d);
        return rows;
    }
    getSessionStats() {
        return {
            kills: this.p.kills,
            deaths: this.p.deaths,
            headshots: this.p.hs,
            wave: this.game.wave
        };
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/game/fx.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Fx",
    ()=>Fx
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
const MAXP = 1000;
class Fx {
    scene;
    tracers;
    parts;
    inst;
    booms;
    dummy;
    col;
    sphere;
    box;
    constructor(scene){
        this.scene = scene;
        this.tracers = [];
        this.parts = [];
        this.booms = [];
        this.dummy = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Object3D"]();
        this.col = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]();
        this.sphere = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IcosahedronGeometry"](1, 1);
        this.box = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](1, 1, 1);
        for(let i = 0; i < 40; i++){
            const m = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](this.box, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: 0xffe9a0,
                transparent: true,
                opacity: 0.9
            }));
            m.visible = false;
            scene.add(m);
            this.tracers.push({
                m,
                life: 0,
                max: 0.06
            });
        }
        this.inst = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InstancedMesh"](this.box, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
            color: 0xffffff
        }), MAXP);
        this.inst.instanceColor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InstancedBufferAttribute"](new Float32Array(MAXP * 3), 3);
        this.inst.frustumCulled = false;
        this.inst.count = 0;
        scene.add(this.inst);
    }
    tracer(a, b, color = 0xffe9a0, life = 0.07) {
        let t = this.tracers.find((q)=>q.life <= 0);
        if (!t) t = this.tracers[0];
        const len = a.distanceTo(b);
        if (len < 0.5) return;
        t.life = t.max = life;
        t.m.visible = true;
        t.m.position.copy(a).add(b).multiplyScalar(0.5);
        t.m.scale.set(0.025, 0.025, len);
        t.m.lookAt(b);
        t.m.material.color.setHex(color);
    }
    burst(x, y, z, color, n, speed, size, life, grav = 14) {
        this.col.setHex(color);
        for(let i = 0; i < n; i++){
            if (this.parts.length >= MAXP) this.parts.shift();
            const a = Math.random() * Math.PI * 2;
            const u = Math.random() * 2 - 1;
            const s = speed * (0.4 + Math.random() * 0.6);
            const k = 0.85 + Math.random() * 0.3;
            this.parts.push({
                x,
                y,
                z,
                vx: Math.cos(a) * Math.sqrt(1 - u * u) * s,
                vy: u * s * 0.8 + speed * 0.3,
                vz: Math.sin(a) * Math.sqrt(1 - u * u) * s,
                life: life * (0.6 + Math.random() * 0.6),
                max: life,
                size: size * (0.6 + Math.random() * 0.8),
                r: this.col.r * k,
                g: this.col.g * k,
                b: this.col.b * k,
                grav
            });
        }
    }
    explosion(x, y, z, r) {
        const m = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](this.sphere, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
            color: 0xffa030,
            transparent: true,
            opacity: 0.9
        }));
        m.position.set(x, y, z);
        m.scale.setScalar(r * 0.2);
        this.scene.add(m);
        this.booms.push({
            m,
            t: 0,
            r
        });
        const n = Math.floor(18 + r * 5);
        this.burst(x, y, z, 0xff7a1a, n, r * 2.2, 0.35, 0.7, 6);
        this.burst(x, y, z, 0xffd34a, Math.floor(n * 0.6), r * 1.6, 0.28, 0.5, 4);
        this.burst(x, y + 0.5, z, 0x555555, Math.floor(n * 0.7), r * 1.0, 0.5, 1.3, -1.5);
    }
    update(dt) {
        for (const t of this.tracers){
            if (t.life > 0) {
                t.life -= dt;
                if (t.life <= 0) t.m.visible = false;
                else t.m.material.opacity = t.life / t.max * 0.9;
            }
        }
        for(let i = this.booms.length - 1; i >= 0; i--){
            const b = this.booms[i];
            b.t += dt;
            const k = b.t / 0.4;
            if (k >= 1) {
                this.scene.remove(b.m);
                b.m.material.dispose();
                this.booms.splice(i, 1);
                continue;
            }
            b.m.scale.setScalar(b.r * (0.2 + 0.8 * Math.sqrt(k)));
            b.m.material.opacity = 0.9 * (1 - k);
        }
        let n = 0;
        for(let i = this.parts.length - 1; i >= 0; i--){
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
        for (const p of this.parts){
            const s = p.size * Math.min(1, p.life / p.max * 2);
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/game/keybinds.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// 可自定义键位：首次启动使用默认值，保存在 localStorage
__turbopack_context__.s([
    "BIND_META",
    ()=>BIND_META,
    "DEFAULT_BINDS",
    ()=>DEFAULT_BINDS,
    "bindConflict",
    ()=>bindConflict,
    "codeLabel",
    ()=>codeLabel,
    "loadBinds",
    ()=>loadBinds,
    "sanitizeBinds",
    ()=>sanitizeBinds,
    "saveBinds",
    ()=>saveBinds
]);
const DEFAULT_BINDS = {
    forward: "KeyW",
    back: "KeyS",
    left: "KeyA",
    right: "KeyD",
    jump: "Space",
    sprint: "ShiftLeft",
    crouch: "KeyC",
    prone: "KeyZ",
    reload: "KeyR",
    heal: "KeyQ",
    scoreboard: "Tab",
    slot1: "Digit1",
    slot2: "Digit2",
    slot3: "Digit3"
};
const BIND_META = [
    {
        key: "forward",
        label: "前进"
    },
    {
        key: "back",
        label: "后退"
    },
    {
        key: "left",
        label: "左移"
    },
    {
        key: "right",
        label: "右移"
    },
    {
        key: "jump",
        label: "跳跃"
    },
    {
        key: "sprint",
        label: "冲刺"
    },
    {
        key: "crouch",
        label: "蹲下 / 滑铲",
        hint: "冲刺键 + 蹲下键 = 滑铲"
    },
    {
        key: "prone",
        label: "趴下"
    },
    {
        key: "reload",
        label: "换弹"
    },
    {
        key: "heal",
        label: "使用回血"
    },
    {
        key: "scoreboard",
        label: "计分板"
    },
    {
        key: "slot1",
        label: "一号位武器"
    },
    {
        key: "slot2",
        label: "二号位武器"
    },
    {
        key: "slot3",
        label: "三号位武器"
    }
];
const STORAGE_KEY = "bs_binds";
const isCode = (v)=>typeof v === "string" && v.length > 0 && v.length < 40;
function sanitizeBinds(v) {
    const out = {
        ...DEFAULT_BINDS
    };
    if (!v) return out;
    for (const key of Object.keys(DEFAULT_BINDS)){
        if (isCode(v[key])) out[key] = v[key];
    }
    return out;
}
function loadBinds() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return {
            ...DEFAULT_BINDS
        };
        return sanitizeBinds(JSON.parse(raw));
    } catch  {
        return {
            ...DEFAULT_BINDS
        };
    }
}
function saveBinds(b) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitizeBinds(b)));
    } catch  {
    /* ignore */ }
}
const CODE_LABEL = {
    Space: "空格",
    Tab: "Tab",
    ShiftLeft: "左 Shift",
    ShiftRight: "右 Shift",
    ControlLeft: "左 Ctrl",
    ControlRight: "右 Ctrl",
    AltLeft: "左 Alt",
    AltRight: "右 Alt",
    CapsLock: "Caps",
    ArrowUp: "↑",
    ArrowDown: "↓",
    ArrowLeft: "←",
    ArrowRight: "→",
    Enter: "回车",
    Backspace: "退格",
    Escape: "Esc",
    Backquote: "`",
    Minus: "-",
    Equal: "=",
    BracketLeft: "[",
    BracketRight: "]",
    Semicolon: ";",
    Quote: "'",
    Comma: ",",
    Period: ".",
    Slash: "/",
    Backslash: "\\"
};
function codeLabel(code) {
    if (!code) return "—";
    if (CODE_LABEL[code]) return CODE_LABEL[code];
    if (code.startsWith("Key")) return code.slice(3);
    if (code.startsWith("Digit")) return code.slice(5);
    if (code.startsWith("Numpad")) return "小键盘 " + code.slice(6);
    return code;
}
function bindConflict(b, action, code) {
    for (const k of Object.keys(b)){
        if (k !== action && b[k] === code) return k;
    }
    return null;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/game/net.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// 客户端网络层：SSE 接收 + 批量 POST 发送
/* eslint-disable @typescript-eslint/no-explicit-any */ __turbopack_context__.s([
    "Net",
    ()=>Net
]);
class Net {
    pid;
    roomId;
    es;
    queue;
    timer;
    busy;
    closed;
    welcomed;
    onMsg;
    onClose;
    constructor(pid, roomId){
        this.pid = pid;
        this.roomId = roomId;
        this.es = null;
        this.queue = [];
        this.timer = null;
        this.busy = false;
        this.closed = false;
        this.welcomed = false;
        this.onMsg = ()=>{};
        this.onClose = ()=>{};
    }
    connect(name, team) {
        return new Promise((resolve, reject)=>{
            const url = `/api/net/stream?room=${encodeURIComponent(this.roomId)}&pid=${encodeURIComponent(this.pid)}&name=${encodeURIComponent(name)}&team=${team}`;
            const es = new EventSource(url);
            this.es = es;
            es.onmessage = (e)=>{
                let m;
                try {
                    m = JSON.parse(e.data);
                } catch  {
                    return;
                }
                if (m.t === "welcome" && !this.welcomed) {
                    this.welcomed = true;
                    this.timer = setInterval(()=>this.flush(), 45);
                    resolve(m);
                    return;
                }
                if (m.t === "closed") {
                    this.fail(m.reason || "房间已关闭");
                    return;
                }
                this.onMsg(m);
            };
            es.onerror = ()=>{
                if (!this.welcomed) {
                    es.close();
                    reject(new Error("无法连接到房间（房间可能不存在或已满）"));
                } else this.fail("与服务器的连接已断开");
            };
        });
    }
    fail(reason) {
        if (this.closed) return;
        this.closed = true;
        this.es?.close();
        if (this.timer) clearInterval(this.timer);
        this.onClose(reason);
    }
    // 位置状态：只保留最新一条
    state(m) {
        const i = this.queue.findIndex((q)=>q.t === "st");
        if (i >= 0) this.queue[i] = m;
        else this.queue.push(m);
    }
    bots(m) {
        const i = this.queue.findIndex((q)=>q.t === "bots");
        if (i >= 0) this.queue[i] = m;
        else this.queue.push(m);
    }
    ev(to, d) {
        this.queue.push({
            t: "ev",
            to,
            d
        });
    }
    raw(m) {
        this.queue.push(m);
    }
    flush() {
        if (this.closed || this.busy || this.queue.length === 0) return;
        const msgs = this.queue;
        this.queue = [];
        this.busy = true;
        fetch("/api/net/send", {
            method: "POST",
            headers: {
                "Content-Type": "text/plain"
            },
            body: JSON.stringify({
                room: this.roomId,
                pid: this.pid,
                msgs
            }),
            keepalive: true
        }).then((r)=>{
            if (r.status === 404) this.fail("房间已不存在");
        }).catch(()=>{}).finally(()=>{
            this.busy = false;
        });
    }
    close() {
        if (this.closed) return;
        this.closed = true;
        if (this.timer) clearInterval(this.timer);
        this.es?.close();
        try {
            navigator.sendBeacon("/api/net/send", JSON.stringify({
                room: this.roomId,
                pid: this.pid,
                msgs: [
                    {
                        t: "leave"
                    }
                ]
            }));
        } catch  {
        /* ignore */ }
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/game/render.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "animateAvatar",
    ()=>animateAvatar,
    "buildGunModel",
    ()=>buildGunModel,
    "buildWorldMesh",
    ()=>buildWorldMesh,
    "bx",
    ()=>bx,
    "lmat",
    ()=>lmat,
    "makeAvatar",
    ()=>makeAvatar,
    "makeTag",
    ()=>makeTag,
    "pixelTexture",
    ()=>pixelTexture,
    "setAvatarWeapon",
    ()=>setAvatarWeapon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
// ───────── 像素纹理 ─────────
let texCache = null;
function pixelTexture() {
    if (texCache) return texCache;
    const cv = document.createElement("canvas");
    cv.width = cv.height = 16;
    const g = cv.getContext("2d");
    let seed = 1234;
    const r = ()=>{
        seed = seed * 16807 % 2147483647;
        return seed / 2147483647;
    };
    for(let y = 0; y < 16; y++){
        for(let x = 0; x < 16; x++){
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
    const t = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasTexture"](cv);
    t.wrapS = t.wrapT = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RepeatWrapping"];
    t.magFilter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NearestFilter"];
    t.minFilter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NearestMipmapLinearFilter"];
    t.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
    texCache = t;
    return t;
}
const FACES = [
    {
        n: [
            1,
            0,
            0
        ],
        v: [
            [
                1,
                0,
                1
            ],
            [
                1,
                0,
                0
            ],
            [
                1,
                1,
                0
            ],
            [
                1,
                1,
                1
            ]
        ],
        ua: 2,
        va: 1
    },
    {
        n: [
            -1,
            0,
            0
        ],
        v: [
            [
                0,
                0,
                0
            ],
            [
                0,
                0,
                1
            ],
            [
                0,
                1,
                1
            ],
            [
                0,
                1,
                0
            ]
        ],
        ua: 2,
        va: 1
    },
    {
        n: [
            0,
            1,
            0
        ],
        v: [
            [
                0,
                1,
                1
            ],
            [
                1,
                1,
                1
            ],
            [
                1,
                1,
                0
            ],
            [
                0,
                1,
                0
            ]
        ],
        ua: 0,
        va: 2
    },
    {
        n: [
            0,
            -1,
            0
        ],
        v: [
            [
                0,
                0,
                0
            ],
            [
                1,
                0,
                0
            ],
            [
                1,
                0,
                1
            ],
            [
                0,
                0,
                1
            ]
        ],
        ua: 0,
        va: 2
    },
    {
        n: [
            0,
            0,
            1
        ],
        v: [
            [
                0,
                0,
                1
            ],
            [
                1,
                0,
                1
            ],
            [
                1,
                1,
                1
            ],
            [
                0,
                1,
                1
            ]
        ],
        ua: 0,
        va: 1
    },
    {
        n: [
            0,
            0,
            -1
        ],
        v: [
            [
                1,
                0,
                0
            ],
            [
                0,
                0,
                0
            ],
            [
                0,
                1,
                0
            ],
            [
                1,
                1,
                0
            ]
        ],
        ua: 0,
        va: 1
    }
];
function buildWorldMesh(boxes) {
    const pos = [];
    const nor = [];
    const uv = [];
    const col = [];
    const idx = [];
    const c = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]();
    let vi = 0;
    boxes.forEach((b, bi)=>{
        const h = Math.sin(bi * 12.9898) * 43758.5453;
        const f = 0.93 + 0.14 * (h - Math.floor(h));
        c.setHex(b.c);
        const r = c.r * f;
        const g = c.g * f;
        const bl = c.b * f;
        const mn = [
            b.x0,
            b.y0,
            b.z0
        ];
        const mx = [
            b.x1,
            b.y1,
            b.z1
        ];
        for (const fc of FACES){
            for (const v of fc.v){
                const p = [
                    v[0] ? mx[0] : mn[0],
                    v[1] ? mx[1] : mn[1],
                    v[2] ? mx[2] : mn[2]
                ];
                pos.push(p[0], p[1], p[2]);
                nor.push(fc.n[0], fc.n[1], fc.n[2]);
                uv.push(p[fc.ua] * 0.5, p[fc.va] * 0.5);
                col.push(r, g, bl);
            }
            idx.push(vi, vi + 1, vi + 2, vi, vi + 2, vi + 3);
            vi += 4;
        }
    });
    const geo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
    geo.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](pos, 3));
    geo.setAttribute("normal", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](nor, 3));
    geo.setAttribute("uv", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](uv, 2));
    geo.setAttribute("color", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](col, 3));
    geo.setIndex(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](new Uint32Array(idx), 1));
    geo.computeBoundingSphere();
    const mat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshLambertMaterial"]({
        map: pixelTexture(),
        vertexColors: true
    });
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](geo, mat);
}
// ───────── 简易材质缓存 ─────────
const matCache = new Map();
function lmat(color) {
    let m = matCache.get(color);
    if (!m) {
        m = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshLambertMaterial"]({
            color
        });
        matCache.set(color, m);
    }
    return m;
}
const boxGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](1, 1, 1);
function bx(w, h, d, x, y, z, color, parent) {
    const m = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](boxGeo, lmat(color));
    m.scale.set(w, h, d);
    m.position.set(x, y, z);
    if (parent) parent.add(m);
    return m;
}
function buildGunModel(def) {
    const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
    const L = def.len;
    const c = def.color;
    const a = def.accent;
    switch(def.cat){
        case "rifle":
        case "smg":
            {
                const smg = def.cat === "smg";
                bx(0.06, 0.09, L * 0.55, 0, 0.02, -L * 0.3, c, g);
                bx(0.028, 0.028, L * 0.5, 0, 0.03, -L * 0.78, a, g);
                bx(0.05, 0.1, L * 0.3, 0, -0.01, L * 0.12, c, g);
                bx(0.045, smg ? 0.16 : 0.13, 0.06, 0, -0.1, -L * 0.3, a, g);
                bx(0.04, 0.09, 0.05, 0, -0.08, -L * 0.08, a, g);
                bx(0.03, 0.03, 0.1, 0, 0.075, -L * 0.28, a, g);
                break;
            }
        case "sniper":
            {
                bx(0.06, 0.09, L * 0.45, 0, 0.02, -L * 0.25, c, g);
                bx(0.024, 0.024, L * 0.62, 0, 0.03, -L * 0.72, a, g);
                bx(0.055, 0.11, L * 0.3, 0, -0.01, L * 0.1, c, g);
                bx(0.055, 0.055, 0.3, 0, 0.11, -L * 0.28, 0x111111, g);
                bx(0.06, 0.06, 0.04, 0, 0.11, -L * 0.28 - 0.17, 0x224466, g);
                bx(0.04, 0.12, 0.05, 0, -0.1, -L * 0.2, a, g);
                break;
            }
        case "shotgun":
            {
                bx(0.065, 0.08, L * 0.4, 0, 0.02, -L * 0.2, c, g);
                bx(0.035, 0.035, L * 0.62, 0, 0.035, -L * 0.62, a, g);
                bx(0.05, 0.045, 0.2, 0, -0.02, -L * 0.5, c, g);
                bx(0.055, 0.1, L * 0.3, 0, -0.01, L * 0.1, c, g);
                break;
            }
        case "lmg":
            {
                bx(0.07, 0.1, L * 0.55, 0, 0.02, -L * 0.3, c, g);
                bx(0.03, 0.03, L * 0.5, 0, 0.035, -L * 0.82, a, g);
                bx(0.06, 0.1, L * 0.3, 0, -0.01, L * 0.14, c, g);
                bx(0.12, 0.13, 0.16, 0, -0.12, -L * 0.28, a, g);
                bx(0.02, 0.14, 0.02, 0.05, -0.08, -L * 0.8, a, g);
                bx(0.02, 0.14, 0.02, -0.05, -0.08, -L * 0.8, a, g);
                break;
            }
        case "pistol":
            {
                bx(0.035, 0.05, L * 0.95, 0, 0.03, -L * 0.45, c, g);
                const gr = bx(0.04, 0.11, 0.055, 0, -0.04, -0.01, a, g);
                gr.rotation.x = -0.15;
                break;
            }
        case "melee":
            {
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
        default:
            {
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
    g.userData.muzzle = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0.03, -L);
    return g;
}
const UPPER = 0.43;
const FORE = 0.42;
const DOWN = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, -1, 0);
const SHOULDER_R = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0.34, 1.37, 0);
const SHOULDER_L = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](-0.34, 1.37, 0);
const HAND_R = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0.12, 1.06, -0.4);
const HAND_L = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0.03, 1.08, -0.72);
function aimSegment(g, from, to) {
    g.position.copy(from);
    const dir = to.clone().sub(from);
    if (dir.lengthSq() < 1e-8) return;
    dir.normalize();
    g.quaternion.setFromUnitVectors(DOWN, dir);
}
// 两骨骼 IK：给定肩、手位置，解出肘部，避免手臂反向或穿模
function solveElbow(shoulder, hand, hint) {
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
function makeAvatar(k) {
    const group = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
    const model = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
    group.add(model);
    const mkLeg = (x)=>{
        const p = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
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
    const mkUpper = ()=>{
        const p = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
        bx(0.19, UPPER, 0.19, 0, -UPPER / 2, 0, k.torso, p);
        model.add(p);
        return p;
    };
    const mkFore = ()=>{
        const p = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
        bx(0.16, FORE, 0.16, 0, -FORE / 2, 0, k.torso, p);
        bx(0.18, 0.15, 0.18, 0, -FORE, 0, k.skin, p);
        model.add(p);
        return p;
    };
    const upperL = mkUpper();
    const upperR = mkUpper();
    const foreL = mkFore();
    const foreR = mkFore();
    const weapon = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
    weapon.position.copy(HAND_R);
    model.add(weapon);
    group.scale.setScalar(k.scale);
    const a = {
        group,
        model,
        legL,
        legR,
        upperL,
        upperR,
        foreL,
        foreR,
        weapon,
        weaponId: "",
        tag: null,
        hpBar: null
    };
    poseArms(a, false, 0);
    return a;
}
function setAvatarWeapon(a, def) {
    if (a.weaponId === def.id) return;
    a.weaponId = def.id;
    while(a.weapon.children.length)a.weapon.remove(a.weapon.children[0]);
    const m = buildGunModel(def);
    m.scale.setScalar(def.cat === "melee" ? 1.2 : 1.1);
    if (def.cat === "melee") m.rotation.x = 0.5;
    a.weapon.add(m);
}
// 双手持枪姿势：右手握把、左手托护木；近战只用右手
function poseArms(a, melee, bob) {
    if (melee) {
        a.weapon.position.set(0.3, 1.1, -0.3);
        a.weapon.rotation.set(0.35, 0, 0);
        aimSegment(a.upperR, SHOULDER_R, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0.34, 1.02, -0.24 + bob));
        const er = solveElbow(SHOULDER_R, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0.3, 1.1, -0.3), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0.8, -0.5, 0));
        aimSegment(a.foreR, er, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0.3, 1.1, -0.3));
        aimSegment(a.upperL, SHOULDER_L, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](-0.4, 0.98, 0.02));
        const el = solveElbow(SHOULDER_L, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](-0.4, 0.86, 0.04), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](-0.7, -0.6, 0.2));
        aimSegment(a.foreL, el, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](-0.4, 0.86, 0.04));
        return;
    }
    const handR = HAND_R.clone().add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, bob * 0.4, bob * 0.15));
    const handL = HAND_L.clone().add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, bob * 0.4, bob * 0.2));
    a.weapon.position.copy(HAND_R);
    a.weapon.rotation.set(0, 0, 0);
    aimSegment(a.upperR, SHOULDER_R, handR);
    const er = solveElbow(SHOULDER_R, handR, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0.75, -0.6, 0.1));
    aimSegment(a.foreR, er, handR);
    aimSegment(a.upperL, SHOULDER_L, handL);
    const el = solveElbow(SHOULDER_L, handL, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](-0.55, -0.75, 0.15));
    aimSegment(a.foreL, el, handL);
}
function animateAvatar(a, phase, speed, stance, dt, lerpK = 1, melee = false) {
    const amp = Math.min(1, speed / 4) * 0.9;
    const s = Math.sin(phase) * amp;
    a.legL.rotation.x = s;
    a.legR.rotation.x = -s;
    const m = a.model;
    if (stance === 2) {
        m.rotation.x = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].lerp(m.rotation.x, -Math.PI / 2, Math.min(1, dt * 12 * lerpK));
        m.position.set(0, 0.04, 0.9);
        m.scale.y = 1;
    } else {
        m.rotation.x = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].lerp(m.rotation.x, 0, Math.min(1, dt * 12 * lerpK));
        m.position.set(0, 0, 0);
        m.scale.y = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].lerp(m.scale.y, stance === 0 ? 1 : 0.72, Math.min(1, dt * 12 * lerpK));
    }
    // 持枪时手臂随步伐轻微起伏
    const bob = Math.sin(phase * 2) * 0.012 * amp;
    poseArms(a, melee, bob);
}
const tagCache = new Map();
function makeTag(text, color) {
    const key = text + color;
    let mat = tagCache.get(key);
    if (!mat) {
        const cv = document.createElement("canvas");
        cv.width = 256;
        cv.height = 64;
        const g = cv.getContext("2d");
        g.font = "bold 30px monospace";
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.lineWidth = 6;
        g.strokeStyle = "rgba(0,0,0,0.85)";
        g.strokeText(text, 128, 34);
        g.fillStyle = color;
        g.fillText(text, 128, 34);
        const t = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasTexture"](cv);
        t.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
        mat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SpriteMaterial"]({
            map: t,
            depthTest: false,
            transparent: true
        });
        tagCache.set(key, mat);
    }
    const s = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sprite"](mat);
    s.scale.set(1.8, 0.45, 1);
    s.position.y = 2.35;
    s.renderOrder = 10;
    return s;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/game/world.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GRAVITY",
    ()=>GRAVITY,
    "STEP_H",
    ()=>STEP_H,
    "World",
    ()=>World,
    "newBody",
    ()=>newBody,
    "rayVsEntity",
    ()=>rayVsEntity
]);
function newBody(x = 0, y = 0, z = 0) {
    return {
        x,
        y,
        z,
        vx: 0,
        vy: 0,
        vz: 0,
        hw: 0.3,
        h: 1.8,
        onGround: false
    };
}
const GRAVITY = 24;
const STEP_H = 0.55;
const DIRS = [
    [
        1,
        0
    ],
    [
        -1,
        0
    ],
    [
        0,
        1
    ],
    [
        0,
        -1
    ],
    [
        1,
        1
    ],
    [
        1,
        -1
    ],
    [
        -1,
        1
    ],
    [
        -1,
        -1
    ]
];
class World {
    map;
    n;
    b;
    hx;
    hz;
    cell;
    ox;
    oz;
    cw;
    ch;
    grid;
    stamp;
    stampId;
    tmp;
    tmp2;
    navW;
    navH;
    surf;
    constructor(map){
        this.map = map;
        this.cell = 4;
        this.stampId = 0;
        this.tmp = [];
        this.tmp2 = [];
        this.surf = new Map();
        const bs = map.boxes.filter((b)=>!b.nc);
        this.n = bs.length;
        this.b = new Float32Array(this.n * 6);
        this.hx = map.hx;
        this.hz = map.hz;
        this.ox = -(map.hx + 4);
        this.oz = -(map.hz + 4);
        this.cw = Math.ceil(2 * (map.hx + 4) / this.cell) + 1;
        this.ch = Math.ceil(2 * (map.hz + 4) / this.cell) + 1;
        this.grid = Array.from({
            length: this.cw * this.ch
        }, ()=>[]);
        this.stamp = new Int32Array(this.n);
        bs.forEach((bx, i)=>{
            const o = i * 6;
            this.b[o] = bx.x0;
            this.b[o + 1] = bx.y0;
            this.b[o + 2] = bx.z0;
            this.b[o + 3] = bx.x1;
            this.b[o + 4] = bx.y1;
            this.b[o + 5] = bx.z1;
            const cx0 = this.ci(bx.x0, this.ox, this.cw);
            const cx1 = this.ci(bx.x1, this.ox, this.cw);
            const cz0 = this.ci(bx.z0, this.oz, this.ch);
            const cz1 = this.ci(bx.z1, this.oz, this.ch);
            for(let cz = cz0; cz <= cz1; cz++)for(let cx = cx0; cx <= cx1; cx++)this.grid[cz * this.cw + cx].push(i);
        });
        this.navW = Math.floor(map.hx * 2);
        this.navH = Math.floor(map.hz * 2);
    }
    ci(v, o, n) {
        return Math.max(0, Math.min(n - 1, Math.floor((v - o) / this.cell)));
    }
    query(x0, z0, x1, z1, out) {
        out.length = 0;
        this.stampId++;
        const cx0 = this.ci(x0, this.ox, this.cw);
        const cx1 = this.ci(x1, this.ox, this.cw);
        const cz0 = this.ci(z0, this.oz, this.ch);
        const cz1 = this.ci(z1, this.oz, this.ch);
        for(let cz = cz0; cz <= cz1; cz++){
            for(let cx = cx0; cx <= cx1; cx++){
                const g = this.grid[cz * this.cw + cx];
                for(let k = 0; k < g.length; k++){
                    const id = g[k];
                    if (this.stamp[id] !== this.stampId) {
                        this.stamp[id] = this.stampId;
                        out.push(id);
                    }
                }
            }
        }
    }
    fits(x, y, z, hw, h) {
        this.query(x - hw, z - hw, x + hw, z + hw, this.tmp2);
        const B = this.b;
        for(let k = 0; k < this.tmp2.length; k++){
            const i = this.tmp2[k] * 6;
            if (x + hw <= B[i] || x - hw >= B[i + 3] || z + hw <= B[i + 2] || z - hw >= B[i + 5]) continue;
            if (y + h <= B[i + 1] || y >= B[i + 4]) continue;
            return false;
        }
        return true;
    }
    moveBody(b, dt) {
        const steps = Math.max(1, Math.ceil(dt / (1 / 120)));
        const h = dt / steps;
        for(let i = 0; i < steps; i++)this.stepBody(b, h);
    }
    stepBody(b, dt) {
        b.vy -= GRAVITY * dt;
        if (b.vy < -40) b.vy = -40;
        const was = b.onGround;
        this.moveH(b, b.vx * dt, 0, was);
        this.moveH(b, 0, b.vz * dt, was);
        this.moveV(b, b.vy * dt);
        // 边界保护
        const lx = this.hx - 0.5;
        const lz = this.hz - 0.5;
        if (b.x > lx) b.x = lx;
        if (b.x < -lx) b.x = -lx;
        if (b.z > lz) b.z = lz;
        if (b.z < -lz) b.z = -lz;
        if (b.y < -20) {
            b.y = 5;
            b.vy = 0;
        }
    }
    moveH(b, dx, dz, canStep) {
        if (dx === 0 && dz === 0) return;
        const px = b.x;
        const py = b.y;
        const pz = b.z;
        b.x += dx;
        b.z += dz;
        const hw = b.hw;
        const B = this.b;
        let blockedX = false;
        let blockedZ = false;
        // 多次迭代：一次推动可能把身体挤进另一面墙（墙角常见），
        // 迭代求解直到不再相交，最后仍相交则整体回退。
        for(let pass = 0; pass < 3; pass++){
            this.query(b.x - hw, b.z - hw, b.x + hw, b.z + hw, this.tmp);
            let hit = false;
            for(let k = 0; k < this.tmp.length; k++){
                const i = this.tmp[k] * 6;
                const x0 = B[i], y0 = B[i + 1], z0 = B[i + 2], x1 = B[i + 3], y1 = B[i + 4], z1 = B[i + 5];
                if (b.x + hw <= x0 + 1e-5 || b.x - hw >= x1 - 1e-5 || b.z + hw <= z0 + 1e-5 || b.z - hw >= z1 - 1e-5) continue;
                if (b.y + b.h <= y0 || b.y >= y1) continue;
                const rise = y1 - b.y;
                if (canStep && rise > 0 && rise <= STEP_H && this.fits(b.x, y1 + 0.001, b.z, hw, b.h)) {
                    b.y = y1;
                    continue;
                }
                hit = true;
                if (dx > 0) {
                    b.x = Math.min(b.x, x0 - hw - 0.001);
                    blockedX = true;
                } else if (dx < 0) {
                    b.x = Math.max(b.x, x1 + hw + 0.001);
                    blockedX = true;
                }
                if (dz > 0) {
                    b.z = Math.min(b.z, z0 - hw - 0.001);
                    blockedZ = true;
                } else if (dz < 0) {
                    b.z = Math.max(b.z, z1 + hw + 0.001);
                    blockedZ = true;
                }
            }
            if (!hit) break;
        }
        if (!this.fits(b.x, b.y, b.z, hw, b.h)) {
            b.x = px;
            b.y = py;
            b.z = pz;
            blockedX = dx !== 0;
            blockedZ = dz !== 0;
        }
        if (blockedX) b.vx = 0;
        if (blockedZ) b.vz = 0;
    }
    moveV(b, dy) {
        b.y += dy;
        b.onGround = false;
        const hw = b.hw - 0.01;
        this.query(b.x - hw, b.z - hw, b.x + hw, b.z + hw, this.tmp);
        const B = this.b;
        for(let k = 0; k < this.tmp.length; k++){
            const i = this.tmp[k] * 6;
            const x0 = B[i], y0 = B[i + 1], z0 = B[i + 2], x1 = B[i + 3], y1 = B[i + 4], z1 = B[i + 5];
            if (b.x + hw <= x0 || b.x - hw >= x1 || b.z + hw <= z0 || b.z - hw >= z1) continue;
            if (b.y + b.h <= y0 || b.y >= y1) continue;
            if (dy <= 0 && b.y - dy >= y1 - 0.02) {
                b.y = y1;
                if (b.vy < 0) b.vy = 0;
                b.onGround = true;
            } else if (dy > 0 && b.y + b.h - dy <= y0 + 0.02) {
                b.y = y0 - b.h;
                if (b.vy > 0) b.vy = 0;
            }
        }
    }
    // 射线：返回最近命中距离 (未命中返回 maxT)
    raycast(ox, oy, oz, dx, dy, dz, maxT) {
        let best = maxT;
        const B = this.b;
        const ix = dx === 0 ? 1e30 : 1 / dx;
        const iy = dy === 0 ? 1e30 : 1 / dy;
        const iz = dz === 0 ? 1e30 : 1 / dz;
        for(let i = 0; i < this.n; i++){
            const o = i * 6;
            let t1 = (B[o] - ox) * ix;
            let t2 = (B[o + 3] - ox) * ix;
            let tmin = t1 < t2 ? t1 : t2;
            let tmax = t1 < t2 ? t2 : t1;
            t1 = (B[o + 1] - oy) * iy;
            t2 = (B[o + 4] - oy) * iy;
            tmin = Math.max(tmin, t1 < t2 ? t1 : t2);
            tmax = Math.min(tmax, t1 < t2 ? t2 : t1);
            if (tmin > tmax) continue;
            t1 = (B[o + 2] - oz) * iz;
            t2 = (B[o + 5] - oz) * iz;
            tmin = Math.max(tmin, t1 < t2 ? t1 : t2);
            tmax = Math.min(tmax, t1 < t2 ? t2 : t1);
            if (tmin > tmax || tmax < 0) continue;
            const t = tmin < 0 ? 0 : tmin;
            if (t < best) best = t;
        }
        return best;
    }
    hasLOS(ax, ay, az, bx, by, bz) {
        const dx = bx - ax, dy = by - ay, dz = bz - az;
        const len = Math.hypot(dx, dy, dz);
        if (len < 0.01) return true;
        return this.raycast(ax, ay, az, dx / len, dy / len, dz / len, len - 0.05) >= len - 0.05;
    }
    // ───────────── 导航 (多层楼面 A*) ─────────────
    surfaces(ix, iz) {
        if (ix < 0 || iz < 0 || ix >= this.navW || iz >= this.navH) return [];
        const key = iz * this.navW + ix;
        const hit = this.surf.get(key);
        if (hit) return hit;
        const cx = ix - this.hx + 0.5;
        const cz = iz - this.hz + 0.5;
        const pr = 0.32;
        const list = [];
        this.query(cx - pr, cz - pr, cx + pr, cz + pr, list);
        const B = this.b;
        const tops = [];
        const ov = [];
        for (const id of list){
            const i = id * 6;
            if (cx + pr <= B[i] || cx - pr >= B[i + 3] || cz + pr <= B[i + 2] || cz - pr >= B[i + 5]) continue;
            ov.push(id);
            const t = B[i + 4];
            if (t > -0.5 && t < 30 && !tops.some((q)=>Math.abs(q - t) < 0.04)) tops.push(t);
        }
        tops.sort((a, b)=>a - b);
        const res = [];
        for (const t of tops){
            let ok = true;
            for (const id of ov){
                const i = id * 6;
                if (B[i + 1] < t + 1.8 - 0.01 && B[i + 4] > t + 0.03) {
                    ok = false;
                    break;
                }
            }
            if (ok && res.length < 8) res.push(t);
        }
        this.surf.set(key, res);
        return res;
    }
    cellOf(x, z) {
        return [
            Math.floor(x + this.hx),
            Math.floor(z + this.hz)
        ];
    }
    bestSurface(ix, iz, y) {
        const s = this.surfaces(ix, iz);
        let bi = -1;
        let bd = 1e9;
        for(let k = 0; k < s.length; k++){
            const d = Math.abs(s[k] - y);
            if (d < bd) {
                bd = d;
                bi = k;
            }
        }
        return bd < 1.6 ? bi : -1;
    }
    findNode(x, y, z) {
        const [cx, cz] = this.cellOf(x, z);
        for(let r = 0; r <= 2; r++){
            let best = -1;
            let bd = 1e9;
            for(let dz = -r; dz <= r; dz++){
                for(let dx = -r; dx <= r; dx++){
                    if (Math.max(Math.abs(dx), Math.abs(dz)) !== r) continue;
                    const k = this.bestSurface(cx + dx, cz + dz, y);
                    if (k < 0) continue;
                    const d = Math.hypot(dx, dz);
                    if (d < bd) {
                        bd = d;
                        best = ((cz + dz) * this.navW + (cx + dx)) * 8 + k;
                    }
                }
            }
            if (best >= 0) return best;
        }
        return -1;
    }
    nodePos(id) {
        const si = id % 8;
        const cell = (id - si) / 8;
        const ix = cell % this.navW;
        const iz = (cell - ix) / this.navW;
        return [
            ix - this.hx + 0.5,
            this.surfaces(ix, iz)[si],
            iz - this.hz + 0.5
        ];
    }
    findPath(sx, sy, sz, gx, gy, gz, maxExp = 5000) {
        const s = this.findNode(sx, sy, sz);
        const g = this.findNode(gx, gy, gz);
        if (s < 0 || g < 0) return null;
        if (s === g) return [];
        const gp = this.nodePos(g);
        const heur = (id)=>{
            const p = this.nodePos(id);
            return Math.hypot(p[0] - gp[0], p[2] - gp[2]) + Math.abs(p[1] - gp[1]) * 0.3;
        };
        const gs = new Map();
        const parent = new Map();
        const closed = new Set();
        // 二叉堆
        const hp = [];
        const push = (f, id)=>{
            hp.push([
                f,
                id
            ]);
            let i = hp.length - 1;
            while(i > 0){
                const p = i - 1 >> 1;
                if (hp[p][0] <= hp[i][0]) break;
                [hp[p], hp[i]] = [
                    hp[i],
                    hp[p]
                ];
                i = p;
            }
        };
        const pop = ()=>{
            const top = hp[0];
            const last = hp.pop();
            if (hp.length > 0) {
                hp[0] = last;
                let i = 0;
                for(;;){
                    const l = i * 2 + 1;
                    const r = l + 1;
                    let m = i;
                    if (l < hp.length && hp[l][0] < hp[m][0]) m = l;
                    if (r < hp.length && hp[r][0] < hp[m][0]) m = r;
                    if (m === i) break;
                    [hp[m], hp[i]] = [
                        hp[i],
                        hp[m]
                    ];
                    i = m;
                }
            }
            return top;
        };
        gs.set(s, 0);
        push(heur(s), s);
        let exp = 0;
        let bestId = s;
        let bestH = heur(s);
        let found = false;
        while(hp.length > 0 && exp < maxExp){
            const [, cur] = pop();
            if (closed.has(cur)) continue;
            closed.add(cur);
            exp++;
            if (cur === g) {
                found = true;
                break;
            }
            const si = cur % 8;
            const cell = (cur - si) / 8;
            const ix = cell % this.navW;
            const iz = (cell - ix) / this.navW;
            const h = this.surfaces(ix, iz)[si];
            const cg = gs.get(cur);
            for (const [dx, dz] of DIRS){
                const nx = ix + dx;
                const nz = iz + dz;
                if (dx !== 0 && dz !== 0) {
                    if (!this.passable(ix + dx, iz, h) || !this.passable(ix, iz + dz, h)) continue;
                }
                const ss = this.surfaces(nx, nz);
                for(let k = 0; k < ss.length; k++){
                    const dh = ss[k] - h;
                    if (dh > 0.56 || dh < -0.6) continue;
                    const nid = (nz * this.navW + nx) * 8 + k;
                    if (closed.has(nid)) continue;
                    const ng = cg + (dx !== 0 && dz !== 0 ? 1.414 : 1) + Math.abs(dh) * 0.3;
                    const old = gs.get(nid);
                    if (old !== undefined && old <= ng) continue;
                    gs.set(nid, ng);
                    parent.set(nid, cur);
                    const hh = heur(nid);
                    if (hh < bestH) {
                        bestH = hh;
                        bestId = nid;
                    }
                    push(ng + hh, nid);
                }
            }
        }
        const end = found ? g : bestId;
        if (end === s) return null;
        const path = [];
        let c = end;
        while(c !== s){
            path.push(this.nodePos(c));
            const p = parent.get(c);
            if (p === undefined) break;
            c = p;
        }
        path.reverse();
        return path;
    }
    passable(ix, iz, h) {
        const ss = this.surfaces(ix, iz);
        for (const t of ss){
            const d = t - h;
            if (d <= 0.56 && d >= -0.6) return true;
        }
        return false;
    }
}
const BOXES = {
    0: {
        body: [
            -0.34,
            0,
            -0.27,
            0.34,
            1.4,
            0.27
        ],
        head: [
            -0.24,
            1.4,
            -0.24,
            0.24,
            1.82,
            0.24
        ]
    },
    1: {
        body: [
            -0.34,
            0,
            -0.27,
            0.34,
            0.95,
            0.27
        ],
        head: [
            -0.24,
            0.95,
            -0.24,
            0.24,
            1.32,
            0.24
        ]
    },
    2: {
        body: [
            -0.34,
            0,
            -0.4,
            0.34,
            0.42,
            0.9
        ],
        head: [
            -0.24,
            0,
            -0.92,
            0.24,
            0.52,
            -0.4
        ]
    }
};
function rayBox(ox, oy, oz, ix, iy, iz, b, maxT) {
    let t1 = (b[0] - ox) * ix;
    let t2 = (b[3] - ox) * ix;
    let tmin = Math.min(t1, t2);
    let tmax = Math.max(t1, t2);
    t1 = (b[1] - oy) * iy;
    t2 = (b[4] - oy) * iy;
    tmin = Math.max(tmin, Math.min(t1, t2));
    tmax = Math.min(tmax, Math.max(t1, t2));
    t1 = (b[2] - oz) * iz;
    t2 = (b[5] - oz) * iz;
    tmin = Math.max(tmin, Math.min(t1, t2));
    tmax = Math.min(tmax, Math.max(t1, t2));
    if (tmin > tmax || tmax < 0) return -1;
    const t = tmin < 0 ? 0 : tmin;
    return t <= maxT ? t : -1;
}
function rayVsEntity(ox, oy, oz, dx, dy, dz, e, maxT) {
    const c = Math.cos(e.yaw);
    const s = Math.sin(e.yaw);
    const rx = ox - e.x;
    const rz = oz - e.z;
    const sc = e.scale || 1;
    const lox = (c * rx - s * rz) / sc;
    const loz = (s * rx + c * rz) / sc;
    const loy = (oy - e.y) / sc;
    const ldx = (c * dx - s * dz) / sc;
    const ldz = (s * dx + c * dz) / sc;
    const ldy = dy / sc;
    const ix = ldx === 0 ? 1e30 : 1 / ldx;
    const iy = ldy === 0 ? 1e30 : 1 / ldy;
    const iz = ldz === 0 ? 1e30 : 1 / ldz;
    const bx = BOXES[e.stance === 2 ? 2 : e.stance === 0 ? 0 : 1];
    const th = rayBox(lox, loy, loz, ix, iy, iz, bx.head, maxT * 4);
    const tb = rayBox(lox, loy, loz, ix, iy, iz, bx.body, maxT * 4);
    // 由于缩放后参数 t 与缩放前相同 (整体线性缩放)，直接比较即可
    if (th >= 0 && (tb < 0 || th <= tb + 0.0001)) return th <= maxT ? {
        t: th,
        head: true
    } : null;
    if (tb >= 0) return tb <= maxT ? {
        t: tb,
        head: false
    } : null;
    return null;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]})(),
"[project]/src/components/GameView.tsx [app-client] (ecmascript, next/dynamic entry)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/GameView.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_17-gewy69nedn._.js.map