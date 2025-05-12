import { PrismaCategoryRepository } from "@/repositories/prisma/prisma-category-repository";
import { UpdateCategoryUseCase } from "@/use-cases/_categories/update-category";

export function makeUpdateCategories() {
  const categoryRepository = new PrismaCategoryRepository();
  const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository);

  return updateCategoryUseCase;
}
