# API Contracts

These contracts reflect the implemented Phase 1 MVP flow.

## `POST /auth/register`

```json
{
  "fullName": "Aymen Ben Salah",
  "email": "aymen@gymxp.demo",
  "password": "demo12345"
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
    "currentBranchId": null
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
      "address": "Boulevard du 14 Janvier",
      "createdAt": "2026-03-29T18:00:00.000Z",
      "updatedAt": "2026-03-29T18:00:00.000Z"
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
  "currentBranchId": "branch_sousse",
  "branch": {
    "id": "branch_sousse",
    "name": "Gym City Sousse",
    "city": "Sousse"
  },
  "user": {
    "id": "user_1",
    "fullName": "Aymen Ben Salah",
    "email": "aymen@gymxp.demo",
    "role": "MEMBER",
    "brandId": "brand_gym_city",
    "currentBranchId": "branch_sousse",
    "createdAt": "2026-03-29T18:00:00.000Z",
    "updatedAt": "2026-03-29T18:00:00.000Z"
  },
  "token": "jwt-with-branch-context"
}
```

## `GET /dashboard/summary`

```json
{
  "user": {
    "id": "u_1",
    "fullName": "Ali Ben Salah",
    "email": "ali@example.com"
  },
  "branch": {
    "id": "branch_tunis",
    "name": "Gym City Tunis",
    "city": "Tunis"
  },
  "stats": {
    "xp": 120,
    "streak": 3,
    "rank": 7
  },
  "today": {
    "activeMembers": 14,
    "topMuscleGroup": "Legs"
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
