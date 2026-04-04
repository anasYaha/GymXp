import { ScreenShell } from "../../components/common/screen-shell";
import { BranchPickerField } from "../../components/forms/branch-picker-field";
import { getBranches, selectBranch } from "../../features/branch/branch.service";
import { authStore } from "../../features/auth/auth.store";

export const BranchSelectionScreen = async () => {
  const branchResponse = await getBranches();
  const selectedBranchId = authStore.user?.currentBranchId ?? null;
  const picker = BranchPickerField({
    branches: branchResponse.items,
    selectedBranchId
  });

  return ScreenShell({
    title: "Select branch",
    subtitle: "Everything in your member experience stays inside your gym branch.",
    content: {
      brandId: authStore.user?.brandId ?? null,
      picker,
      actions: {
        confirmSelection: async (branchId: string) => selectBranch({ branchId })
      }
    }
  });
};

