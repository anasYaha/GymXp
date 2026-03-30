import { ScreenShell } from "../../components/common/screen-shell";
import { getProfile } from "../../features/profile/profile.service";

export const ProfileScreen = async () => {
  const profile = await getProfile();

  return ScreenShell({
    title: profile.user.fullName,
    subtitle: "Your member profile stays tied to one gym brand account.",
    content: {
      email: profile.user.email,
      role: profile.user.role,
      brandId: profile.user.brandId,
      activeBranch: {
        id: profile.branch.id,
        name: profile.branch.name,
        city: profile.branch.city
      },
      preferences: profile.preferences
    }
  });
};

