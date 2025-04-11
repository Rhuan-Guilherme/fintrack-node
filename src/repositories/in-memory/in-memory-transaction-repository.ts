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
      id: transaction.id || randomUUID(),
      userId: (transaction.user as { connect: { id: string } }).connect.id,
      categoryId: (transaction.category as { connect: { id: string } }).connect
        .id,
      amount: transaction.amount as Prisma.Decimal,
      type: transaction.type as $Enums.TypeTransaction,
      description: transaction.description,
      created_at: new Date(),
      updated_at: new Date(),
      deleted: false,
    };

    this.transactions.push(newTransaction);
    return newTransaction;
  }

  async find(transactionId: string): Promise<Transaction | null> {
    const transaction = this.transactions.find((transaction) => {
      return transaction.id === transactionId;
    });

    if (!transaction) {
      return null;
    }

    return transaction;
  }

  async findAllForUser(
    userId: string,
    page: number,
    perPage: number,
  ): Promise<Transaction[]> {
    return this.transactions
      .filter((transaction) => {
        return transaction.userId === userId;
      })
      .slice((page - 1) * perPage, page * perPage);
  }

  async delete(transactionID: string): Promise<void> {
    const indexTransaction = this.transactions.findIndex(
      (transaction) => transaction.id === transactionID,
    );

    if (indexTransaction !== -1) {
      this.transactions[indexTransaction].deleted = true;
    }
  }

  async update(
    transactionId: string,
    transaction: Prisma.TransactionUpdateInput,
  ): Promise<Transaction> {
    const indexTransaction = this.transactions.findIndex(
      (transactio) => transactio.id === transactionId,
    );

    if (indexTransaction !== -1) {
      this.transactions[indexTransaction] = {
        ...this.transactions[indexTransaction],
        ...transaction,
      } as Transaction;
    }

    return this.transactions[indexTransaction];
  }
}
