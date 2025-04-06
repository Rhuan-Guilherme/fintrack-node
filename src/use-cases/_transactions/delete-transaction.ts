import { TransactionsRepositoryInterface } from "@/repositories/transactions-repository-interface";
import { NotAuthorizedForFeatureError } from "../exceptions/not-authorized-for-feature-error";

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
    const transaction = await this.transactionRepository.find(transactionId);

    if (transaction?.userId !== userId) {
      throw new NotAuthorizedForFeatureError();
    }

    await this.transactionRepository.delete(transactionId);
  }
}
