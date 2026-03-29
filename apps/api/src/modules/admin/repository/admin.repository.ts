export interface AdminRepository {
  getOverview(branchId: string): Promise<unknown>;
  getEngagement(branchId: string): Promise<unknown>;
}

