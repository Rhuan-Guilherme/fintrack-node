import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { UserRepositoryInterface } from "@/repositories/user-repository-interface";
import { UserAlreadyExists } from "@/use-cases/exceptions/user-already-exists-error";
import { CreateUserUseCase } from "@/use-cases/_users/create-user";
import { compare } from "bcryptjs";
import { beforeEach, describe, expect, test } from "vitest";

let userRepository: UserRepositoryInterface;
let useCase: CreateUserUseCase;

describe("Teste para a criação de um novo usuário.", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    useCase = new CreateUserUseCase(userRepository);
  });

  test("Deve ser possível criar um novo usuário.", async () => {
    const user = {
      name: "Teste",
      email: "teste@teste.com",
      password: "teste123",
    };

    const response = await useCase.execute({
      email: user.email,
      password: user.password,
      name: user.name,
    });

    expect(response.user.name).toBe(user.name);
    expect(response.user.email).toBe(user.email);
  });

  test("Não deve ser possível criar um novo usuário com email já existente.", async () => {
    await useCase.execute({
      name: "Teste",
      email: "teste@teste.com",
      password: "teste123",
    });

    await expect(() =>
      useCase.execute({
        name: "Teste",
        email: "teste@teste.com",
        password: "teste123",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExists);
  });

  test("A senha do usuário deve ser criptografada", async () => {
    const newUser = {
      name: "Teste",
      email: "teste@teste.com",
      password: "teste123",
    };

    const { user } = await useCase.execute({
      email: newUser.email,
      password: newUser.password,
      name: newUser.name,
    });

    const passwordIsHashed = await compare(
      newUser.password,
      user.password_hash,
    );

    expect(passwordIsHashed).toBe(true);
  });
});
