import { PrismaTransactionRepository } from "@/repositories/prisma/prisma-transaction-repository";
import { GetUniqueTransactionUseCase } from "@/use-cases/_transactions/get-unique-transaction";

export function makeGetUniqueTransaction() {
  const transactionRepository = new PrismaTransactionRepository();
  const getUniqueTransactionUseCase = new GetUniqueTransactionUseCase(
    transactionRepository,
  );

  return getUniqueTransactionUseCase;
}
