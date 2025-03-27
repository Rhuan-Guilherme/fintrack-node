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
}
