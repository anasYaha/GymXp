# GymXP Level Progress Update

This document explains:

1. what was changed,
2. why it was changed,
3. what you need to run locally,
4. how to update the app on your phone,
5. how to test the new behavior.

## What Was Implemented

The app now uses backend-persisted progress for leveling, streaks, and dashboard/profile stats.

### 1. Level progression is now relative to the current level

The old logic used lifetime XP to calculate level:

`level = Math.floor(totalXp / 100) + 1`

That was incorrect for your rules because it did not track progress toward the next level only.

The new logic now works like this:

- Level 1 -> 2 needs:
  - `1 completed valid day`
  - `100 XP`
- Level 2 -> 3 needs:
  - `2 completed valid days`
  - `200 XP`
- Level 3 -> 4 needs:
  - `3 completed valid days`
  - `300 XP`

Progress is now stored per level using persisted backend fields:

- `levelXpProgress`
- `levelDaysProgress`

After a level-up:

- the requirement for the old level is consumed,
- remaining extra XP carries into the next level,
- remaining extra valid days also carry into the next level.

### 2. Same-day completion protection is enforced on the backend

The old backend only checked whether the same workout/muscle group was completed today.

That was not enough, because the user could still trigger duplicate rewards in the same calendar day.

The new backend now blocks duplicate same-day completion by:

- checking for an existing completion for the user on that day,
- storing a normalized `completionDay`,
- enforcing a unique database constraint on:

`WorkoutSession(userId, completionDay)`

So pressing `FINISH SESSION` twice on the same day will not:

- grant XP twice,
- increment streak twice,
- increment completed-day progress twice,
- increment sessions twice.

### 3. Streak bonus logic was corrected

Base reward for a valid completion day:

- `100 XP`

Streak bonuses:

- when streak reaches `5` on that day: `+150 XP`
- when streak reaches `10` on that day: `+200 XP`

This is milestone-based, so the bonus is only awarded when the streak first reaches that milestone.

Examples:

- Day 4 -> 5 streak awards `250 XP total`
- Day 9 -> 10 streak awards `300 XP total`
- Day 6 does not repeat the day-5 bonus
- Day 11 does not repeat the day-10 bonus

### 4. Dashboard and profile now use real backend data

Mock dashboard values were removed from the main flow.

The dashboard and profile now read from the Express/Prisma backend so the app reflects persisted values for:

- total XP,
- level,
- current streak,
- total sessions,
- level-relative XP progress,
- level-relative completed-day progress.

### 5. Mobile app auth/data flow was aligned with the API

The mobile app now uses the Express API token flow for:

- login,
- register,
- auth restore,
- dashboard fetch,
- session list,
- workout completion,
- profile fetch.

This ensures the phone app is using the same backend rules that now control progression and streaks.

## Files Added or Updated

### Backend

- `apps/api/prisma/schema.prisma`
- `apps/api/prisma/migrations/20260411_level_progress_and_daily_completion_guard/migration.sql`
- `apps/api/src/modules/auth/mapper/auth.mapper.ts`
- `apps/api/src/modules/auth/repository/auth.repository.ts`
- `apps/api/src/modules/dashboard/repository/dashboard.repository.ts`
- `apps/api/src/modules/dashboard/service/dashboard.service.ts`
- `apps/api/src/modules/sessions/repository/sessions.repository.ts`
- `apps/api/src/modules/sessions/service/progression.ts`
- `apps/api/src/modules/sessions/service/sessions.service.ts`
- `apps/api/src/modules/users/controller/users.controller.ts`
- `apps/api/src/modules/users/mapper/users.mapper.ts`
- `apps/api/src/modules/users/repository/users.repository.ts`
- `apps/api/src/modules/users/service/users.service.ts`
- `apps/api/src/routes/index.ts`

### Mobile

- `apps/mobile/src/app/index.tsx`
- `apps/mobile/src/constants/demo.ts`
- `apps/mobile/src/features/auth/auth.service.ts`
- `apps/mobile/src/features/dashboard/dashboard.service.ts`
- `apps/mobile/src/features/profile/profile.service.ts`
- `apps/mobile/src/features/session/session.service.ts`
- `apps/mobile/src/screens/dashboard/dashboard-screen.tsx`
- `apps/mobile/src/screens/profile/profile-screen.tsx`
- `apps/mobile/src/services/api/api-client.ts`

### Shared contracts

- `packages/shared-types/src/contracts/dashboard.ts`
- `packages/shared-types/src/contracts/sessions.ts`
- `packages/shared-types/src/entities/brand.ts`

## Database Changes

The following schema fields were added.

### `User`

- `currentStreak Int @default(0)`
- `levelXpProgress Int @default(0)`
- `levelDaysProgress Int @default(0)`

### `WorkoutSession`

- `completionDay DateTime?`
- unique constraint on `userId + completionDay`

## What You Need To Do Now

Follow these steps in order.

## Step 1: Update the database

From the repo root:

```powershell
pnpm --filter @gymxp/api prisma:migrate
pnpm --filter @gymxp/api prisma:generate
```

If you want to inspect the migration first, open:

- `apps/api/prisma/migrations/20260411_level_progress_and_daily_completion_guard/migration.sql`

## Step 2: Check API environment variables

Make sure `apps/api/.env` has a valid database connection and JWT secret.

At minimum, confirm:

```env
DATABASE_URL=...
JWT_SECRET=...
DEMO_BRAND_ID=...
PORT=4000
```

