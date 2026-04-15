import "dotenv/config";

const isProduction = process.env.NODE_ENV === "production";

const getStringEnv = (key: string, fallback?: string) => {
  const value = process.env[key]?.trim();

  if (value) {
    return value;
  }

  if (fallback !== undefined && !isProduction) {
    return fallback;
  }

  throw new Error(`Missing required environment variable: ${key}`);
};

const getNumberEnv = (key: string, fallback: number) => {
  const value = process.env[key]?.trim();

  if (!value) {
    return fallback;
  }

  const parsed = Number(value);

  if (Number.isNaN(parsed)) {
    throw new Error(`Environment variable ${key} must be a valid number.`);
  }

  return parsed;
};

export interface AppEnv {
  host: string;
  port: number;
  databaseUrl: string;
  jwtSecret: string;
  demoBrandId: string;
}

export const env: AppEnv = {
  host: process.env.HOST ?? "0.0.0.0",
  port: getNumberEnv("PORT", 4000),
  databaseUrl: getStringEnv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/gymxp"),
  jwtSecret: getStringEnv("JWT_SECRET", "change-me"),
  demoBrandId: getStringEnv("DEMO_BRAND_ID", "brand_gym_city")
};
