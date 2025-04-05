import { FastifyTypedInstace } from "@/@types/fastify-zod-type";
import { createTransaction } from "./create-transaction";

export function transactionRoutes(app: FastifyTypedInstace) {
  app.post("/transaction/create", createTransaction);
}
