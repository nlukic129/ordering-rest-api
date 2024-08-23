import { Request, Response, NextFunction } from "express";

import Err from "../../../models/Error";
import { TCreateTableBody } from "../models/requestBodies";
import { createTableService, getTablesService } from "../services/tableServices";
import { checkIsAuthenticatedRequestType } from "../utils/typeCheck";
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

export const getTablesController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const locationId = req.params.locationId;

    if (!checkIsAuthenticatedRequestType(req)) {
      throw new Err("Your token is not valid, please login.", { statusCode: 403, name: "Authentication Error", place: "getTablesController" });
    }

    const user = req.user;

    const tables = await getTablesService(locationId, user);

    return res.status(200).json(new ResponseSuccess<typeof tables>("Tables retrieved successfully.", tables));
  } catch (err) {
    return next(err);
  }
};
