import { Router } from "express";

import { authenticateToken } from "../middleware/authenticate";
import { authorizeRoles } from "../middleware/authorization";
import { validateRequestBody } from "../middleware/validationMiddleware";
import { createLocationSchema } from "../validation/schemas/location/createLocation";
import { connectUserController, createLocationController } from "../controllers/locationController";
import { connectUserSchema } from "../validation/schemas/location/connectUser";

const locationRouter = Router();

locationRouter.post("/", authenticateToken, authorizeRoles(["ADMIN"]), validateRequestBody(createLocationSchema), createLocationController);

locationRouter.post("/connect", authenticateToken, authorizeRoles(["ADMIN"]), validateRequestBody(connectUserSchema), connectUserController);

export default locationRouter;
