import { Category, Prisma } from "@prisma/client";

export interface CategoryRepositoryInterface {
  create(category: Prisma.CategoryCreateInput): Promise<Category>;
  findAll(userId?: string): Promise<Category[]>;
  update(
    categoryId: string,
    category: Prisma.CategoryUpdateInput,
  ): Promise<Category>;
}