Important:

- the mobile app now depends on the Express API for auth and dashboard data,
- so the API must be running and reachable from your phone.

## Step 3: Start the API

From the repo root:

```powershell
pnpm --filter @gymxp/api dev
```

The API should start on the port defined in `apps/api/.env`.

Default expected local URL:

`http://localhost:4000`

## Step 4: Point the phone app to your computer

Your phone cannot use `localhost` to reach your computer.

You must change the mobile API base URL to your computer's LAN IP.

Open:

- `apps/mobile/.env`

Set:

```env
EXPO_PUBLIC_API_BASE_URL=http://YOUR_COMPUTER_LAN_IP:4000
```

Example:

```env
EXPO_PUBLIC_API_BASE_URL=http://192.168.1.8:4000
```

How to find your LAN IP on Windows:

```powershell
ipconfig
```

Look for your Wi-Fi or Ethernet IPv4 address.

Important:

- your phone and computer must be on the same Wi-Fi network,
- Windows firewall must allow the API port if needed,
- the API must be running before opening the app on the phone.

## Step 5: Start the mobile app

From the repo root:

```powershell
pnpm --filter @gymxp/mobile dev
```

If you build directly to Android:

```powershell
pnpm --filter @gymxp/mobile android
```

If you already have the app on your phone and want a fresh rebuild:

```powershell
pnpm --filter @gymxp/mobile android
```

If Android install fails because of an old app signature/version mismatch, uninstall the existing app from the phone and install again.

## Step 6: Reload the app on your phone

Depending on how you run it:

### If using Expo dev client / Metro

- restart Metro after changing `.env`
- reopen the app on the phone
- if it still shows old behavior, clear the app and reload manually

### If using a native Android build

- rebuild the Android app
- reinstall it on the device

## Recommended Full Update Flow For Phone

Use this exact order:

1. Run database migration
2. Generate Prisma client
3. Start API server
4. Set `EXPO_PUBLIC_API_BASE_URL` in `apps/mobile/.env` to your computer's LAN IP
5. Start the mobile app
6. Rebuild/reopen the app on the phone
7. Log in again
8. Test workout completion and dashboard progress

## Commands Summary

From repo root:

```powershell
pnpm --filter @gymxp/api prisma:migrate
pnpm --filter @gymxp/api prisma:generate
pnpm --filter @gymxp/api dev
pnpm --filter @gymxp/mobile dev
```

Or for Android build:

```powershell
pnpm --filter @gymxp/mobile android
```

## Verification Already Done

These checks were completed in the workspace:

- `pnpm --filter @gymxp/api prisma:generate`
- `pnpm --filter @gymxp/api typecheck`
- `pnpm --filter @gymxp/mobile typecheck`

The progression logic was also verified for:

- new Level 1 user completes first valid day -> becomes Level 2
- Level 2 user completes 1 day -> stays Level 2 with partial progress
- Level 2 user completes 2 valid days for that level -> becomes Level 3
- 5-day streak bonus -> `250 XP total`
- 10-day streak bonus -> `300 XP total`

## Manual Testing Checklist On Phone

Use this after updating the app.

### Scenario 1: New Level 1 user

Expected:

- start at Level 1
- complete first valid day
- receive `100 XP`
- become Level 2
- next-level progress resets to Level 2 requirements

### Scenario 2: Level 2 partial progress

Expected:

- Level 2 user completes one valid day
- remains Level 2
- progress shows:
  - `1/2 valid days`
  - `100/200 XP`

### Scenario 3: Level 2 level-up

Expected:

- after second valid day at Level 2
- user becomes Level 3
- Level 2 progress is consumed correctly

### Scenario 4: Same-day double click

Expected:

- tap `FINISH SESSION` once
- tap again same day
- second request must be blocked
- no duplicate XP
- no duplicate streak increment
- no duplicate session/day increment

### Scenario 5: 5-day streak bonus

Expected:

- on the day the streak becomes 5
- total reward is `250 XP`

### Scenario 6: 10-day streak bonus

Expected:

- on the day the streak becomes 10
- total reward is `300 XP`

## Troubleshooting

### Problem: Phone app cannot reach backend

Check:

- `EXPO_PUBLIC_API_BASE_URL` uses your computer LAN IP, not `localhost`
- phone and computer are on same Wi-Fi
- API server is running
- firewall is not blocking port `4000`

### Problem: App still shows old data

Try:

1. stop Metro
2. restart Metro
3. reopen the app
4. log out and log back in
5. if needed, uninstall and reinstall the app

### Problem: Migration fails

Check:

- `DATABASE_URL` is correct
- database is running
- Prisma can connect from `apps/api/.env`

### Problem: Login works but dashboard fails

Check:

- API server is running
- `JWT_SECRET` is set
- `EXPO_PUBLIC_API_BASE_URL` is correct
- the selected branch exists for that user

## Important Notes

- This update changes mobile auth/data flow to use the Express API instead of the previous Supabase-based runtime path.
- Because of that, the backend must be available for the phone app to work correctly.
- If you are testing on a real phone, using your LAN IP is required.

## Suggested Next Step

After you update the app on your phone, test one full completion flow end-to-end:

1. log in,
2. open dashboard,
3. tap `FINISH SESSION`,
4. confirm dashboard XP/progress updates,
5. try tapping again the same day,
6. confirm second completion is rejected.

