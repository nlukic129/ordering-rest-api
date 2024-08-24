import { Router } from "express";

import { authenticateToken } from "../middleware/authenticate";
import { authorizeRoles } from "../middleware/authorization";
import { validateRequestBody } from "../middleware/validationMiddleware";
import { createLocationSchema } from "../validation/schemas/location/createLocation";
import { createLocationController } from "../controllers/locationController";

const locationRouter = Router();

locationRouter.post("/", authenticateToken, authorizeRoles(["ADMIN"]), validateRequestBody(createLocationSchema), createLocationController);

export default locationRouter;
