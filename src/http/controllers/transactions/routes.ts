import { FastifyTypedInstace } from "@/@types/fastify-zod-type";
import { createTransaction } from "./create-transaction";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

export function transactionRoutes(app: FastifyTypedInstace) {
  app.post(
    "/transaction/create",
    { onRequest: [verifyJWT] },
    createTransaction,
  );
}
