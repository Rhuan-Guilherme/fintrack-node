import { CategoryRepositoryInterface } from "@/repositories/category-repository-interface";

interface DeleteCategoryRequest {
  id: string;
}

export class DeleteCategoryUseCase {
  constructor(private categoryRepository: CategoryRepositoryInterface) {}

  async execute({ id }: DeleteCategoryRequest) {
    await this.categoryRepository.delete(id);
  }
}
