import { z } from "zod";

export const createTransactionSchema = {
  description: "Cria uma nova tranação.",
  tags: ["Transações"],

  body: z.object({
    amount: z.union([z.string(), z.number()]),
    type: z.enum(["INCOME", "OUTCOME"]),
    description: z.string().min(1),
    categoryId: z.string().uuid(),
  }),

  response: {
    201: z.object({
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

    404: z.object({
      error: z.string(),
      label: z.string().describe("Usuário informado não encontrado."),
    }),

    400: z.any(),
  },
};
