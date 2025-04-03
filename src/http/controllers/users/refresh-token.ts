import { FastifyReply, FastifyRequest } from "fastify";

export async function refreshToken(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    await request.jwtVerify({ onlyCookie: true });
    const token = await reply.jwtSign({}, { sign: { sub: request.user.sub } });

    const refreshToken = await reply.jwtSign(
      {},
      { sign: { sub: request.user.sub, expiresIn: "7d" } },
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
    reply.status(403).send({
      error: error,
      label: "Token inválido.",
    });
    throw new Error();
  }
}
