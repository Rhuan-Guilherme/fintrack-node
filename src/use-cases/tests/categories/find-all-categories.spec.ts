import { InMemoryCategoryRepository } from "@/repositories/in-memory/in-memory-category-repository";
import { FindAllCategoriesUseCase } from "@/use-cases/_categories/find-all-categories";
import { beforeEach, describe, expect, test } from "vitest";

let categoryRepository: InMemoryCategoryRepository;
let useCase: FindAllCategoriesUseCase;

describe("Teste resgatar categorias do sistema e personalizadas.", () => {
  beforeEach(() => {
    categoryRepository = new InMemoryCategoryRepository();
    useCase = new FindAllCategoriesUseCase(categoryRepository);
  });

  test("Deve ser possível resgatar as categorias padrões do sistema.", async () => {
    for (let i = 0; i <= 10; i++) {
      await categoryRepository.create({
        name: "Teste" + i,
        type: "INCOME",
      });
    }

    const { categories } = await useCase.execute({});

    expect(categories.length).toEqual(11);
    expect(categories[0].userId).toEqual(null);
  });

  test("Deve ser possível resgatar as categorias padrões e personalizadas do sistema.", async () => {
    for (let i = 0; i <= 10; i++) {
      await categoryRepository.create({
        name: "Teste" + i,
        type: "INCOME",
      });
    }

    for (let i = 0; i <= 4; i++) {
      await categoryRepository.create({
        name: "Teste" + i,
        type: "OUTCOME",
        user: { connect: { id: "user" } },
      });
    }

    const { categories } = await useCase.execute({ userId: "user" });

    expect(categories.length).toEqual(16);
    expect(categories[0].userId).toEqual(null);
    expect(categories[13].userId).toEqual("user");
  });
});
