import { exerciseCategoryAnimationMap } from "../../constants/avatar/avatar-mappings";
import type { AvatarAnimationKey } from "../../types/avatar/avatar";

export const getAvatarAnimationForExercise = (
  category: string | null | undefined,
  fallback: AvatarAnimationKey = "idle"
): AvatarAnimationKey => {
  if (!category) {
    return fallback;
  }

  const normalized = category.trim().toLowerCase().replace(/\s+/g, "");

  return exerciseCategoryAnimationMap[normalized] ?? fallback;
};
