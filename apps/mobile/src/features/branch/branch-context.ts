export interface ActiveBranchState {
  branchId: string | null;
<<<<<<< HEAD
}

export const initialBranchState: ActiveBranchState = {
  branchId: null
};
=======
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

>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402
