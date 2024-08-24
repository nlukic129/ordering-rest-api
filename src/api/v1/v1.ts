import { Router } from "express";

import authRouter from "./routes/authRouter";
import locationRouter from "./routes/locationRouter";
import tableRouter from "./routes/tableRouter";

const v1Router = Router();

v1Router.use("/auth", authRouter);

v1Router.use("/location", locationRouter);

v1Router.use("/table", tableRouter);

export default v1Router;
