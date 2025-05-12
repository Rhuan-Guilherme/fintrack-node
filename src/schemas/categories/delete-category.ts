import { z } from "zod";

export const deleteCategorySchema = {
  description: "Deleta uma categorias personalizada.",
  tags: ["Categorias"],

  params: z.object({
    id: z.string().uuid(),
  }),

  response: {
    204: z.any(),

    500: z.any(),
  },
};
