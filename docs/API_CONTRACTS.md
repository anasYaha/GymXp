# API Contracts

These are placeholder contracts to keep frontend and backend aligned during scaffold-first development.

## `POST /auth/register`

```json
{
  "fullName": "Aymen Ben Salah",
  "email": "aymen@gymxp.demo",
  "password": "demo-password",
  "brandId": "brand_gym_city",
  "branchId": "branch_sousse"
}
```

Response:

```json
{
  "token": "jwt-placeholder",
  "user": {
    "id": "user_1",
    "fullName": "Aymen Ben Salah",
    "email": "aymen@gymxp.demo",
    "role": "MEMBER",
    "brandId": "brand_gym_city",
    "currentBranchId": "branch_sousse"
  }
}
```

## `POST /auth/login`

```json
{
  "email": "aymen@gymxp.demo",
  "password": "demo-password"
}
```

Response matches `register`.

## `GET /auth/me`

```json
{
  "user": {
    "id": "user_1",
    "fullName": "Aymen Ben Salah",
    "email": "aymen@gymxp.demo",
    "role": "MEMBER",
    "brandId": "brand_gym_city",
    "currentBranchId": "branch_sousse"
  }
}
```

## `GET /branches`

```json
{
  "items": [
    {
      "id": "branch_sousse",
      "brandId": "brand_gym_city",
      "name": "Gym City Sousse",
      "city": "Sousse",
      "address": "Demo address"
    }
  ]
}
```

## `POST /users/select-branch`

```json
{
  "branchId": "branch_sousse"
}
```

Response:

```json
{
  "currentBranchId": "branch_sousse"
}
```

## `GET /dashboard/summary`

```json
{
  "member": {
    "firstName": "Aymen"
  },
  "activeBranch": {
    "id": "branch_sousse",
    "name": "Gym City Sousse",
    "city": "Sousse"
  },
  "xp": 420,
  "streakDays": 6,
  "rank": 4,
  "todayInThisGym": {
    "activeMembers": 27,
    "peakWindow": "18:00-20:00"
  }
}
```

## `POST /sessions`

```json
{
  "branchId": "branch_sousse",
  "muscleGroup": "CHEST",
  "startedAt": "2026-03-29T09:00:00.000Z"
}
```

## `GET /sessions/me`

```json
{
  "items": [
    {
      "id": "session_1",
      "branchId": "branch_sousse",
      "muscleGroup": "CHEST",
      "status": "COMPLETED",
      "startedAt": "2026-03-29T09:00:00.000Z",
      "endedAt": "2026-03-29T10:15:00.000Z"
    }
  ]
}
```

## `PATCH /sessions/:id/complete`

```json
{
  "endedAt": "2026-03-29T10:15:00.000Z"
}
```

## `GET /leaderboard`

```json
{
  "branch": {
    "id": "branch_sousse",
    "name": "Gym City Sousse"
  },
  "items": [
    {
      "rank": 1,
      "userId": "user_2",
      "displayName": "Member One",
      "xp": 900
    }
  ]
}
```

## `GET /leaderboard/me`

```json
{
  "rank": 4,
  "xp": 420,
  "branchId": "branch_sousse"
}
```

## `GET /admin/branches/:branchId/overview`

```json
{
  "branchId": "branch_sousse",
  "activeMembersToday": 74,
  "sessionsToday": 51,
  "avgSessionMinutes": 68
}
```

## `GET /admin/branches/:branchId/engagement`

```json
{
  "branchId": "branch_sousse",
  "weeklyRetention": 0.64,
  "activeStreakCount": 18
}
```

## `GET /admin/branches/:branchId/analytics`

```json
{
  "branchId": "branch_sousse",
  "peakHours": [
    {
      "hour": 18,
      "checkins": 22
    }
  ],
  "muscleGroupTrends": [
    {
      "muscleGroup": "CHEST",
      "sessions": 12
    }
  ]
}
```

