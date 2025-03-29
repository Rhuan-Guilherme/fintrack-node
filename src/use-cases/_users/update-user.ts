import { UserRepositoryInterface } from "@/repositories/user-repository-interface";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "../exceptions/resource-not-found-error";

interface UpdateUserRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
}

interface UpdateUserResponse {
  user: User | null;
}

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute({
    id,
    email,
    name,
    password,
  }: UpdateUserRequest): Promise<UpdateUserResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const userUpdated = await this.userRepository.update(id, {
      email,
      name,
      password_hash: password,
    });

    return {
      user: userUpdated,
    };
  }
}
