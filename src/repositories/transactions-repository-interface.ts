import { Prisma, Transaction } from "@prisma/client";

export interface TransactionsRepositoryInterface {
  create(transaction: Prisma.TransactionCreateInput): Promise<Transaction>;
  find(transactionId: string): Promise<Transaction | null>;
  findAllForUser(
    userId: string,
    page: number,
    perPage: number,
  ): Promise<Transaction[]>;
  delete(transactionId: string): Promise<void>;
  update(
    transactionId: string,
    transaction: Prisma.TransactionUpdateInput,
  ): Promise<Transaction>;
}
