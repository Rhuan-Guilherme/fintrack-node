import { ResourceNotFoundError } from "@/use-cases/exceptions/resource-not-found-error";
import { makeCreateCategory } from "@/use-cases/factories/categories/make-create-category";
import { FastifyReply, FastifyRequest } from "fastify";

interface RequestSchema {
  type: "INCOME" | "OUTCOME";
  name: string;
}

export async function createCategory(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = request.user.sub;
  const { name, type } = request.body as RequestSchema;

  try {
    const createCategory = makeCreateCategory();
    const { category } = await createCategory.execute({
      name,
      type,
      userId,
    });
    reply.status(201).send(category);
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
