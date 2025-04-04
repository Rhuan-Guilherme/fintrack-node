import { Category, Prisma } from "@prisma/client";

export interface CategoryRepositoryInterface {
  create(category: Prisma.CategoryCreateInput): Promise<Category>;
}
