import { Category } from "@prisma/client";
import { CategoryRepositoryInterface } from "@/repositories/category-repository-interface";

interface FindAllCategoriesRequest {
  userId?: string;
}

interface FindAllCategoriesResponse {
  categories: Category[];
}

export class FindAllCategoriesUseCase {
  constructor(private categoryRepository: CategoryRepositoryInterface) {}

  async execute({
    userId,
  }: FindAllCategoriesRequest): Promise<FindAllCategoriesResponse> {
    const categories = await this.categoryRepository.findAll(userId);

    return { categories };
  }
}
