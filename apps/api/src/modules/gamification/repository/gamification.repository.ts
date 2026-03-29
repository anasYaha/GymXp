export interface GamificationRepository {
  getXpLogs(userId: string, branchId: string): Promise<unknown[]>;
}

