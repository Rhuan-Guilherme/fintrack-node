import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { AuthenticateUseCase } from "@/use-cases/_users/authenticate";

export function makeAuthenticateUser() {
  const userRepository = new PrismaUserRepository();
  const authenticateUseCase = new AuthenticateUseCase(userRepository);

  return authenticateUseCase;
}
