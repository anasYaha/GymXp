export const XpBadge = (xp: number) => ({
  label: "XP",
  value: xp,
  tone: xp >= 500 ? "surging" : "steady"
});

