import os from "os";
import { createRoom, listRooms } from "@/lib/rooms";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function lanIps(): string[] {
  const out: string[] = [];
  const ifs = os.networkInterfaces();
  for (const k of Object.keys(ifs)) {
    for (const i of ifs[k] || []) {
      if (i.family === "IPv4" && !i.internal) out.push(i.address);
    }
  }
  return out;
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function OPTIONS() {
  return new Response(null, { headers: corsHeaders() });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const host = req.headers.get("host") || "";
  const port = host.includes(":") ? host.split(":").pop() : url.port || "3000";
  return Response.json({ rooms: listRooms(), lan: lanIps(), port }, { headers: corsHeaders() });
}

export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  const room = createRoom({
    name: String(b.name || ""),
    mapId: String(b.mapId || ""),
    mode: String(b.mode || ""),
    bots: Number(b.bots) || 0,
    score: Number(b.score) || 30,
    diff: Number(b.diff) || 2,
    pid: String(b.pid || "").slice(0, 24),
  });
  return Response.json({ ok: true, id: room.id, mode: room.mode }, { headers: corsHeaders() });
}
