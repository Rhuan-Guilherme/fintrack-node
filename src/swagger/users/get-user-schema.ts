import { z } from "zod";

export const getUserSchema = {
  description: "Retorna dados do usuário.",
  tags: ["Usuários"],

  response: {
    200: z.object({
      user: z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
      }),
    }),

    404: z.object({
      error: z.string(),
      label: z.string().describe("Recurso informado não encontrado."),
    }),
  },
};
