export interface AnalyticsRepository {
  getSnapshot(branchId: string): Promise<unknown>;
}

