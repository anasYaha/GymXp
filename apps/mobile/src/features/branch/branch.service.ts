import type { GymBranch, User } from "@gymxp/shared-types/entities/brand";

import { apiClient } from "../../services/api/api-client";

interface BranchListResponse {
  items: GymBranch[];
}

interface SelectBranchResponse {
  currentBranchId: string;
  branch: Pick<GymBranch, "id" | "name" | "city">;
  user: User;
  token: string;
}

export const branchService = {
  list(token: string) {
    return apiClient.request<BranchListResponse>("/branches", {
      method: "GET",
      token
    });
  },

  select(token: string, branchId: string) {
    return apiClient.request<SelectBranchResponse>("/users/select-branch", {
      method: "POST",
      token,
      body: JSON.stringify({
        branchId
      })
    });
  }
};
