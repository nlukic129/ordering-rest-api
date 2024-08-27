import { Request, Response, NextFunction } from "express";

import { ResponseSuccess } from "../models/responseBodies";
import { TConnectUserBody, TCreateLocationBody } from "../models/requestBodies";
import { connectUserService, createLocationService } from "../services/locationServices";

export const createLocationController = async (req: Request<{}, {}, TCreateLocationBody>, res: Response, next: NextFunction) => {
  try {
    const { name, displayName, coordinates } = req.body;

    const location = await createLocationService(name, displayName, coordinates);

    return res.status(201).json(new ResponseSuccess<typeof location>("Location created successfully.", location));
  } catch (err) {
    return next(err);
  }
};

export const connectUserController = async (req: Request<{}, {}, TConnectUserBody>, res: Response, next: NextFunction) => {
  try {
    const { locationId, userId } = req.body;

    await connectUserService(userId, locationId);

    return res.status(200).json(new ResponseSuccess<{}>("User connected successfully.", {}));
  } catch (err) {
    return next(err);
  }
};
