import type { GymBranch } from "@gymxp/shared-types/entities/brand";

export const ActiveBranchCard = (branch: Pick<GymBranch, "name" | "city" | "address">) => ({
  eyebrow: "Active branch",
  title: branch.name,
  subtitle: branch.city,
  detail: branch.address ?? "Address will be provided by your gym team."
});

