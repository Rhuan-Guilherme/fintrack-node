import { InvalidCredentials } from "@/use-cases/exceptions/invalid-credentials-error";
import { makeAuthenticateUser } from "@/use-cases/factories/users/make-authenticate";
import { FastifyReply, FastifyRequest } from "fastify";

interface RequsetSchema {
  email: string;
  password: string;
}
export async function authenticateUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { email, password } = request.body as RequsetSchema;

  try {
    const authenticateUser = makeAuthenticateUser();
    const { user } = await authenticateUser.execute({ email, password });

    const token = await reply.jwtSign({}, { sign: { sub: user.id } });

    const refreshToken = await reply.jwtSign(
      {},
      { sign: { sub: user.id, expiresIn: "7d" } },
    );

    reply
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token });
  } catch (error) {
    if (error instanceof InvalidCredentials) {
      reply.status(403).send({
        error: error.message,
        label: "Usuário ou senha inválidos.",
      });
    }
    throw new Error();
  }
}
