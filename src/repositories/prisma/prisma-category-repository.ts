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
}
