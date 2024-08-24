import { Request, Response, NextFunction } from "express";

export const parseJSON = (req: Request, _res: Response, next: NextFunction) => {
  for (const key in req.body) {
    if ((req.body[key].startsWith("[") && req.body[key].endsWith("]")) || req.body[key] === "true" || req.body[key] === "false") {
      req.body[key] = JSON.parse(req.body[key]);
    }
  }
  next();
};
