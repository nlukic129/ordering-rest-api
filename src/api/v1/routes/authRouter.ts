import { Router } from "express";

import { loginController, registerController } from "../controllers/authController";
import { validateRequest } from "../middleware/validationMiddleware";
import { registerUserSchema } from "../validation/schemas/user/registerUser";
import { loginUserSchema } from "../validation/schemas/user/loginUser";
import { authenticateToken, checkIfLoggedOut } from "../middleware/authenticate";
import { authorizeRoles } from "../middleware/authorization";

const authRouter = Router();

authRouter.post("/register", authenticateToken, authorizeRoles(["ADMIN"]), validateRequest(registerUserSchema), registerController);

authRouter.post("/login", checkIfLoggedOut, validateRequest(loginUserSchema), loginController);

export default authRouter;
