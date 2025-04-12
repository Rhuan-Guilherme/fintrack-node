import { PrismaCategoryRepository } from "@/repositories/prisma/prisma-category-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { CreateCategoryUseCase } from "@/use-cases/_categories/create-category";

export function makeCreateCategory() {
  const userRepository = new PrismaUserRepository();
  const categoryRepository = new PrismaCategoryRepository();
  const createCategoryUseCase = new CreateCategoryUseCase(
    categoryRepository,
    userRepository,
  );

  return createCategoryUseCase;
}
