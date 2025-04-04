import { UserRepositoryInterface } from "@/repositories/user-repository-interface";
import { Category } from "@prisma/client";
import { ResourceNotFoundError } from "../exceptions/resource-not-found-error";
import { CategoryRepositoryInterface } from "@/repositories/category-repository-interface";

interface CreateCategoryRequest {
  name: string;
  type: "INCOME" | "OUTCOME";
  userId?: string;
}

interface CreateCategoryResponse {
  category: Category;
}

export class CreateCategoryUseCase {
  constructor(
    private categoryRepository: CategoryRepositoryInterface,
    private userRepository: UserRepositoryInterface,
  ) {}

  async execute({
    type,
    userId,
    name,
  }: CreateCategoryRequest): Promise<CreateCategoryResponse> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = {
      name,
      type,
    };

    if (userId) {
      const user = await this.userRepository.findById(userId);

      if (!user) {
        throw new ResourceNotFoundError();
      }

      data.user = { connect: { id: user.id } };
    }

    const category = await this.categoryRepository.create(data);

    return {
      category,
    };
  }
}
