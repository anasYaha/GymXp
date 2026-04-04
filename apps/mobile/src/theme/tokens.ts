export const themeTokens = {
  // Primary brand
  brandPrimary:       "#FF6B00",
  brandPrimaryStrong: "#CC5500",
  brandPrimarySoft:   "#1F1210",

  // Neon accent
  accent:     "#A3FF12",
  accentSoft: "#0F1A03",

  // Backgrounds
  surface:         "#0B0B0B",
  surfaceElevated: "#1A1A1A",
  surfaceMuted:    "#222222",

  // Borders
  border:       "#2A2A2A",
  borderStrong: "#3A3A3A",

  // Text
  text:      "#FFFFFF",
  textMuted: "#AAAAAA",
  textSoft:  "#666666",

  // Semantic
  successSoft: "#0F1A03",
  danger:      "#FF4444",
} as const;

/** Spacing scale (4-based) */
export const spacing = {
  xs:  4,
  sm:  8,
  md:  12,
  lg:  16,
  xl:  20,
  xxl: 24,
  xxxl: 32,
} as const;

/** Border radii */
export const radii = {
  sm:   8,
  md:   10,
  lg:   14,
  xl:   20,
  xxl:  24,
  pill: 999,
} as const;
