import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { CreateUserUseCase } from "@/use-cases/_users/create-user";

export function makeCreateUser() {
  const userRepository = new PrismaUserRepository();
  const createUserUseCase = new CreateUserUseCase(userRepository);

  return createUserUseCase;
}
