<<<<<<< HEAD
import "dotenv/config";

export interface AppEnv {
  host: string;
=======
export interface AppEnv {
>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402
  port: number;
  databaseUrl: string;
  jwtSecret: string;
  demoBrandId: string;
}

export const env: AppEnv = {
<<<<<<< HEAD
  host: process.env.HOST ?? "0.0.0.0",
  port: Number(process.env.PORT ?? 4000),
  databaseUrl: process.env.DATABASE_URL ?? "postgresql://postgres:postgres@localhost:5432/gymxp",
  jwtSecret: process.env.JWT_SECRET ?? "replace-me",
  demoBrandId: process.env.DEMO_BRAND_ID ?? "brand_gym_city"
};
=======
  port: Number(process.env.PORT ?? 4000),
  databaseUrl: process.env.DATABASE_URL ?? "",
  jwtSecret: process.env.JWT_SECRET ?? "replace-me",
  demoBrandId: process.env.DEMO_BRAND_ID ?? "brand_gym_city"
};

>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402
