import { broadcast, getRoom, removePlayer, sendTo } from "@/lib/rooms";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function OPTIONS() {
  return new Response(null, { headers: corsHeaders() });
}

interface Msg {
  t: string;
  to?: string;
  d?: unknown;
  team?: number;
  [k: string]: unknown;
}

export async function POST(req: Request) {
  let body: { room?: string; pid?: string; msgs?: Msg[] };
  try {
    body = JSON.parse(await req.text());
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  const room = getRoom(String(body.room || "").toUpperCase());
  const pid = String(body.pid || "");
  const me = room?.players.get(pid);
  if (!room || !me) return Response.json({ ok: false, gone: true }, { status: 404 });
  me.last = Date.now();
  for (const m of body.msgs || []) {
    switch (m.t) {
      case "st":
        broadcast(room, { ...m, id: pid }, pid);
        break;
      case "bots":
        if (pid === room.hostId) broadcast(room, m, pid);
        break;
      case "ev": {
        const out = { t: "ev", from: pid, d: m.d };
        if (m.to === "all") broadcast(room, out, pid);
        else if (m.to === "host") {
          if (pid !== room.hostId) sendTo(room.players.get(room.hostId), out);
        } else if (typeof m.to === "string") sendTo(room.players.get(m.to), out);
        break;
      }
      case "team":
        if (typeof m.team === "number") {
          me.team = m.team;
          broadcast(room, { t: "team", id: pid, team: m.team }, pid);
        }
        break;
      case "leave":
        removePlayer(room.id, pid);
        return Response.json({ ok: true });
    }
  }
  return Response.json({ ok: true });
}
