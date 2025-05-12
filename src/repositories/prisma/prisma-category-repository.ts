import { Prisma, Category } from "@prisma/client";
import { CategoryRepositoryInterface } from "../category-repository-interface";
import { prisma } from "@/lib/prisma";

export class PrismaCategoryRepository implements CategoryRepositoryInterface {
  async create(category: Prisma.CategoryCreateInput): Promise<Category> {
    const newCategory = await prisma.category.create({
      data: category,
    });

    return newCategory;
  }
  async findAll(userId?: string): Promise<Category[]> {
    const categories = prisma.category.findMany({
      where: {
        OR: [{ userId: null }, { userId: userId }],
      },
    });

    return categories;
  }

  async findUnique(categoryId: string): Promise<Category | null> {
    const category = prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    return category;
  }

  async delete(categoryId: string): Promise<void> {
    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
  }

  async update(
    categoryId: string,
    category: Prisma.CategoryUpdateInput,
  ): Promise<Category> {
    const categoryUpdated = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: category,
    });

    return categoryUpdated;
  }
}
