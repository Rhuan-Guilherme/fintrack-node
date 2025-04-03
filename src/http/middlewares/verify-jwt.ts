import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return reply.status(401).send({ error: "not authorized" });
  }
}
