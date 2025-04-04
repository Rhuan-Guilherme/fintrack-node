import { z } from "zod";

export const authenticateSchema = {
  description: "Faz a autenticação do usuário.",
  tags: ["Usuários"],

  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),

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
