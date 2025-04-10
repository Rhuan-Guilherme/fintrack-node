import { TransactionsRepositoryInterface } from "@/repositories/transactions-repository-interface";
import { UserRepositoryInterface } from "@/repositories/user-repository-interface";
import { Transaction } from "@prisma/client";
import { ResourceNotFoundError } from "../exceptions/resource-not-found-error";

interface CreateTransactionRequest {
  userId: string;
  amount: number | string;
  type: "INCOME" | "OUTCOME";
  description: string;
  categoryId: string;
}

interface CreateTransactionResponse {
  transaction: Transaction;
}

export class CreateTransactionUseCase {
  constructor(
    private transactionRepository: TransactionsRepositoryInterface,
    private userRepository: UserRepositoryInterface,
  ) {}

  async execute({
    amount,
    description,
    type,
    userId,
    categoryId,
  }: CreateTransactionRequest): Promise<CreateTransactionResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const transaction = await this.transactionRepository.create({
      user: { connect: { id: user.id } },
      category: { connect: { id: categoryId } },
      amount: Number(amount),
      type,
      description,
    });

    return {
      transaction,
    };
  }
}
