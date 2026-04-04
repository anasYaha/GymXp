<<<<<<< HEAD
export const getProfile = async () => {
  return Promise.resolve({
    status: "TODO",
    message: "Connect member profile endpoint"
  });
=======
import { DEMO_PROFILE } from "../../constants/demo";
import { getCurrentMember } from "../auth/auth.service";
import { getDefaultMemberBranch } from "../branch/branch.service";

export const getProfile = async () => {
  try {
    const [user, branch] = await Promise.all([
      getCurrentMember(),
      getDefaultMemberBranch()
    ]);

    if (!user) {
      return DEMO_PROFILE;
    }

    return {
      user,
      branch,
      preferences: DEMO_PROFILE.preferences
    };
  } catch {
    return DEMO_PROFILE;
  }
>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402
};

