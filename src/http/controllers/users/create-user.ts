import { UserAlreadyExists } from "@/use-cases/exceptions/user-already-exists-error";
import { makeCreateUser } from "@/use-cases/factories/users/make-create-user";
import { FastifyReply, FastifyRequest } from "fastify";

interface RequsetSchema {
  name: string;
  email: string;
  password: string;
}
export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const { name, email, password } = request.body as RequsetSchema;

  try {
    const createUser = makeCreateUser();
    await createUser.execute({ name, email, password });
    reply.status(201).send({ message: "Usuário registrado com sucesso." });
  } catch (error) {
    if (error instanceof UserAlreadyExists) {
      reply.status(400).send({
        message: error.message,
        label: "O e-mail informado ja está em uso.",
      });
    }
    throw new Error();
  }
}
