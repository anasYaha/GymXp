export interface LeaderboardRepository {
  getBranchEntries(branchId: string): Promise<unknown[]>;
}

