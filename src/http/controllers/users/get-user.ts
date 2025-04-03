import { ResourceNotFoundError } from "@/use-cases/exceptions/resource-not-found-error";
import { makeGetUser } from "@/use-cases/factories/users/get-user";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getUser(request: FastifyRequest, reply: FastifyReply) {
  request.jwtVerify();
  const id = request.user.sub;

  try {
    const getUser = makeGetUser();
    const { user } = await getUser.execute({ id });
    console.log(user);

    reply.status(200).send({ user });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      reply.status(404).send({
        error: error.message,
        label: "Recurso informado não encontrado.",
      });
    }
    throw new Error();
  }
}
