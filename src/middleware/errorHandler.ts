import { Request, Response, NextFunction } from "express";
import { ResponseError } from "../api/v1/models/responseBodies";

export const errorHandler = (err: Err, _req: Request, res: Response, _next: NextFunction) => {
  const errStatus = err.statusCode;
  const errMsg = err.message;
  const errName = err.name;
  const errPlace = err.place;

  return res.status(errStatus).json(new ResponseError(errMsg, errName, errPlace));
};

export class Err extends Error {
  statusCode: number;
  name: string;
  place: string;

  constructor(message?: string, options?: Partial<{ statusCode: number; name: string; place: string; details: string }>) {
    super(message);

    this.statusCode = options?.statusCode || 500;
    this.name = options?.name || "Error";
    this.place = options?.place || "Unknown Location";

    Error.captureStackTrace(this, this.constructor);
  }
}

export default Err;
