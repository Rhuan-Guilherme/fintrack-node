import { z } from "zod";

export const getTransactionsForUserSchema = {
  description: "Obterm uma tranações de um usuários.",
  tags: ["Transações"],

  querystring: z.object({
    page: z.string(),
    perPage: z.string(),
  }),

  response: {
    201: z.array(
      z.object({
        id: z.string(),
        userId: z.string(),
        categoryId: z.string(),
        amount: z.any(),
        type: z.enum(["INCOME", "OUTCOME"]),
        description: z.string(),
        created_at: z.date(),
        updated_at: z.date(),
        deleted: z.boolean(),
        category: z.object({
          id: z.string(),
          name: z.string(),
          type: z.enum(["INCOME", "OUTCOME"]),
          userId: z.string().nullable(),
        }),
      }),
    ),

    404: z.object({
      error: z.string(),
      label: z.string().describe("Parametro informado não encontrado."),
    }),

    400: z.any(),
  },
};
