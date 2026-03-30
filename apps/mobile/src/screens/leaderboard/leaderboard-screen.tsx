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

