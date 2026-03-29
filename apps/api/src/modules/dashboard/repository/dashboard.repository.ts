export interface DashboardRepository {
  getSummary(userId: string, branchId: string): Promise<unknown>;
}

