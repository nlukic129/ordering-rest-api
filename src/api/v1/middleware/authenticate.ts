import jwt, { VerifyErrors, JwtPayload } from "jsonwebtoken";

import Err from "../../../models/Error";
import { Request, Response, NextFunction } from "express";
import { JWT_SECRET_KEY } from "../../../config/config";
import { checkIsAuthenticatedRequestType, checkIsTokenDataType } from "../utils/typeCheck";

export const authenticateToken = (req: Request, _res: Response, next: NextFunction) => {
  if (!checkIsAuthenticatedRequestType(req)) {
    return next(new Err("You must be logged in, please login.", { statusCode: 401, name: "Authentication Error", place: "authenticateToken" }));
  }

  jwt.verify(req.cookies.jwt, JWT_SECRET_KEY, (err: VerifyErrors | null, user: JwtPayload | string | undefined) => {
    if (err || !checkIsTokenDataType(user)) {
      return next(new Err("Your token is not valid, please login.", { statusCode: 403, name: "Authentication Error", place: "authenticateToken" }));
    }

    req.user = user;
    next();
  });
};

export const checkIfLoggedOut = (req: Request, _res: Response, next: NextFunction) => {
  if (checkIsAuthenticatedRequestType(req)) {
    return next(new Err("You are already logged in", { statusCode: 400, name: "Authentication Error", place: "checkIfLoggedOut" }));
  }

  next();
};
