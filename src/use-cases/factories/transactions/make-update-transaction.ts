import { PrismaTransactionRepository } from "@/repositories/prisma/prisma-transaction-repository";
import { UpdateTransactionUseCase } from "@/use-cases/_transactions/update-transaction";

export function makeUpdateTransaction() {
  const transactionRepository = new PrismaTransactionRepository();
  const updateTransactionUseCase = new UpdateTransactionUseCase(
    transactionRepository,
  );

  return updateTransactionUseCase;
}
