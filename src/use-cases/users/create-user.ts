import { UserRepositoryInterface } from "@/repositories/user-repository-interface";
import { User } from "@prisma/client";
import { hash } from "bcryptjs";

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
    const findUser = this.userRepository.findByEmail(email);

    if (findUser) {
      throw new Error("User with the same email already exists");
    }

    const password_hash = await hash(password, 6);

    const newUser = this.userRepository.create({
      name,
      email,
      password_hash,
    });

    return {
      user: newUser,
    };
  }
}
