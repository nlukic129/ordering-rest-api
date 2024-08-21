import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";

import v1Router from "./api/v1/v1";
import { loggingHandler } from "./middleware/loggingHandler";
import { routeNotFound } from "./middleware/routeNotFound";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(cors());
app.use(helmet());

app.use(bodyParser.json());

app.use("/api/v1", v1Router);

app.use(routeNotFound);

app.use(errorHandler);

export default app;
