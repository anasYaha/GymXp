export const routeRegistry = [
  "auth",
  "users",
  "brands",
  "branches",
  "dashboard",
  "sessions",
  "gamification",
  "leaderboard",
  "analytics",
  "admin"
] as const;

export const registerRoutes = (): string[] => {
  // TODO: mount Express routers by module.
  return [...routeRegistry];
};

