import { Router } from "express";

import authRouter from "./routes/authRouter";

const v1Router = Router();

// TODO - Add validation
v1Router.use("/auth", authRouter);

export default v1Router;
