// 可自定义键位：首次启动使用默认值，保存在 localStorage
export interface KeyBinds {
  forward: string;
  back: string;
  left: string;
  right: string;
  jump: string;
  sprint: string;
  crouch: string;
  prone: string;
  reload: string;
  heal: string;
  scoreboard: string;
  slot1: string;
  slot2: string;
  slot3: string;
  slot4: string;
  grenade: string;
  backpack: string;
}

export type BindAction = keyof KeyBinds;

export const DEFAULT_BINDS: KeyBinds = {
  forward: "KeyW",
  back: "KeyS",
  left: "KeyA",
  right: "KeyD",
  jump: "Space",
  sprint: "ShiftLeft",
  crouch: "KeyC",
  prone: "KeyZ",
  reload: "KeyR",
  heal: "KeyQ",
  scoreboard: "Tab",
  slot1: "Digit1",
  slot2: "Digit2",
  slot3: "Digit3",
  slot4: "Digit4",
  grenade: "KeyG",
  backpack: "KeyE",
};

export const BIND_META: { key: BindAction; label: string; hint?: string }[] = [
  { key: "forward", label: "前进" },
  { key: "back", label: "后退" },
  { key: "left", label: "左移" },
  { key: "right", label: "右移" },
  { key: "jump", label: "跳跃" },
  { key: "sprint", label: "冲刺" },
  { key: "crouch", label: "蹲下 / 滑铲", hint: "冲刺键 + 蹲下键 = 滑铲" },
  { key: "prone", label: "趴下" },
  { key: "reload", label: "换弹" },
  { key: "heal", label: "使用回血" },
  { key: "scoreboard", label: "计分板" },
  { key: "slot1", label: "一号位武器" },
  { key: "slot2", label: "二号位武器" },
  { key: "slot3", label: "三号位武器" },
  { key: "slot4", label: "四号位手雷" },
  { key: "grenade", label: "按住拿雷 / 松手投掷", hint: "按住开始引信计时，久持会自爆" },
  { key: "backpack", label: "使用背包" },
];

const STORAGE_KEY = "bs_binds";

const isCode = (v: unknown): v is string => typeof v === "string" && v.length > 0 && v.length < 40;

export function sanitizeBinds(v: Partial<KeyBinds> | null | undefined): KeyBinds {
  const out: KeyBinds = { ...DEFAULT_BINDS };
  if (!v) return out;
  for (const key of Object.keys(DEFAULT_BINDS) as BindAction[]) {
    if (isCode(v[key])) out[key] = v[key] as string;
  }
  return out;
}

export function loadBinds(): KeyBinds {
  if (typeof window === "undefined") return { ...DEFAULT_BINDS };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_BINDS };
    return sanitizeBinds(JSON.parse(raw));
  } catch {
    return { ...DEFAULT_BINDS };
  }
}

export function saveBinds(b: KeyBinds) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitizeBinds(b)));
  } catch {
    /* ignore */
  }
}

const CODE_LABEL: Record<string, string> = {
  Space: "空格",
  Tab: "Tab",
  ShiftLeft: "左 Shift",
  ShiftRight: "右 Shift",
  ControlLeft: "左 Ctrl",
  ControlRight: "右 Ctrl",
  AltLeft: "左 Alt",
  AltRight: "右 Alt",
  CapsLock: "Caps",
  ArrowUp: "↑",
  ArrowDown: "↓",
  ArrowLeft: "←",
  ArrowRight: "→",
  Enter: "回车",
  Backspace: "退格",
  Escape: "Esc",
  Backquote: "`",
  Minus: "-",
  Equal: "=",
  BracketLeft: "[",
  BracketRight: "]",
  Semicolon: ";",
  Quote: "'",
  Comma: ",",
  Period: ".",
  Slash: "/",
  Backslash: "\\",
};

export function codeLabel(code: string): string {
  if (!code) return "—";
  if (CODE_LABEL[code]) return CODE_LABEL[code];
  if (code.startsWith("Key")) return code.slice(3);
  if (code.startsWith("Digit")) return code.slice(5);
  if (code.startsWith("Numpad")) return "小键盘 " + code.slice(6);
  return code;
}

// 鼠标以外的按键都可以绑定；同时禁止把多个动作绑到同一个键
export function bindConflict(b: KeyBinds, action: BindAction, code: string): BindAction | null {
  for (const k of Object.keys(b) as BindAction[]) {
    if (k !== action && b[k] === code) return k;
  }
  return null;
}
