<<<<<<< HEAD
export const LeaderboardScreen = () => "TODO: branch leaderboard screen";
=======
import { ScreenShell } from "../../components/common/screen-shell";
import {
  getBranchLeaderboard,
  getMyLeaderboardStanding
} from "../../features/leaderboard/leaderboard.service";

export const LeaderboardScreen = async () => {
  const [leaderboard, me] = await Promise.all([
    getBranchLeaderboard(),
    getMyLeaderboardStanding()
  ]);

  return ScreenShell({
    title: `${leaderboard.branch.name} leaderboard`,
    subtitle: "Rankings are scoped to your active branch only.",
    content: {
      branch: leaderboard.branch,
      myStanding: me,
      entries: leaderboard.items
    }
  });
};
>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402

