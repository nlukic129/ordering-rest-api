import express from "express";

import v1Router from "./api/v1/v1";
import { loggingHandler } from "./middleware/loggingHandler";
import { routeNotFound } from "./middleware/routeNotFound";

const app = express();

app.get("/", loggingHandler, async (req, res) => {
  res.json("Hello World");
});

app.use("/api/v1/", loggingHandler, v1Router);

app.use(routeNotFound);

export default app;
