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
- **Bots**: AI opponents with basic navigation and combat
- **Minimap**: Real-time overhead view
- **Audio**: Positional 3D audio

## Deployment

The app can be deployed to any platform supporting Next.js (Vercel, Railway, etc.) with a PostgreSQL database.

## License

MIT