import { TransactionsRepositoryInterface } from "@/repositories/transactions-repository-interface";

interface GetDeleteTransaction {
  userId: string;
  transactionId: string;
}

export class DeleteTransaction {
  constructor(private transactionRepository: TransactionsRepositoryInterface) {}

  async execute({
    transactionId,
    userId,
  }: GetDeleteTransaction): Promise<void> {
    await this.transactionRepository.delete(userId, transactionId);
  }
}
