import type { AvatarAnimationKey, AvatarProfile, AvatarSetupStep } from "../../types/avatar/avatar";

export const avatarModelOptions = ["starter-athlete.glb", "power-core.glb", "hybrid-runner.glb"] as const;

export const avatarSkinToneOptions = ["light", "medium", "tan", "deep"] as const;
export const avatarHairStyleOptions = ["buzz", "fade", "short-crop", "ponytail"] as const;
export const avatarBeardStyleOptions = ["clean-shave", "stubble", "short-beard"] as const;
export const avatarOutfitOptions = ["performance-black", "club-green", "coach-grey"] as const;
export const avatarBodyBuildOptions = ["lean", "athletic", "power", "balanced"] as const;
export const avatarMoodOptions = ["focused", "energized", "confident", "calm"] as const;
export const avatarAnimationOptions: readonly AvatarAnimationKey[] = [
  "idle",
  "wave",
  "celebrate",
  "flex",
  "curl",
  "squat",
  "run"
] as const;

export const defaultAvatarProfile: AvatarProfile = {
  skinTone: "medium",
  hairStyle: "fade",
  beardStyle: "clean-shave",
  outfit: "club-green",
  bodyBuildPreset: "athletic",
  selectedAvatarModel: "starter-athlete.glb",
  animationState: "idle",
  mood: "focused"
};

export const avatarSetupSteps: ReadonlyArray<{
  key: AvatarSetupStep;
  title: string;
  description: string;
}> = [
  {
    key: "profile-info",
    title: "Profile info",
    description: "Basic member identity and personalization inputs."
  },
  {
    key: "fitness-info",
    title: "Fitness info",
    description: "Training goals, workout preferences, and future animation hints."
  },
  {
    key: "avatar-setup",
    title: "Avatar setup",
    description: "Model, visual presets, and animation-ready avatar settings."
  }
];
