import { PrismaTransactionRepository } from "@/repositories/prisma/prisma-transaction-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { GetTransactionsForUserUseCase } from "@/use-cases/_transactions/get-transactions-for-user";

export function makeGetTransactionsForUser() {
  const userRepository = new PrismaUserRepository();
  const transactionRepository = new PrismaTransactionRepository();
  const getTransactionsForUserUseCase = new GetTransactionsForUserUseCase(
    transactionRepository,
    userRepository,
  );

  return getTransactionsForUserUseCase;
}
