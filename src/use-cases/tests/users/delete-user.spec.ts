import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { UserRepositoryInterface } from "@/repositories/user-repository-interface";
import { ResourceNotFoundError } from "@/use-cases/exceptions/resource-not-found-error";
import { DeleteUserUseCase } from "@/use-cases/_users/delete-user";
import { beforeEach, describe, expect, test } from "vitest";

let userRepository: UserRepositoryInterface;
let useCase: DeleteUserUseCase;

describe("Teste para deletar um usuário.", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    useCase = new DeleteUserUseCase(userRepository);
  });

  test("Deve ser deletar um usuário pelo ID.", async () => {
    userRepository.create({
      name: "Teste",
      email: "teste@teste.com",
      password_hash: "teste123",
    });

    const response = userRepository.create({
      name: "Teste2",
      email: "teste2@teste.com",
      password_hash: "teste123",
    });

    const allUsers = await userRepository.findAll();

    expect(allUsers.length).toEqual(2);

    useCase.execute({ id: response.id });

    expect(allUsers.length).toEqual(1);
  });

  test("Não deve ser possível deletar um usuário com o ID inválido.", async () => {
    await expect(() =>
      useCase.execute({ id: "FakeId" }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
