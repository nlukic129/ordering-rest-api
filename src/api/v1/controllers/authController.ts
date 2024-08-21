import { Request, Response, NextFunction } from "express";

import { TRegisterBody } from "../models/requestBodies";
import { registerService } from "../services/authServices";
import { ResponseSuccess } from "../models/responseBodies";

export const registerController = async (req: Request<{}, {}, TRegisterBody>, res: Response, next: NextFunction) => {
  try {
    const { username, password, roleId } = req.body;

    await registerService(username, password, roleId);

    return res.status(201).json(new ResponseSuccess<{}>("User registered successfully", {}));
  } catch (err) {
    return next(err);
  }
};
