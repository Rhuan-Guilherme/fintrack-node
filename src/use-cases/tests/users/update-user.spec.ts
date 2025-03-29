import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { UserRepositoryInterface } from "@/repositories/user-repository-interface";
import { ResourceNotFoundError } from "@/use-cases/exceptions/resource-not-found-error";
import { UpdateUserUseCase } from "@/use-cases/users/update-user";
import { beforeEach, describe, expect, test } from "vitest";

let userRepository: UserRepositoryInterface;
let useCase: UpdateUserUseCase;

describe("Teste para atualizar dado de um usuário.", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    useCase = new UpdateUserUseCase(userRepository);
  });

  test("Deve ser deletar um usuário pelo ID.", async () => {
    const response = userRepository.create({
      name: "Teste2",
      email: "teste2@teste.com",
      password_hash: "teste123",
    });

    const { user } = await useCase.execute({
      id: response.id,
      name: response.name,
      email: "JohnDoe@teste.com",
      password: response.password_hash,
    });

    expect(user?.email).toBe("JohnDoe@teste.com");
  });

  test("Não deve ser possível atualizar um usuário com o ID inválido.", async () => {
    await expect(() =>
      useCase.execute({ id: "FakeId" }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
