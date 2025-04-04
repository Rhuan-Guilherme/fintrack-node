import { FastifyTypedInstace } from "@/@types/fastify-zod-type";
import { createUser } from "./create-user";
import { createUserSchema } from "@/schemas/users/create-user-schema";
import { authenticateUser } from "./authenticate";
import { authenticateSchema } from "@/schemas/users/authenticate-schema";
import { getUser } from "./get-user";
import { getUserSchema } from "@/schemas/users/get-user-schema";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { refreshToken } from "./refresh-token";
import { refreshTokenSchema } from "@/schemas/users/refresh-token";

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
  app.patch("/refresh/token", { schema: refreshTokenSchema }, refreshToken);
}
