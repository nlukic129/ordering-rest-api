import { Router } from "express";

import { authenticateToken } from "../middleware/authenticate";
import { authorizeRoles } from "../middleware/authorization";
import { validateRequestBody, validateRequestParams } from "../middleware/validationMiddleware";
import { createTableSchema } from "../validation/schemas/table/createTable";
import { createTableController, getTablesController } from "../controllers/tableController";
import { getTablesSchema } from "../validation/schemas/table/getTables";

const tableRouter = Router();

tableRouter.post("/create", authenticateToken, authorizeRoles(["ADMIN", "MANAGER"]), validateRequestBody(createTableSchema), createTableController);

tableRouter.get(
  "/:locationId",
  authenticateToken,
  authorizeRoles(["ADMIN", "MANAGER", "BAR", "WAITER"]),
  validateRequestParams(getTablesSchema),
  getTablesController
);
