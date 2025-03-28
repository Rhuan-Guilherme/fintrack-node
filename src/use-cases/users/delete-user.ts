import { UserRepositoryInterface } from "@/repositories/user-repository-interface";
import { ResourceNotFoundError } from "../exceptions/resource-not-found-error";

interface DeleteUserRequest {
  id: string;
}

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  execute({ id }: DeleteUserRequest): void {
    const user = this.userRepository.findById(id);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    this.userRepository.delete(id);
  }
}
