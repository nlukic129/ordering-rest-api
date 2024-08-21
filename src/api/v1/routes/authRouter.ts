import { Router } from "express";

import { loginController, registerController } from "../controllers/authController";
import { validateRequest } from "../middleware/validationMiddleware";
import { registerUserSchema } from "../validation/schemas/user/registerUser";
import { loginUserSchema } from "../validation/schemas/user/loginUser";

const authRouter = Router();

authRouter.post("/register", validateRequest(registerUserSchema), registerController);

authRouter.post("/login", validateRequest(loginUserSchema), loginController);

export default authRouter;
