import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export function createUser(request: FastifyRequest, reply: FastifyReply) {
  const registerSchema = z.object({
    name: z.string().min(2).max(200),
    email: z.string().email(),
    password: z.string().min(2).max(100),
  });

  const { name, email, password } = registerSchema.parse(request.body);

  reply.send({ name, email, password });
}
