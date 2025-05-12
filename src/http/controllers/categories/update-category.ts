import { NotAuthorizedForFeatureError } from "@/use-cases/exceptions/not-authorized-for-feature-error";
import { ResourceNotFoundError } from "@/use-cases/exceptions/resource-not-found-error";
import { makeUpdateCategories } from "@/use-cases/factories/categories/make-update-category";
import { FastifyReply, FastifyRequest } from "fastify";

interface UpdateCategoryBody {
  name?: string;
  type?: "INCOME" | "OUTCOME";
}

export async function updateCategory(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = request.params as { id: string };
  const { name, type } = request.body as UpdateCategoryBody;

  try {
    const updateUseCase = makeUpdateCategories();
    const { category } = await updateUseCase.execute({ id, name, type });
    return reply.status(200).send(category);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      reply.status(404).send({
        error: error.message,
        label: "Categoria não encotrada.",
      });
    }

    if (error instanceof NotAuthorizedForFeatureError) {
      reply.status(401).send({
        error: error.message,
        label:
          "Não é possivel deletar uma categoria que não foi criada por você.",
      });
    }
  }
}
