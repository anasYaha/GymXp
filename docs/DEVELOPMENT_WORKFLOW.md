# Development Workflow

## Branch Model

- `main`: stable, demo-ready branch
- `develop`: integration branch for combined feature work
- `feature/*`: isolated feature branches

Suggested branch names:
- `feature/mobile-auth`
- `feature/mobile-dashboard`
- `feature/mobile-sessions`
- `feature/backend-auth`
- `feature/backend-branches`
- `feature/backend-dashboard`
- `feature/backend-sessions`
- `feature/backend-analytics`
- `feature/admin-analytics`

## Merge Strategy

1. Define or update shared contract docs first when a payload shape changes.
2. Build feature work in isolated feature branches.
3. Merge feature branches into `develop`.
4. Test integration on `develop`.
5. Merge from `develop` to `main` only when the demo path is stable.

## Conflict Avoidance Rules

- avoid editing shared contract files casually
- prefer module-local files over giant shared files
- keep route registration split by domain
- do not place many feature exports into one heavily edited file unless necessary
- document payload changes in `docs/API_CONTRACTS.md`

## Recommended Team Habits

- commit small, vertical slices
- open PRs early, even for scaffold work
- call out contract changes explicitly
- use TODOs with module context, not vague placeholders
- keep demo assumptions branch-aware at all times

## Implementation Order

1. shared contracts
2. Prisma schema and seed data
3. auth backend
4. branch and dashboard backend
5. mobile auth and onboarding
6. mobile dashboard
7. sessions and gamification
8. leaderboard
9. admin overview and analytics

