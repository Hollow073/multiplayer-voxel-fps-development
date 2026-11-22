(()=>{"use strict";module.exports = [
"[project]/src/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/* eslint-disable react-hooks/set-state-in-effect -- 首屏从 localStorage / 服务器读取初始状态 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$maps$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/maps.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$minimap$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/minimap.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/weapons.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$keybinds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/keybinds.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadoutPicker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/LoadoutPicker.tsx [app-ssr] (ecmascript)");
;
"use client";
;
;
;
;
;
;
;
;
const GameView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/src/components/GameView.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const MODE_NAME = {
    tdm: "双方对战",
    ffa4: "四方混战",
    defense: "据点防守"
};
const TAG_COLOR = {
    duel: "bg-sky-500",
    ffa: "bg-fuchsia-500",
    defense: "bg-emerald-500"
};
const FILTERS = [
    [
        "all",
        "全部地图"
    ],
    [
        "duel",
        "双方对抗"
    ],
    [
        "ffa",
        "四方混战"
    ],
    [
        "defense",
        "据点防守"
    ]
];
function MapPreview({ id, size = 280 }) {
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const cv = ref.current;
        if (!cv) return;
        const src = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$minimap$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["renderMapCanvas"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$maps$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildMap"])(id), size, true);
        cv.width = src.width;
        cv.height = src.height;
        cv.getContext("2d").drawImage(src, 0, 0);
    }, [
        id,
        size
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: ref,
        className: "w-full rounded border border-white/20 bg-black/30",
        style: {
            imageRendering: "pixelated"
        }
    }, void 0, false, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 54,
        columnNumber: 10
    }, this);
}
function KeyBindRow({ action, label, hint, value, onChange, conflict }) {
    const [listening, setListening] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-36 text-right text-sm text-white/80 pr-2",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            hint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-40 text-xs text-white/40",
                children: hint
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 62,
                columnNumber: 16
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setListening(true),
                onKeyDown: (e)=>{
                    if (!listening) return;
                    e.preventDefault();
                    const code = e.code || (e.key === " " ? "Space" : e.key);
                    if (code && code !== "Escape") onChange(code);
                    setListening(false);
                },
                onBlur: ()=>setListening(false),
                className: `flex-1 max-w-[160px] px-3 py-1.5 rounded border-2 text-sm font-mono text-center transition ${listening ? "border-amber-400 bg-amber-400/10 text-amber-300" : conflict ? "border-red-400/60 bg-red-400/10 text-red-300" : "border-white/15 bg-white/5 text-white hover:border-white/30"}`,
                tabIndex: 0,
                children: listening ? "按任意键…" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$keybinds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codeLabel"])(value)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            conflict && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[10px] text-red-400",
                title: `与 ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$keybinds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BIND_META"].find((m)=>m.key === conflict)?.label} 冲突`,
                children: "⚠ 冲突"
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 78,
                columnNumber: 20
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
function Seg({ value, options, onChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex gap-1.5 flex-wrap",
        children: options.map(([v, n])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onChange(v),
                className: `px-3 py-1.5 rounded text-xs font-bold border-2 ${value === v ? "border-amber-400 bg-amber-400 text-black" : "border-white/15 text-white/75 hover:border-white/40"}`,
                children: n
            }, String(v), false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 87,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
function Home() {
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("玩家");
    const [loadout, setLoadout] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_LOADOUT"]);
    const [mapId, setMapId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("duel-town");
    const [filter, setFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("all");
    const [ffaMode, setFfaMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("ffa4");
    const [bots, setBots] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(2);
    const [score, setScore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(30);
    const [diff, setDiff] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(2);
    const [roomName, setRoomName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("create");
    const [rooms, setRooms] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [lan, setLan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        ips: [],
        port: ""
    });
    const [stats, setStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [code, setCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [err, setErr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [cfg, setCfg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showLoadout, setShowLoadout] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [origin, setOrigin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [binds, setBinds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$keybinds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_BINDS"]);
    const [bindsErr, setBindsErr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [listening, setListening] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showSettings, setShowSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const resetBinds = ()=>{
        setBinds({
            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$keybinds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_BINDS"]
        });
        setBindsErr("");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$keybinds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveBinds"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$keybinds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_BINDS"]);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setOrigin(window.location.origin);
        const n = localStorage.getItem("bs_name");
        setName(n || `玩家${Math.floor(Math.random() * 900 + 100)}`);
        setBinds((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$keybinds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadBinds"])());
        try {
            const l = localStorage.getItem("bs_loadout");
            if (l) setLoadout((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sanitizeLoadout"])(JSON.parse(l)));
        } catch  {
        /* ignore */ }
    }, []);
    // 设置面板：按下任意键绑定到当前动作；与已有键冲突时自动交换
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!listening) return;
        const onKey = (e)=>{
            e.preventDefault();
            e.stopPropagation();
            if (e.code === "Escape") {
                setListening(null);
                return;
            }
            // 忽略无法识别的按键（部分自动化/输入法会给出空 code）
            if (!e.code || e.code === "Unidentified") return;
            const conflict = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$keybinds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["bindConflict"])(binds, listening, e.code);
            const next = {
                ...binds,
                [listening]: e.code
            };
            if (conflict) next[conflict] = binds[listening];
            setBinds(next);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$keybinds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveBinds"])(next);
            setBindsErr(conflict ? `已与「${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$keybinds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BIND_META"].find((m)=>m.key === conflict)?.label ?? ""}」交换按键` : "");
            setListening(null);
        };
        window.addEventListener("keydown", onKey, true);
        return ()=>window.removeEventListener("keydown", onKey, true);
    }, [
        listening,
        binds
    ]);
    const refresh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            const r = await fetch("/api/net/rooms", {
                cache: "no-store"
            });
            const j = await r.json();
            setRooms(Array.isArray(j.rooms) ? j.rooms : []);
            setLan({
                ips: Array.isArray(j.lan) ? j.lan.filter((v)=>typeof v === "string") : [],
                port: typeof j.port === "string" ? j.port : String(j.port ?? "")
            });
        } catch  {
        /* ignore */ }
    }, []);
    const loadStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            const r = await fetch("/api/stats", {
                cache: "no-store"
            });
            const j = await r.json();
            setStats(j.rows ?? []);
        } catch  {
        /* ignore */ }
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (cfg) return;
        refresh();
        loadStats();
        const id = setInterval(refresh, 2500);
        return ()=>clearInterval(id);
    }, [
        cfg,
        refresh,
        loadStats
    ]);
    const map = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$maps$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMapInfo"])(mapId);
    const mode = map.type === "defense" ? "defense" : map.type === "duel" ? "tdm" : ffaMode;
    const cleanName = name.trim().slice(0, 14) || "玩家";
    const begin = (roomId)=>{
        localStorage.setItem("bs_name", cleanName);
        localStorage.setItem("bs_loadout", JSON.stringify(loadout));
        setCfg({
            roomId,
            pid: Math.random().toString(36).slice(2, 10),
            name: cleanName,
            team: -1,
            loadout
        });
    };
    const create = async ()=>{
        setBusy(true);
        setErr("");
        const pid = Math.random().toString(36).slice(2, 10);
        try {
            const r = await fetch("/api/net/rooms", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    pid,
                    name: roomName || `${cleanName} 的战场`,
                    mapId,
                    mode,
                    bots,
                    score,
                    diff
                })
            });
            const j = await r.json();
            if (!j.ok) throw new Error("创建失败");
            localStorage.setItem("bs_name", cleanName);
            localStorage.setItem("bs_loadout", JSON.stringify(loadout));
            setCfg({
                roomId: j.id,
                pid,
                name: cleanName,
                team: -1,
                loadout
            });
        } catch  {
            setErr("创建房间失败，请重试");
        }
        setBusy(false);
    };
    if (cfg) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GameView, {
            cfg: cfg,
            onExit: ()=>setCfg(null),
            onLoadoutChange: (l)=>{
                setLoadout(l);
                localStorage.setItem("bs_loadout", JSON.stringify(l));
            }
        }, cfg.pid, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 227,
            columnNumber: 7
        }, this);
    }
    const shown = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$maps$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MAP_LIST"].filter((m)=>filter === "all" || m.type === filter);
    // 优先使用服务端探测到的局域网 IP；拿不到时退回到当前访问地址
    const urls = lan.ips.length > 0 ? lan.ips.map((ip)=>lan.port ? `http://${ip}:${lan.port}` : `http://${ip}`) : origin ? [
        origin
    ] : [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen text-white bg-[#0b1220] bg-[radial-gradient(circle_at_20%_0%,rgba(251,191,36,0.12),transparent_45%),radial-gradient(circle_at_90%_30%,rgba(56,189,248,0.1),transparent_40%)]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto max-w-[1400px] px-4 py-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "flex flex-wrap items-end justify-between gap-4 mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "pixel-title text-4xl sm:text-5xl font-black tracking-widest",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-amber-400",
                                                children: "BLOCK"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 250,
                                                columnNumber: 15
                                            }, this),
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white",
                                                children: "STRIKE"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 250,
                                                columnNumber: 61
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 249,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-sm text-white/60",
                                        children: [
                                            "3D 方块 FPS · 局域网联机 · ",
                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$maps$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MAP_LIST"].length,
                                            " 张地图 · 多人对抗 / 据点防守"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 252,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 248,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-xs text-white/60",
                                        children: "昵称"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 255,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: name,
                                        maxLength: 14,
                                        onChange: (e)=>setName(e.target.value),
                                        className: "w-40 rounded bg-white/10 border border-white/20 px-3 py-2 text-sm font-bold focus:outline-none focus:border-amber-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 256,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setBindsErr("");
                                            setListening(null);
                                            setShowSettings(true);
                                        },
                                        className: "px-3 py-2 rounded border-2 border-white/20 bg-white/5 hover:bg-white/15 text-sm font-bold whitespace-nowrap",
                                        title: "修改默认键位",
                                        children: "⚙ 设置"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 257,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 254,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 247,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 xl:grid-cols-[1fr_440px] gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between mb-3 flex-wrap gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-lg font-black tracking-wider",
                                                children: "选择地图"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 275,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Seg, {
                                                value: filter,
                                                options: FILTERS,
                                                onChange: setFilter
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 276,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 274,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3",
                                        children: shown.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setMapId(m.id),
                                                className: `text-left rounded-lg border-2 p-2.5 transition-all ${mapId === m.id ? "border-amber-400 bg-amber-400/10 shadow-[0_0_24px_rgba(251,191,36,0.2)]" : "border-white/10 bg-white/5 hover:border-white/35"}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MapPreview, {
                                                        id: m.id,
                                                        size: 240
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 281,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-2 flex items-center justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-black",
                                                                children: m.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 283,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `text-[10px] font-bold px-2 py-0.5 rounded ${TAG_COLOR[m.type]} text-black`,
                                                                children: m.tag
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 284,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 282,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-1 text-[11px] leading-snug text-white/55 line-clamp-2",
                                                        children: m.desc
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 286,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, m.id, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 280,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 278,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-6 rounded-lg border border-white/15 bg-white/5 p-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setShowLoadout((v)=>!v),
                                                className: "w-full flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "text-lg font-black tracking-wider",
                                                        children: "武器配装"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 294,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-white/60",
                                                        children: showLoadout ? "收起 ▲" : "展开 ▼  一号位 / 二号位 / 三号位"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 295,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 293,
                                                columnNumber: 15
                                            }, this),
                                            showLoadout && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-3",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadoutPicker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    value: loadout,
                                                    onChange: setLoadout
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 299,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 298,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 292,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 273,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-lg border border-white/15 bg-white/5 p-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-2 mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setTab("create"),
                                                        className: `flex-1 py-2 rounded font-black text-sm ${tab === "create" ? "bg-amber-400 text-black" : "bg-white/10 hover:bg-white/20"}`,
                                                        children: "创建房间"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 309,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setTab("join"),
                                                        className: `flex-1 py-2 rounded font-black text-sm ${tab === "join" ? "bg-amber-400 text-black" : "bg-white/10 hover:bg-white/20"}`,
                                                        children: [
                                                            "加入房间 (",
                                                            rooms.length,
                                                            ")"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 312,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 308,
                                                columnNumber: 15
                                            }, this),
                                            tab === "create" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MapPreview, {
                                                        id: mapId,
                                                        size: 380
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 319,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "font-black text-lg",
                                                                    children: map.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 322,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-xs text-white/55",
                                                                    children: map.desc
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 323,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 321,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 320,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-xs text-white/60",
                                                                children: "房间名称"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 327,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                value: roomName,
                                                                maxLength: 20,
                                                                onChange: (e)=>setRoomName(e.target.value),
                                                                placeholder: `${cleanName} 的战场`,
                                                                className: "mt-1 w-full rounded bg-white/10 border border-white/20 px-3 py-2 text-sm focus:outline-none focus:border-amber-400"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 328,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 326,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs text-white/60 mb-1",
                                                                children: "模式"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 331,
                                                                columnNumber: 21
                                                            }, this),
                                                            map.type === "ffa" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Seg, {
                                                                value: ffaMode,
                                                                options: [
                                                                    [
                                                                        "ffa4",
                                                                        "四方混战"
                                                                    ],
                                                                    [
                                                                        "tdm",
                                                                        "双方对战 (对角出生)"
                                                                    ]
                                                                ],
                                                                onChange: setFfaMode
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 333,
                                                                columnNumber: 23
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-sm font-bold text-amber-300",
                                                                children: [
                                                                    MODE_NAME[mode],
                                                                    map.type === "duel" ? " · 红队 vs 蓝队" : " · 守住据点，抵御四角来袭的敌人"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 335,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 330,
                                                        columnNumber: 19
                                                    }, this),
                                                    mode !== "defense" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-xs text-white/60 mb-1",
                                                                        children: [
                                                                            "每队 AI 机器人：",
                                                                            bots
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/page.tsx",
                                                                        lineNumber: 341,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "range",
                                                                        min: 0,
                                                                        max: 8,
                                                                        value: bots,
                                                                        onChange: (e)=>setBots(+e.target.value),
                                                                        className: "w-full accent-amber-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/page.tsx",
                                                                        lineNumber: 342,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 340,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-xs text-white/60 mb-1",
                                                                        children: "胜利所需击杀"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/page.tsx",
                                                                        lineNumber: 345,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Seg, {
                                                                        value: score,
                                                                        options: [
                                                                            [
                                                                                20,
                                                                                "20"
                                                                            ],
                                                                            [
                                                                                30,
                                                                                "30"
                                                                            ],
                                                                            [
                                                                                50,
                                                                                "50"
                                                                            ],
                                                                            [
                                                                                75,
                                                                                "75"
                                                                            ],
                                                                            [
                                                                                100,
                                                                                "100"
                                                                            ]
                                                                        ],
                                                                        onChange: setScore
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/page.tsx",
                                                                        lineNumber: 346,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 344,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 339,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs text-white/60 mb-1",
                                                                children: mode === "defense" ? "敌人强度" : "AI 难度"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 351,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Seg, {
                                                                value: diff,
                                                                options: [
                                                                    [
                                                                        1,
                                                                        "简单"
                                                                    ],
                                                                    [
                                                                        2,
                                                                        "普通"
                                                                    ],
                                                                    [
                                                                        3,
                                                                        "困难"
                                                                    ]
                                                                ],
                                                                onChange: setDiff
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 352,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 350,
                                                        columnNumber: 19
                                                    }, this),
                                                    err && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm text-red-400",
                                                        children: err
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 354,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        disabled: busy,
                                                        onClick: create,
                                                        className: "w-full py-3 rounded bg-amber-400 hover:bg-amber-300 disabled:opacity-60 text-black font-black text-lg tracking-widest",
                                                        children: busy ? "创建中…" : "▶ 创建并开始"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 355,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 318,
                                                columnNumber: 17
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                value: code,
                                                                onChange: (e)=>setCode(e.target.value.toUpperCase()),
                                                                maxLength: 5,
                                                                placeholder: "输入 5 位房间码",
                                                                className: "flex-1 rounded bg-white/10 border border-white/20 px-3 py-2 text-sm font-mono tracking-widest focus:outline-none focus:border-amber-400"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 362,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                disabled: code.length < 4,
                                                                onClick: ()=>begin(code),
                                                                className: "px-4 rounded bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-black font-black text-sm",
                                                                children: "加入"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 363,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 361,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-2 max-h-[420px] overflow-auto pr-1",
                                                        children: [
                                                            rooms.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-center text-sm text-white/45 py-8",
                                                                children: "暂无房间，去创建一个吧！"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 368,
                                                                columnNumber: 44
                                                            }, this),
                                                            rooms.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-3 rounded border border-white/15 bg-black/30 p-2.5",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex-1 min-w-0",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "font-bold truncate",
                                                                                    children: r.name
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/page.tsx",
                                                                                    lineNumber: 372,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "text-[11px] text-white/55",
                                                                                    children: [
                                                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$maps$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMapInfo"])(r.mapId).name,
                                                                                        " · ",
                                                                                        MODE_NAME[r.mode],
                                                                                        " · ",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "font-mono",
                                                                                            children: r.id
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/page.tsx",
                                                                                            lineNumber: 374,
                                                                                            columnNumber: 80
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/app/page.tsx",
                                                                                    lineNumber: 373,
                                                                                    columnNumber: 27
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/page.tsx",
                                                                            lineNumber: 371,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-xs text-white/70",
                                                                            children: [
                                                                                r.players,
                                                                                "/",
                                                                                r.max
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/page.tsx",
                                                                            lineNumber: 377,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            disabled: r.players >= r.max,
                                                                            onClick: ()=>begin(r.id),
                                                                            className: "px-3 py-1.5 rounded bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-black font-black text-xs",
                                                                            children: "加入"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/page.tsx",
                                                                            lineNumber: 380,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, r.id, true, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 370,
                                                                    columnNumber: 23
                                                                }, this))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 367,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 360,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 307,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-lg border border-emerald-400/30 bg-emerald-400/5 p-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-black text-emerald-300 mb-1",
                                                children: "局域网联机"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 392,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-white/60 leading-relaxed",
                                                children: "让同一网络下的朋友在浏览器中打开下面任一地址，在「加入房间」里选择你创建的房间即可。"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 393,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-2 space-y-1 font-mono text-sm",
                                                children: urls.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-white/45",
                                                    children: origin || "加载中…"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 395,
                                                    columnNumber: 38
                                                }, this) : urls.map((u)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-emerald-200 select-all",
                                                                children: u
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 397,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>navigator.clipboard?.writeText(u),
                                                                className: "text-[10px] px-1.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white/70",
                                                                children: "复制"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 398,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, u, true, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 396,
                                                        columnNumber: 19
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 394,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 391,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-lg border border-white/15 bg-white/5 p-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-black mb-2",
                                                children: "累计战绩榜"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 408,
                                                columnNumber: 15
                                            }, this),
                                            stats.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-white/45",
                                                children: "暂无数据，完成一局后将记录在此。"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 410,
                                                columnNumber: 17
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                                className: "w-full text-xs font-mono",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                        className: "text-white/45",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "text-left font-normal",
                                                                    children: "#玩家"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 415,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "text-right font-normal",
                                                                    children: "击杀"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 416,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "text-right font-normal",
                                                                    children: "死亡"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 417,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "text-right font-normal",
                                                                    children: "爆头"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 418,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "text-right font-normal",
                                                                    children: "最高波"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 419,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 414,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 413,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                        children: stats.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                className: "border-t border-white/10",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "py-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-amber-300",
                                                                                children: i + 1
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/page.tsx",
                                                                                lineNumber: 426,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            " ",
                                                                            s.name
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/page.tsx",
                                                                        lineNumber: 425,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "text-right",
                                                                        children: s.kills
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/page.tsx",
                                                                        lineNumber: 428,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "text-right text-white/60",
                                                                        children: s.deaths
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/page.tsx",
                                                                        lineNumber: 429,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "text-right text-white/60",
                                                                        children: s.headshots
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/page.tsx",
                                                                        lineNumber: 430,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "text-right text-white/60",
                                                                        children: s.bestWave || "-"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/page.tsx",
                                                                        lineNumber: 431,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, s.name, true, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 424,
                                                                columnNumber: 23
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 422,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 412,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 407,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 306,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 271,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                        className: "mt-8 text-center text-[11px] text-white/35 leading-relaxed",
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$keybinds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codeLabel"])(binds.forward),
                            " ",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$keybinds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codeLabel"])(binds.back),
                            " ",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$keybinds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codeLabel"])(binds.left),
                            " ",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$keybinds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codeLabel"])(binds.right),
                            " 移动 · ",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$keybinds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codeLabel"])(binds.jump),
                            " 跳跃 · ",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$keybinds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codeLabel"])(binds.sprint),
                            " 冲刺 · ",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$keybinds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codeLabel"])(binds.crouch),
                            " 蹲 · ",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$keybinds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codeLabel"])(binds.prone),
                            " 趴 · ",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$keybinds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codeLabel"])(binds.sprint),
                            "+",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$keybinds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codeLabel"])(binds.crouch),
                            " 滑铲 · 左键开火 · 右键瞄准 · ",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$keybinds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codeLabel"])(binds.reload),
                            " 换弹 · ",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$keybinds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codeLabel"])(binds.slot1),
                            "/",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$keybinds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codeLabel"])(binds.slot2),
                            "/",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$keybinds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codeLabel"])(binds.slot3),
                            " 切枪 · ",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$keybinds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codeLabel"])(binds.heal),
                            " 回血 · ",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$keybinds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codeLabel"])(binds.scoreboard),
                            " 计分板"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 441,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 245,
                columnNumber: 7
            }, this),
            showSettings && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4",
                onClick: ()=>{
                    if (!listening) setShowSettings(false);
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-[min(720px,96vw)] max-h-[90vh] overflow-auto rounded-lg border-2 border-white/20 bg-slate-900/95 p-5 text-white",
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between mb-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-black tracking-wider",
                                    children: "按键设置"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 456,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setListening(null);
                                        setShowSettings(false);
                                    },
                                    className: "px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-sm font-bold",
                                    children: "关闭"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 457,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 455,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-white/55 mb-3",
                            children: "点击右侧按键后，按下新的按键即可重新绑定；若与其它动作冲突会自动交换。设置保存在本机浏览器中。"
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 467,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 sm:grid-cols-2 gap-2",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$keybinds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BIND_META"].map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 rounded bg-white/5 border border-white/10 px-3 py-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm font-bold",
                                                    children: m.label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 472,
                                                    columnNumber: 21
                                                }, this),
                                                m.hint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-[10px] text-white/45",
                                                    children: m.hint
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 473,
                                                    columnNumber: 32
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 471,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setBindsErr("");
                                                setListening(m.key);
                                            },
                                            className: `min-w-[92px] px-3 py-1.5 rounded border-2 font-mono text-xs font-bold transition-colors ${listening === m.key ? "border-amber-400 bg-amber-400/20 text-amber-300 animate-pulse" : "border-white/20 bg-black/30 text-white/85 hover:border-amber-400"}`,
                                            children: listening === m.key ? "按下按键…" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$keybinds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["codeLabel"])(binds[m.key])
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 475,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, m.key, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 470,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 468,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: resetBinds,
                                    className: "px-4 py-2 rounded bg-white/10 hover:bg-white/20 font-bold text-sm border border-white/20",
                                    children: "恢复默认键位"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 490,
                                    columnNumber: 15
                                }, this),
                                bindsErr && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-amber-300",
                                    children: bindsErr
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 493,
                                    columnNumber: 28
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "ml-auto text-[11px] text-white/40",
                                    children: "Esc 取消当前绑定"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 494,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 489,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 454,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 448,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 244,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/LoadoutPicker.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LoadoutPicker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/weapons.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function norm(w) {
    const melee = w.type === "melee";
    const dmg = Math.min(1, w.damage * (w.type === "gun" ? w.pellets : 1) / (w.type === "gun" ? 130 : 170));
    return [
        {
            k: "伤害",
            v: Math.max(0.05, dmg)
        },
        {
            k: "射速",
            v: Math.min(1, w.rpm / 1000)
        },
        {
            k: "射程",
            v: melee ? 0.04 : Math.min(1, w.range / 160)
        },
        {
            k: "稳定",
            v: melee ? 1 : 1 - Math.min(0.95, (w.recoilV + w.recoilH) / 5)
        },
        {
            k: "机动",
            v: Math.max(0.05, Math.min(1, (w.moveMul - 0.55) / 0.6))
        },
        {
            k: "弹容",
            v: melee ? 0 : Math.min(1, w.mag / 100)
        }
    ];
}
function WeaponCard({ w, active, onClick }) {
    const st = norm(w);
    const mode = w.type === "melee" ? "近战" : w.auto ? "全自动" : "半自动";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        className: `text-left rounded-md border-2 p-3 transition-all ${active ? "border-amber-400 bg-amber-400/10 shadow-[0_0_0_2px_rgba(251,191,36,0.25)]" : "border-white/10 bg-white/5 hover:border-white/30"}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-bold text-white text-sm",
                        children: w.name
                    }, void 0, false, {
                        fileName: "[project]/src/components/LoadoutPicker.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex items-center gap-1",
                        children: [
                            w.weight && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `text-[10px] px-1.5 py-0.5 rounded ${w.weight === "heavy" ? "bg-red-500/25 text-red-300" : "bg-emerald-500/25 text-emerald-300"}`,
                                children: w.weight === "heavy" ? "重型 · 移速75%" : "轻型 · 无惩罚"
                            }, void 0, false, {
                                fileName: "[project]/src/components/LoadoutPicker.tsx",
                                lineNumber: 33,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/70",
                                children: mode
                            }, void 0, false, {
                                fileName: "[project]/src/components/LoadoutPicker.tsx",
                                lineNumber: 37,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/LoadoutPicker.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/LoadoutPicker.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-1 text-[11px] text-white/50 line-clamp-1",
                children: w.desc
            }, void 0, false, {
                fileName: "[project]/src/components/LoadoutPicker.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 grid grid-cols-2 gap-x-3 gap-y-1",
                children: st.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-6 text-[10px] text-white/50",
                                children: s.k
                            }, void 0, false, {
                                fileName: "[project]/src/components/LoadoutPicker.tsx",
                                lineNumber: 44,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-1.5 flex-1 bg-white/10 rounded-sm overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-full bg-amber-400",
                                    style: {
                                        width: `${Math.round(s.v * 100)}%`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LoadoutPicker.tsx",
                                    lineNumber: 46,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/LoadoutPicker.tsx",
                                lineNumber: 45,
                                columnNumber: 13
                            }, this)
                        ]
                    }, s.k, true, {
                        fileName: "[project]/src/components/LoadoutPicker.tsx",
                        lineNumber: 43,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/LoadoutPicker.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 text-[10px] text-white/40",
                children: [
                    w.type === "melee" ? `伤害 ${w.damage} · 无需弹药` : `${w.pellets > 1 ? `${w.damage}×${w.pellets}` : w.damage} 伤害 · ${w.mag}发 × ${w.mags + 1}`,
                    w.radius > 0 ? ` · 爆炸半径 ${w.radius}m` : ""
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/LoadoutPicker.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/LoadoutPicker.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
function LoadoutPicker({ value, onChange }) {
    const [slot, setSlot] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const cats = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CATEGORIES"].filter((c)=>c.slot === slot);
    const cur1 = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WEAPON_BY_ID"][value.primary]?.cat ?? "rifle";
    const cur2 = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WEAPON_BY_ID"][value.secondary]?.cat ?? "pistol";
    const [cat1, setCat1] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(cur1);
    const [cat2, setCat2] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(cur2);
    const cat = slot === 1 ? cat1 : slot === 2 ? cat2 : "heavy";
    const info = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CATEGORIES"].find((c)=>c.id === cat);
    const list = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["weaponsOfCat"])(cat);
    const selected = slot === 1 ? value.primary : slot === 2 ? value.secondary : value.heavy;
    const pick = (w)=>{
        if (slot === 1) onChange({
            ...value,
            primary: w.id
        });
        else if (slot === 2) onChange({
            ...value,
            secondary: w.id
        });
        else onChange({
            ...value,
            heavy: w.id
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2 mb-3",
                children: [
                    1,
                    2,
                    3
                ].map((s)=>{
                    const id = s === 1 ? value.primary : s === 2 ? value.secondary : value.heavy;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setSlot(s),
                        className: `flex-1 rounded-md border-2 px-3 py-2 text-left ${slot === s ? "border-amber-400 bg-amber-400/10" : "border-white/10 bg-white/5 hover:border-white/30"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[10px] text-white/50",
                                children: [
                                    s,
                                    " 号位",
                                    s === 3 && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WEAPON_BY_ID"][id]?.weight ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WEAPON_BY_ID"][id].weight === "heavy" ? " · 重型" : " · 轻型" : ""
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LoadoutPicker.tsx",
                                lineNumber: 88,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm font-bold text-white truncate",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WEAPON_BY_ID"][id]?.name
                            }, void 0, false, {
                                fileName: "[project]/src/components/LoadoutPicker.tsx",
                                lineNumber: 92,
                                columnNumber: 15
                            }, this)
                        ]
                    }, s, true, {
                        fileName: "[project]/src/components/LoadoutPicker.tsx",
                        lineNumber: 83,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/LoadoutPicker.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            slot !== 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-1.5 mb-2",
                children: cats.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        disabled: c.locked,
                        onClick: ()=>slot === 1 ? setCat1(c.id) : setCat2(c.id),
                        className: `px-3 py-1 rounded text-xs font-bold border ${c.locked ? "border-dashed border-white/15 text-white/25 cursor-not-allowed" : cat === c.id ? "border-amber-400 bg-amber-400 text-black" : "border-white/15 text-white/70 hover:border-white/40"}`,
                        title: c.desc,
                        children: [
                            c.name,
                            c.locked ? " 🔒" : ""
                        ]
                    }, c.id, true, {
                        fileName: "[project]/src/components/LoadoutPicker.tsx",
                        lineNumber: 100,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/LoadoutPicker.tsx",
                lineNumber: 98,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-[11px] text-white/45 mb-2",
                children: info?.desc
            }, void 0, false, {
                fileName: "[project]/src/components/LoadoutPicker.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2",
                children: list.map((w)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(WeaponCard, {
                        w: w,
                        active: selected === w.id,
                        onClick: ()=>pick(w)
                    }, w.id, false, {
                        fileName: "[project]/src/components/LoadoutPicker.tsx",
                        lineNumber: 122,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/LoadoutPicker.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/LoadoutPicker.tsx",
        lineNumber: 78,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/game/keybinds.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
    if ("TURBOPACK compile-time truthy", 1) return {
        ...DEFAULT_BINDS
    };
    //TURBOPACK unreachable
    ;
}
function saveBinds(b) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
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
}),
"[project]/src/game/maps.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// 8 张程序化方块地图：2 张双方对抗 / 4 张四方混战 / 2 张防守据点
__turbopack_context__.s([
    "FH",
    ()=>FH,
    "MAP_LIST",
    ()=>MAP_LIST,
    "buildMap",
    ()=>buildMap,
    "getMapInfo",
    ()=>getMapInfo
]);
const MAP_LIST = [
    {
        id: "duel-town",
        name: "像素小镇",
        desc: "左右出生，中央巨型岩墙阻断视线，两侧布满双层民居与障碍。",
        type: "duel",
        hx: 64,
        hz: 40,
        sky: 0x8fd0ff,
        fog: 0xbfe3ff,
        tag: "双方对抗"
    },
    {
        id: "duel-desert",
        name: "沙漠堡垒",
        desc: "沙漠地带的对称战场，中央十字堡垒，二层土屋带窗户与楼梯。",
        type: "duel",
        hx: 64,
        hz: 40,
        sky: 0xffd9a0,
        fog: 0xf2dcae,
        tag: "双方对抗"
    },
    {
        id: "ffa-citadel",
        name: "四角要塞",
        desc: "四个角落各有三层要塞，仅二、三层有窗户，边缘与中央皆有高墙遮挡。",
        type: "ffa",
        hx: 60,
        hz: 60,
        sky: 0x8fd0ff,
        fog: 0xbfe3ff,
        tag: "四方混战"
    },
    {
        id: "ffa-snow",
        name: "雪域四境",
        desc: "白雪覆盖的森林战场，树木与矮墙构成复杂掩体。",
        type: "ffa",
        hx: 60,
        hz: 60,
        sky: 0xc9dff0,
        fog: 0xe3eef7,
        tag: "四方混战"
    },
    {
        id: "ffa-oasis",
        name: "绿洲聚落",
        desc: "沙漠绿洲的四方争夺，密集的单层土屋与木箱。",
        type: "ffa",
        hx: 60,
        hz: 60,
        sky: 0xffd9a0,
        fog: 0xf2dcae,
        tag: "四方混战"
    },
    {
        id: "ffa-factory",
        name: "废弃工厂",
        desc: "集装箱与厂房构成的工业区，近距离交火频繁。",
        type: "ffa",
        hx: 60,
        hz: 60,
        sky: 0x9fb4c7,
        fog: 0xb3c2cf,
        tag: "四方混战"
    },
    {
        id: "ffa-manor",
        name: "庄园街区",
        desc: "以民居为主的四队战场：中央四层塔楼带螺旋楼梯与窗户，四角双层民居内出生。",
        type: "ffa",
        hx: 60,
        hz: 60,
        sky: 0x8fd0ff,
        fog: 0xbfe3ff,
        tag: "四方混战"
    },
    {
        id: "ffa-villa",
        name: "沙丘庄园",
        desc: "沙漠中的民居聚落，中央四层塔楼控制全场，四角双层土屋提供出生点。",
        type: "ffa",
        hx: 60,
        hz: 60,
        sky: 0xffd9a0,
        fog: 0xf2dcae,
        tag: "四方混战"
    },
    {
        id: "def-outpost",
        name: "孤岛据点",
        desc: "中央据点由环形民居与掩体构成，敌人从四个角落涌来。",
        type: "defense",
        hx: 56,
        hz: 56,
        sky: 0xffd9a0,
        fog: 0xf2dcae,
        tag: "据点防守"
    },
    {
        id: "def-frost",
        name: "霜冻要塞",
        desc: "雪原上的圆形堡垒，大量障碍和一至两层房屋。",
        type: "defense",
        hx: 56,
        hz: 56,
        sky: 0xc9dff0,
        fog: 0xe3eef7,
        tag: "据点防守"
    }
];
function getMapInfo(id) {
    return MAP_LIST.find((m)=>m.id === id) ?? MAP_LIST[0];
}
const THEMES = {
    town: {
        ground: 0x5f9a45,
        patch: 0x558c3d,
        path: 0xa39a86,
        walls: [
            0xd8c7a6,
            0xc0603a,
            0xe3ddd0,
            0xb8a27a
        ],
        roofs: [
            0x8a3f33,
            0x4f5b6b,
            0x6a4a3a
        ],
        floor: 0x9b8566,
        step: 0x8a7658,
        crates: [
            0x9a6b36,
            0x7f5528,
            0xa97c45
        ],
        barrier: 0x8a8f96,
        bag: 0xb9a37a,
        trees: true,
        leaf: 0x3f8f3a,
        trunk: 0x6b4423,
        containers: false,
        core: 0x7d838b,
        coreTop: 0x5f656d,
        border: 0x6d737a
    },
    desert: {
        ground: 0xd9bb7c,
        patch: 0xcfae6a,
        path: 0xbf9f62,
        walls: [
            0xe6c78e,
            0xd1a86a,
            0xc79a5c
        ],
        roofs: [
            0x9c6b3c,
            0x8a5a30
        ],
        floor: 0xb89a62,
        step: 0xa98a55,
        crates: [
            0x6b4a2b,
            0x7a5532,
            0x5f4125
        ],
        barrier: 0xb89a6a,
        bag: 0xc9b07a,
        trees: false,
        leaf: 0x4f8f3a,
        trunk: 0x6b4423,
        containers: false,
        core: 0xc4a46c,
        coreTop: 0x9f814f,
        border: 0xa88a58
    },
    snow: {
        ground: 0xe8eef2,
        patch: 0xdce6ee,
        path: 0xc3ced6,
        walls: [
            0x8a6b4a,
            0x9aa5ad,
            0x7a5c3e
        ],
        roofs: [
            0x3d4a5c,
            0x56677a
        ],
        floor: 0x8d7a62,
        step: 0x7d6b55,
        crates: [
            0x6a4a30,
            0x7a5a3a
        ],
        barrier: 0x9aa5ad,
        bag: 0xd2dce3,
        trees: true,
        leaf: 0x2f6b4a,
        trunk: 0x5a3b22,
        containers: false,
        core: 0x9aa5ad,
        coreTop: 0xd2dce3,
        border: 0x7f8c96
    },
    industrial: {
        ground: 0x6a6e73,
        patch: 0x5f6368,
        path: 0x4f5358,
        walls: [
            0x8c9096,
            0x7b7f85,
            0xa0a4a9
        ],
        roofs: [
            0x444a52,
            0x3a3f46
        ],
        floor: 0x777b81,
        step: 0x666a70,
        crates: [
            0xd9822b,
            0x2f6fb4,
            0xb33a3a,
            0x3a8a4a
        ],
        barrier: 0x555a60,
        bag: 0x7b7f85,
        trees: false,
        leaf: 0x3f8f3a,
        trunk: 0x6b4423,
        containers: true,
        core: 0x5a5f66,
        coreTop: 0xd9822b,
        border: 0x44484d
    }
};
function rng(seed) {
    let a = seed >>> 0;
    return ()=>{
        a = a + 0x6d2b79f5 >>> 0;
        let t = a;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}
class B {
    th;
    rnd;
    boxes;
    occ;
    constructor(th, rnd){
        this.th = th;
        this.rnd = rnd;
        this.boxes = [];
        this.occ = [];
    }
    box(x0, y0, z0, x1, y1, z1, c, nc) {
        if (Math.abs(x1 - x0) < 1e-4 || Math.abs(y1 - y0) < 1e-4 || Math.abs(z1 - z0) < 1e-4) return;
        this.boxes.push({
            x0: Math.min(x0, x1),
            y0: Math.min(y0, y1),
            z0: Math.min(z0, z1),
            x1: Math.max(x0, x1),
            y1: Math.max(y0, y1),
            z1: Math.max(z0, z1),
            c,
            nc
        });
    }
    occupy(x0, z0, x1, z1) {
        this.occ.push([
            Math.min(x0, x1),
            Math.min(z0, z1),
            Math.max(x0, x1),
            Math.max(z0, z1)
        ]);
    }
    free(x0, z0, x1, z1, m) {
        for (const r of this.occ)if (x0 - m < r[2] && x1 + m > r[0] && z0 - m < r[3] && z1 + m > r[1]) return false;
        return true;
    }
    pick(a) {
        return a[Math.floor(this.rnd() * a.length) % a.length];
    }
}
function mirrored(src, mx, mz) {
    return src.map((b)=>({
            ...b,
            x0: mx ? -b.x1 : b.x0,
            x1: mx ? -b.x0 : b.x1,
            z0: mz ? -b.z1 : b.z0,
            z1: mz ? -b.z0 : b.z1
        }));
}
function mirror4(b, from) {
    const q = b.boxes.slice(from);
    for (const k of [
        mirrored(q, true, false),
        mirrored(q, false, true),
        mirrored(q, true, true)
    ])for (const x of k)b.boxes.push(x);
}
function mirrorX(b, from) {
    const q = b.boxes.slice(from);
    for (const x of mirrored(q, true, false))b.boxes.push(x);
}
function wallX(b, xa, xb, za, zb, yb, h, holes, c) {
    const hs = holes.slice().sort((p, q)=>p.a - q.a);
    let cur = xa;
    for (const o of hs){
        if (o.a > cur) b.box(cur, yb, za, o.a, yb + h, zb, c);
        if (o.v0 > 0) b.box(o.a, yb, za, o.b, yb + o.v0, zb, c);
        if (o.v1 < h) b.box(o.a, yb + o.v1, za, o.b, yb + h, zb, c);
        cur = o.b;
    }
    if (cur < xb) b.box(cur, yb, za, xb, yb + h, zb, c);
}
function wallZ(b, za, zb, xa, xb, yb, h, holes, c) {
    const hs = holes.slice().sort((p, q)=>p.a - q.a);
    let cur = za;
    for (const o of hs){
        if (o.a > cur) b.box(xa, yb, cur, xb, yb + h, o.a, c);
        if (o.v0 > 0) b.box(xa, yb, o.a, xb, yb + o.v0, o.b, c);
        if (o.v1 < h) b.box(xa, yb + o.v1, o.a, xb, yb + h, o.b, c);
        cur = o.b;
    }
    if (cur < zb) b.box(xa, yb, cur, xb, yb + h, zb, c);
}
function slab(b, x, z, x1, z1, y0, y1, hole, c) {
    if (!hole) return b.box(x, y0, z, x1, y1, z1, c);
    const [ox0, oz0, ox1, oz1] = hole;
    b.box(x, y0, z, ox0, y1, z1, c);
    b.box(ox1, y0, z, x1, y1, z1, c);
    b.box(ox0, y0, z, ox1, y1, oz0, c);
    b.box(ox0, y0, oz1, ox1, y1, z1, c);
}
const FH = 3.6; // 每层高度
const SL = 0.4; // 楼板厚度
const WT = 0.4; // 墙厚
// 房屋：墙体带门窗，楼板，楼梯在北墙内侧（每层都有，且直通屋顶）
function house(b, o) {
    const { x, z, w, d, floors } = o;
    const x1 = x + w;
    const z1 = z + d;
    // 楼梯占用北墙内侧，因此北墙不再开门
    const doors = o.doors.replace("n", "");
    const wins = o.winFloors ?? Array.from({
        length: floors
    }, (_, i)=>i);
    const th = b.th;
    const doorAt = (side)=>side === "s" ? Math.round(x + w * 0.62) : side === "n" ? Math.round(x + w * 0.38) : Math.round(z + d * 0.72);
    const holesFor = (side, f, a0, a1)=>{
        const hs = [];
        if (f === 0 && doors.includes(side)) {
            const at = doorAt(side);
            hs.push({
                a: at - 1.2,
                b: at + 1.2,
                v0: 0,
                v1: 2.7
            });
        }
        if (wins.includes(f) && side !== "n") {
            if (side === "w" || side === "e") a0 = Math.max(a0, z + 5.4);
            const L = a1 - a0;
            const n = Math.max(1, Math.floor((L - 2.5) / 4.4));
            for(let i = 0; i < n; i++){
                const c = a0 + L * (i + 0.5) / n;
                if (hs.some((h)=>c + 1.6 > h.a && c - 1.6 < h.b)) continue;
                hs.push({
                    a: c - 0.9,
                    b: c + 0.9,
                    v0: 0.9,
                    v1: 2.3
                });
            }
        }
        return hs;
    };
    const hh = FH - SL;
    for(let f = 0; f < floors; f++){
        const yb = f * FH;
        wallX(b, x, x1, z, z + WT, yb, hh, holesFor("n", f, x, x1), o.wall);
        wallX(b, x, x1, z1 - WT, z1, yb, hh, holesFor("s", f, x, x1), o.wall);
        wallZ(b, z + WT, z1 - WT, x, x + WT, yb, hh, holesFor("w", f, z + WT, z1 - WT), o.wall);
        wallZ(b, z + WT, z1 - WT, x1 - WT, x1, yb, hh, holesFor("e", f, z + WT, z1 - WT), o.wall);
    }
    const xs = x + 1;
    const sz = z + 1;
    // 台阶数量按房屋宽度自适应（每级不超过 STEP_H）
    const steps = w >= 10 ? 8 : 7;
    const rise = FH / steps;
    // 每层楼板 / 屋顶都在楼梯上方开洞
    for(let f = 1; f <= floors; f++){
        const y1 = f * FH;
        const i = f - 1;
        const dir = i % 2 === 0 ? 1 : -1;
        const row = i % 2;
        const oz0 = sz + row * 2;
        const hole = dir === 1 ? [
            xs + steps - 6,
            oz0,
            xs + steps,
            oz0 + 2
        ] : [
            xs,
            oz0,
            xs + 6,
            oz0 + 2
        ];
        slab(b, x, z, x1, z1, y1 - SL, y1, hole, f === floors ? o.roof : th.floor);
    }
    // 屋顶矮檐
    const ry = floors * FH;
    b.box(x, ry, z, x1, ry + 0.5, z + 0.3, o.roof);
    b.box(x, ry, z1 - 0.3, x1, ry + 0.5, z1, o.roof);
    b.box(x, ry, z + 0.3, x + 0.3, ry + 0.5, z1 - 0.3, o.roof);
    b.box(x1 - 0.3, ry, z + 0.3, x1, ry + 0.5, z1 - 0.3, o.roof);
    // 楼梯：0→1 层、1→2 层 …… 最后一跑直通屋顶
    for(let i = 0; i < floors; i++){
        const dir = i % 2 === 0 ? 1 : -1;
        const row = i % 2;
        const base = i * FH;
        const oz0 = sz + row * 2;
        for(let j = 0; j < steps; j++){
            const sx0 = dir === 1 ? xs + j : xs + steps - (j + 1);
            b.box(sx0, base, oz0, sx0 + 1, base + (j + 1) * rise, oz0 + 2, th.step);
        }
    }
    b.occupy(x, z, x1, z1);
}
function autoHouse(b, x, z, w, d, floors, doors, winFloors) {
    house(b, {
        x,
        z,
        w,
        d,
        floors,
        doors,
        winFloors,
        wall: b.pick(b.th.walls),
        roof: b.pick(b.th.roofs)
    });
}
function crate(b, x, z, s, h = s) {
    b.box(x, 0, z, x + s, h, z + s, b.pick(b.th.crates));
}
// 随机障碍物：木箱 / 沙袋矮墙 / 高墙 / 树 / 集装箱 / 箱堆
function scatter(b, rx0, rz0, rx1, rz1, n, circleR = 0) {
    const th = b.th;
    let placed = 0;
    let tries = 0;
    while(placed < n && tries < n * 60){
        tries++;
        const k = b.rnd();
        const x = Math.round(rx0 + b.rnd() * (rx1 - rx0));
        const z = Math.round(rz0 + b.rnd() * (rz1 - rz0));
        let w = 2;
        let d = 2;
        let type = "crate";
        if (k < 0.28) {
            w = d = b.rnd() < 0.5 ? 2 : 3;
            type = "crate";
        } else if (k < 0.5) {
            const len = 4 + Math.floor(b.rnd() * 4);
            if (b.rnd() < 0.5) {
                w = len;
                d = 1;
            } else {
                w = 1;
                d = len;
            }
            type = "bag";
        } else if (k < 0.72) {
            const len = 5 + Math.floor(b.rnd() * 4);
            if (th.containers) {
                type = "container";
                if (b.rnd() < 0.5) {
                    w = 6;
                    d = 2.4;
                } else {
                    w = 2.4;
                    d = 6;
                }
            } else {
                type = "wall";
                if (b.rnd() < 0.5) {
                    w = len;
                    d = 1;
                } else {
                    w = 1;
                    d = len;
                }
            }
        } else if (k < 0.86 && th.trees) {
            type = "tree";
            w = d = 3;
        } else {
            type = "stack";
            w = 4;
            d = 2;
        }
        if (x < rx0 || z < rz0 || x + w > rx1 || z + d > rz1) continue;
        if (circleR > 0 && Math.hypot(x + w / 2, z + d / 2) > circleR) continue;
        if (!b.free(x, z, x + w, z + d, 2.4)) continue;
        if (type === "crate") crate(b, x, z, w);
        else if (type === "bag") b.box(x, 0, z, x + w, 1.1, z + d, th.bag);
        else if (type === "wall") b.box(x, 0, z, x + w, 3.2, z + d, th.barrier);
        else if (type === "container") b.box(x, 0, z, x + w, 2.6, z + d, b.pick(th.crates));
        else if (type === "tree") {
            b.box(x + 1, 0, z + 1, x + 2, 3.2, z + 2, th.trunk);
            b.box(x, 2.6, z, x + 3, 5.6, z + 3, th.leaf);
        } else {
            const c1 = b.pick(th.crates);
            b.box(x, 0, z, x + 2, 1.6, z + 2, c1);
            b.box(x + 2, 0, z, x + 4, 1.6, z + 2, b.pick(th.crates));
            b.box(x + 0.4, 1.6, z + 0.2, x + 2.4, 3.0, z + 1.8, c1);
        }
        b.occupy(x, z, x + w, z + d);
        placed++;
    }
}
function base(b, hx, hz, roads) {
    const th = b.th;
    b.box(-hx, -4, -hz, hx, 0, hz, th.ground);
    // 地面装饰色块
    for(let i = 0; i < 90; i++){
        const w = 3 + b.rnd() * 9;
        const d = 3 + b.rnd() * 9;
        const x = -hx + b.rnd() * (2 * hx - w);
        const z = -hz + b.rnd() * (2 * hz - d);
        b.box(x, -0.2, z, x + w, 0.03, z + d, th.patch, true);
    }
    if (roads) {
        b.box(-hx, -0.2, -3, hx, 0.025, 3, th.path, true);
        b.box(-3, -0.2, -hz, 3, 0.025, hz, th.path, true);
    }
    // 边界墙
    const t = 2;
    const H = 8;
    b.box(-hx - t, 0, -hz - t, hx + t, H, -hz, th.border);
    b.box(-hx - t, 0, hz, hx + t, H, hz + t, th.border);
    b.box(-hx - t, 0, -hz, -hx, H, hz, th.border);
    b.box(hx, 0, -hz, hx + t, H, hz, th.border);
}
function core(b, hw, hd, h) {
    const th = b.th;
    b.box(-hw, 0, -hd, hw, h, hd, th.core);
    b.box(-hw - 0.4, h - 0.8, -hd - 0.4, hw + 0.4, h, hd + 0.4, th.coreTop);
    b.box(-hw - 0.4, 0, -hd - 0.4, hw + 0.4, 0.8, hd + 0.4, th.coreTop);
    b.occupy(-hw - 0.4, -hd - 0.4, hw + 0.4, hd + 0.4);
}
// ───────────────────────── 双方对抗 ─────────────────────────
function buildDuel(info) {
    const desert = info.id === "duel-desert";
    const th = THEMES[desert ? "desert" : "town"];
    const b = new B(th, rng(desert ? 7 : 3));
    const hx = info.hx;
    const hz = info.hz;
    base(b, hx, hz, true);
    // 中央岩墙：阻断双方出生点的视线
    if (desert) {
        core(b, 6, 12, 9);
        b.box(-1, 0, 12.4, 1, 3.4, 20, th.barrier);
        b.box(-1, 0, -20, 1, 3.4, -12.4, th.barrier);
        b.occupy(-1, 12, 1, 20);
        b.occupy(-1, -20, 1, -12);
    } else {
        core(b, 7, 14, 9);
    }
    // 出生场地 (左半，镜像到右半)
    const s0 = b.boxes.length;
    b.box(-63, 0, -10.4, -52, 3.2, -10, th.barrier);
    b.box(-63, 0, 10, -52, 3.2, 10.4, th.barrier);
    b.box(-52, 0, -10.4, -51, 1.2, -6, th.bag);
    b.box(-52, 0, 6, -51, 1.2, 10.4, th.bag);
    b.occupy(-63, -11, -50, 11);
    mirrorX(b, s0);
    // 象限内容 (x<0, z<0) → 镜像四份
    const q0 = b.boxes.length;
    if (!desert) {
        autoHouse(b, -46, -37, 14, 11, 2, "se");
        autoHouse(b, -27, -23, 10, 9, 1, "sew");
        autoHouse(b, -22, -38, 13, 11, 2, "sw");
        scatter(b, -62, -39, -2, -2, 22);
    } else {
        autoHouse(b, -60, -38, 13, 11, 2, "se");
        autoHouse(b, -38, -22, 13, 11, 2, "sew");
        autoHouse(b, -24, -38, 10, 9, 1, "sw");
        autoHouse(b, -17, -21, 8, 8, 1, "se");
        scatter(b, -62, -39, -2, -2, 20);
    }
    mirror4(b, q0);
    const left = [];
    const right = [];
    for(let i = 0; i < 8; i++){
        const x = -60 + i % 2 * 5;
        const z = -7 + i * 2;
        left.push([
            x,
            0.01,
            z
        ]);
        right.push([
            -x,
            0.01,
            z
        ]);
    }
    return {
        ...info,
        boxes: b.boxes,
        spawns: [
            left,
            right
        ],
        enemySpawns: [],
        defSpawns: []
    };
}
// ───────────────────────── 四方混战 ─────────────────────────
function buildFfa(info) {
    const key = info.id;
    const th = THEMES[key === "ffa-snow" ? "snow" : key === "ffa-oasis" ? "desert" : key === "ffa-factory" ? "industrial" : "town"];
    const seed = {
        "ffa-citadel": 21,
        "ffa-snow": 33,
        "ffa-oasis": 45,
        "ffa-factory": 57
    }[key] ?? 9;
    const b = new B(th, rng(seed));
    const hx = info.hx;
    base(b, hx, hx, key !== "ffa-snow");
    // 中央岩体 + 四边中点高墙：保证任意两个出生点互相不可见
    core(b, key === "ffa-factory" ? 13 : 12, key === "ffa-factory" ? 13 : 12, 9);
    const barrier = (x0, z0, x1, z1)=>{
        b.box(x0, 0, z0, x1, 8, z1, th.barrier);
        b.box(x0 - 0.3, 6.8, z0 - 0.3, x1 + 0.3, 8, z1 + 0.3, th.coreTop);
        b.occupy(x0, z0, x1, z1);
    };
    barrier(-1.5, -60, 1.5, -38);
    barrier(-1.5, 38, 1.5, 60);
    barrier(-60, -1.5, -38, 1.5);
    barrier(38, -1.5, 60, 1.5);
    const q0 = b.boxes.length;
    // 角落三层要塞：仅二、三层有窗户，一层为出生大厅
    house(b, {
        x: -58,
        z: -58,
        w: 16,
        d: 14,
        floors: 3,
        doors: "es",
        winFloors: [
            1,
            2
        ],
        wall: b.pick(th.walls),
        roof: b.pick(th.roofs)
    });
    if (key === "ffa-citadel") {
        autoHouse(b, -36, -34, 10, 9, 1, "sew");
        autoHouse(b, -22, -54, 12, 9, 1, "swn");
        autoHouse(b, -56, -34, 9, 10, 1, "en");
        autoHouse(b, -24, -24, 9, 8, 1, "se");
        scatter(b, -58, -58, -2, -2, 22);
    } else if (key === "ffa-snow") {
        autoHouse(b, -38, -52, 10, 10, 1, "sw");
        autoHouse(b, -28, -30, 12, 10, 1, "swe");
        autoHouse(b, -54, -32, 9, 9, 1, "en");
        scatter(b, -58, -58, -2, -2, 30);
    } else if (key === "ffa-oasis") {
        autoHouse(b, -38, -36, 9, 9, 1, "sew");
        autoHouse(b, -26, -50, 9, 8, 1, "sw");
        autoHouse(b, -50, -34, 8, 8, 1, "en");
        autoHouse(b, -30, -22, 8, 8, 1, "se");
        autoHouse(b, -14, -42, 8, 9, 1, "w");
        scatter(b, -58, -58, -2, -2, 20);
    } else {
        autoHouse(b, -36, -50, 14, 10, 1, "sw");
        autoHouse(b, -32, -28, 12, 9, 1, "se");
        autoHouse(b, -56, -34, 10, 10, 1, "en");
        scatter(b, -58, -58, -2, -2, 28);
    }
    mirror4(b, q0);
    // 出生点：要塞一层大厅 (西北角 → 镜像)
    const nw = [
        [
            -55,
            0.01,
            -50
        ],
        [
            -52,
            0.01,
            -47
        ],
        [
            -48,
            0.01,
            -51
        ],
        [
            -46,
            0.01,
            -47
        ],
        [
            -54,
            0.01,
            -46.5
        ],
        [
            -45,
            0.01,
            -51.5
        ]
    ];
    const mk = (mx, mz)=>nw.map((p)=>[
                p[0] * mx,
                p[1],
                p[2] * mz
            ]);
    // 0:西北 1:东北 2:东南 3:西南
    return {
        ...info,
        boxes: b.boxes,
        spawns: [
            mk(1, 1),
            mk(-1, 1),
            mk(-1, -1),
            mk(1, -1)
        ],
        enemySpawns: [],
        defSpawns: []
    };
}
// ───────────────────────── 据点防守 ─────────────────────────
function buildDefense(info) {
    const snow = info.id === "def-frost";
    const th = THEMES[snow ? "snow" : "desert"];
    const b = new B(th, rng(snow ? 77 : 63));
    const hx = info.hx;
    base(b, hx, hx, false);
    // 圆形路面
    for(let i = 0; i < 24; i++){
        const a = i / 24 * Math.PI * 2;
        b.box(Math.cos(a) * 24 - 2, -0.2, Math.sin(a) * 24 - 2, Math.cos(a) * 24 + 2, 0.025, Math.sin(a) * 24 + 2, th.path, true);
    }
    // 中央据点
    autoHouse(b, -6, -6, 12, 12, 1, "nsew");
    // 一圈住宅 (半径≈19)
    const ring = (r, count, off, sizes, doors)=>{
        for(let k = 0; k < count; k++){
            const a = (k + off) / count * Math.PI * 2;
            const cx = Math.cos(a) * r;
            const cz = Math.sin(a) * r;
            for (const [w, d, fl] of sizes){
                const x = Math.round(cx - w / 2);
                const z = Math.round(cz - d / 2);
                if (!b.free(x, z, x + w, z + d, 1.6)) continue;
                const fd = fl > 1 ? doors.replace("n", "") : doors;
                autoHouse(b, x, z, w, d, fl, fd);
                break;
            }
        }
    };
    ring(19, 8, 0.5, [
        [
            12,
            11,
            2
        ],
        [
            9,
            9,
            1
        ],
        [
            7,
            7,
            1
        ]
    ], "nsew");
    ring(33, 8, 0.5, [
        [
            9,
            8,
            1
        ],
        [
            7,
            7,
            1
        ]
    ], "nsew");
    // 外围环形矮墙，八个缺口
    const segs = 60;
    for(let i = 0; i < segs; i++){
        const a = i / segs * Math.PI * 2;
        const ad = a * 180 / Math.PI % 45;
        if (ad < 6 || ad > 39) continue;
        const r = 42;
        const cx = Math.cos(a) * r;
        const cz = Math.sin(a) * r;
        const vertical = Math.abs(Math.cos(a)) > Math.abs(Math.sin(a));
        const w = vertical ? 1 : 5;
        const d = vertical ? 5 : 1;
        const x = Math.round(cx - w / 2);
        const z = Math.round(cz - d / 2);
        b.box(x, 0, z, x + w, 2.4, z + d, th.barrier);
        b.box(x - 0.15, 2.4, z - 0.15, x + w + 0.15, 2.8, z + d + 0.15, th.coreTop);
        b.occupy(x, z, x + w, z + d);
    }
    scatter(b, -46, -46, 46, 46, 70, 37);
    const def = [
        [
            -3,
            0.01,
            -3
        ],
        [
            3,
            0.01,
            -3
        ],
        [
            -3,
            0.01,
            3
        ],
        [
            3,
            0.01,
            3
        ],
        [
            0,
            0.01,
            0
        ],
        [
            0,
            0.01,
            3.5
        ],
        [
            0,
            0.01,
            -3.5
        ],
        [
            3.5,
            0.01,
            0
        ]
    ];
    const enemy = [];
    for (const [sx, sz] of [
        [
            -1,
            -1
        ],
        [
            1,
            -1
        ],
        [
            1,
            1
        ],
        [
            -1,
            1
        ]
    ]){
        for(let i = 0; i < 6; i++)enemy.push([
            sx * (48 + i % 3 * 2),
            0.01,
            sz * (48 + Math.floor(i / 3) * 2)
        ]);
    }
    return {
        ...info,
        boxes: b.boxes,
        spawns: [
            def
        ],
        enemySpawns: enemy,
        defSpawns: def
    };
}
// ───────────────────────── 民居庄园 (中央四层塔楼) ─────────────────────────
// 中央塔楼：四面墙每层都有窗户，一层四门；内部为绕柱而上的方形螺旋楼梯
function tower(b, cx, cz) {
    const th = b.th;
    const hw = 10;
    const x0 = cx - hw;
    const x1 = cx + hw;
    const z0 = cz - hw;
    const z1 = cz + hw;
    const floors = 4;
    const hh = FH - SL;
    const wallC = th.walls[0];
    const win = (c, half)=>({
            a: c - half,
            b: c + half,
            v0: 0.9,
            v1: 2.4
        });
    for(let f = 0; f < floors; f++){
        const yb = f * FH;
        const door = f === 0 ? [
            {
                a: cx - 1.3,
                b: cx + 1.3,
                v0: 0,
                v1: 2.8
            }
        ] : [];
        wallX(b, x0, x1, z0, z0 + WT, yb, hh, [
            ...door,
            win(cx - 5, 1),
            win(cx + 5, 1)
        ], wallC);
        wallX(b, x0, x1, z1 - WT, z1, yb, hh, [
            ...door,
            win(cx - 5, 1),
            win(cx + 5, 1)
        ], wallC);
        wallZ(b, z0 + WT, z1 - WT, x0, x0 + WT, yb, hh, [
            ...door,
            win(cz - 5, 1),
            win(cz + 5, 1)
        ], wallC);
        wallZ(b, z0 + WT, z1 - WT, x1 - WT, x1, yb, hh, [
            ...door,
            win(cz - 5, 1),
            win(cz + 5, 1)
        ], wallC);
    }
    // 中央承重柱
    b.box(cx - 1.5, 0, cz - 1.5, cx + 1.5, floors * FH, cz + 1.5, th.core);
    // 方形螺旋楼梯：四条边首尾重叠，16 级上升一层，保证连续可走
    const R = 8.2; // 楼梯环中心到塔中心
    const inner = 5.8;
    const per = 4;
    const total = floors * per * 4;
    const rise = FH / (per * 4);
    const seg = 14 / per; // 每条边 14 宽，4 级
    for(let k = 0; k < total; k++){
        const side = Math.floor(k / per) % 4;
        const idx = k % per;
        const top = (k + 1) * rise;
        let bx0, bx1, bz0, bz1;
        if (side === 0) {
            // 北边：由西向东上升
            bx0 = cx - 7 + idx * seg;
            bx1 = bx0 + seg;
            bz0 = cz - R;
            bz1 = cz - inner;
        } else if (side === 1) {
            // 东边：由北向南上升
            bz0 = cz - 7 + idx * seg;
            bz1 = bz0 + seg;
            bx0 = cx + inner;
            bx1 = cx + R;
        } else if (side === 2) {
            // 南边：由东向西上升
            bx1 = cx + 7 - idx * seg;
            bx0 = bx1 - seg;
            bz0 = cz + inner;
            bz1 = cz + R;
        } else {
            // 西边：由南向北上升
            bz1 = cz + 7 - idx * seg;
            bz0 = bz1 - seg;
            bx0 = cx - R;
            bx1 = cx - inner;
        }
        // 每级高 0.45，顶部相差 0.225（< 可跨越高度），转角处互相重叠
        b.box(bx0, Math.max(0, top - 0.45), bz0, bx1, top, bz1, th.step);
    }
    // 屋顶平台（中央 12.4×12.4），与楼梯环内缘搭接，四周留出上人空间
    const ry = floors * FH;
    b.box(cx - 6.2, ry - SL, cz - 6.2, cx + 6.2, ry, cz + 6.2, th.roofs[0]);
    // 女儿墙
    b.box(x0, ry, z0, x1, ry + 0.6, z0 + 0.4, th.roofs[0]);
    b.box(x0, ry, z1 - 0.4, x1, ry + 0.6, z1, th.roofs[0]);
    b.box(x0, ry, z0 + 0.4, x0 + 0.4, ry + 0.6, z1 - 0.4, th.roofs[0]);
    b.box(x1 - 0.4, ry, z0 + 0.4, x1, ry + 0.6, z1 - 0.4, th.roofs[0]);
    b.occupy(x0, z0, x1, z1);
}
function buildManor(info) {
    const desert = info.id === "ffa-villa";
    const th = THEMES[desert ? "desert" : "town"];
    const b = new B(th, rng(desert ? 91 : 83));
    const hx = info.hx;
    base(b, hx, hx, true);
    tower(b, 0, 0);
    const q0 = b.boxes.length;
    // 四角双层民居（出生点在里面）
    house(b, {
        x: -58,
        z: -58,
        w: 16,
        d: 14,
        floors: 2,
        doors: "es",
        winFloors: [
            0,
            1
        ],
        wall: b.pick(th.walls),
        roof: b.pick(th.roofs)
    });
    // 其余以民居为主，障碍很少
    autoHouse(b, -40, -32, 11, 10, 1, "se");
    autoHouse(b, -28, -46, 9, 9, 1, "sw");
    autoHouse(b, -18, -30, 9, 8, 1, "sew");
    autoHouse(b, -44, -16, 9, 9, 1, "en");
    mirror4(b, q0);
    scatter(b, -58, -58, -12, -12, 7);
    scatter(b, 12, 12, 58, 58, 7);
    const nw = [
        [
            -55,
            0.01,
            -50
        ],
        [
            -52,
            0.01,
            -47
        ],
        [
            -48,
            0.01,
            -51
        ],
        [
            -46,
            0.01,
            -47
        ],
        [
            -54,
            0.01,
            -46.5
        ],
        [
            -45,
            0.01,
            -51.5
        ]
    ];
    const mk = (mx, mz)=>nw.map((p)=>[
                p[0] * mx,
                p[1],
                p[2] * mz
            ]);
    return {
        ...info,
        boxes: b.boxes,
        spawns: [
            mk(1, 1),
            mk(-1, 1),
            mk(-1, -1),
            mk(1, -1)
        ],
        enemySpawns: [],
        defSpawns: []
    };
}
const cache = new Map();
function buildMap(id) {
    const hit = cache.get(id);
    if (hit) return hit;
    const info = getMapInfo(id);
    const data = info.type === "duel" ? buildDuel(info) : info.type === "ffa" ? info.id === "ffa-manor" || info.id === "ffa-villa" ? buildManor(info) : buildFfa(info) : buildDefense(info);
    cache.set(info.id, data);
    return data;
}
}),
"[project]/src/game/minimap.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "renderMapCanvas",
    ()=>renderMapCanvas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/weapons.ts [app-ssr] (ecmascript)");
;
function renderMapCanvas(map, px, showSpawns = true) {
    const cv = document.createElement("canvas");
    const w = Math.round(px * (map.hx * 2 / Math.max(map.hx, map.hz) / 2));
    const h = Math.round(px * (map.hz * 2 / Math.max(map.hx, map.hz) / 2));
    cv.width = w;
    cv.height = h;
    const g = cv.getContext("2d");
    const sx = w / (map.hx * 2);
    const sz = h / (map.hz * 2);
    const ground = map.boxes[0];
    g.fillStyle = "#" + ground.c.toString(16).padStart(6, "0");
    g.fillRect(0, 0, w, h);
    const list = map.boxes.filter((b)=>!b.nc && b.y0 > -1 && b.y1 > 0.3 && b.x0 > -map.hx - 0.5 && b.x1 < map.hx + 0.5 && b.z0 > -map.hz - 0.5 && b.z1 < map.hz + 0.5);
    list.sort((a, b)=>a.y1 - b.y1);
    for (const b of list){
        const r = b.c >> 16 & 255;
        const gg = b.c >> 8 & 255;
        const bb = b.c & 255;
        const k = Math.min(1.25, 0.55 + b.y1 * 0.08);
        g.fillStyle = `rgb(${Math.min(255, r * k) | 0},${Math.min(255, gg * k) | 0},${Math.min(255, bb * k) | 0})`;
        g.fillRect((b.x0 + map.hx) * sx, (b.z0 + map.hz) * sz, Math.max(1, (b.x1 - b.x0) * sx), Math.max(1, (b.z1 - b.z0) * sz));
    }
    g.strokeStyle = "rgba(0,0,0,0.6)";
    g.lineWidth = 2;
    g.strokeRect(0, 0, w, h);
    if (showSpawns) {
        if (map.type === "defense") {
            g.fillStyle = "#3b82f6";
            g.beginPath();
            g.arc(w / 2, h / 2, Math.max(3, w * 0.025), 0, Math.PI * 2);
            g.fill();
            g.fillStyle = "#ef4444";
            for(let c = 0; c < 4; c++){
                const p = map.enemySpawns[c * 6];
                g.fillRect((p[0] + map.hx) * sx - 3, (p[2] + map.hz) * sz - 3, 7, 7);
            }
        } else {
            map.spawns.forEach((list2, t)=>{
                const p = list2[0];
                g.fillStyle = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$weapons$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TEAM_CSS"][t];
                g.beginPath();
                g.arc((p[0] + map.hx) * sx, (p[2] + map.hz) * sz, Math.max(3, w * 0.025), 0, Math.PI * 2);
                g.fill();
            });
        }
    }
    return cv;
}
}),
"[project]/src/game/weapons.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// 武器数据：一号位(主武器) / 二号位(副武器) / 三号位(重武器)
__turbopack_context__.s([
    "CATEGORIES",
    ()=>CATEGORIES,
    "DEFAULT_LOADOUT",
    ()=>DEFAULT_LOADOUT,
    "RULES",
    ()=>RULES,
    "TEAM_COLORS",
    ()=>TEAM_COLORS,
    "TEAM_CSS",
    ()=>TEAM_CSS,
    "TEAM_NAMES",
    ()=>TEAM_NAMES,
    "WEAPONS",
    ()=>WEAPONS,
    "WEAPON_BY_ID",
    ()=>WEAPON_BY_ID,
    "WEAPON_INDEX",
    ()=>WEAPON_INDEX,
    "sanitizeLoadout",
    ()=>sanitizeLoadout,
    "weaponsOfCat",
    ()=>weaponsOfCat
]);
const RULES = {
    maxHp: 100,
    headMul: 1.5,
    bodyMul: 1.0,
    healUses: 4,
    healTickEvery: 0.01,
    healDuration: 2,
    sprintSeconds: 5,
    staminaRegenMul: 3,
    staminaRegenDelay: 0.5,
    slideCost: 25,
    heavyMoveMul: 0.75,
    respawnTime: 4
};
function mk(p) {
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
        ...p
    };
}
const WEAPONS = [
    // ───────── 步枪 (全自动 / 中距离 / 均衡) ─────────
    mk({
        id: "m4a1",
        name: "M4A1 卡宾枪",
        en: "M4A1",
        slot: 1,
        cat: "rifle",
        damage: 25,
        rpm: 750,
        mag: 30,
        reload: 2.1,
        spread: 2.2,
        adsSpread: 0.25,
        recoilV: 0.9,
        recoilH: 0.35,
        range: 45,
        maxRange: 130,
        minMul: 0.7,
        moveMul: 0.95,
        zoom: 1.4,
        color: 0x2d3138,
        accent: 0x6b7280,
        len: 0.85,
        desc: "均衡可靠的标准突击步枪，易于控制。"
    }),
    mk({
        id: "ak47",
        name: "AK-47 突击步枪",
        en: "AK-47",
        slot: 1,
        cat: "rifle",
        damage: 31,
        rpm: 600,
        mag: 30,
        reload: 2.5,
        spread: 2.7,
        adsSpread: 0.35,
        recoilV: 1.4,
        recoilH: 0.6,
        range: 42,
        maxRange: 130,
        minMul: 0.7,
        moveMul: 0.93,
        zoom: 1.35,
        color: 0x4a3322,
        accent: 0x2b2b2b,
        len: 0.9,
        desc: "威力大、后坐力强，需要压枪。"
    }),
    mk({
        id: "famas",
        name: "FAMAS 无托步枪",
        en: "FAMAS",
        slot: 1,
        cat: "rifle",
        damage: 22,
        rpm: 950,
        mag: 25,
        reload: 2.2,
        spread: 2.3,
        adsSpread: 0.3,
        recoilV: 0.8,
        recoilH: 0.3,
        range: 40,
        maxRange: 120,
        minMul: 0.65,
        moveMul: 0.97,
        zoom: 1.4,
        color: 0x3a4a3a,
        accent: 0x20262b,
        len: 0.75,
        desc: "射速极高，适合快速压制。"
    }),
    mk({
        id: "scarh",
        name: "SCAR-H 战斗步枪",
        en: "SCAR-H",
        slot: 1,
        cat: "rifle",
        damage: 34,
        rpm: 520,
        mag: 20,
        reload: 2.4,
        spread: 2.4,
        adsSpread: 0.25,
        recoilV: 1.6,
        recoilH: 0.5,
        range: 50,
        maxRange: 150,
        minMul: 0.75,
        moveMul: 0.92,
        zoom: 1.5,
        color: 0x8a7a55,
        accent: 0x2b2f36,
        len: 0.88,
        desc: "大口径战斗步枪，射程远、单发威力高。"
    }),
    // ───────── 冲锋枪 (全自动 / 近距离 / 高射速 / 快换弹 / 低后坐) ─────────
    mk({
        id: "mp5",
        name: "MP5 冲锋枪",
        en: "MP5",
        slot: 1,
        cat: "smg",
        damage: 19,
        rpm: 800,
        mag: 30,
        reload: 1.6,
        spread: 2.4,
        adsSpread: 0.6,
        recoilV: 0.45,
        recoilH: 0.2,
        range: 22,
        maxRange: 75,
        minMul: 0.5,
        moveMul: 1.04,
        zoom: 1.25,
        color: 0x1f2328,
        accent: 0x4b5563,
        len: 0.6,
        desc: "稳定的近距离冲锋枪。"
    }),
    mk({
        id: "vector",
        name: "Vector 冲锋枪",
        en: "Vector",
        slot: 1,
        cat: "smg",
        damage: 16,
        rpm: 1150,
        mag: 25,
        reload: 1.5,
        spread: 2.8,
        adsSpread: 0.8,
        recoilV: 0.5,
        recoilH: 0.25,
        range: 18,
        maxRange: 65,
        minMul: 0.5,
        moveMul: 1.05,
        zoom: 1.2,
        color: 0x6d5a3a,
        accent: 0x20242a,
        len: 0.55,
        desc: "超高射速，近距离秒杀利器。"
    }),
    mk({
        id: "p90",
        name: "P90 冲锋枪",
        en: "P90",
        slot: 1,
        cat: "smg",
        damage: 17,
        rpm: 900,
        mag: 50,
        reload: 2.0,
        spread: 2.6,
        adsSpread: 0.7,
        recoilV: 0.4,
        recoilH: 0.2,
        range: 24,
        maxRange: 80,
        minMul: 0.55,
        moveMul: 1.03,
        zoom: 1.25,
        color: 0x3b3f46,
        accent: 0xd97706,
        len: 0.55,
        desc: "大容量弹匣，持续火力出色。"
    }),
    // ───────── 狙击枪 (半自动 / 远距离 / 威力大) ─────────
    mk({
        id: "awm",
        name: "AWM 狙击枪",
        en: "AWM",
        slot: 1,
        cat: "sniper",
        damage: 105,
        rpm: 42,
        auto: false,
        mag: 5,
        mags: 5,
        reload: 3.6,
        spread: 9,
        adsSpread: 0.02,
        recoilV: 3.5,
        recoilH: 0.4,
        range: 200,
        maxRange: 400,
        minMul: 1,
        moveMul: 0.85,
        zoom: 4,
        scope: true,
        color: 0x2f4f3a,
        accent: 0x111111,
        len: 1.25,
        desc: "一击毙命的重型狙击枪，射速慢。"
    }),
    mk({
        id: "svd",
        name: "SVD 半自动狙击枪",
        en: "SVD",
        slot: 1,
        cat: "sniper",
        damage: 72,
        rpm: 150,
        auto: false,
        mag: 10,
        mags: 5,
        reload: 3.2,
        spread: 7,
        adsSpread: 0.06,
        recoilV: 2.4,
        recoilH: 0.4,
        range: 150,
        maxRange: 350,
        minMul: 0.95,
        moveMul: 0.9,
        zoom: 3.2,
        scope: true,
        color: 0x5a4632,
        accent: 0x1a1a1a,
        len: 1.15,
        desc: "半自动精确射手步枪，爆头一击致命。"
    }),
    // ───────── 散弹枪 (近距离 / 散射大) ─────────
    mk({
        id: "m870",
        name: "M870 泵动霰弹枪",
        en: "M870",
        slot: 1,
        cat: "shotgun",
        damage: 12,
        pellets: 10,
        rpm: 70,
        auto: false,
        mag: 6,
        mags: 6,
        reload: 3.0,
        spread: 3.2,
        adsSpread: 2.2,
        recoilV: 4,
        recoilH: 0.8,
        range: 10,
        maxRange: 32,
        minMul: 0.2,
        moveMul: 0.98,
        zoom: 1.15,
        color: 0x4b3a2a,
        accent: 0x303030,
        len: 0.85,
        desc: "半自动(泵动)，近距离威力巨大。"
    }),
    mk({
        id: "spas",
        name: "SPAS-12 战术霰弹枪",
        en: "SPAS-12",
        slot: 1,
        cat: "shotgun",
        damage: 11,
        pellets: 9,
        rpm: 130,
        auto: false,
        mag: 8,
        mags: 5,
        reload: 3.2,
        spread: 3.6,
        adsSpread: 2.5,
        recoilV: 3,
        recoilH: 0.7,
        range: 11,
        maxRange: 34,
        minMul: 0.2,
        moveMul: 0.97,
        zoom: 1.15,
        color: 0x2a2a2a,
        accent: 0x6b7280,
        len: 0.85,
        desc: "半自动，连射速度较快。"
    }),
    mk({
        id: "aa12",
        name: "AA-12 全自动霰弹枪",
        en: "AA-12",
        slot: 1,
        cat: "shotgun",
        damage: 7.5,
        pellets: 8,
        rpm: 300,
        auto: true,
        mag: 20,
        mags: 4,
        reload: 3.6,
        spread: 4.2,
        adsSpread: 3.0,
        recoilV: 2.2,
        recoilH: 1,
        range: 9,
        maxRange: 30,
        minMul: 0.2,
        moveMul: 0.93,
        zoom: 1.15,
        color: 0x3a3f2a,
        accent: 0x202020,
        len: 0.8,
        desc: "全自动霰弹枪，泼水般的火力。"
    }),
    // ───────── 轻机枪 (中远距离 / 大弹容 / 换弹慢 / 高伤害) ─────────
    mk({
        id: "m249",
        name: "M249 SAW",
        en: "M249",
        slot: 1,
        cat: "lmg",
        damage: 30,
        rpm: 720,
        mag: 100,
        mags: 3,
        reload: 5.5,
        spread: 3,
        adsSpread: 0.9,
        recoilV: 0.8,
        recoilH: 0.5,
        range: 50,
        maxRange: 140,
        minMul: 0.7,
        moveMul: 0.82,
        zoom: 1.3,
        color: 0x30343a,
        accent: 0x4d5a3a,
        len: 1.0,
        desc: "100发弹链，持续压制火力。"
    }),
    mk({
        id: "rpk",
        name: "RPK 轻机枪",
        en: "RPK",
        slot: 1,
        cat: "lmg",
        damage: 35,
        rpm: 600,
        mag: 75,
        mags: 3,
        reload: 5.0,
        spread: 3,
        adsSpread: 0.7,
        recoilV: 1.1,
        recoilH: 0.5,
        range: 52,
        maxRange: 150,
        minMul: 0.7,
        moveMul: 0.85,
        zoom: 1.35,
        color: 0x4a3322,
        accent: 0x222222,
        len: 0.98,
        desc: "伤害较高，精度不错的轻机枪。"
    }),
    mk({
        id: "pkm",
        name: "PKM 通用机枪",
        en: "PKM",
        slot: 1,
        cat: "lmg",
        damage: 40,
        rpm: 640,
        mag: 100,
        mags: 3,
        reload: 6.2,
        spread: 3.4,
        adsSpread: 1.0,
        recoilV: 1.3,
        recoilH: 0.7,
        range: 55,
        maxRange: 160,
        minMul: 0.7,
        moveMul: 0.78,
        zoom: 1.3,
        color: 0x2b3a2b,
        accent: 0x15191c,
        len: 1.05,
        desc: "高伤害轻机枪，机动性最差。"
    }),
    // ───────── 二号位：手枪 ─────────
    mk({
        id: "m1911",
        name: "M1911 手枪",
        en: "M1911",
        slot: 2,
        cat: "pistol",
        damage: 34,
        rpm: 330,
        auto: false,
        mag: 8,
        mags: 6,
        reload: 1.5,
        spread: 2.2,
        adsSpread: 0.4,
        recoilV: 1.4,
        recoilH: 0.3,
        range: 25,
        maxRange: 80,
        minMul: 0.55,
        moveMul: 1.06,
        zoom: 1.15,
        color: 0x555a63,
        accent: 0x2c2c2c,
        len: 0.35,
        desc: "经典.45口径，单发伤害高。"
    }),
    mk({
        id: "g17",
        name: "G17 手枪",
        en: "G17",
        slot: 2,
        cat: "pistol",
        damage: 24,
        rpm: 480,
        auto: false,
        mag: 17,
        mags: 5,
        reload: 1.6,
        spread: 2.0,
        adsSpread: 0.4,
        recoilV: 0.9,
        recoilH: 0.25,
        range: 22,
        maxRange: 75,
        minMul: 0.5,
        moveMul: 1.07,
        zoom: 1.15,
        color: 0x25282d,
        accent: 0x3b3f46,
        len: 0.33,
        desc: "弹容大、射速快的半自动手枪。"
    }),
    mk({
        id: "deagle",
        name: "沙漠之鹰",
        en: "Desert Eagle",
        slot: 2,
        cat: "pistol",
        damage: 58,
        rpm: 190,
        auto: false,
        mag: 7,
        mags: 5,
        reload: 2.0,
        spread: 2.6,
        adsSpread: 0.5,
        recoilV: 3.0,
        recoilH: 0.6,
        range: 30,
        maxRange: 95,
        minMul: 0.6,
        moveMul: 1.03,
        zoom: 1.15,
        color: 0xb8b8b8,
        accent: 0x222222,
        len: 0.4,
        desc: "手炮级别威力，两发击杀。"
    }),
    // ───────── 二号位：近战 ─────────
    mk({
        id: "knife",
        name: "战术小刀",
        en: "Combat Knife",
        slot: 2,
        cat: "melee",
        type: "melee",
        damage: 55,
        rpm: 150,
        auto: true,
        mag: 0,
        mags: 0,
        reload: 0,
        range: 2.3,
        maxRange: 2.3,
        minMul: 1,
        moveMul: 1.12,
        color: 0x9aa3ad,
        accent: 0x1f1f1f,
        len: 0.4,
        desc: "轻快迅速，两刀毙命。"
    }),
    mk({
        id: "axe",
        name: "战斧",
        en: "Tomahawk",
        slot: 2,
        cat: "melee",
        type: "melee",
        damage: 78,
        rpm: 70,
        auto: true,
        mag: 0,
        mags: 0,
        reload: 0,
        range: 2.7,
        maxRange: 2.7,
        minMul: 1,
        moveMul: 1.06,
        color: 0x8b8f96,
        accent: 0x6b4a2b,
        len: 0.55,
        desc: "挥动较慢，但伤害极高。"
    }),
    mk({
        id: "machete",
        name: "砍刀",
        en: "Machete",
        slot: 2,
        cat: "melee",
        type: "melee",
        damage: 65,
        rpm: 100,
        auto: true,
        mag: 0,
        mags: 0,
        reload: 0,
        range: 2.5,
        maxRange: 2.5,
        minMul: 1,
        moveMul: 1.08,
        color: 0xb0b6bd,
        accent: 0x2d2d2d,
        len: 0.55,
        desc: "速度与威力兼顾的丛林砍刀。"
    }),
    // ───────── 三号位：重武器 ─────────
    mk({
        id: "rpg",
        name: "RPG-7 火箭筒",
        en: "RPG-7",
        slot: 3,
        cat: "heavy",
        type: "rocket",
        weight: "heavy",
        damage: 170,
        rpm: 40,
        auto: false,
        mag: 1,
        mags: 3,
        reload: 3.4,
        spread: 0.8,
        adsSpread: 0.1,
        recoilV: 4,
        recoilH: 0.5,
        range: 400,
        maxRange: 400,
        minMul: 1,
        moveMul: 0.75,
        zoom: 1.5,
        radius: 7,
        speed: 42,
        color: 0x4d5a3a,
        accent: 0x3a3a3a,
        len: 1.1,
        desc: "火箭弹，大范围爆炸伤害。重型：持握时移速 75%。"
    }),
    mk({
        id: "hmg",
        name: "M2 重机枪",
        en: "M2HB",
        slot: 3,
        cat: "heavy",
        type: "gun",
        weight: "heavy",
        damage: 48,
        rpm: 480,
        auto: true,
        mag: 100,
        mags: 2,
        reload: 7.5,
        spread: 3.6,
        adsSpread: 1.8,
        recoilV: 0.9,
        recoilH: 0.6,
        range: 70,
        maxRange: 180,
        minMul: 0.7,
        moveMul: 0.75,
        zoom: 1.25,
        color: 0x2e3a2e,
        accent: 0x15181a,
        len: 1.15,
        desc: "重型机枪，火力凶猛但极其笨重。重型：持握时移速 75%。"
    }),
    mk({
        id: "gl",
        name: "M32 榴弹发射器",
        en: "M32 MGL",
        slot: 3,
        cat: "heavy",
        type: "grenade",
        weight: "light",
        damage: 115,
        rpm: 110,
        auto: false,
        mag: 10,
        mags: 3,
        reload: 4.5,
        spread: 1.2,
        adsSpread: 0.3,
        recoilV: 3,
        recoilH: 0.4,
        range: 300,
        maxRange: 300,
        minMul: 1,
        moveMul: 1,
        zoom: 1.35,
        radius: 5,
        speed: 30,
        color: 0x3d4a35,
        accent: 0x222222,
        len: 0.8,
        desc: "3个备用弹链，每链10发榴弹。轻型：无移动惩罚。"
    })
];
const WEAPON_BY_ID = Object.fromEntries(WEAPONS.map((w)=>[
        w.id,
        w
    ]));
const WEAPON_INDEX = Object.fromEntries(WEAPONS.map((w, i)=>[
        w.id,
        i
    ]));
const CATEGORIES = [
    {
        id: "rifle",
        name: "突击步枪",
        slot: 1,
        desc: "全自动 · 中距离 · 属性均衡"
    },
    {
        id: "smg",
        name: "冲锋枪",
        slot: 1,
        desc: "全自动 · 近距离 · 高射速 · 快换弹"
    },
    {
        id: "sniper",
        name: "狙击枪",
        slot: 1,
        desc: "半自动 · 远距离 · 威力大"
    },
    {
        id: "shotgun",
        name: "散弹枪",
        slot: 1,
        desc: "近距离 · 威力大 · 散射高"
    },
    {
        id: "lmg",
        name: "轻机枪",
        slot: 1,
        desc: "中远距离 · 大弹容 · 换弹慢"
    },
    {
        id: "special",
        name: "特殊武器",
        slot: 1,
        locked: true,
        desc: "预留位置 · 敬请期待"
    },
    {
        id: "pistol",
        name: "远程武器 (手枪)",
        slot: 2,
        desc: "半自动 · 切枪迅速"
    },
    {
        id: "melee",
        name: "近战武器",
        slot: 2,
        desc: "无需弹药 · 近距离致命"
    },
    {
        id: "heavy",
        name: "重武器",
        slot: 3,
        desc: "RPG / 重机枪（重型，持握移速 75%）· 榴弹发射器（轻型，无惩罚）"
    }
];
function weaponsOfCat(cat) {
    return WEAPONS.filter((w)=>w.cat === cat);
}
const DEFAULT_LOADOUT = {
    primary: "m4a1",
    secondary: "m1911",
    heavy: "rpg"
};
function sanitizeLoadout(l) {
    const p = l?.primary && WEAPON_BY_ID[l.primary]?.slot === 1 ? l.primary : DEFAULT_LOADOUT.primary;
    const s = l?.secondary && WEAPON_BY_ID[l.secondary]?.slot === 2 ? l.secondary : DEFAULT_LOADOUT.secondary;
    const h = l?.heavy && WEAPON_BY_ID[l.heavy]?.slot === 3 ? l.heavy : DEFAULT_LOADOUT.heavy;
    return {
        primary: p,
        secondary: s,
        heavy: h
    };
}
const TEAM_COLORS = [
    0xe74c3c,
    0x3b82f6,
    0x22c55e,
    0xeab308
];
const TEAM_NAMES = [
    "红队",
    "蓝队",
    "绿队",
    "黄队"
];
const TEAM_CSS = [
    "#ef4444",
    "#3b82f6",
    "#22c55e",
    "#eab308"
];
}),
];})()

//# sourceMappingURL=src_1l-6i1gzotzk9._.js.map