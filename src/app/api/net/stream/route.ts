import { broadcast, getRoom, joinPlayer, removePlayer, roomInfo, sendTo } from "@/lib/rooms";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function OPTIONS() {
  return new Response(null, { headers: corsHeaders() });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const roomId = (url.searchParams.get("room") || "").toUpperCase();
  const pid = (url.searchParams.get("pid") || "").slice(0, 24);
  const name = url.searchParams.get("name") || "玩家";
  const reqTeam = Number(url.searchParams.get("team") ?? -1);
  const room = getRoom(roomId);
  if (!room || !pid) return new Response("room not found", { status: 404 });
  if (room.players.size >= room.maxPlayers && !room.players.has(pid)) return new Response("room full", { status: 403 });

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      const p = joinPlayer(room, pid, name, reqTeam, controller);
      sendTo(p, {
        t: "welcome",
        you: { id: p.id, team: p.team },
        room: roomInfo(room),
        players: Array.from(room.players.values()).map((q) => ({ id: q.id, name: q.name, team: q.team })),
      });
      broadcast(room, { t: "join", p: { id: p.id, name: p.name, team: p.team } }, pid);
    },
    cancel() {
      removePlayer(roomId, pid);
    },
  });
  req.signal.addEventListener("abort", () => removePlayer(roomId, pid));
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
