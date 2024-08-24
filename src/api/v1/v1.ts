import { Router } from "express";

import authRouter from "./routes/authRouter";
import locationRouter from "./routes/locationRouter";
import tableRouter from "./routes/tableRouter";
import articleRouter from "./routes/articleRouter";

const v1Router = Router();

v1Router.use("/auth", authRouter);

v1Router.use("/location", locationRouter);

v1Router.use("/table", tableRouter);

v1Router.use("/article", articleRouter);

export default v1Router;
