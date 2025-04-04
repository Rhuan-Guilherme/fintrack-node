import { Prisma, Transaction } from "@prisma/client";

export interface TransactionsRepositoryInterface {
  create(transaction: Prisma.TransactionCreateInput): Promise<Transaction>;
  find(transactionId: string): Promise<Transaction | undefined>;
  findAllForUser(userId: string): Promise<Transaction[]>;
  delete(userId: string, transactionId: string): Promise<void>;
  update(
    transactionId: string,
    transaction: Prisma.TransactionUpdateInput,
  ): Promise<Transaction>;
}
