import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { userRoutes } from "./http/controllers/users/routes";
import { ZodError } from "zod";
import { env } from "./env";

export const app = fastify();

app.register(fastifySwagger);
app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.register(userRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  return reply.status(500).send({ message: "Internal Server Error." });
});
