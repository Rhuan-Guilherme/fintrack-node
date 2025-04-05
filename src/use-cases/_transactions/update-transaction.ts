import { TransactionsRepositoryInterface } from "@/repositories/transactions-repository-interface";
import { Prisma, Transaction } from "@prisma/client";
import { ResourceNotFoundError } from "../exceptions/resource-not-found-error";

interface UpdateTransactionRequest {
  transactionId: string;
  transaction: Prisma.TransactionUpdateInput;
}

interface UpdateTransactionResponse {
  transaction: Transaction;
}

export class UpdateTransactionUseCase {
  constructor(private transactionRepository: TransactionsRepositoryInterface) {}

  async execute({
    transactionId,
    transaction,
  }: UpdateTransactionRequest): Promise<UpdateTransactionResponse> {
    const findTransaction =
      await this.transactionRepository.find(transactionId);

    if (!findTransaction) {
      throw new ResourceNotFoundError();
    }

    const transactionFinded = await this.transactionRepository.update(
      transactionId,
      transaction,
    );

    return {
      transaction: transactionFinded,
    };
  }
}
