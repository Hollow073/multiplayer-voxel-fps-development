import type { MapData } from "./maps";
import { TEAM_CSS } from "./weapons";

// 将地图俯视图绘制到 canvas (用于大厅预览和游戏内小地图)
export function renderMapCanvas(map: MapData, px: number, showSpawns = true): HTMLCanvasElement {
  const cv = document.createElement("canvas");
  const w = Math.round(px * ((map.hx * 2) / Math.max(map.hx, map.hz) / 2));
  const h = Math.round(px * ((map.hz * 2) / Math.max(map.hx, map.hz) / 2));
  cv.width = w;
  cv.height = h;
  const g = cv.getContext("2d")!;
  const sx = w / (map.hx * 2);
  const sz = h / (map.hz * 2);
  const ground = map.boxes[0];
  g.fillStyle = "#" + ground.c.toString(16).padStart(6, "0");
  g.fillRect(0, 0, w, h);
  const list = map.boxes.filter((b) => !b.nc && b.y0 > -1 && b.y1 > 0.3 && b.x0 > -map.hx - 0.5 && b.x1 < map.hx + 0.5 && b.z0 > -map.hz - 0.5 && b.z1 < map.hz + 0.5);
  list.sort((a, b) => a.y1 - b.y1);
  for (const b of list) {
    const r = (b.c >> 16) & 255;
    const gg = (b.c >> 8) & 255;
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
      for (let c = 0; c < 4; c++) {
        const p = map.enemySpawns[c * 6];
        g.fillRect((p[0] + map.hx) * sx - 3, (p[2] + map.hz) * sz - 3, 7, 7);
      }
    } else {
      map.spawns.forEach((list2, t) => {
        const p = list2[0];
        g.fillStyle = TEAM_CSS[t];
        g.beginPath();
        g.arc((p[0] + map.hx) * sx, (p[2] + map.hz) * sz, Math.max(3, w * 0.025), 0, Math.PI * 2);
        g.fill();
      });
    }
  }
  return cv;
}
