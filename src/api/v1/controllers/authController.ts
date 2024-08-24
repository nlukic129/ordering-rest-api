import { Request, Response, NextFunction } from "express";

import { TLoginBody, TRegisterBody } from "../models/requestBodies";
import { loginService, registerService } from "../services/authServices";
import { ResponseSuccess } from "../models/responseBodies";

export const registerController = async (req: Request<{}, {}, TRegisterBody>, res: Response, next: NextFunction) => {
  try {
    const { username, password, roleId } = req.body;

    await registerService(username, password, roleId);

    return res.status(201).json(new ResponseSuccess<{}>("User registered successfully.", {}));
  } catch (err) {
    return next(err);
  }
};

export const loginController = async (req: Request<{}, {}, TLoginBody>, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    const token = await loginService(username, password);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days

      // sameSite: nodeEnv === "production" ? "none" : "strict", // ! Setting the sameSite: "none" is necessary for the cookie to be set in the browser.
      // secure: nodeEnv === "production", // ! secure: true will only work in production. This is because the cookie will only be set if the connection is secure (HTTPS).
    });

    return res.status(200).json(new ResponseSuccess<{}>("User logged in successfully.", {}));
  } catch (err) {
    return next(err);
  }
};

export const logoutController = async (_req: Request, res: Response, _next: NextFunction) => {
  res.clearCookie("jwt", {
    // path: "/",
    // secure: true,
    // sameSite: "none",
  });

  return res.status(200).json(new ResponseSuccess<{}>("User logged out successfully.", {}));
};
