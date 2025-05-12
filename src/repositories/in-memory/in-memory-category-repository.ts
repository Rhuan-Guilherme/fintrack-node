import { Prisma, Category } from "@prisma/client";
import { CategoryRepositoryInterface } from "../category-repository-interface";
import { randomUUID } from "crypto";

export class InMemoryCategoryRepository implements CategoryRepositoryInterface {
  public categories: Category[] = [];

  async create(category: Prisma.CategoryCreateInput): Promise<Category> {
    const newCategory = {
      id: category.id || randomUUID(),
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

  async findUnique(categoryId: string): Promise<Category | null> {
    const category = this.categories.find((category) => {
      if (category.id === categoryId) {
        return category;
      }
    });

    if (!category) {
      return null;
    }

    return category;
  }

  async delete(categoryId: string): Promise<void> {
    const indexTransaction = this.categories.findIndex(
      (category) => category.id === categoryId,
    );

    if (indexTransaction !== -1) {
      this.categories.splice(indexTransaction, 1);
    }
  }

  async update(
    categoryId: string,
    category: Prisma.CategoryUpdateInput,
  ): Promise<Category> {
    const indexCategory = this.categories.findIndex((category) => {
      return category.id === categoryId;
    });

    if (indexCategory !== -1) {
      this.categories[indexCategory] = {
        ...this.categories[indexCategory],
        ...category,
      } as Category;
    }

    return this.categories[indexCategory];
  }
}
