import { Router } from "express";

import { authenticateToken } from "../middleware/authenticate";
import { authorizeRoles } from "../middleware/authorization";
import { uploadMiddleware } from "../middleware/multerMiddleware";
import { parseJSON } from "../middleware/parseJSONMiddleware";
import { createArticleController, deleteArticleController, getArticlesController } from "../controllers/articleController";
import { validateRequestBody, validateRequestParams } from "../middleware/validationMiddleware";
import { createArticleSchema } from "../validation/schemas/article/createArticle";
import { getArticlesSchema } from "../validation/schemas/article/getArticles";
import { deleteArticleSchema } from "../validation/schemas/article/deleteArticle";

const articleRouter = Router();

articleRouter.post(
  "/",
  authenticateToken,
  authorizeRoles(["ADMIN", "MANAGER"]),
  uploadMiddleware,
  parseJSON,
  validateRequestBody(createArticleSchema),
  createArticleController
);

articleRouter.get(
  "/:locationId",
  authenticateToken,
  authorizeRoles(["ADMIN", "MANAGER"]),
  validateRequestParams(getArticlesSchema),
  getArticlesController
);

articleRouter.delete(
  "/:locationId/:articleId",
  authenticateToken,
  authorizeRoles(["ADMIN", "MANAGER"]),
  validateRequestParams(deleteArticleSchema),
  deleteArticleController
);

export default articleRouter;
