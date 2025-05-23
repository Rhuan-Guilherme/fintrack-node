import { ResourceNotFoundError } from "@/use-cases/exceptions/resource-not-found-error";
import { makeCreateTransaction } from "@/use-cases/factories/transactions/make-create-transaction";
import { FastifyReply, FastifyRequest } from "fastify";

interface RequestSchema {
  amount: number | string;
  type: "INCOME" | "OUTCOME";
  description: string;
  categoryId: string;
}

export async function createTransaction(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { amount, type, description, categoryId } =
    request.body as RequestSchema;

  try {
    const createTransaction = makeCreateTransaction();
    const { transaction } = await createTransaction.execute({
      amount,
      categoryId,
      description,
      userId: request.user.sub,
      type,
    });
    reply.status(201).send(transaction);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      reply.status(404).send({
        error: error.message,
        label: "Usuário informado não encontrado.",
      });
      return;
    }
    throw new Error();
  }
}
