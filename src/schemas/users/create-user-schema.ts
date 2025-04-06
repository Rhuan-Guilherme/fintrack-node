import { z } from "zod";

export const createUserSchema = {
  description: "Cria um novo usuário.",
  tags: ["Transações"],

  body: z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    categoryId: z.string().uuid(),
    amount: z.union([z.string(), z.number()]),
    type: z.enum(["INCOME", "OUTCOME"]),
    description: z.string().min(1),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
  }),

  response: {
    201: z.object({
      id: z.string().uuid(),
      userId: z.string().uuid(),
      categoryId: z.string().uuid(),
      amount: z.union([z.string(), z.number()]),
      type: z.enum(["INCOME", "OUTCOME"]),
      description: z.string().min(1),
      created_at: z.string().datetime(),
      updated_at: z.string().datetime(),
      deleted: z.boolean(),
      category: z.object({
        id: z.string().uuid(),
        name: z.string(),
        type: z.enum(["INCOME", "OUTCOME"]),
      }),
    }),

    404: z.object({
      error: z.string(),
      label: z.string().describe("Usuário informados não encontrado."),
    }),
  },
};
