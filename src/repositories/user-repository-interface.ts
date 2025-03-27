import { Prisma, User } from "@prisma/client";

export interface UserRepositoryInterface {
  create(user: Prisma.UserCreateInput): User;
  findById(id: number): User | null;
  findByEmail(email: string): User;
  findAll(): User[];
}
