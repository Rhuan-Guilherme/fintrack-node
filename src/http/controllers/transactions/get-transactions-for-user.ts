import { ResourceNotFoundError } from "@/use-cases/exceptions/resource-not-found-error";
import { makeGetTransactionsForUser } from "@/use-cases/factories/transactions/make-get-transactions-for-user";
import { FastifyReply, FastifyRequest } from "fastify";

interface RequestQuery {
  page: number;
  perPage: number;
}

export async function getTransactionsForUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = request.user.sub;
  const { page, perPage } = request.query as RequestQuery;

  try {
    const getTransactions = makeGetTransactionsForUser();
    const { transaction } = await getTransactions.execute({
      userId,
      page: Number(page),
      perPage: Number(perPage),
    });
    reply.status(200).send(transaction);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      reply.status(404).send({
        error: error.message,
        label: "Parametro informado não encontrado. Usuário inválido!",
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    throw new Error(error as any);
  }
}
