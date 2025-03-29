import { UserRepositoryInterface } from "@/repositories/user-repository-interface";
import { User } from "@prisma/client";

interface ListAllUsersResponse {
  users: User[];
}

export class ListAllUsersUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(): Promise<ListAllUsersResponse> {
    const users = await this.userRepository.findAll();

    return {
      users,
    };
  }
}
