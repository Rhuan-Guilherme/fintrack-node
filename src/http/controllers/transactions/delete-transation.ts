import { NotAuthorizedForFeatureError } from "@/use-cases/exceptions/not-authorized-for-feature-error";
import { makeDeleteTransaction } from "@/use-cases/factories/transactions/make-delete-transaction";
import { FastifyReply, FastifyRequest } from "fastify";

export async function deleteTransaction(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = request.user.sub;
  const { id } = request.params as { id: string };

  try {
    const deleteTransaction = makeDeleteTransaction();
    await deleteTransaction.execute({ transactionId: id, userId });
    reply.status(204);
  } catch (error) {
    if (error instanceof NotAuthorizedForFeatureError) {
      reply.status(401).send({
        error: error.message,
        label:
          "Não é possivel deletar uma transação que não foi criada por você.",
      });
      return;
    }
    throw new Error();
  }
}
