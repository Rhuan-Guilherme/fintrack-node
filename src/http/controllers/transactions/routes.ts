import { FastifyTypedInstace } from "@/@types/fastify-zod-type";
import { createTransaction } from "./create-transaction";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { createTransactionSchema } from "@/schemas/transactions/create-trasnsaction";
import { deleteTransaction } from "./delete-transation";
import { deleteTransactionSchema } from "@/schemas/transactions/delete-transaction";
import { getUniqueTransaction } from "./get-unique-transaction";
import { getUniqueTransactionSchema } from "@/schemas/transactions/get-unique-transaction";
import { getTransactionsForUser } from "./get-transactions-for-user";
import { getTransactionsForUserSchema } from "@/schemas/transactions/get-transactions-for-user";

export function transactionRoutes(app: FastifyTypedInstace) {
  app.get(
    "/transaction",
    { schema: getUniqueTransactionSchema, onRequest: [verifyJWT] },
    getUniqueTransaction,
  );

  app.get(
    "/transactions",
    { schema: getTransactionsForUserSchema, onRequest: [verifyJWT] },
    getTransactionsForUser,
  );

  app.post(
    "/transaction/create",
    { schema: createTransactionSchema, onRequest: [verifyJWT] },
    createTransaction,
  );

  app.delete(
    "/transaction/delete",
    { schema: deleteTransactionSchema, onRequest: [verifyJWT] },
    deleteTransaction,
  );
}
