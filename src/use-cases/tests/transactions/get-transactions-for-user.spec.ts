import { InMemoryTransactionRepository } from "@/repositories/in-memory/in-memory-transaction-repository";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { GetTransactionsForUserUseCase } from "@/use-cases/_transactions/get-transactions-for-user";
import { ResourceNotFoundError } from "@/use-cases/exceptions/resource-not-found-error";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, test } from "vitest";

let userRepository: InMemoryUserRepository;
let transactionRepository: InMemoryTransactionRepository;
let useCase: GetTransactionsForUserUseCase;

describe("Teste obter transações de um usuário.", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    transactionRepository = new InMemoryTransactionRepository();
    useCase = new GetTransactionsForUserUseCase(
      transactionRepository,
      userRepository,
    );
  });

  test("Deve ser possível obeter transações de um usuário pelo ID.", async () => {
    const user = await userRepository.create({
      name: "Teste",
      email: "teste@teste.com",
      password_hash: await hash("teste123", 6),
    });

    for (let i = 0; i < 10; i++) {
      await transactionRepository.create({
        amount: 100,
        description: `Teste de transação ${i}`,
        type: "INCOME",
        user: { connect: { id: user.id } },
        category: { connect: { id: "categoryId" + i } },
      });
    }

    const { transaction } = await useCase.execute({ userId: user.id });

    expect(transaction.length).toEqual(10);
    expect(transaction[0].description).toBe("Teste de transação 0");
    expect(transaction[9].description).toBe("Teste de transação 9");
    expect(transaction[0].type).toBe("INCOME");
    expect(transaction[9].type).toBe("INCOME");
    expect(transaction[0].categoryId).toBe("categoryId0");
  });

  test("Não deve ser possível obter transações com um usuário inválido.", async () => {
    await expect(() =>
      useCase.execute({
        userId: "fakeid",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
