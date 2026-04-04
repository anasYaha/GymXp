import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const repoRoot = resolve(process.cwd());

const checks = [];

const requiredFiles = [
  "apps/mobile/src/app/index.tsx",
  "apps/mobile/src/navigation/app-navigator.ts",
  "apps/mobile/src/features/auth/auth.service.ts",
  "apps/mobile/src/features/branch/branch.service.ts",
  "apps/mobile/src/features/dashboard/dashboard.service.ts",
  "apps/mobile/src/features/session/session.service.ts",
  "apps/mobile/src/features/leaderboard/leaderboard.service.ts",
  "apps/mobile/src/features/profile/profile.service.ts",
  "apps/mobile/src/screens/auth/login-screen.tsx",
  "apps/mobile/src/screens/auth/register-screen.tsx",
  "apps/mobile/src/screens/onboarding/branch-selection-screen.tsx",
  "apps/mobile/src/screens/dashboard/dashboard-screen.tsx",
  "apps/mobile/src/screens/sessions/session-create-screen.tsx",
  "apps/mobile/src/screens/sessions/session-list-screen.tsx",
  "apps/mobile/src/screens/leaderboard/leaderboard-screen.tsx",
  "apps/mobile/src/screens/profile/profile-screen.tsx",
  "apps/mobile/src/screens/settings/settings-screen.tsx",
  "apps/mobile/src/constants/demo.ts",
  "codexA_to_codexB.md"
];

const screenFiles = [
  "apps/mobile/src/screens/auth/login-screen.tsx",
  "apps/mobile/src/screens/auth/register-screen.tsx",
  "apps/mobile/src/screens/onboarding/branch-selection-screen.tsx",
  "apps/mobile/src/screens/dashboard/dashboard-screen.tsx",
  "apps/mobile/src/screens/sessions/session-create-screen.tsx",
  "apps/mobile/src/screens/sessions/session-list-screen.tsx",
  "apps/mobile/src/screens/leaderboard/leaderboard-screen.tsx",
  "apps/mobile/src/screens/profile/profile-screen.tsx",
  "apps/mobile/src/screens/settings/settings-screen.tsx"
];

const load = (relativePath) => {
  const absolutePath = resolve(repoRoot, relativePath);

  if (!existsSync(absolutePath)) {
    throw new Error(`Missing required file: ${relativePath}`);
  }

  return readFileSync(absolutePath, "utf8");
};

const addCheck = (name, passed, detail) => {
  checks.push({ name, passed, detail });
};

for (const file of requiredFiles) {
  addCheck(
    `File exists: ${file}`,
    existsSync(resolve(repoRoot, file)),
    existsSync(resolve(repoRoot, file)) ? "OK" : "Missing"
  );
}

const navigatorFile = load("apps/mobile/src/navigation/app-navigator.ts");
addCheck(
  "Route resolver includes login path",
  navigatorFile.includes('return "login"'),
  'Expected `return "login"` in route resolver'
);
addCheck(
  "Route resolver includes onboarding branch path",
  navigatorFile.includes('return "onboarding-branch"'),
  'Expected `return "onboarding-branch"` in route resolver'
);
addCheck(
  "Route resolver includes dashboard path",
  navigatorFile.includes('return "dashboard-home"'),
  'Expected `return "dashboard-home"` in route resolver'
);

const authServiceFile = load("apps/mobile/src/features/auth/auth.service.ts");
for (const symbol of [
  "loginMember",
  "registerMember",
  "getCurrentMember",
  "logoutMember"
]) {
  addCheck(
    `Auth service exports ${symbol}`,
    authServiceFile.includes(`export const ${symbol}`),
    `Expected export const ${symbol}`
  );
}

const branchServiceFile = load("apps/mobile/src/features/branch/branch.service.ts");
for (const symbol of [
  "getBranches",
  "selectBranch",
  "getDefaultMemberBranch"
]) {
  addCheck(
    `Branch service exports ${symbol}`,
    branchServiceFile.includes(`export const ${symbol}`),
    `Expected export const ${symbol}`
  );
}

const dashboardServiceFile = load("apps/mobile/src/features/dashboard/dashboard.service.ts");
addCheck(
  "Dashboard service targets /dashboard/summary",
  dashboardServiceFile.includes('"/dashboard/summary"'),
  'Expected "/dashboard/summary"'
);

const sessionServiceFile = load("apps/mobile/src/features/session/session.service.ts");
addCheck(
  "Session service targets POST /sessions",
  sessionServiceFile.includes('"/sessions"'),
  'Expected "/sessions"'
);
addCheck(
  "Session service targets PATCH /sessions/:id/complete",
  sessionServiceFile.includes("apiClient.patch") &&
    sessionServiceFile.includes("/complete"),
  "Expected patch-based completeSession logic"
);

const leaderboardServiceFile = load("apps/mobile/src/features/leaderboard/leaderboard.service.ts");
addCheck(
  "Leaderboard service targets /leaderboard",
  leaderboardServiceFile.includes('"/leaderboard"'),
  'Expected "/leaderboard"'
);
addCheck(
  "Leaderboard service targets /leaderboard/me",
  leaderboardServiceFile.includes('"/leaderboard/me"'),
  'Expected "/leaderboard/me"'
);

const demoFile = load("apps/mobile/src/constants/demo.ts");
for (const symbol of [
  "DEMO_BRANCHES",
  "DEMO_DASHBOARD_SUMMARY",
  "DEMO_SESSION_LIST",
  "DEMO_LEADERBOARD",
  "DEMO_PROFILE"
]) {
  addCheck(
    `Demo constants include ${symbol}`,
    demoFile.includes(`export const ${symbol}`),
    `Expected export const ${symbol}`
  );
}

for (const file of screenFiles) {
  const content = load(file);
  addCheck(
    `Screen has no TODO placeholder: ${file}`,
    !content.includes("TODO:"),
    "Found unresolved TODO placeholder"
  );
  addCheck(
    `Screen uses ScreenShell: ${file}`,
    content.includes("ScreenShell"),
    "Expected ScreenShell-based scaffold"
  );
}

const handoffFile = load("codexA_to_codexB.md");
for (const section of [
  "OUTPUT 1",
  "OUTPUT 2",
  "# CODEX HANDOFF REPORT",
  "## 1) Objective Completed",
  "## 14) Human-Friendly Summary"
]) {
  addCheck(
    `Handoff doc contains ${section}`,
    handoffFile.includes(section),
    `Expected ${section}`
  );
}

const passed = checks.filter((check) => check.passed);
const failed = checks.filter((check) => !check.passed);

console.log("GymXP Developer A Automated Check");
console.log(`Repo: ${repoRoot}`);
console.log(`Passed: ${passed.length}`);
console.log(`Failed: ${failed.length}`);

for (const check of checks) {
  const prefix = check.passed ? "[PASS]" : "[FAIL]";
  console.log(`${prefix} ${check.name}`);

  if (!check.passed) {
    console.log(`       ${check.detail}`);
  }
}

if (failed.length > 0) {
  process.exitCode = 1;
} else {
  console.log("All Developer A scaffold checks passed.");
}
