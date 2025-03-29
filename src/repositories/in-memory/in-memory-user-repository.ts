import { Prisma, User } from "@prisma/client";
import { UserRepositoryInterface } from "../user-repository-interface";
import { randomUUID } from "crypto";

export class InMemoryUserRepository implements UserRepositoryInterface {
  public user: User[] = [];

  async create(user: Prisma.UserCreateInput): Promise<User> {
    const newUser = {
      id: randomUUID(),
      name: user.name,
      email: user.email,
      password_hash: user.password_hash,
      created_at: new Date(),
    };

    this.user.push(newUser);

    return newUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.user.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.user.find((user) => user.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findAll(): Promise<User[]> {
    return this.user;
  }

  async delete(id: string): Promise<void> {
    const indexUser = this.user.findIndex((user) => user.id !== id);

    if (indexUser !== -1) {
      this.user.splice(indexUser, 1);
    }
  }

  async update(id: string, user: Prisma.UserUpdateInput): Promise<User | null> {
    const indexUser = this.user.findIndex((user) => user.id === id);

    if (indexUser !== -1) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.user[indexUser] = { ...this.user[indexUser], ...user } as any;
      return this.user[indexUser];
    }

    return null;
  }
}
