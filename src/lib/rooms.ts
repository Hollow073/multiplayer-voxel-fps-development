// 局域网房间中继 (内存存储，使用 globalThis 在各路由间共享)
import { MAP_LIST, getMapInfo } from "@/game/maps";

export interface RPlayer {
  id: string;
  name: string;
  team: number;
  ctrl: ReadableStreamDefaultController<Uint8Array> | null;
  last: number;
}
export interface Room {
  id: string;
  name: string;
  mapId: string;
  mode: string; // tdm | ffa4 | defense
  hostId: string;
  bots: number;
  score: number;
  diff: number;
  maxPlayers: number;
  created: number;
  players: Map<string, RPlayer>;
}

interface Store {
  rooms: Map<string, Room>;
  timer?: ReturnType<typeof setInterval>;
}
const g = globalThis as unknown as { __bsStore?: Store };
const enc = new TextEncoder();

function store(): Store {
  if (!g.__bsStore) g.__bsStore = { rooms: new Map() };
  const s = g.__bsStore;
  if (!s.timer) {
    s.timer = setInterval(sweep, 5000);
    (s.timer as unknown as { unref?: () => void }).unref?.();
  }
  return s;
}

function sweep() {
  const s = g.__bsStore;
  if (!s) return;
  const now = Date.now();
  for (const room of Array.from(s.rooms.values())) {
    for (const p of Array.from(room.players.values())) {
      // 90s：后台标签页的定时器会被浏览器节流，给客户端留足心跳余量
      if (now - p.last > 90000) removePlayer(room.id, p.id);
      else if (p.ctrl) {
        try {
          p.ctrl.enqueue(enc.encode(": ping\n\n"));
        } catch {
          removePlayer(room.id, p.id);
        }
      }
    }
    const r = s.rooms.get(room.id);
    if (r && !r.players.has(r.hostId) && now - r.created > 30000) s.rooms.delete(r.id);
  }
}

export function normMode(mapId: string, mode: string): string {
  const t = getMapInfo(mapId).type;
  if (t === "defense") return "defense";
  if (t === "duel") return "tdm";
  return mode === "tdm" ? "tdm" : "ffa4";
}

export function createRoom(o: { name: string; mapId: string; mode: string; bots: number; score: number; diff: number; pid: string }): Room {
  const s = store();
  const mapId = MAP_LIST.some((m) => m.id === o.mapId) ? o.mapId : MAP_LIST[0].id;
  const id = Math.random().toString(36).slice(2, 7).toUpperCase();
  const room: Room = {
    id,
    name: (o.name || "战场").slice(0, 20),
    mapId,
    mode: normMode(mapId, o.mode),
    hostId: o.pid,
    bots: Math.max(0, Math.min(8, Math.floor(o.bots) || 0)),
    score: [20, 30, 50, 75, 100].includes(o.score) ? o.score : 30,
    diff: Math.max(1, Math.min(3, Math.floor(o.diff) || 2)),
    maxPlayers: 8,
    created: Date.now(),
    players: new Map(),
  };
  s.rooms.set(id, room);
  return room;
}

export function getRoom(id: string): Room | undefined {
  return store().rooms.get(id);
}

export function roomInfo(r: Room) {
  return { id: r.id, name: r.name, mapId: r.mapId, mode: r.mode, hostId: r.hostId, bots: r.bots, score: r.score, diff: r.diff };
}

export function listRooms() {
  return Array.from(store().rooms.values())
    .filter((r) => r.players.has(r.hostId))
    .map((r) => ({ ...roomInfo(r), players: r.players.size, max: r.maxPlayers }));
}

export function teamCount(mode: string) {
  return mode === "ffa4" ? 4 : mode === "defense" ? 1 : 2;
}

export function joinPlayer(room: Room, id: string, name: string, reqTeam: number, ctrl: ReadableStreamDefaultController<Uint8Array>): RPlayer {
  const tc = teamCount(room.mode);
  let team = reqTeam;
  if (!(team >= 0 && team < tc)) {
    const cnt = new Array(tc).fill(0);
    room.players.forEach((p) => {
      if (p.team < tc) cnt[p.team]++;
    });
    team = cnt.indexOf(Math.min(...cnt));
  }
  const old = room.players.get(id);
  if (old?.ctrl) {
    try {
      old.ctrl.close();
    } catch {
      /* ignore */
    }
  }
  const p: RPlayer = { id, name: (name || "玩家").slice(0, 14), team, ctrl, last: Date.now() };
  room.players.set(id, p);
  return p;
}

export function sendTo(p: RPlayer | undefined, msg: unknown) {
  if (!p?.ctrl) return;
  try {
    p.ctrl.enqueue(enc.encode("data: " + JSON.stringify(msg) + "\n\n"));
  } catch {
    p.ctrl = null;
  }
}

export function broadcast(room: Room, msg: unknown, except?: string) {
  const data = enc.encode("data: " + JSON.stringify(msg) + "\n\n");
  room.players.forEach((p) => {
    if (p.id === except || !p.ctrl) return;
    try {
      p.ctrl.enqueue(data);
    } catch {
      p.ctrl = null;
    }
  });
}

export function removePlayer(roomId: string, pid: string) {
  const s = store();
  const room = s.rooms.get(roomId);
  if (!room) return;
  const p = room.players.get(pid);
  if (!p) return;
  room.players.delete(pid);
  if (p.ctrl) {
    try {
      p.ctrl.close();
    } catch {
      /* ignore */
    }
    p.ctrl = null;
  }
  if (pid === room.hostId) {
    broadcast(room, { t: "closed", reason: "房主已离开，房间关闭" });
    room.players.forEach((q) => {
      try {
        q.ctrl?.close();
      } catch {
        /* ignore */
      }
    });
    s.rooms.delete(roomId);
  } else {
    broadcast(room, { t: "leave", id: pid });
    if (room.players.size === 0) s.rooms.delete(roomId);
  }
}
