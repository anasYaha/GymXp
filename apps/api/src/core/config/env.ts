import "dotenv/config";

export interface AppEnv {
  port: number;
  databaseUrl: string;
  jwtSecret: string;
  demoBrandId: string;
}

export const env: AppEnv = {
  port: Number(process.env.PORT ?? 4000),
  databaseUrl: process.env.DATABASE_URL ?? "postgresql://postgres:postgres@localhost:5432/gymxp",
  jwtSecret: process.env.JWT_SECRET ?? "replace-me",
  demoBrandId: process.env.DEMO_BRAND_ID ?? "brand_gym_city"
};
