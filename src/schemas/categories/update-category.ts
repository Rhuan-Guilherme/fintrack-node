import { z } from "zod";

export const updateCategorySchema = {
  description: "Faz a atualização de uma categoria.",
  tags: ["Categorias"],

  body: z.object({
    type: z.enum(["INCOME", "OUTCOME"]).optional(),
    name: z.string().optional(),
  }),

  response: {
    200: z.object({
      id: z.string(),
      name: z.string(),
      type: z.enum(["INCOME", "OUTCOME"]),
      userId: z.string(),
    }),

    404: z.object({
      error: z.string(),
      label: z.string().describe("categoria não encontrada."),
    }),

    401: z.object({
      error: z.string(),
      label: z
        .string()
        .describe(
          "Não é possivel deletar uma categoria que não foi criada por você.",
        ),
    }),

    400: z.any(),
  },
};
