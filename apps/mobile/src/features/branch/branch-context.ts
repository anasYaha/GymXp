export interface ActiveBranchState {
  branchId: string | null;
  brandId: string | null;
}

export const initialBranchState: ActiveBranchState = {
  branchId: null,
  brandId: null
};

export const setActiveBranch = (
  state: ActiveBranchState,
  branchId: string,
  brandId: string
): ActiveBranchState => ({
  ...state,
  branchId,
  brandId
});

export const clearActiveBranch = (): ActiveBranchState => ({
  ...initialBranchState
});

