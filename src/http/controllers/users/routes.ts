import { FastifyTypedInstace } from "@/@types/fastify-zod-type";
import { createUser } from "./create-user";
import { createUserSchema } from "@/swagger/users/create-user-schema";
import { authenticateUser } from "./authenticate";
import { authenticateSchema } from "@/swagger/users/authenticate-schema";

export function userRoutes(app: FastifyTypedInstace) {
  app.post(
    "/register",
    {
      schema: createUserSchema,
    },
    createUser,
  );

  app.post("/authenticate", { schema: authenticateSchema }, authenticateUser);
}
