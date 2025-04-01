import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { UserRepositoryInterface } from "@/repositories/user-repository-interface";
import { beforeEach, describe, expect, test } from "vitest";
import { AuthenticateUseCase } from "@/use-cases/_users/authenticate";
import { InvalidCredentials } from "@/use-cases/exceptions/invalid-credentials-error";
import { hash } from "bcryptjs";

let userRepository: UserRepositoryInterface;
let useCase: AuthenticateUseCase;

describe("Teste autenticar um usuário.", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    useCase = new AuthenticateUseCase(userRepository);
  });

  test("Deve ser possível autenticar um usuário com email e senha.", async () => {
    await userRepository.create({
      name: "Teste2",
      email: "teste2@teste.com",
      password_hash: await hash("teste123", 6),
    });

    const { user } = await useCase.execute({
      email: "teste2@teste.com",
      password: "teste123",
    });

    expect(user?.email).toBe("teste2@teste.com");
    expect(user?.name).toBe("Teste2");
  });

  test("Não deve ser possível autenticar um usuário com a senha inválida.", async () => {
    await userRepository.create({
      name: "Teste2",
      email: "teste2@teste.com",
      password_hash: await hash("teste123", 6),
    });

    await expect(() =>
      useCase.execute({
        email: "teste2@teste.com",
        password: "fake senha",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentials);
  });
});
