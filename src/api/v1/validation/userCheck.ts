import bcrypt from "bcrypt";

import Err from "../../../models/Error";
import { prisma } from "../../../server";

export const checkUserNotExists = async (username: string) => {
  const user = await prisma.user.findUnique({ where: { username } });
  if (user) {
    throw new Err("User with this username already exists.", { statusCode: 400, name: "Bad Request", place: "checkUserNotExists" });
  }
};

export const checkUserExists = async (username: string) => {
  const user = await prisma.user.findUnique({ where: { username: username }, include: { role: true } });

  if (!user) {
    throw new Err("User not found.", { statusCode: 404, name: "Not Found", place: "checkUserExists" });
  }

  return user;
};

export const checkPasswordMatch = async (password: string, userPassword: string) => {
  const passwordMatch = await bcrypt.compare(password, userPassword);

  if (!passwordMatch) {
    throw new Err("Invalid password.", { statusCode: 401, name: "Unauthorized", place: "checkPasswordMatch" });
  }
};
