import { Prisma, Transaction } from "@prisma/client";

export interface TransactionsRepositoryInterface {
  create(transaction: Prisma.TransactionCreateInput): Promise<Transaction>;
  findAllForUser(userId: string): Promise<Transaction[]>;
}
