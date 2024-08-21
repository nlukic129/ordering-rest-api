import bcrypt from "bcrypt";

import Err from "../../../models/Error";
import { prisma } from "../../../server";
import { checkUserExists } from "../validation/userCheck";
import { checkRoleExists } from "../validation/roleCheck";

export const registerService = async (username: string, password: string, roleId: string) => {
  try {
    await checkUserExists(username);
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
