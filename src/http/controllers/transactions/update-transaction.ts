import { ResourceNotFoundError } from "@/use-cases/exceptions/resource-not-found-error";
import { makeUpdateTransaction } from "@/use-cases/factories/transactions/make-update-transaction";
import { FastifyReply, FastifyRequest } from "fastify";

interface RequestSchema {
  amount: number | string;
  type: "INCOME" | "OUTCOME";
  description: string;
  userId: string;
  categoryId: string;
}

export async function updateTransaction(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = request.params as { id: string };
  const transactionRequest = request.body as RequestSchema;

  try {
    const updateTransaction = makeUpdateTransaction();
    const { transaction } = await updateTransaction.execute({
      transactionId: id,
      transaction: {
        ...transactionRequest,
      },
    });
    reply.status(200).send(transaction);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      reply.status(404).send({
        error: error.message,
        label: "Transação não encontrada.",
      });
      return;
    }
    throw new Error();
  }
}
