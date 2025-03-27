import { UserRepositoryInterface } from "@/repositories/user-repository-interface";
import { User } from "@prisma/client";
import { UserAlreadyExists } from "../exceptions/user-already-exists";

interface GetUserRequest {
  id: string;
}

interface GetUserReponse {
  user: User;
}

export class GetUserUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute({ id }: GetUserRequest): Promise<GetUserReponse> {
    const user = this.userRepository.findById(id);

    if (!user) {
      throw new UserAlreadyExists();
    }

    return {
      user,
    };
  }
}
