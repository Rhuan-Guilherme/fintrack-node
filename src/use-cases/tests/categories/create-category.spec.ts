import { InMemoryCategoryRepository } from "@/repositories/in-memory/in-memory-category-repository";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { CreateCategoryUseCase } from "@/use-cases/_categories/create-category";
import { ResourceNotFoundError } from "@/use-cases/exceptions/resource-not-found-error";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, test } from "vitest";

let userRepository: InMemoryUserRepository;
let categoryRepository: InMemoryCategoryRepository;
let useCase: CreateCategoryUseCase;

describe("Teste para criar uma nova categoria.", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    categoryRepository = new InMemoryCategoryRepository();
    useCase = new CreateCategoryUseCase(categoryRepository, userRepository);
  });

  test("Deve ser possível criar uma nova categoria padrão.", async () => {
    const response = await useCase.execute({
      name: "Teste categoria",
      type: "INCOME",
    });

    expect(response.category.name).toBe("Teste categoria");
    expect(response.category.type).toBe("INCOME");
  });

  test("Deve ser possível criar uma nova categoria personalizada para cada usuário.", async () => {
    const user = await userRepository.create({
      name: "Teste",
      email: "teste@teste.com",
      password_hash: await hash("teste123", 6),
    });

    const response = await useCase.execute({
      name: "Teste categoria",
      type: "INCOME",
      userId: user.id,
    });

    expect(response.category.name).toBe("Teste categoria");
    expect(response.category.type).toBe("INCOME");
    expect(response.category.userId).toBe(user.id);
  });

  test("Não deve ser possível criar uma nova categoria com um usuário inválido.", async () => {
    await expect(() =>
      useCase.execute({
        name: "Teste de transação",
        type: "INCOME",
        userId: "fakeid",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
