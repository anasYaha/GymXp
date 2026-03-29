export interface UsersRepository {
  updateCurrentBranch(userId: string, branchId: string): Promise<void>;
}

