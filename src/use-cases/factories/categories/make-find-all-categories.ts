import { PrismaCategoryRepository } from "@/repositories/prisma/prisma-category-repository";
import { FindAllCategoriesUseCase } from "@/use-cases/_categories/find-all-categories";

export function makeFindAllCategories() {
  const categoryRepository = new PrismaCategoryRepository();
  const findAllCategoriesUseCase = new FindAllCategoriesUseCase(
    categoryRepository,
  );

  return findAllCategoriesUseCase;
}
