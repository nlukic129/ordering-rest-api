import { Request, Response, NextFunction } from "express";

export const routeNotFound = (_req: Request, res: Response, _next: NextFunction) => {
  const error = new Error("Not found");
  logging.warning(error);

  return res.status(404).json({
    error: {
      message: error.message,
    },
  });
};
