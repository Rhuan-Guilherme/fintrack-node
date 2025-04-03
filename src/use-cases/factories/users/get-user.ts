import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { GetUserUseCase } from "@/use-cases/_users/get-user";

export function makeGetUser() {
  const userRepository = new PrismaUserRepository();
  const getUserUseCase = new GetUserUseCase(userRepository);

  return getUserUseCase;
}
