import { InMemoryTransactionRepository } from "@/repositories/in-memory/in-memory-transaction-repository";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { CreateTransactionUseCase } from "@/use-cases/_transactions/create-transaction";
import { ResourceNotFoundError } from "@/use-cases/exceptions/resource-not-found-error";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, test } from "vitest";

let userRepository: InMemoryUserRepository;
let transactionRepository: InMemoryTransactionRepository;
let useCase: CreateTransactionUseCase;

describe("Teste para criar uma nova transação", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    transactionRepository = new InMemoryTransactionRepository();
    useCase = new CreateTransactionUseCase(
      transactionRepository,
      userRepository,
    );
  });

  test("Deve ser possível criar uma nova transação.", async () => {
    const user = await userRepository.create({
      name: "Teste",
      email: "teste@teste.com",
      password_hash: await hash("teste123", 6),
    });

    const response = await useCase.execute({
      amount: 100,
      description: "Teste de transação",
      type: "INCOME",
      userId: user.id,
      categoryId: "129321",
    });

    expect(response.transaction.amount).toBe(100);
    expect(response.transaction.description).toBe("Teste de transação");
    expect(response.transaction.type).toBe("INCOME");
    expect(response.transaction.userId).toBe(user.id);
  });

  test("Não deve ser possível criar uma nova transação com um usuário inválido.", async () => {
    await expect(() =>
      useCase.execute({
        amount: 100,
        description: "Teste de transação",
        type: "INCOME",
        userId: "fakeid",
        categoryId: "fakeid",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
