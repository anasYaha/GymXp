# GymXP Architecture

## Product Model

GymXP is not a public marketplace for discovering random gyms.

The architecture is centered on two truths:
- the customer is the gym brand
- the member experience is anchored to a branch

This creates a B2B2C model:
- B2B: GymXP is sold to a gym owner or gym brand
- B2C: members use the product inside that brand ecosystem

## Core Domain Concepts

### GymBrand
The paying organization. Example: `Gym City Tunisia`.

### GymBranch
A physical branch under a brand. Example: `Gym City Sousse`.

### User
A member or operator inside the brand ecosystem.

### Active Branch
The current branch context a user sees in the mobile product. In the demo MVP this is one branch per user.

### Workout Session
A declared or tracked gym session linked to both a user and a branch.

### XP, Streak, Rank
Gamification signals derived from branch activity, not global public activity.

### Branch Leaderboard
The default leaderboard surface. No public cross-brand leaderboard is planned.

## Architecture Principles

- brand-aware everywhere in backend data ownership
- branch-aware everywhere in the user experience
- member modules and admin modules separated from day one
- simple MVP rules with future-proof schema choices
- shared contracts isolated in a separate package
- module boundaries aligned to product domains, not technical layers alone

## Monorepo Layout

### `apps/api`
Backend modules, route composition, Prisma schema, seed strategy, and admin analytics endpoints.

### `apps/mobile`
Member-facing application for auth, onboarding, dashboard, sessions, leaderboard, and profile flows.

### `apps/admin-web`
Owner or branch admin-facing web interface for overview and analytics.

### `packages/shared-types`
Shared entity types, enums, and API response contracts that reduce drift between backend and frontend.

### `docs`
Human-readable alignment documents to prevent product misunderstanding.

## Member vs Admin Separation

### Member-facing
- authentication
- onboarding
- branch activation context
- dashboard summary
- session declaration
- XP and streak surfaces
- branch leaderboard
- profile and settings

### Admin-facing
- admin authentication and role protection
- branch overview
- engagement analytics
- active member tracking
- training trend analytics
- peak hour analytics

## MVP Simplicity vs Future Scale

Current demo decisions:
- one brand per user
- one active branch per user
- no branch switching inside the main demo flow

Future-ready hooks:
- `currentBranchId` on user
- branch relations on sessions and XP logs
- leaderboard snapshots scoped to brand plus branch
- analytics snapshots stored per branch and date range

## Conflict Reduction Strategy

To reduce git conflicts:
- route definitions live in dedicated files by domain
- each backend module owns its controller, service, repository, DTO, validator, mapper, and types
- mobile screens are separated by feature area
- shared contracts are centralized in `packages/shared-types`
- documentation defines ownership boundaries before implementation begins

