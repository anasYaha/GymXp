# GymXP

GymXP is a gym-centered B2B2C platform sold to a gym brand owner, not a public consumer fitness app.

<<<<<<< HEAD
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
=======
The business model is brand-based:
- a paying client is a gym brand such as Gym City Tunisia
- a brand can operate multiple branches
- members live inside one brand ecosystem

The user experience is branch-based:
- members primarily act inside one active branch
- dashboard, sessions, XP, streaks, leaderboard, and activity are scoped to branch context
- the demo MVP keeps one active branch per user, while the architecture stays ready for future multi-branch support

## Why This Repo Is Structured This Way

This scaffold is designed so two developers can work in parallel with minimal merge conflicts:
- apps/mobile focuses on the member experience
- apps/admin-web focuses on the owner or branch admin experience
- apps/api owns backend, data, and business logic
- packages/shared-types centralizes contracts that both frontend and backend must agree on early
- docs keeps product and architecture alignment explicit

## Repository Structure

text
>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402
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
<<<<<<< HEAD
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
=======

## MVP Scope

The demo intentionally stays simple:
- one user belongs to one brand
- one user has one active branch
- no branch switching in the main demo flow after setup
- branch awareness is still represented in models, DTOs, and screen structure

## Planned Domains

Member side:
- auth
- onboarding
- active branch context
- dashboard
- workout declaration and sessions
- XP, streaks, rank, branch leaderboard
- notifications
- profile and settings

Admin side:
- admin auth
- branch overview dashboard
- engagement analytics
- active members tracking
- training and peak hour analytics

Platform side:
- gym brand management
- gym branch management
- roles and permissions
- shared contracts
- seed data
- environment and deployment preparation

## Run Strategy

This repository is scaffold-first. It gives the team a stable file and module layout before full implementation.

Suggested next steps:
1. install workspace dependencies with pnpm install
2. implement shared contracts first
3. connect backend modules to Prisma
4. build mobile member flows against agreed contracts
5. add admin analytics views once backend snapshots are available
>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402

## Important Docs

- [Architecture](./docs/ARCHITECTURE.md)
- [Modules](./docs/MODULES.md)
- [API Contracts](./docs/API_CONTRACTS.md)
- [Task Split](./docs/TASK_SPLIT.md)
- [Development Workflow](./docs/DEVELOPMENT_WORKFLOW.md)
<<<<<<< HEAD
=======

#
>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402
