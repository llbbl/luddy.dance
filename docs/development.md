# Development

## Requirements

- Node.js 22 or newer
- pnpm 11.20.0, managed through Corepack

## Setup

```bash
corepack enable
pnpm install
pnpm dev
```

The development server runs at [localhost:3000](http://localhost:3000).

To configure the runtime locally, copy `.env.example` to `.env.local`. Logging is enabled in development and can be enabled explicitly with `NEXT_PUBLIC_ENABLE_LOGGING=true`.

## Commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm lint` | Check formatting, lint rules, and accessibility rules with Biome |
| `pnpm test` | Run the Vitest suite once |
| `pnpm test:ui` | Open the Vitest UI |
| `pnpm build` | Create a production build |
| `pnpm start` | Serve a production build |
| `pnpm analyze` | Build with bundle analysis enabled |
| `pnpm biome:fix` | Apply safe Biome formatting and lint fixes |

Before opening a pull request, run:

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm test
pnpm build
```

If a build behaves unexpectedly after framework changes, remove only the generated `.next` directory and rebuild.

