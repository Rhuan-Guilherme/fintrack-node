import { UserRepositoryInterface } from "@/repositories/user-repository-interface";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";
import { InvalidCredentials } from "../exceptions/invalid-credentials-error";

interface AuthenticateRequest {
  email: string;
  password: string;
}

interface AuthenticateReponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute({
    email,
    password,
  }: AuthenticateRequest): Promise<AuthenticateReponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentials();
    }

    const passwordCorrect = await compare(password, user.password_hash);

    if (!passwordCorrect) {
      throw new InvalidCredentials();
    }

    return {
      user,
    };
  }
}
