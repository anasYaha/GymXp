<<<<<<< HEAD
export const XpBadge = () => "TODO: XP badge";
=======
export const XpBadge = (xp: number) => ({
  label: "XP",
  value: xp,
  tone: xp >= 500 ? "surging" : "steady"
});
>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402

