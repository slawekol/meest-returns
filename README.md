# meest-returns

Returns logistics platform connecting consumers, PUDO points, e-commerce merchants,
and the Dębica hub.

## Apps

| App | Path | Stack | Audience |
| --- | --- | --- | --- |
| Consumer | `apps/consumer` | Next.js 15, mobile-first | End users initiating returns |
| PUDO | `apps/pudo` | Next.js 15, tablet-first | PUDO point operators |
| Merchant | `apps/merchant` | Next.js 15, desktop dashboard | E-commerce merchants |
| Hub | `apps/hub` | Next.js 15 (skeleton) | Dębica hub staff |
| API | `apps/api` | Fastify 5 + Prisma | Shared REST backend |

## Packages

| Package | Purpose |
| --- | --- |
| `@meest/db` | Prisma schema and generated client |
| `@meest/ui` | Shared shadcn/ui components |
| `@meest/types` | Shared TypeScript types |
| `@meest/config` | Shared eslint, tsconfig, tailwind base presets |

## Requirements

- Node.js 22+
- pnpm 11+

## Getting started

```bash
pnpm install
cp .env.example .env
pnpm dev          # runs all apps via turbo
```

Run a single app:

```bash
pnpm --filter @meest/consumer dev
pnpm --filter @meest/pudo dev
pnpm --filter @meest/merchant dev
pnpm --filter @meest/hub dev
pnpm --filter @meest/api dev
```

## Default ports

| App | Port |
| --- | --- |
| API (Fastify) | 3000 |
| Consumer | 3001 |
| PUDO | 3002 |
| Merchant | 3003 |
| Hub | 3004 |
