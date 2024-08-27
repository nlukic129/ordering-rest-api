import bcrypt from "bcrypt";

import Err from "../../../models/Error";
import { prisma } from "../../../server";
import { TUserTokenData } from "../models/user";

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

export const checkUserExistsById = async (userId: string) => {
  const user = await prisma.user.findUnique({ where: { uuid: userId }, include: { role: true, locations: true } });

  if (!user) {
    throw new Err("User not found.", { statusCode: 404, name: "Not Found", place: "checkUserExistsById" });
  }

  return user;
};

export const checkPasswordMatch = async (password: string, userPassword: string) => {
  const passwordMatch = await bcrypt.compare(password, userPassword);

  if (!passwordMatch) {
    throw new Err("Invalid password.", { statusCode: 401, name: "Unauthorized", place: "checkPasswordMatch" });
  }
};

export const checkUserHasLocation = async (tokenUser: TUserTokenData, locationId: string) => {
  const { uuid, role } = tokenUser;

  if (role === "ADMIN") {
    return;
  }

  const user = await prisma.user.findUnique({ where: { uuid }, select: { locations: { where: { uuid: locationId } } } });

  if (!user!.locations.find((location) => location.uuid === locationId)) {
    throw new Err("User does not have access to this location.", { statusCode: 403, name: "Forbidden", place: "checkUserHasLocation" });
  }
};
