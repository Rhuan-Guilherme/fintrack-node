import { InMemoryTransactionRepository } from "@/repositories/in-memory/in-memory-transaction-repository";
import { UpdateTransactionUseCase } from "@/use-cases/_transactions/update-transaction";
import { ResourceNotFoundError } from "@/use-cases/exceptions/resource-not-found-error";
import { beforeEach, describe, expect, test } from "vitest";

let transactionRepository: InMemoryTransactionRepository;
let useCase: UpdateTransactionUseCase;

describe("Teste atualizar uma transação unica de um usuário.", () => {
  beforeEach(() => {
    transactionRepository = new InMemoryTransactionRepository();
    useCase = new UpdateTransactionUseCase(transactionRepository);
  });

  test("Deve ser possível atualizar uma transações unicas de um usuário.", async () => {
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

    const { transaction } = await useCase.execute({
      transactionId: "transactionId1",
      transaction: {
        description: "Atualizando transação 1",
      },
    });

    expect(transaction.id).toEqual("transactionId1");
    expect(transaction.description).toEqual("Atualizando transação 1");
  });

  test("Não deve ser possível obter transações com um usuário inválido.", async () => {
    await expect(() =>
      useCase.execute({
        transactionId: "fakeid",
        transaction: {
          description: "Atualizando transação 1",
        },
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
