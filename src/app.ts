import express from "express";
import bodyParser from "body-parser";

import v1Router from "./api/v1/v1";
import { loggingHandler } from "./middleware/loggingHandler";
import { routeNotFound } from "./middleware/routeNotFound";

const app = express();
// TODO - Add helmet
app.use(bodyParser.json());

app.use("/api/v1", loggingHandler, v1Router);

app.use(routeNotFound);

export default app;
