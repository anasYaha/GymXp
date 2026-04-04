# GymXP

GymXP is a gym-centered B2B2C platform sold to a gym brand owner, not a public consumer fitness app.

For the current MVP demo:

- the demo brand is `Gym City`
- all member logic is brand-aware and branch-aware
- each user has one active branch at a time
- there is no branch switching flow after setup in the main journey

## Phase 1 MVP Flow

This repository now implements the first usable member flow:

1. register
2. login
3. fetch available branches for the authenticated user's brand
4. select a branch
5. land on a branch-aware dashboard summary

## Repo Layout

```text
GymXP/
  apps/
    api/
    mobile/
    admin-web/
  packages/
    shared-types/
    config/
    ui/
  docs/
  scripts/
```

## Backend Setup

1. Install dependencies:

```bash
pnpm install
```

2. Copy the API env file and adjust values if needed:

```bash
cp apps/api/.env.example apps/api/.env
```

3. Run Prisma generate and migration:

```bash
pnpm --filter @gymxp/api prisma:generate
pnpm --filter @gymxp/api prisma:migrate
```

4. Seed demo data:

```bash
pnpm --filter @gymxp/api prisma:seed
```

5. Start the API:

```bash
pnpm dev:api
```

Default API URL: `http://localhost:4000`

## Mobile Setup

1. Set the mobile API base URL:

```bash
EXPO_PUBLIC_API_BASE_URL=http://localhost:4000
```

2. Start the mobile app:
3. C:\Users\anasy\Desktop\GymXp-feature-avatar-3d-foundation\GymXp-feature-avatar-3d-foundation>pnpm dev:api

```bash
pnpm dev:mobile
```

## Demo Credentials

- `ali@example.com` / `demo12345`
- `sara@example.com` / `demo12345`

New registrations are created under the seeded `Gym City` brand and can choose a branch after signup.

## Phase 1 Endpoints

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `GET /branches`
- `GET /branches/:id`
- `POST /users/select-branch`
- `GET /dashboard/summary`

## Notes

- Branch responses are filtered to the authenticated user's brand.
- Branch selection updates `currentBranchId` and issues a fresh token carrying the new branch context.
- Dashboard summary uses the real selected branch and mocked branch-scoped stats for MVP Phase 1.

## Important Docs

- [Architecture](./docs/ARCHITECTURE.md)
- [Modules](./docs/MODULES.md)
- [API Contracts](./docs/API_CONTRACTS.md)
- [Task Split](./docs/TASK_SPLIT.md)
- [Development Workflow](./docs/DEVELOPMENT_WORKFLOW.md)
