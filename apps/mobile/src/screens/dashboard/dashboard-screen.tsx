import { ActiveBranchCard } from "../../components/branch/active-branch-card";
import { ScreenShell } from "../../components/common/screen-shell";
import { DashboardSummaryCard } from "../../components/dashboard/dashboard-summary-card";
import { XpBadge } from "../../components/gamification/xp-badge";
import { getDefaultMemberBranch } from "../../features/branch/branch.service";
import { getDashboardSummary } from "../../features/dashboard/dashboard.service";

export const DashboardScreen = async () => {
  const [summary, branch] = await Promise.all([
    getDashboardSummary(),
    getDefaultMemberBranch()
  ]);

  return ScreenShell({
    title: `Welcome back, ${summary.member.firstName}`,
    subtitle: "Your daily gym view is scoped to your active branch.",
    content: {
      activeBranchCard: ActiveBranchCard(branch),
      gamification: XpBadge(summary.xp),
      stats: [
        DashboardSummaryCard({
          title: "XP",
          value: summary.xp,
          helperText: "Branch-scoped progress"
        }),
        DashboardSummaryCard({
          title: "Streak",
          value: `${summary.streakDays} days`,
          helperText: "Consecutive active days"
        }),
        DashboardSummaryCard({
          title: "Rank",
          value: summary.rank ?? "-",
          helperText: "Inside your branch"
        })
      ],
      today: {
        activeMembers: summary.todayInThisGym.activeMembers,
        peakWindow: summary.todayInThisGym.peakWindow
      }
    }
  });
};

