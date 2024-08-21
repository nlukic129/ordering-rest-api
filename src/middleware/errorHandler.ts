import { Request, Response, NextFunction } from "express";

import Err from "../models/Error";
import { ResponseError } from "../api/v1/models/responseBodies";

export const errorHandler = (err: Err, _req: Request, res: Response, _next: NextFunction) => {
  const errStatus = err.statusCode;
  const errMsg = err.message;
  const errName = err.name;
  const errPlace = err.place;

  return res.status(errStatus).json(new ResponseError(errMsg, errName, errPlace));
};
