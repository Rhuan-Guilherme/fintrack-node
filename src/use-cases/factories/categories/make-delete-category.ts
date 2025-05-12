import { PrismaCategoryRepository } from "@/repositories/prisma/prisma-category-repository";
import { DeleteCategoryUseCase } from "@/use-cases/_categories/delete-category";

export function makeDeleteCategories() {
  const categoryRepository = new PrismaCategoryRepository();
  const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository);

  return deleteCategoryUseCase;
}
