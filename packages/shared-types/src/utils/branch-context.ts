export interface BranchContext {
  brandId: string;
  branchId: string;
}

export const makeBranchContextLabel = (context: BranchContext): string => {
  return `${context.brandId}:${context.branchId}`;
};

