import { InMemoryTransactionRepository } from "@/repositories/in-memory/in-memory-transaction-repository";
import { GetUniqueTransactionUseCase } from "@/use-cases/_transactions/get-unique-transaction";
import { ResourceNotFoundError } from "@/use-cases/exceptions/resource-not-found-error";
import { beforeEach, describe, expect, test } from "vitest";

let transactionRepository: InMemoryTransactionRepository;
let useCase: GetUniqueTransactionUseCase;

describe("Teste obter transações unica de um usuário.", () => {
  beforeEach(() => {
    transactionRepository = new InMemoryTransactionRepository();
    useCase = new GetUniqueTransactionUseCase(transactionRepository);
  });

  test("Deve ser possível obeter transações unicas de um usuário pelo ID.", async () => {
    for (let i = 0; i < 10; i++) {
      await transactionRepository.create({
        id: "transactionId" + i,
        amount: 100,
        description: `Teste de transação ${i}`,
        type: "INCOME",
        user: { connect: { id: "userId" + i } },
        category: { connect: { id: "categoryId" + i } },
      });
    }

    const { transaction } = await useCase.execute("transactionId1");

    expect(transaction.id).toEqual("transactionId1");
    expect(transaction.description).toEqual("Teste de transação 1");
  });

  test("Não deve ser possível obter transações com um usuário inválido.", async () => {
    await expect(() => useCase.execute("fakeid")).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    );
  });
});
