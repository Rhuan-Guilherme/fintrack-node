import { TransactionsRepositoryInterface } from "@/repositories/transactions-repository-interface";
import { Transaction } from "@prisma/client";
import { ResourceNotFoundError } from "../exceptions/resource-not-found-error";

interface GetUniqueTransactionResponse {
  transaction: Transaction;
}

export class GetUniqueTransactionUseCase {
  constructor(private transactionRepository: TransactionsRepositoryInterface) {}

  async execute(transactionId: string): Promise<GetUniqueTransactionResponse> {
    const transaction = await this.transactionRepository.find(transactionId);

    if (!transaction) {
      throw new ResourceNotFoundError();
    }

    return {
      transaction,
    };
  }
}
