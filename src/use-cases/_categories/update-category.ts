import { Category } from "@prisma/client";
import { ResourceNotFoundError } from "../exceptions/resource-not-found-error";
import { CategoryRepositoryInterface } from "@/repositories/category-repository-interface";

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
    const category = await this.categoryRepository.update(id, { type, name });

    if (!category) {
      throw new ResourceNotFoundError();
    }

    return {
      category,
    };
  }
}
