export interface ActiveBranchState {
  branchId: string | null;
}

export const initialBranchState: ActiveBranchState = {
  branchId: null
};
