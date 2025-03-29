import { Prisma, User } from "@prisma/client";

export interface UserRepositoryInterface {
  create(user: Prisma.UserCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  delete(id: string): Promise<void>;
  update(id: string, user: Prisma.UserUpdateInput): Promise<User | null>;
}
