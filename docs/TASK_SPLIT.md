# Task Split

## Developer A

Primary focus: member mobile app

Ownership:
- `apps/mobile`
- mobile auth screens
- onboarding and branch selection screen
- member dashboard shell
- session screens
- branch leaderboard screens
- profile and settings screens
- frontend state management and API integration

Suggested branches:
- `feature/mobile-auth`
- `feature/mobile-onboarding`
- `feature/mobile-dashboard`
- `feature/mobile-session`
- `feature/mobile-leaderboard`
- `feature/mobile-profile`

## Developer B

Primary focus: backend, data, and admin

Ownership:
- `apps/api`
- `apps/admin-web`
- Prisma schema and seed data
- auth backend
- branches endpoints
- dashboard summary endpoint
- session logic
- XP, streak, and leaderboard backend modules
- admin analytics backend and web scaffold

Suggested branches:
- `feature/backend-auth`
- `feature/backend-branches`
- `feature/backend-dashboard`
- `feature/backend-session`
- `feature/backend-gamification`
- `feature/backend-analytics`
- `feature/admin-analytics`

## Shared Integration Zones

These files and contracts should be agreed early:
- auth response shape
- branch object shape
- dashboard summary payload
- session create and complete payloads
- leaderboard payload

Shared touchpoints:
- `packages/shared-types/src/contracts`
- `packages/shared-types/src/entities`
- `docs/API_CONTRACTS.md`

## Merge Order Recommendation

1. agree shared contracts
2. merge backend contract-supporting changes into `develop`
3. merge mobile integration changes into `develop`
4. run integration pass on auth, dashboard, sessions, and leaderboard
5. stabilize demo path before `main`

## Low-Conflict Rule of Thumb

- if a change only affects one module, keep it inside that module
- if a payload changes, update the shared contract first
- avoid editing route aggregators and shared barrels at the same time from two branches

