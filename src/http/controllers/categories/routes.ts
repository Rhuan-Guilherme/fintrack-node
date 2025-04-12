import { FastifyTypedInstace } from "@/@types/fastify-zod-type";
import { createCategory } from "./create-category";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { createCategorySchema } from "@/schemas/categories/create-category";

export function categoriesRoutes(app: FastifyTypedInstace) {
  app.post(
    "/category/create",
    { schema: createCategorySchema, onRequest: [verifyJWT] },
    createCategory,
  );
}
