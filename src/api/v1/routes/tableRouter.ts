import { Router } from "express";

import { authenticateToken } from "../middleware/authenticate";
import { authorizeRoles } from "../middleware/authorization";
import { validateRequest } from "../middleware/validationMiddleware";
import { createTableSchema } from "../validation/schemas/table/createTable";
import { createTableController } from "../controllers/tableController";

const tableRouter = Router();

tableRouter.post("/create", authenticateToken, authorizeRoles(["ADMIN", "MANAGER"]), validateRequest(createTableSchema), createTableController);
