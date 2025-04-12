import { z } from "zod";

export const findTransactionsSchema = {
  description: "Obterm categorias",
  tags: ["Categorias"],

  response: {
    200: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        type: z.enum(["INCOME", "OUTCOME"]),
        userId: z.any(),
      }),
    ),

    default: z.any(),
  },
};
