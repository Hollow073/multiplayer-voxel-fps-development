import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

// 玩家累计战绩 (排行榜)
export const playerStats = pgTable("player_stats", {
  name: varchar("name", { length: 24 }).primaryKey(),
  kills: integer("kills").notNull().default(0),
  deaths: integer("deaths").notNull().default(0),
  headshots: integer("headshots").notNull().default(0),
  matches: integer("matches").notNull().default(0),
  bestWave: integer("best_wave").notNull().default(0),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
