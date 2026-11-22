import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "BLOCK STRIKE · 方块战场",
  description: "3D 方块风 FPS：局域网联机、8 张地图、双方/四方混战与据点防守。",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="bg-[#0b1220] text-white antialiased">{children}</body>
    </html>
  );
}
