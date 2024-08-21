import { Router } from "express";

import { registerController } from "../controllers/authController";
import { validateRequest } from "../middleware/validationMiddleware";
import { registerUserSchema } from "../validation/schemas/user/registerUser";

const authRouter = Router();

authRouter.post("/register", validateRequest(registerUserSchema), registerController);

export default authRouter;
