import { InMemoryCategoryRepository } from "@/repositories/in-memory/in-memory-category-repository";
import { UpdateCategoryUseCase } from "@/use-cases/_categories/update-category";
import { ResourceNotFoundError } from "@/use-cases/exceptions/resource-not-found-error";
import { beforeEach, describe, expect, test } from "vitest";

let categoryRepository: InMemoryCategoryRepository;
let useCase: UpdateCategoryUseCase;

describe("Teste para atualizar dados de uma categoria.", () => {
  beforeEach(() => {
    categoryRepository = new InMemoryCategoryRepository();
    useCase = new UpdateCategoryUseCase(categoryRepository);
  });

  test("Deve ser possível criar uma nova categoria padrão.", async () => {
    for (let i = 0; i < 10; i++) {
      await categoryRepository.create({
        id: "id" + i,
        name: "name" + i,
        type: "INCOME",
        user: { connect: { id: "user" + i } },
      });
    }

    const categoryUpdated = await useCase.execute({
      id: "id1",
      name: "nameUpdate",
      type: "OUTCOME",
    });

    expect(categoryUpdated.category.name).toBe("nameUpdate");
    expect(categoryUpdated.category.type).toBe("OUTCOME");
    expect(categoryRepository.categories[0].name).toEqual("name0");
    expect(categoryRepository.categories[1].name).toEqual("nameUpdate");
  });

  test("Não deve ser possível alterar dados de uma categoria inexistente.", async () => {
    await expect(() =>
      useCase.execute({
        id: "fakeid",
        name: "Teste de transação",
        type: "INCOME",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
