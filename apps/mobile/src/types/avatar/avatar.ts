export const avatarAnimationKeys = [
  "idle",
  "wave",
  "celebrate",
  "flex",
  "curl",
  "squat",
  "run"
] as const;

export type AvatarAnimationKey = (typeof avatarAnimationKeys)[number];

export type AvatarMood = "focused" | "energized" | "confident" | "calm";

export type AvatarBodyBuildPreset = "lean" | "athletic" | "power" | "balanced";

export interface AvatarProfile {
  skinTone: string;
  hairStyle: string;
  beardStyle: string;
  outfit: string;
  bodyBuildPreset: AvatarBodyBuildPreset;
  selectedAvatarModel: string;
  animationState: AvatarAnimationKey;
  mood: AvatarMood;
}

export type AvatarSetupStep = "profile-info" | "fitness-info" | "avatar-setup";

export interface AvatarSetupDraft {
  displayName: string;
  ageRange: string;
  trainingGoal: string;
  experienceLevel: string;
  favoriteWorkoutCategory: string;
  avatar: AvatarProfile;
}
