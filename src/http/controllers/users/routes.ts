import { FastifyInstance } from "fastify";
import { createUser } from "./create-user";
import { createUserSchema } from "@/swagger/users/create-user-schema";

export function userRoutes(app: FastifyInstance) {
  app.post("/register", { schema: createUserSchema }, createUser);
}
