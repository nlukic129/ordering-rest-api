import { Router } from "express";

import { authenticateToken } from "../middleware/authenticate";
import { authorizeRoles } from "../middleware/authorization";
import { uploadMiddleware } from "../middleware/multerMiddleware";
import { parseJSON } from "../middleware/parseJSONMiddleware";
import { createArticle } from "../controllers/articleController";
import { validateRequestBody } from "../middleware/validationMiddleware";
import { createArticleSchema } from "../validation/schemas/article/createArticle";

const articleRouter = Router();

articleRouter.post(
  "/",
  authenticateToken,
  authorizeRoles(["ADMIN", "MANAGER"]),
  uploadMiddleware,
  parseJSON,
  validateRequestBody(createArticleSchema),
  createArticle
);

export default articleRouter;
