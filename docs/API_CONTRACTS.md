# API Contracts

These contracts reflect the implemented Phase 1 MVP flow while also documenting the scaffold-first data shapes used across the repo.

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
  "gym": {
    "id": "branch_tunis",
    "name": "Gym City Tunis",
    "city": "Tunis"
  },
  "stats": {
    "xp": 120,
    "streak": 3,
    "checkIns": 7
  },
  "today": {
    "activeMembers": 14,
    "featuredSessionTitle": "Legs",
    "checkInsToday": 9,
    "availableSessions": 4
  },
  "sessions": {
    "totalCheckIns": 7,
    "checkedInToday": true,
    "lastCheckInTitle": "Leg Day Burn",
    "lastCheckInAt": "2026-03-29T09:00:00.000Z"
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
