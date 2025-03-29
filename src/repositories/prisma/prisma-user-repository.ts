import { Prisma, User } from "@prisma/client";
import { UserRepositoryInterface } from "../user-repository-interface";
import { prisma } from "@/lib/prisma";

export class PrismaUserRepository implements UserRepositoryInterface {
  async create(user: Prisma.UserCreateInput): Promise<User> {
    const userCreate = await prisma.user.create({
      data: user,
    });

    return userCreate;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userFindByEmail = await prisma.user.findUnique({
      where: { email },
    });

    return userFindByEmail;
  }
  async findById(id: string): Promise<User | null> {
    const userFindById = await prisma.user.findUnique({
      where: { id },
    });

    return userFindById;
  }
  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany();

    return users;
  }
  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id },
    });
  }
  async update(id: string, user: Prisma.UserUpdateInput): Promise<User | null> {
    const userUpdate = await prisma.user.update({
      where: { id },
      data: user,
    });

    return userUpdate;
  }
}
