import { Prisma, User } from "@prisma/client";
import { UserRepositoryInterface } from "../user-repository-interface";
import { randomUUID } from "crypto";

export class InMemoryUserRepository implements UserRepositoryInterface {
  public user: User[] = [];

  create(user: Prisma.UserCreateInput): User {
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

  findByEmail(email: string): User | null {
    const user = this.user.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  findById(id: string): User | null {
    const user = this.user.find((user) => user.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  findAll(): User[] {
    return this.user;
  }

  delete(id: string): void {
    const indexUser = this.user.findIndex((user) => user.id !== id);

    if (indexUser !== -1) {
      this.user.splice(indexUser, 1);
    }
  }
}
