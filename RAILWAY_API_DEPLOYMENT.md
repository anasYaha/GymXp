# Railway API Deployment

This repo is a `pnpm` monorepo. Railway should deploy only `apps/api`.

## Build command

```bash
pnpm --filter @gymxp/api build
```

## Start command

```bash
pnpm --filter @gymxp/api start
```

## Optional pre-deploy migration command

```bash
pnpm --filter @gymxp/api prisma:deploy
```

## Required environment variables

Set these in the Railway service variables tab:

```env
DATABASE_URL=
JWT_SECRET=
DEMO_BRAND_ID=brand_gym_city
```

Optional:

```env
HOST=0.0.0.0
PORT=4000
NODE_ENV=production
```

Notes:

- Railway will provide `PORT` automatically.
- The API listens on `0.0.0.0` and uses `process.env.PORT`.
- The mobile app should use the generated Railway public domain for `EXPO_PUBLIC_API_BASE_URL`.
