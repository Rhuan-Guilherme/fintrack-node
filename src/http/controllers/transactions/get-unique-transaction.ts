import { ResourceNotFoundError } from "@/use-cases/exceptions/resource-not-found-error";
import { makeGetUniqueTransaction } from "@/use-cases/factories/transactions/make-get-unique-transaction";
import { FastifyReply, FastifyRequest } from "fastify";

interface RequestSchema {
  transactionId: string;
}

export async function getUniqueTransaction(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { transactionId } = request.query as RequestSchema;

  try {
    const getUniqueTransaction = makeGetUniqueTransaction();
    const { transaction } = await getUniqueTransaction.execute(transactionId);
    reply.status(200).send(transaction);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      reply.status(404).send({
        error: error.message,
        label: "Parametro informado não encontrado.",
      });
      return;
    }
    throw new Error();
  }
}
