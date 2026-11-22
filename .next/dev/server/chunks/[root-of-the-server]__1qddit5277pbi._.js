module.exports = [
(()=>{"use strict";return[
"[project]/src/app/api/net/stream/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "OPTIONS",
    ()=>OPTIONS,
    "dynamic",
    ()=>dynamic,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rooms$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/rooms.ts [app-route] (ecmascript)");
;
const dynamic = "force-dynamic";
const runtime = "nodejs";
function corsHeaders() {
    return {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
    };
}
async function OPTIONS() {
    return new Response(null, {
        headers: corsHeaders()
    });
}
async function GET(req) {
    const url = new URL(req.url);
    const roomId = (url.searchParams.get("room") || "").toUpperCase();
    const pid = (url.searchParams.get("pid") || "").slice(0, 24);
    const name = url.searchParams.get("name") || "玩家";
    const reqTeam = Number(url.searchParams.get("team") ?? -1);
    const room = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rooms$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRoom"])(roomId);
    if (!room || !pid) return new Response("room not found", {
        status: 404
    });
    if (room.players.size >= room.maxPlayers && !room.players.has(pid)) return new Response("room full", {
        status: 403
    });
    const stream = new ReadableStream({
        start (controller) {
            const p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rooms$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["joinPlayer"])(room, pid, name, reqTeam, controller);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rooms$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendTo"])(p, {
                t: "welcome",
                you: {
                    id: p.id,
                    team: p.team
                },
                room: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rooms$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["roomInfo"])(room),
                players: Array.from(room.players.values()).map((q)=>({
                        id: q.id,
                        name: q.name,
                        team: q.team
                    }))
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rooms$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["broadcast"])(room, {
                t: "join",
                p: {
                    id: p.id,
                    name: p.name,
                    team: p.team
                }
            }, pid);
        },
        cancel () {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rooms$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["removePlayer"])(roomId, pid);
        }
    });
    req.signal.addEventListener("abort", ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rooms$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["removePlayer"])(roomId, pid));
    return new Response(stream, {
        headers: {
            "Content-Type": "text/event-stream; charset=utf-8",
            "Cache-Control": "no-cache, no-transform",
            Connection: "keep-alive",
            "X-Accel-Buffering": "no",
            "Access-Control-Allow-Origin": "*"
        }
    });
}
}),
"[project]/src/game/maps.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/src/lib/rooms.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "broadcast",
    ()=>broadcast,
    "createRoom",
    ()=>createRoom,
    "getRoom",
    ()=>getRoom,
    "joinPlayer",
    ()=>joinPlayer,
    "listRooms",
    ()=>listRooms,
    "normMode",
    ()=>normMode,
    "removePlayer",
    ()=>removePlayer,
    "roomInfo",
    ()=>roomInfo,
    "sendTo",
    ()=>sendTo,
    "teamCount",
    ()=>teamCount
]);
// 局域网房间中继 (内存存储，使用 globalThis 在各路由间共享)
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$maps$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/maps.ts [app-route] (ecmascript)");
;
const g = globalThis;
const enc = new TextEncoder();
function store() {
    if (!g.__bsStore) g.__bsStore = {
        rooms: new Map()
    };
    const s = g.__bsStore;
    if (!s.timer) {
        s.timer = setInterval(sweep, 5000);
        s.timer.unref?.();
    }
    return s;
}
function sweep() {
    const s = g.__bsStore;
    if (!s) return;
    const now = Date.now();
    for (const room of Array.from(s.rooms.values())){
        for (const p of Array.from(room.players.values())){
            // 90s：后台标签页的定时器会被浏览器节流，给客户端留足心跳余量
            if (now - p.last > 90000) removePlayer(room.id, p.id);
            else if (p.ctrl) {
                try {
                    p.ctrl.enqueue(enc.encode(": ping\n\n"));
                } catch  {
                    removePlayer(room.id, p.id);
                }
            }
        }
        const r = s.rooms.get(room.id);
        if (r && !r.players.has(r.hostId) && now - r.created > 30000) s.rooms.delete(r.id);
    }
}
function normMode(mapId, mode) {
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$maps$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMapInfo"])(mapId).type;
    if (t === "defense") return "defense";
    if (t === "duel") return "tdm";
    return mode === "tdm" ? "tdm" : "ffa4";
}
function createRoom(o) {
    const s = store();
    const mapId = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$maps$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MAP_LIST"].some((m)=>m.id === o.mapId) ? o.mapId : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$maps$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MAP_LIST"][0].id;
    const id = Math.random().toString(36).slice(2, 7).toUpperCase();
    const room = {
        id,
        name: (o.name || "战场").slice(0, 20),
        mapId,
        mode: normMode(mapId, o.mode),
        hostId: o.pid,
        bots: Math.max(0, Math.min(8, Math.floor(o.bots) || 0)),
        score: [
            20,
            30,
            50,
            75,
            100
        ].includes(o.score) ? o.score : 30,
        diff: Math.max(1, Math.min(3, Math.floor(o.diff) || 2)),
        maxPlayers: 8,
        created: Date.now(),
        players: new Map()
    };
    s.rooms.set(id, room);
    return room;
}
function getRoom(id) {
    return store().rooms.get(id);
}
function roomInfo(r) {
    return {
        id: r.id,
        name: r.name,
        mapId: r.mapId,
        mode: r.mode,
        hostId: r.hostId,
        bots: r.bots,
        score: r.score,
        diff: r.diff
    };
}
function listRooms() {
    return Array.from(store().rooms.values()).filter((r)=>r.players.has(r.hostId)).map((r)=>({
            ...roomInfo(r),
            players: r.players.size,
            max: r.maxPlayers
        }));
}
function teamCount(mode) {
    return mode === "ffa4" ? 4 : mode === "defense" ? 1 : 2;
}
function joinPlayer(room, id, name, reqTeam, ctrl) {
    const tc = teamCount(room.mode);
    let team = reqTeam;
    if (!(team >= 0 && team < tc)) {
        const cnt = new Array(tc).fill(0);
        room.players.forEach((p)=>{
            if (p.team < tc) cnt[p.team]++;
        });
        team = cnt.indexOf(Math.min(...cnt));
    }
    const old = room.players.get(id);
    if (old?.ctrl) {
        try {
            old.ctrl.close();
        } catch  {
        /* ignore */ }
    }
    const p = {
        id,
        name: (name || "玩家").slice(0, 14),
        team,
        ctrl,
        last: Date.now()
    };
    room.players.set(id, p);
    return p;
}
function sendTo(p, msg) {
    if (!p?.ctrl) return;
    try {
        p.ctrl.enqueue(enc.encode("data: " + JSON.stringify(msg) + "\n\n"));
    } catch  {
        p.ctrl = null;
    }
}
function broadcast(room, msg, except) {
    const data = enc.encode("data: " + JSON.stringify(msg) + "\n\n");
    room.players.forEach((p)=>{
        if (p.id === except || !p.ctrl) return;
        try {
            p.ctrl.enqueue(data);
        } catch  {
            p.ctrl = null;
        }
    });
}
function removePlayer(roomId, pid) {
    const s = store();
    const room = s.rooms.get(roomId);
    if (!room) return;
    const p = room.players.get(pid);
    if (!p) return;
    room.players.delete(pid);
    if (p.ctrl) {
        try {
            p.ctrl.close();
        } catch  {
        /* ignore */ }
        p.ctrl = null;
    }
    if (pid === room.hostId) {
        broadcast(room, {
            t: "closed",
            reason: "房主已离开，房间关闭"
        });
        room.players.forEach((q)=>{
            try {
                q.ctrl?.close();
            } catch  {
            /* ignore */ }
        });
        s.rooms.delete(roomId);
    } else {
        broadcast(room, {
            t: "leave",
            id: pid
        });
        if (room.players.size === 0) s.rooms.delete(roomId);
    }
}
}),
]})(),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1qddit5277pbi._.js.map