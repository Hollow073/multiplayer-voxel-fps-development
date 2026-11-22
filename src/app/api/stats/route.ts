import { desc, sql } from "drizzle-orm";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// 没有配置数据库时不要抛异常：大厅战绩榜直接显示为空即可。
async function getDb() {
  if (!process.env.DATABASE_URL) return null;
  try {
    const { db } = await import("@/db");
    return db;
  } catch {
    return null;
  }
}

export async function GET() {
  const db = await getDb();
  if (!db) return Response.json({ rows: [] });
  try {
    const { playerStats } = await import("@/db/schema");
    const rows = await db.select().from(playerStats).orderBy(desc(playerStats.kills)).limit(10);
    return Response.json({ rows });
  } catch {
    return Response.json({ rows: [] });
  }
}

const num = (v: unknown, max: number) => Math.max(0, Math.min(max, Math.floor(Number(v) || 0)));

export async function POST(req: Request) {
  const db = await getDb();
  if (!db) return Response.json({ ok: true, skipped: true });
  try {
    const { playerStats } = await import("@/db/schema");
    const b = await req.json();
    const name = String(b.name || "").trim().slice(0, 24);
    if (!name) return Response.json({ ok: false }, { status: 400 });
    const kills = num(b.kills, 500);
    const deaths = num(b.deaths, 500);
    const headshots = Math.min(kills, num(b.headshots, 500));
    const wave = num(b.wave, 999);
    if (kills + deaths === 0) return Response.json({ ok: true, skipped: true });
    await db
      .insert(playerStats)
      .values({ name, kills, deaths, headshots, matches: 1, bestWave: wave })
      .onConflictDoUpdate({
        target: playerStats.name,
        set: {
          kills: sql`${playerStats.kills} + ${kills}`,
          deaths: sql`${playerStats.deaths} + ${deaths}`,
          headshots: sql`${playerStats.headshots} + ${headshots}`,
          matches: sql`${playerStats.matches} + 1`,
          bestWave: sql`GREATEST(${playerStats.bestWave}, ${wave})`,
          updatedAt: sql`now()`,
        },
      });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
