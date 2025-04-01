import { z } from "zod";

export const createUserSchema = {
  description: "Cria um novo usuário.",
  tags: ["Usuários"],

  body: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string(),
  }),

  response: {
    201: z.object({
      message: z.string().describe("Usuário registrado com sucesso."),
    }),

    400: z.object({
      error: z.string(),
      label: z.string().describe("O e-mail informado ja está em uso."),
    }),
  },
};
