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

