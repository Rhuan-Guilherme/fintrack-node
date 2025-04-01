import { FastifyTypedInstace } from "@/@types/fastify-zod-type";
import { createUser } from "./create-user";
import { createUserSchema } from "@/swagger/users/create-user-schema";

export function userRoutes(app: FastifyTypedInstace) {
  app.post(
    "/register",
    {
      schema: createUserSchema,
    },
    createUser,
  );
}
