import { FastifyTypedInstace } from "@/@types/fastify-zod-type";
import { createTransaction } from "./create-transaction";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { createTransactionSchema } from "@/schemas/transactions/create-trasnsaction";
import { deleteTransaction } from "./delete-transation";

export function transactionRoutes(app: FastifyTypedInstace) {
  app.post(
    "/transaction/create",
    { schema: createTransactionSchema, onRequest: [verifyJWT] },
    createTransaction,
  );

  app.delete(
    "/transaction/delete",
    { onRequest: [verifyJWT] },
    deleteTransaction,
  );
}
