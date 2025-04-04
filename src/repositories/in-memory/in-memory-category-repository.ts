import { Prisma, Category } from "@prisma/client";
import { CategoryRepositoryInterface } from "../category-repository-interface";
import { randomUUID } from "crypto";

export class InMemoryCategoryRepository implements CategoryRepositoryInterface {
  public category: Category[] = [];

  async create(category: Prisma.CategoryCreateInput): Promise<Category> {
    const newCategory = {
      id: randomUUID(),
      name: category.name,
      type: category.type,
      userId: category.user
        ? (category.user as { connect: { id: string } }).connect.id
        : null,
    };

    this.category.push(newCategory);

    return newCategory;
  }
}
