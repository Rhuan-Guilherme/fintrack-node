import { z } from "zod";

export const refreshTokenSchema = {
  description: "Faz a validação do token utilizando refresh token.",
  tags: ["Usuários"],

  response: {
    200: z.object({
      token: z.string(),
    }),

    403: z.object({
      error: z.string(),
      label: z.string().describe("Usuário ou senha inválidos."),
    }),
  },
};
