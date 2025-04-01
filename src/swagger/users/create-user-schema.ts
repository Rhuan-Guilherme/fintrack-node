export const createUserSchema = {
  summary: "Registro de um novo usuário",
  description: "Cria um novo usuário no sistema com nome, e-mail e senha.",
  tags: ["Usuários"],
  operationId: "createUser",
  body: {
    type: "object",
    required: ["name", "email", "password"],
    properties: {
      name: {
        type: "string",
        description: "Nome completo do usuário",
        minLength: 2,
        maxLength: 200,
      },
      email: {
        type: "string",
        format: "email",
        description: "Endereço de e-mail do usuário",
      },
      password: {
        type: "string",
        description: "Senha do usuário",
        minLength: 8,
        maxLength: 100,
      },
    },
  },
  response: {
    201: {
      description: "Usuário registrado com sucesso",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },

    400: {
      description: "Erro de validação do e-mail",
      type: "object",
      properties: {
        message: { type: "string" },
        label: { type: "string" },
      },
    },
  },
};
