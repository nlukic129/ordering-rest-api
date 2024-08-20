import bcrypt from "bcrypt";

import { prisma } from "../../../server";
import Err from "../../../middleware/errorHandler";

export const registerService = async (username: string, password: string, roleId: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        roleId,
      },
    });
  } catch (err) {
    throw new Err("Failed to register user", { statusCode: 500, name: "Database Error", place: "registerService" });
  }
};
