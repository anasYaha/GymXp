import type { GymBranch } from "@gymxp/shared-types/entities/brand";

import {
  DEMO_AUTH_RESPONSE,
  DEMO_BRANCHES,
  DEMO_BRANCH_ID
} from "../../constants/demo";
import { apiClient } from "../../services/api/api-client";
import { authStore } from "../auth/auth.store";

export interface BranchListResponse {
  items: GymBranch[];
}

export interface SelectBranchRequest {
  branchId: string;
}

export interface SelectBranchResponse {
  currentBranchId: string;
}

const demoBranchList = (): BranchListResponse => ({
  items: DEMO_BRANCHES
});

export const getBranches = async (): Promise<BranchListResponse> => {
  try {
    return await apiClient.get<BranchListResponse>("/branches");
  } catch {
    return demoBranchList();
  }
};

export const getBranchById = async (
  branchId: string
): Promise<GymBranch | undefined> => {
  const branchList = await getBranches();

  return branchList.items.find((branch) => branch.id === branchId);
};

export const selectBranch = async ({
  branchId
}: SelectBranchRequest): Promise<SelectBranchResponse> => {
  const nextBranchId = branchId || DEMO_BRANCH_ID;

  try {
    const response = await apiClient.post<SelectBranchResponse>(
      "/users/select-branch",
      {
        branchId: nextBranchId
      }
    );

    authStore.setCurrentBranchId(response.currentBranchId);

    return response;
  } catch {
    authStore.setCurrentBranchId(nextBranchId);

    return {
      currentBranchId: nextBranchId
    };
  }
};

export const getDefaultMemberBranch = async (): Promise<GymBranch> => {
  const currentBranchId =
    authStore.user?.currentBranchId ??
    DEMO_AUTH_RESPONSE.user.currentBranchId ??
    DEMO_BRANCH_ID;

  return (
    (await getBranchById(currentBranchId)) ??
    DEMO_BRANCHES.find((branch) => branch.id === DEMO_BRANCH_ID) ??
    DEMO_BRANCHES[0]
  );
};
