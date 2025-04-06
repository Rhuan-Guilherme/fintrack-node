import { InMemoryTransactionRepository } from "@/repositories/in-memory/in-memory-transaction-repository";
import { DeleteTransaction } from "@/use-cases/_transactions/delete-transaction";
import { NotAuthorizedForFeatureError } from "@/use-cases/exceptions/not-authorized-for-feature-error";
import { beforeEach, describe, expect, test } from "vitest";

let transactionRepository: InMemoryTransactionRepository;
let useCase: DeleteTransaction;

describe("Teste deletar transações de um usuário.", () => {
  beforeEach(() => {
    transactionRepository = new InMemoryTransactionRepository();
    useCase = new DeleteTransaction(transactionRepository);
  });

  test("Deve ser possível deletar transações de um usuário pelo ID.", async () => {
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

    await useCase.execute({
      userId: "userId2",
      transactionId: "transactionId2",
    });

    const transaction = transactionRepository.transactions;

    expect(transaction.length).toEqual(10);
    expect(transaction[2].deleted).toEqual(true);
    expect(transaction[3].deleted).toEqual(false);
    expect(transaction[4].deleted).toEqual(false);
    expect(transaction[3].description).toBe("Teste de transação 3");
  });

  test("Não deve ser possivel deletar uma tranação que não foi criada pelo usuário.", async () => {
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

    expect(() =>
      useCase.execute({
        userId: "fakeId",
        transactionId: "transactionId2",
      }),
    ).rejects.toBeInstanceOf(NotAuthorizedForFeatureError);
  });
});
