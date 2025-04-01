import { z } from "zod";

export const createUserSchema = {
  description: "Cria um novo usuário.",
  tags: ["Usuários"],

  body: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string(),
  }),
};
