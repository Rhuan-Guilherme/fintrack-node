import { z } from "zod";

export const deleteTransactionSchema = {
  description: "Deleta uma tranação.",
  tags: ["Transações"],

  response: {
    204: z.null(),

    404: z.object({
      error: z.string(),
      label: z
        .string()
        .describe(
          "Não é possivel deletar uma transação que não foi criada por você.",
        ),
    }),

    400: z.any(),
  },
};
