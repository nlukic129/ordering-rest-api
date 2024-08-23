import { Request, Response, NextFunction } from "express";

import { TCreateTableBody } from "../models/requestBodies";
import { createTableService } from "../services/tableServices";
import { checkIsAuthenticatedRequestType } from "../utils/typeCheck";
import Err from "../../../models/Error";
import { ResponseSuccess } from "../models/responseBodies";

export const createTableController = async (req: Request<{}, {}, TCreateTableBody>, res: Response, next: NextFunction) => {
  try {
    const { name, locationId, categories } = req.body;

    if (!checkIsAuthenticatedRequestType(req)) {
      throw new Err("Your token is not valid, please login.", { statusCode: 403, name: "Authentication Error", place: "createTableController" });
    }

    const user = req.user;

    const table = await createTableService(name, locationId, categories, user);

    return res.status(201).json(new ResponseSuccess<typeof table>("Table created successfully.", table));
  } catch (err) {
    return next(err);
  }
};
