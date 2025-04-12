import { Prisma, Category } from "@prisma/client";
import { CategoryRepositoryInterface } from "../category-repository-interface";
import { randomUUID } from "crypto";

export class InMemoryCategoryRepository implements CategoryRepositoryInterface {
  public categories: Category[] = [];

  async create(category: Prisma.CategoryCreateInput): Promise<Category> {
    const newCategory = {
      id: randomUUID(),
      name: category.name,
      type: category.type,
      userId: category.user
        ? (category.user as { connect: { id: string } }).connect.id
        : null,
    };

    this.categories.push(newCategory);

    return newCategory;
  }

  async findAll(userId?: string): Promise<Category[]> {
    const listCategories: Category[] = [];

    const findStandardCategories = this.categories.filter((category) => {
      return category.userId === null;
    });

    listCategories.push(...findStandardCategories);

    if (userId) {
      const findUserCategories = this.categories.filter((category) => {
        return category.userId === userId;
      });

      listCategories.push(...findUserCategories);
    }

    return listCategories;
  }
}
