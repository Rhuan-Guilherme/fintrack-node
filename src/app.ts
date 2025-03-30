import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { userRoutes } from "./http/controllers/users/routes";

export const app = fastify();

app.register(fastifySwagger);
app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.register(userRoutes);
