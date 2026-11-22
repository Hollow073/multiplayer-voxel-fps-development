// 客户端网络层：SSE 接收 + 批量 POST 发送
export type NetMsg = { t: string; [k: string]: any };

export class Net {
  es: EventSource | null = null;
  queue: NetMsg[] = [];
  timer: ReturnType<typeof setInterval> | null = null;
  heartbeat: ReturnType<typeof setInterval> | null = null;
  busy = false;
  closed = false;
  welcomed = false;
  onMsg: (m: NetMsg) => void = () => {};
  onClose: (reason: string) => void = () => {};

  constructor(public pid: string, public roomId: string) {}

  connect(name: string, team: number): Promise<NetMsg> {
    return new Promise((resolve, reject) => {
      const url = `/api/net/stream?room=${encodeURIComponent(this.roomId)}&pid=${encodeURIComponent(this.pid)}&name=${encodeURIComponent(name)}&team=${team}`;
      const es = new EventSource(url);
      this.es = es;
      es.onmessage = (e) => {
        let m: NetMsg;
        try {
          m = JSON.parse(e.data);
        } catch {
          return;
        }
        if (m.t === "welcome" && !this.welcomed) {
          this.welcomed = true;
          this.timer = setInterval(() => this.flush(), 45);
          // 独立心跳：即使游戏循环被后台标签页暂停，也不会被服务器判定掉线
          this.heartbeat = setInterval(() => {
            if (this.closed || this.busy) return;
            this.raw({ t: "ping" });
            this.flush();
          }, 5000);
          resolve(m);
          return;
        }
        if (m.t === "closed") {
          this.fail(m.reason || "房间已关闭");
          return;
        }
        this.onMsg(m);
      };
      es.onerror = () => {
        if (!this.welcomed) {
          es.close();
          reject(new Error("无法连接到房间（房间可能不存在或已满）"));
        } else this.fail("与服务器的连接已断开");
      };
    });
  }

  private fail(reason: string) {
    if (this.closed) return;
    this.closed = true;
    this.es?.close();
    if (this.timer) clearInterval(this.timer);
    if (this.heartbeat) clearInterval(this.heartbeat);
    this.onClose(reason);
  }

  // 位置状态：只保留最新一条
  state(m: NetMsg) {
    const i = this.queue.findIndex((q) => q.t === "st");
    if (i >= 0) this.queue[i] = m;
    else this.queue.push(m);
  }
  bots(m: NetMsg) {
    const i = this.queue.findIndex((q) => q.t === "bots");
    if (i >= 0) this.queue[i] = m;
    else this.queue.push(m);
  }
  ev(to: string, d: any) {
    this.queue.push({ t: "ev", to, d });
  }
  raw(m: NetMsg) {
    this.queue.push(m);
  }

  flush() {
    if (this.closed || this.busy || this.queue.length === 0) return;
    const msgs = this.queue;
    this.queue = [];
    this.busy = true;
    fetch("/api/net/send", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ room: this.roomId, pid: this.pid, msgs }),
      keepalive: true,
    })
      .then((r) => {
        if (r.status === 404) this.fail("房间已不存在");
      })
      .catch(() => {})
      .finally(() => {
        this.busy = false;
      });
  }

  close() {
    if (this.closed) return;
    this.closed = true;
    if (this.timer) clearInterval(this.timer);
    if (this.heartbeat) clearInterval(this.heartbeat);
    this.es?.close();
    try {
      navigator.sendBeacon("/api/net/send", JSON.stringify({ room: this.roomId, pid: this.pid, msgs: [{ t: "leave" }] }));
    } catch {
      /* ignore */
    }
  }
}
