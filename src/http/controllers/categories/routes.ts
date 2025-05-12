import { FastifyTypedInstace } from "@/@types/fastify-zod-type";
import { createCategory } from "./create-category";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { createCategorySchema } from "@/schemas/categories/create-category";
import { findAllCategories } from "./find-all-categories";
import { findTransactionsSchema } from "@/schemas/categories/find-all-categories";
import { deleteCategory } from "./delete-category";
import { deleteCategorySchema } from "@/schemas/categories/delete-category";
import { updateCategory } from "./update-category";
import { updateCategorySchema } from "@/schemas/categories/update-category";

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

  app.delete(
    "/categories/:id",
    { schema: deleteCategorySchema, onRequest: [verifyJWT] },
    deleteCategory,
  );

  app.put(
    "/categories/:id",
    { schema: updateCategorySchema, onRequest: [verifyJWT] },
    updateCategory,
  );
}
