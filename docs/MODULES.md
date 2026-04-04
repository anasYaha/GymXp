# GymXP Modules

## Backend Modules

### `auth`
Member and admin login, register, session identity, and auth response shaping.

### `users`
User profile, role metadata, active branch assignment, and future branch association logic.

### `brands`
Gym brand records, owner-level settings, and future brand management flows.

### `branches`
Branch discovery within a brand, branch details, and active branch selection endpoints.

### `dashboard`
Member dashboard summary for greeting, active branch info, XP, streak, rank, and today-in-this-gym data.

### `sessions`
Workout session declaration, completion, history, and branch-linked session state.

### `gamification`
XP logs, streak snapshots, rules, and reward-related calculations.

### `leaderboard`
Branch leaderboard views, member rank lookup, and future snapshot generation.

### `analytics`
Branch analytics snapshots, peak hour trends, muscle-group trends, and engagement metrics.

### `admin`
Admin-facing access control and branch overview orchestration endpoints.

## Mobile Modules

### `auth`
Login, register, and member session bootstrap.

### `branch`
Onboarding branch context, active branch rendering, and future branch switching support.

### `dashboard`
Dashboard summary queries, card composition, and branch-aware home screen.

### `session`
Workout declaration and session history UI.

### `gamification`
XP, streak, and rank presentation.

### `leaderboard`
Branch leaderboard list and current-member placement.

### `profile`
Member profile and settings integration.

## Admin Web Modules

### `auth`
Admin login and protected route bootstrap.

### `branches`
Branch selection and branch overview context.

### `analytics`
Charts, engagement views, and member activity summaries.

## Shared Packages

### `shared-types`
Cross-app entities, enums, and response payload contracts.

### `config`
Shared config presets, environment key documentation, and future lint or tsconfig reuse.

### `ui`
Optional shared UI primitives if both apps benefit later.

