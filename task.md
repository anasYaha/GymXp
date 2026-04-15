# Implementation Tasks

- [x] Phase 1: Database and Backend Setup
  - [x] Add fields `level`, `totalXp`, `totalSessions`, `age`, `avatarUrl` to `User` in `apps/api/prisma/schema.prisma`
  - [x] Write migration and regenerate Prisma Client (`npx prisma migrate dev --name add_user_profile_fields`)
  - [x] Update `apps/api/src/modules/auth/mapper/auth.mapper.ts`
  - [x] Update `apps/api/src/modules/dashboard/service/dashboard.service.ts` to include Same Day Users
  - [x] Update `apps/api/src/modules/dashboard/controller/dashboard.controller.ts`

- [x] Phase 2: Session Workout Completion Flow
  - [x] Add `POST /sessions/workout/complete` to `sessions.controller.ts` and `sessions.service.ts`
  - [x] Safeguard against multiple completions in same day
  - [x] Define routes for it in `apps/api/src/routes/index.ts`
  - [x] Update shared types for Session Completion & Auth Users

- [x] Phase 3: Mobile UI Updates
  - [x] Create `ProfileScreen.tsx` with dynamic user fetching matching prototype design.
  - [x] Update `DashboardScreen.tsx` to include "Same Day Users" card and "Complete Workout" button.
  - [x] Setup `auth.service.ts` to include profile rank/age/avatar fields.
  - [x] Wire up navigation for the new Profile page.

- [x] Final Review & Verification
  - [x] Fix Dashboard lint errors (success color/sameDayUsers type).
  - [x] Fix Navigation lint errors (ProfileScreen import).
  - [x] Created Walkthrough artifact summarizing all changes.
