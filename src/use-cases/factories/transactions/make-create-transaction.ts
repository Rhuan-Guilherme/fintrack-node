import { PrismaTransactionRepository } from "@/repositories/prisma/prisma-transaction-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { CreateTransactionUseCase } from "@/use-cases/_transactions/create-transaction";

export function makeCreateTransaction() {
  const userRepository = new PrismaUserRepository();
  const transactionRepository = new PrismaTransactionRepository();
  const createTransactionUseCase = new CreateTransactionUseCase(
    transactionRepository,
    userRepository,
  );

  return createTransactionUseCase;
}
