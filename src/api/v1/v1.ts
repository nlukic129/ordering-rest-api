import { Router } from "express";

const v1Router = Router();

v1Router.get("/", (req, res) => {
  res.json("Hello From V1");
});

export default v1Router;
