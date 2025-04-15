import { Category, Prisma } from "@prisma/client";

export interface CategoryRepositoryInterface {
  create(category: Prisma.CategoryCreateInput): Promise<Category>;
  findAll(userId?: string): Promise<Category[]>;
  delete(categoryId: string): Promise<void>;
  update(
    categoryId: string,
    category: Prisma.CategoryUpdateInput,
  ): Promise<Category>;
}
