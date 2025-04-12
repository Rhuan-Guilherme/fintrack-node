import { FastifyTypedInstace } from "@/@types/fastify-zod-type";
import { createCategory } from "./create-category";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { createCategorySchema } from "@/schemas/categories/create-category";
import { findAllCategories } from "./find-all-categories";
import { findTransactionsSchema } from "@/schemas/categories/find-all-categories";

export function categoriesRoutes(app: FastifyTypedInstace) {
  app.post(
    "/category/create",
    { schema: createCategorySchema, onRequest: [verifyJWT] },
    createCategory,
  );

  app.get(
    "/categories",
    { schema: findTransactionsSchema, onRequest: [verifyJWT] },
    findAllCategories,
  );
}
