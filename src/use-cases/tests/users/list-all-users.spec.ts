import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { UserRepositoryInterface } from "@/repositories/user-repository-interface";
import { ListAllUsersUseCase } from "@/use-cases/users/list-all-users";
import { beforeEach, describe, expect, test } from "vitest";

let userRepository: UserRepositoryInterface;
let useCase: ListAllUsersUseCase;

describe("Teste para obter um usuário pelo ID.", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    useCase = new ListAllUsersUseCase(userRepository);
  });

  test("Deve ser obter dados de um usuário pelo ID.", async () => {
    userRepository.create({
      name: "Teste",
      email: "teste@teste.com",
      password_hash: "teste123",
    });

    userRepository.create({
      name: "Teste2",
      email: "teste2@teste.com",
      password_hash: "teste123",
    });

    const response = await useCase.execute();

    expect(response.users.length).toBe(2);
    expect(response.users[0].name).toBe("Teste");
    expect(response.users[1].name).toBe("Teste2");
  });
});
