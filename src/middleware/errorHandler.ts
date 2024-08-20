import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: Err, _req: Request, res: Response, _next: NextFunction) => {
  const isProduction = process.env.NODE_ENV === "production";

  const errStatus = err.statusCode;
  const errMsg = err.message;
  const errName = err.name;
  const errPlace = err.place;

  const response = {
    success: false,
    status: errStatus,
    message: errMsg,
    name: errName,
    place: errPlace,
    ...(isProduction ? {} : { stack: err.stack }),
  };

  return res.status(errStatus).json(response);
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
