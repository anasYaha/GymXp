export interface BranchesRepository {
  listByBrand(brandId: string): Promise<unknown[]>;
  findById(branchId: string): Promise<unknown>;
}

