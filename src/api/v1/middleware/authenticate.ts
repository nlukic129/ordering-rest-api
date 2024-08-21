import jwt from "jsonwebtoken";

import Err from "../../../models/Error";
import { Response, NextFunction } from "express";
import { TPreAuthenticatedRequest } from "../models/requestBodies";
import { JWT_SECRET_KEY } from "../../../config/config";
import { TUserTokenData } from "../models/user";

export const authenticateToken = (req: TPreAuthenticatedRequest, _res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new Err("You must be logged in, please login.", { statusCode: 401, name: "Authentication Error", place: "authenticateToken" }));
  }

  jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return next(new Err("Your token is not valid, please login.", { statusCode: 403, name: "Authentication Error", place: "authenticateToken" }));
    }

    req.user = user as TUserTokenData;

    next();
  });
};

export const checkIfLoggedOut = (req: TPreAuthenticatedRequest, _res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;
  const tokenError = new Err("You are already logged in", { statusCode: 400, name: "Authentication Error", place: "checkIfLoggedOut" });

  if (token) {
    return next(tokenError);
  }

  next();
};
