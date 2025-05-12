import { Category } from "@prisma/client";
import { ResourceNotFoundError } from "../exceptions/resource-not-found-error";
import { CategoryRepositoryInterface } from "@/repositories/category-repository-interface";
import { NotAuthorizedForFeatureError } from "../exceptions/not-authorized-for-feature-error";

interface UpdateCategoryRequest {
  id: string;
  name?: string;
  type?: "INCOME" | "OUTCOME";
}

interface UpdateCategoryResponse {
  category: Category;
}

export class UpdateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepositoryInterface) {}

  async execute({
    id,
    type,
    name,
  }: UpdateCategoryRequest): Promise<UpdateCategoryResponse> {
    const findCategory = await this.categoryRepository.findUnique(id);

    if (!findCategory) {
      throw new ResourceNotFoundError();
    }

    if (findCategory.userId === null) {
      throw new NotAuthorizedForFeatureError();
    }

    const category = await this.categoryRepository.update(id, { type, name });

    return {
      category,
    };
  }
}
