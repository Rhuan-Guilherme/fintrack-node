import { PrismaTransactionRepository } from "@/repositories/prisma/prisma-transaction-repository";
import { DeleteTransaction } from "@/use-cases/_transactions/delete-transaction";

export function makeDeleteTransaction() {
  const transactionRepository = new PrismaTransactionRepository();
  const deleteTransaction = new DeleteTransaction(transactionRepository);

  return deleteTransaction;
}
