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

Select the grenade slot with `4`, then **hold `G` to pull the pin and hold the grenade**. Holding starts the fuse and plays a ready-to-throw animation; releasing `G` throws it. If the fuse runs out in your hand, the grenade explodes on you (`2` grenades per spawn, refilled by respawn/supply pack). Grenade gravity and drag were reduced so a normal throw now travels roughly **3×** farther than before.

| Grenade | Effect |
| --- | --- |
| HE (`高爆手雷`) | **24m-diameter** spherical blast. Full **70 damage** within the inner 6m, then linearly tapers to 0 at the 12m edge. |
| Smoke (`烟雾弹`) | **32m-diameter**, dense multi-shell smoke cloud lasting **10s**. Opaque from both inside and outside. No damage. |
| Incendiary (`燃烧弹`) | **12m-diameter** burning ground for 7s, with no raised rim/border. Standing on it applies/refreshes a **4s burning state** dealing **10 damage/s**. |
| Flashbang (`闪光弹`) | **60m-diameter** effective radius; characters whose view contains the flashbang are blinded for **3s** (white screen, UI remains visible). Layered realistic bang sound. No damage. |

## Backpack Slot

The backpack is selected in the loadout menu and used with **`E`**.

| Backpack | Effect |
| --- | --- |
| Supply Pack (`补给背包`) | 4 charges. Restores every weapon's reserve ammo to its initial value, grenades to full, and adds 2 healing charges. |
| Jet Pack (`喷射背包`) | Launches the user ~5m up and hovers for 4s. Cooldown **15s, starting after landing**. |
| Teleport Pack (`传送背包`) | Teleports up to **20m** in the look direction through obstacles. The landing point is validated with a 20-sample search so you cannot get stuck in geometry. 15s cooldown. |

RPG-7 and the M2 heavy machine gun **occupy the backpack slot**: while equipped, the backpack shows their ammo (rocket rack / ammo belt) instead of an ability, and the matching functional backpack is disabled. Each backpack also has its own distinct 3D model on the character. The old light/heavy weapon distinction has been removed.

## Weapon Balance Changes

- **M2 HMG**: fire rate 480 → 960 RPM, magazine 100 → **150**, reserve **300** (2 belts). Reload takes **8s** and the player cannot move while reloading. Movement speed is **85%** while held.
- **RPG-7**: movement speed **85%** while held; backpack ammo visual.
- **LMGs (M249 / RPK / PKM)**: much smaller magazines and reserves (75/150, 60/120, 80/160), and movement speed is **95%** while held. Damage is 35 / 38 / 42 so every LMG still hits harder than any standard rifle; the nerf lands on sustained ammo, not per-bullet punch.
- **Shotguns (M870 / SPAS-12 / AA-12)**: per-pellet damage reduced by 1 (11 / 10 / 7).

## Maps

- **庄园街区 (`ffa-manor`)** and **沙丘庄园 (`ffa-villa`)**: the old buggy central tower was removed. The centre is now a **3-storey high-rise** with **6 windows per floor** and a normal straight staircase to the roof. Each of its four corners has a round tower with an interior **spiral staircase**, outward-facing windows, a **conical spire**, and an open-air **ring deck/steps** below the spire that players can stand on and shoot down from.

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