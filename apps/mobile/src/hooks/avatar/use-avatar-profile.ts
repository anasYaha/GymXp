import { useMemo, useState } from "react";

import { defaultAvatarProfile } from "../../constants/avatar/avatar-options";
import type { AvatarProfile } from "../../types/avatar/avatar";

export const useAvatarProfile = (initialProfile?: Partial<AvatarProfile>) => {
  const [profile, setProfile] = useState<AvatarProfile>({
    ...defaultAvatarProfile,
    ...initialProfile
  });

  const previewLabel = useMemo(() => {
    return `${profile.selectedAvatarModel} • ${profile.animationState}`;
  }, [profile.animationState, profile.selectedAvatarModel]);

  return {
    profile,
    previewLabel,
    updateProfile: (patch: Partial<AvatarProfile>) => {
      setProfile((currentProfile) => ({
        ...currentProfile,
        ...patch
      }));
    },
    resetProfile: () => {
      setProfile(defaultAvatarProfile);
    }
  };
};
