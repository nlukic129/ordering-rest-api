import Joi from "joi";
import { Request, Response, NextFunction } from "express";

import Err from "../../../models/Error";

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      next(new Err(error.details[0].message, { statusCode: 400, name: "Bad Request", place: "validateRequest" }));
    }

    next();
  };
};
