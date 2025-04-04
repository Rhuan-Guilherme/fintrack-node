import { $Enums, Prisma, Transaction } from "@prisma/client";
import { TransactionsRepositoryInterface } from "../transactions-repository-interface";
import { randomUUID } from "node:crypto";

export class InMemoryTransactionRepository
  implements TransactionsRepositoryInterface
{
  public transactions: Transaction[] = [];
  async create(
    transaction: Prisma.TransactionCreateInput,
  ): Promise<Transaction> {
    const newTransaction = {
      id: randomUUID(),
      userId: (transaction.user as { connect: { id: string } }).connect.id,
      categoryId: (transaction.category as { connect: { id: string } }).connect
        .id,
      amount: transaction.amount as Prisma.Decimal,
      type: transaction.type as $Enums.TypeTransaction,
      description: transaction.description,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.transactions.push(newTransaction);
    return newTransaction;
  }
}
