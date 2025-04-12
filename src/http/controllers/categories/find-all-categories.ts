import { makeFindAllCategories } from "@/use-cases/factories/categories/make-find-all-categories";
import { FastifyReply, FastifyRequest } from "fastify";

export async function findAllCategories(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = request.user.sub;

  try {
    const findAllCategories = makeFindAllCategories();
    const { categories } = await findAllCategories.execute({ userId });
    reply.status(200).send(categories);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return reply.status(500).send("Erro ao processar solicitação.");
  }
  throw new Error();
}
