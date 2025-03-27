import { Prisma, User } from "@prisma/client";

export interface UserRepositoryInterface {
  create(user: Prisma.UserCreateInput): User;
  findByEmail(email: string): User | null;
  findById(id: string): User | null;
  // findAll(): User[];
}
