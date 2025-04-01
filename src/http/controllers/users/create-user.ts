import { UserAlreadyExists } from "@/use-cases/exceptions/user-already-exists-error";
import { makeCreateUser } from "@/use-cases/factories/users/make-create-user";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const registerSchema = z.object({
    name: z.string().min(10).max(200),
    email: z.string().email(),
    password: z.string().min(2).max(100),
  });

  const { name, email, password } = registerSchema.parse(request.body);

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
