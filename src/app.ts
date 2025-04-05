import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import {
  validatorCompiler,
  serializerCompiler,
  ZodTypeProvider,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { userRoutes } from "./http/controllers/users/routes";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { transactionRoutes } from "./http/controllers/transactions/routes";

// Cria uma instância do Fastify e define o Type Provider para Zod (validação de dados)
export const app = fastify().withTypeProvider<ZodTypeProvider>();

// Configura o compilador de validação e serialização para usar Zod
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// Configura fastify cookies
app.register(fastifyCookie);

// Configura token JWT
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

// Registra o Swagger (documentação da API)
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "FinTrack API",
      version: "1.0.0",
      description: "API for managing finance data.",
    },
  },
  transform: jsonSchemaTransform,
});

// Registra o Swagger UI para disponibilizar a interface gráfica da documentação
app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

// Define um manipulador de erros global para tratar erros na API
app.setErrorHandler((error, _, reply) => {
  if (error.code === "FST_ERR_VALIDATION") {
    return reply
      .status(400)
      .send({ message: "Validation error", issues: error });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  return reply.status(500).send({ message: "Internal Server Error.", error });
});

// Registra as rotas de usuário no aplicativo
app.register(userRoutes);
app.register(transactionRoutes);
