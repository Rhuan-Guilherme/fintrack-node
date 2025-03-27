import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { UserRepositoryInterface } from "@/repositories/user-repository-interface";
import { ResourceNotFoundError } from "@/use-cases/exceptions/resource-not-found-error";
import { GetUserUseCase } from "@/use-cases/users/get-user";
import { beforeEach, describe, expect, test } from "vitest";

let userRepository: UserRepositoryInterface;
let useCase: GetUserUseCase;

describe("Teste para obter um usuário pelo ID.", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    useCase = new GetUserUseCase(userRepository);
  });

  test("Deve ser obter dados de um usuário pelo ID.", async () => {
    const response = userRepository.create({
      name: "Teste",
      email: "teste@teste.com",
      password_hash: "teste123",
    });

    const { user } = await useCase.execute({ id: response.id });

    expect(user).toEqual(expect.objectContaining({ name: "Teste" }));
    expect(user.id).toBe(response.id);
    expect(user.name).toBe("Teste");
  });

  test("Não deve ser possível buscar um usuário com o ID inválido.", async () => {
    await expect(() =>
      useCase.execute({ id: "FakeID" }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
