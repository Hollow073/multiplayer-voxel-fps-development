import os from "os";
import type { NextConfig } from "next";

// 开发模式下，Next.js 默认只允许 localhost 访问 HMR / dev 资源。
// 局域网内用 http://192.168.x.x:3000 打开时，HMR 会被拦截并反复重载页面，
// 表现为“只能看到主页面、按钮全部失效”。这里把本机所有局域网地址加入白名单。
function lanHosts(): string[] {
  const out: string[] = [];
  for (const list of Object.values(os.networkInterfaces())) {
    for (const item of list || []) {
      if (item.family === "IPv4" && !item.internal) out.push(item.address);
    }
  }
  return out;
}

const nextConfig: NextConfig = {
  // 关闭压缩，避免 SSE 事件流被缓冲
  compress: false,
  reactStrictMode: false,
  // "**" 覆盖任意主机名；再显式列出本机局域网 IP，兼容各种网卡/热点。
  allowedDevOrigins: ["**", ...lanHosts()],
};

export default nextConfig;
