import { TransactionsRepositoryInterface } from "@/repositories/transactions-repository-interface";
import { UserRepositoryInterface } from "@/repositories/user-repository-interface";
import { Transaction } from "@prisma/client";
import { ResourceNotFoundError } from "../exceptions/resource-not-found-error";

interface GetTransactionsForUserRequest {
  userId: string;
  page: number;
  perPage: number;
}

interface GetTransactionsForUserResponse {
  transaction: Transaction[];
}

export class GetTransactionsForUserUseCase {
  constructor(
    private transactionRepository: TransactionsRepositoryInterface,
    private userRepository: UserRepositoryInterface,
  ) {}

  async execute({
    userId,
    page,
    perPage,
  }: GetTransactionsForUserRequest): Promise<GetTransactionsForUserResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const transaction = await this.transactionRepository.findAllForUser(
      user.id,
      page,
      perPage,
    );

    return {
      transaction,
    };
  }
}
