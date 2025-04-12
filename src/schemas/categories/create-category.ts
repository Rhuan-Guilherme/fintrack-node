import { z } from "zod";

export const createCategorySchema = {
  description: "Cria uma nova categorias personalizada.",
  tags: ["Categorias"],

  body: z.object({
    name: z.string(),
    type: z.enum(["INCOME", "OUTCOME"]),
  }),

  response: {
    201: z.object({
      id: z.string(),
      name: z.string(),
      type: z.enum(["INCOME", "OUTCOME"]),
      userId: z.string(),
    }),

    404: z.object({
      error: z.string(),
      label: z.string().describe("Usuário informado não encontrado."),
    }),

    400: z.any(),
  },
};
