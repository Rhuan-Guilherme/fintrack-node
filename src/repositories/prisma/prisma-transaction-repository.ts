import { Prisma, Transaction } from "@prisma/client";
import { TransactionsRepositoryInterface } from "../transactions-repository-interface";
import { prisma } from "@/lib/prisma";

export class PrismaTransactionRepository
  implements TransactionsRepositoryInterface
{
  async create(
    transaction: Prisma.TransactionCreateInput,
  ): Promise<Transaction> {
    const newTransaction = await prisma.transaction.create({
      data: transaction,
    });

    return newTransaction;
  }
  async find(transactionId: string): Promise<Transaction | null> {
    const transaction = await prisma.transaction.findFirst({
      where: { id: transactionId },
    });

    return transaction;
  }
  async findAllForUser(userId: string): Promise<Transaction[]> {
    const transactions = await prisma.transaction.findMany({
      where: { userId, deleted: false },
    });

    return transactions;
  }
  async delete(userId: string, transactionId: string): Promise<void> {
    await prisma.transaction.update({
      where: { id: transactionId, userId },
      data: { deleted: true },
    });
  }
  async update(
    transactionId: string,
    transaction: Prisma.TransactionUpdateInput,
  ): Promise<Transaction> {
    const transactionUpdated = await prisma.transaction.update({
      where: { id: transactionId },
      data: transaction,
    });

    return transactionUpdated;
  }
}
