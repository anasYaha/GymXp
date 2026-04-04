<<<<<<< HEAD
export const useActiveBranch = () => {
  return {
    branchId: null
  };
};
=======
import {
  initialBranchState,
  type ActiveBranchState
} from "../features/branch/branch-context";
import { authStore } from "../features/auth/auth.store";

export const useActiveBranch = (
  state: ActiveBranchState = initialBranchState
) => {
  const branchId = state.branchId ?? authStore.user?.currentBranchId ?? null;
  const brandId = state.brandId ?? authStore.user?.brandId ?? null;

  return {
    branchId,
    brandId,
    hasActiveBranch: branchId !== null
  };
};

>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402
