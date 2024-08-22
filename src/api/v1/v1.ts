import { Router } from "express";

import authRouter from "./routes/authRouter";
import locationRouter from "./routes/locationRouter";

const v1Router = Router();

v1Router.use("/auth", authRouter);

v1Router.use("/location", locationRouter);

export default v1Router;
