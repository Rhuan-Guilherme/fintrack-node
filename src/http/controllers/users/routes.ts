import { FastifyTypedInstace } from "@/@types/fastify-zod-type";
import { createUser } from "./create-user";
import { createUserSchema } from "@/swagger/users/create-user-schema";
import { authenticateUser } from "./authenticate";
import { authenticateSchema } from "@/swagger/users/authenticate-schema";
import { getUser } from "./get-user";
import { getUserSchema } from "@/swagger/users/get-user-schema";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

export function userRoutes(app: FastifyTypedInstace) {
  app.post(
    "/register",
    {
      schema: createUserSchema,
    },
    createUser,
  );

  app.post("/authenticate", { schema: authenticateSchema }, authenticateUser);
  app.get("/me", { schema: getUserSchema, onRequest: [verifyJWT] }, getUser);
}
