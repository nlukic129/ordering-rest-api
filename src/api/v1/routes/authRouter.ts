import { Router } from "express";

import { loginController, logoutController, registerController } from "../controllers/authController";
import { validateRequestBody } from "../middleware/validationMiddleware";
import { registerUserSchema } from "../validation/schemas/user/registerUser";
import { loginUserSchema } from "../validation/schemas/user/loginUser";
import { authenticateToken, checkIfLoggedOut } from "../middleware/authenticate";
import { authorizeRoles } from "../middleware/authorization";

const authRouter = Router();

authRouter.post("/register", authenticateToken, authorizeRoles(["ADMIN"]), validateRequestBody(registerUserSchema), registerController);

authRouter.post("/login", checkIfLoggedOut, validateRequestBody(loginUserSchema), loginController);

authRouter.post("/logout", authenticateToken, logoutController);

export default authRouter;
