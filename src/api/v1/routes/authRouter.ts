import { Router } from "express";

import { registerController } from "../controllers/authController";

const authRouter = Router();

authRouter.post("/register", registerController);

export default authRouter;
