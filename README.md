# vibes-template

Project templates monorepo.

## Usage

```bash
# Frontend (Vite 7 + React + Tailwind v4 + shadcn + Biome)
bunx degit foxytanuki/vibes-template/templates/frontend my-app
cd my-app && bun install && bun run dev

# Backend (Hono + Zod + Biome)
bunx degit foxytanuki/vibes-template/templates/backend my-api
cd my-api && bun install && bun run dev
```

## Templates

### frontend

- Vite 7
- React 19
- Tailwind CSS v4
- shadcn/ui (config only, add components with `bunx shadcn@latest add button`)
- Biome 2
- TypeScript 5.9

### backend

- Hono
- Zod + @hono/zod-validator
- Biome 2
- TypeScript 5.9
- Bun runtime
