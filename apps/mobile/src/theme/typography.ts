import type { TextStyle } from "react-native";

/**
 * Typography system matching IRONCORE prototype.
 * Uses system fonts with weight/spacing tuning to approximate
 * Barlow Condensed / Barlow feel.
 */

const base: TextStyle = {
  color: "#FFFFFF",
  letterSpacing: 0.2,
};

/** Large hero heading — Barlow Condensed 900 uppercase */
export const heading1: TextStyle = {
  ...base,
  fontSize: 28,
  fontWeight: "900",
  textTransform: "uppercase",
  letterSpacing: 1.2,
};

/** Section heading — Barlow Condensed 900 uppercase */
export const heading2: TextStyle = {
  ...base,
  fontSize: 20,
  fontWeight: "800",
  textTransform: "uppercase",
  letterSpacing: 0.8,
};

/** Card heading */
export const heading3: TextStyle = {
  ...base,
  fontSize: 16,
  fontWeight: "700",
  textTransform: "uppercase",
  letterSpacing: 0.6,
};

/** Stat / big number value */
export const statValue: TextStyle = {
  ...base,
  fontSize: 24,
  fontWeight: "900",
  letterSpacing: 0.5,
};

/** Large stat value */
export const statValueLarge: TextStyle = {
  ...base,
  fontSize: 36,
  fontWeight: "900",
  letterSpacing: 0.5,
};

/** Eyebrow / kicker label */
export const eyebrow: TextStyle = {
  ...base,
  fontSize: 11,
  fontWeight: "700",
  textTransform: "uppercase",
  letterSpacing: 1.1,
};

/** Regular body text */
export const body: TextStyle = {
  ...base,
  fontSize: 14,
  fontWeight: "400",
  lineHeight: 20,
};

/** Small body text */
export const bodySmall: TextStyle = {
  ...base,
  fontSize: 13,
  fontWeight: "600",
};

/** Caption / meta text */
export const caption: TextStyle = {
  ...base,
  fontSize: 11,
  fontWeight: "600",
  color: "#AAAAAA",
};

/** Tiny text (badges, counts) */
export const micro: TextStyle = {
  ...base,
  fontSize: 10,
  fontWeight: "700",
};

/** Section title row label */
export const sectionTitle: TextStyle = {
  ...heading3,
};

/** See All link */
export const sectionAction: TextStyle = {
  ...base,
  fontSize: 12,
  fontWeight: "700",
  textTransform: "uppercase",
  color: "#FF6B00",
};
