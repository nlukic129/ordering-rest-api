import { Router } from "express";

import { authenticateToken } from "../middleware/authenticate";
import { authorizeRoles } from "../middleware/authorization";
import { validateRequestBody, validateRequestParams } from "../middleware/validationMiddleware";
import { createTableSchema } from "../validation/schemas/table/createTable";
import { createTableController, deleteTableController, editTableController, getTablesController } from "../controllers/tableController";
import { getTablesSchema } from "../validation/schemas/table/getTables";
import { editTableSchema } from "../validation/schemas/table/editTable";
import { deleteTableSchema } from "../validation/schemas/table/deleteTable";

const tableRouter = Router();

tableRouter.post("/", authenticateToken, authorizeRoles(["ADMIN", "MANAGER"]), validateRequestBody(createTableSchema), createTableController);

tableRouter.get(
  "/:locationId",
  authenticateToken,
  authorizeRoles(["ADMIN", "MANAGER", "BAR", "WAITER"]),
  validateRequestParams(getTablesSchema),
  getTablesController
);

tableRouter.put("/", authenticateToken, authorizeRoles(["ADMIN", "MANAGER"]), validateRequestBody(editTableSchema), editTableController);

tableRouter.delete(
  "/:locationId/:tableId",
  authenticateToken,
  authorizeRoles(["ADMIN", "MANAGER"]),
  validateRequestParams(deleteTableSchema),
  deleteTableController
);

export default tableRouter;
