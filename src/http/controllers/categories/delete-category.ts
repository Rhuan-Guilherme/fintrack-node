import { makeDeleteCategories } from "@/use-cases/factories/categories/make-delete-category";
import { FastifyReply, FastifyRequest } from "fastify";

export async function deleteCategory(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = request.params as { id: string };

  try {
    const deleteUseCase = makeDeleteCategories();
    await deleteUseCase.execute({ id });
    return reply.status(204).send();
  } catch (error) {
    return reply.status(500).send(error);
  }
}
