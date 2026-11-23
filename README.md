# Multiplayer Voxel FPS

A multiplayer voxel-based first-person shooter built with Next.js, Three.js, and PostgreSQL.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **3D Engine**: Three.js (r187)
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Linting**: ESLint 9 with Next.js config

## Project Structure

```
src/
├── app/                    # Next.js App Router pages & API routes
│   ├── api/
│   │   ├── health/         # Health check endpoint
│   │   ├── net/            # Networking endpoints (rooms, send, stream)
│   │   └── stats/          # Game statistics
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main game page
├── components/             # React components
│   ├── GameView.tsx        # Three.js game canvas
│   └── LoadoutPicker.tsx   # Weapon/loadout selection
├── db/                     # Database layer
│   ├── index.ts            # Database connection
│   └── schema.ts           # Drizzle schema
├── game/                   # Game logic (client & shared)
│   ├── audio.ts            # Audio system
│   ├── bots.ts             # AI bots
│   ├── engine.ts           # Game engine loop
│   ├── equipment.ts        # Grenades & backpack definitions
│   ├── fx.ts               # Visual effects
│   ├── keybinds.ts         # Input handling
│   ├── maps.ts             # Map definitions
│   ├── minimap.ts          # Minimap rendering
│   ├── net.ts              # Network protocol
│   ├── render.ts           # Three.js rendering
│   ├── types.ts            # Type definitions
│   ├── weapons.ts          # Weapon definitions
│   └── world.ts            # Voxel world management
└── lib/
    └── rooms.ts            # Room management utilities
```

## Getting Started

### Prerequisites

- Node.js 22+
- PostgreSQL database
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database URL

# Run database migrations
pnpm drizzle-kit migrate

# Start development server
pnpm dev
```

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm typecheck` - Run TypeScript type checking

## Game Features

- **Voxel World**: Procedurally generated destructible terrain
- **Multiplayer**: Real-time networking via WebSockets/Server-Sent Events
- **Weapons**: Multiple weapon types with different characteristics
- **Grenades & Backpacks**: A dedicated 4th slot for grenades and a backpack slot for utility packs
- **Bots**: AI opponents with basic navigation and combat
- **Minimap**: Real-time overhead view
- **Audio**: Positional 3D audio

## Grenades (Slot 4)

Select the grenade slot with `4`, then **hold `G` to pull the pin and hold the grenade**. Holding starts the fuse and plays a ready-to-throw animation; releasing `G` throws it. If the fuse runs out in your hand, the grenade explodes on you (`2` grenades per spawn, refilled by respawn/supply pack).

| Grenade | Effect |
| --- | --- |
| HE (`高爆手雷`) | Spherical blast (radius 6m) dealing a flat **70 damage** inside the sphere. |
| Smoke (`烟雾弹`) | 8m-diameter smoke sphere lasting **10s**; characters inside see only **0.5m**. No damage. |
| Incendiary (`燃烧弹`) | 4m-diameter burning ground for 7s. Standing on it applies/refreshes a **4s burning state** dealing **10 damage/s**. |
| Flashbang (`闪光弹`) | 10m-diameter radius; characters whose view contains the flashbang are blinded for **3s** (white screen, UI remains visible). No damage. |

## Backpack Slot

The backpack is selected in the loadout menu and used with **`E`**.

| Backpack | Effect |
| --- | --- |
| Supply Pack (`补给背包`) | 4 charges. Restores every weapon's reserve ammo to its initial value, grenades to full, and adds 2 healing charges. |
| Jet Pack (`喷射背包`) | Launches the user ~5m up and hovers for 4s. Cooldown **15s, starting after landing**. |
| Teleport Pack (`传送背包`) | Teleports ~4m in the look direction through obstacles. The landing point is validated/searched so you cannot get stuck in geometry. 15s cooldown. |

RPG-7 and the M2 heavy machine gun **occupy the backpack slot**: while equipped, the backpack shows their ammo (rocket rack / ammo belt) instead of an ability, and the matching functional backpack is disabled. Their movement-speed penalty and the old light/heavy weapon distinction have been removed.

## Weapon Balance Changes

- **M2 HMG**: fire rate 480 → 960 RPM, magazine 100 → **150**, reserve **300** (2 belts), movement penalty removed.
- **RPG-7**: movement penalty removed, backpack ammo visual.
- **LMGs (M249 / RPK / PKM)**: much smaller magazines and reserves (75/150, 60/120, 80/160). Damage is 35 / 38 / 42 so every LMG still hits harder than any standard rifle; the nerf lands on sustained ammo, not per-bullet punch.
- **Shotguns (M870 / SPAS-12 / AA-12)**: per-pellet damage reduced by 1 (11 / 10 / 7).

## Default Controls

| Key | Action |
| --- | --- |
| `W A S D` | Move |
| `Space` | Jump |
| `Shift` | Sprint |
| `C` / `Z` | Crouch / Prone |
| Left / Right mouse | Fire / Aim |
| `R` | Reload |
| `1` / `2` / `3` / `4` | Primary / Secondary / Heavy / Grenade |
| `G` (hold) | Hold grenade, release to throw |
| `E` | Use backpack |
| `Q` | Use healing item |
| `Tab` | Scoreboard |

All keys can be rebound in the settings panel.

## Deployment

The app can be deployed to any platform supporting Next.js (Vercel, Railway, etc.) with a PostgreSQL database.

## License

MIT