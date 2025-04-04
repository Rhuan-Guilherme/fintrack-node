import { TransactionsRepositoryInterface } from "@/repositories/transactions-repository-interface";
import { Transaction } from "@prisma/client";

interface CreateTransactionRequest {
  userId: string;
  amount: number;
  type: "INCOME" | "OUTCOME";
  description: string;
}

interface CreateTransactionResponse {
  transaction: Transaction;
}

export class CreateTransactionUseCase {
  constructor(private transactionRepository: TransactionsRepositoryInterface) {}

  async execute({
    amount,
    description,
    type,
    userId,
  }: CreateTransactionRequest): Promise<CreateTransactionResponse> {
    const transaction = await this.transactionRepository.create({
      user: { connect: { id: userId } },
      amount,
      type,
      description,
    });

    return {
      transaction,
    };
  }
}
