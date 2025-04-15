import { InMemoryCategoryRepository } from "@/repositories/in-memory/in-memory-category-repository";
import { DeleteCategoryUseCase } from "@/use-cases/_categories/delete-category";
import { beforeEach, describe, expect, test } from "vitest";

let categoryRepository: InMemoryCategoryRepository;
let useCase: DeleteCategoryUseCase;

describe("Teste para deletar uma categoria.", () => {
  beforeEach(() => {
    categoryRepository = new InMemoryCategoryRepository();
    useCase = new DeleteCategoryUseCase(categoryRepository);
  });

  test("Deve ser possível deletar uma transação padrão.", async () => {
    for (let i = 0; i < 10; i++) {
      await categoryRepository.create({
        id: "id" + i,
        name: "name" + i,
        type: "INCOME",
        user: { connect: { id: "user" + i } },
      });
    }

    await useCase.execute({
      id: "id0",
    });

    await useCase.execute({
      id: "id1",
    });

    expect(categoryRepository.categories.length).toEqual(8);
  });
});
