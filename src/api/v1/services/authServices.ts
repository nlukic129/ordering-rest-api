import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Err from "../../../models/Error";
import { prisma } from "../../../server";
import { checkPasswordMatch, checkUserExists, checkUserNotExists } from "../validation/userCheck";
import { checkRoleExists } from "../validation/roleCheck";
import { JWT_SECRET_KEY } from "../../../config/config";
import { TUserTokenData } from "../models/user";

export const registerService = async (username: string, password: string, roleId: string) => {
  try {
    await checkUserNotExists(username);
    await checkRoleExists(roleId);

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        roleId,
      },
    });
  } catch (err) {
    if (err instanceof Err) {
      throw err;
    }
    throw new Err("Failed to register user", { statusCode: 500, name: "Database Error", place: "registerService" });
  }
};

export const loginService = async (username: string, password: string) => {
  try {
    const user = await checkUserExists(username);

    await checkPasswordMatch(password, user.password);

    const userTokenData: TUserTokenData = { uuid: user.uuid, username: user.username, roleId: user.roleId };

    const token = jwt.sign(userTokenData, JWT_SECRET_KEY, { expiresIn: "30d" });

    return token;
  } catch (err) {
    if (err instanceof Err) {
      throw err;
    }
    throw new Err("Failed to register user", { statusCode: 500, name: "Database Error", place: "registerService" });
  }
};
