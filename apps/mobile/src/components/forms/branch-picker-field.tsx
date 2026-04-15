import type { GymBranch } from "@gymxp/shared-types/entities/brand";

export interface BranchPickerFieldProps {
  branches: GymBranch[];
  selectedBranchId: string | null;
}

export const BranchPickerField = ({
  branches,
  selectedBranchId
}: BranchPickerFieldProps) => ({
  label: "Choose your branch",
  helperText: "Your dashboard, sessions, and leaderboard stay scoped to this branch.",
  selectedBranchId,
  options: branches.map((branch) => ({
    id: branch.id,
    title: branch.name,
    subtitle: branch.city
  }))
});

