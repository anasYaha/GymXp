import { AvatarPreviewCard } from "../../components/avatar/avatar-preview-card";
import { ScreenShell } from "../../components/common/screen-shell";
import { SectionHeader } from "../../components/common/section-header";
import { defaultAvatarProfile } from "../../constants/avatar/avatar-options";

export const ProfileScreen = () => {
  return (
    <ScreenShell
      title="Profile"
      subtitle="Placeholder member profile surface with a future-ready avatar module."
    >
      <SectionHeader
        eyebrow="Avatar"
        title="Profile avatar module"
        subtitle="This screen stays lightweight for now, but it already exposes the avatar preview integration point."
      />
      <AvatarPreviewCard
        profile={defaultAvatarProfile}
        subtitle="Later this can show the member's saved avatar state from profile storage without changing the current profile flow."
        title="Saved avatar preview"
      />
    </ScreenShell>
  );
};
