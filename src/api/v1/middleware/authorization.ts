import { Request, Response, NextFunction } from "express";

import Err from "../../../models/Error";
import { TUserRoles } from "../models/user";
import { checkIsAuthenticatedRequestType } from "../utils/typeCheck";

export const authorizeRoles = (roles: TUserRoles[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!checkIsAuthenticatedRequestType(req)) {
      return next(new Err("Your token is not valid, please login.", { statusCode: 403, name: "Authentication Error", place: "authorizeRoles" }));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new Err("You do not have the necessary permissions to access this resource.", {
          statusCode: 403,
          name: "Authorization Error",
          place: "authorizeRoles",
        })
      );
    }

    next();
  };
};
