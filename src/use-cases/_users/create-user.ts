import { UserRepositoryInterface } from "@/repositories/user-repository-interface";
import { User } from "@prisma/client";
import { hash } from "bcryptjs";
import { UserAlreadyExists } from "../exceptions/user-already-exists-error";

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateUserReponse {
  user: User;
}

export class CreateUserUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute({
    email,
    name,
    password,
  }: CreateUserRequest): Promise<CreateUserReponse> {
    const findUser = await this.userRepository.findByEmail(email);

    if (findUser) {
      throw new UserAlreadyExists();
    }

    const password_hash = await hash(password, 6);

    const newUser = await this.userRepository.create({
      name,
      email,
      password_hash,
    });

    return {
      user: newUser,
    };
  }
}
