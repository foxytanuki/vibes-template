# vibes-template

Project templates monorepo.

## Usage

```bash
# Frontend (Vite 7 + React + Tailwind v4 + shadcn + Biome)
bunx degit foxytanuki/vibes-template/templates/frontend my-app
cd my-app && bun install && bun run dev

# Backend (Hono + PostgreSQL/Bun.SQL/Drizzle + Zod + Biome)
bunx degit foxytanuki/vibes-template/templates/backend my-api
cd my-api && cp .env.example .env && bun install
bun run db:up && bun run db:push && bun run dev
```

## Command Policy

- Primary commands: `bun run ...`
- Optional helper layer: `mise` + `direnv` (`mise.toml` and `.envrc` are included)
- Optional helper usage:
  - `mise install`
  - `mise trust`
  - `direnv allow`
  - `mise run setup`

## Templates

### frontend

- Vite 7
- React 19
- Tailwind CSS v4
- shadcn/ui (config only, add components with `bunx shadcn@latest add button`)
- Typed env (`zod`) via `src/env.ts` and `.env.example`
- Biome 2
- TypeScript 5.9

### backend

- Hono
- PostgreSQL + Bun.SQL + Drizzle ORM/Kit
- `DATABASE_URL` (`.env.example`) for `/messages` and Drizzle commands
- `docker-compose.yml` + `bun run db:up|db:down|db:push`
- Typed env (`zod`) via `src/env.ts`
- Zod + @hono/zod-validator
- Biome 2
- TypeScript 5.9
- Bun runtime
