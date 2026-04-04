import { HttpError } from "../../../core/errors/http-error";
import { mapBranch } from "../mapper/branches.mapper";
import { branchesRepository } from "../repository/branches.repository";

export class BranchesService {
  async listBranchesForBrand(brandId: string) {
    const items = await branchesRepository.listByBrand(brandId);

    return {
      items: items.map(mapBranch)
    };
  }

  async getBranchById(brandId: string, branchId: string) {
    const branch = await branchesRepository.findByIdForBrand(branchId, brandId);

    if (!branch) {
      throw new HttpError(404, "Branch not found for this brand.", "BRANCH_NOT_FOUND");
    }

    return {
      branch: mapBranch(branch)
    };
  }
}
