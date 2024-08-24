import jwt from "jsonwebtoken";

import { TUserRoles } from "../src/api/v1/models/user";
import { JWT_SECRET_KEY } from "../src/config/config";
import { prisma } from "../src/server";

export const testUserData = {
  username: "admin-test",
  password: "S3cureP@ssword!",
  role: "",
};

export const generateUserToken = (role: TUserRoles) => {
  const adminUser = {
    uuid: "admin-uuid",
    username: testUserData.username,
    role: role,
  };

  return jwt.sign(adminUser, JWT_SECRET_KEY, { expiresIn: "1h" });
};

export const getUserRole = async (roleName: string) => {
  const role = await prisma.role.findFirst({ where: { name: roleName }, select: { uuid: true } });

  if (role === null) {
    logging.error(`Role "${roleName}" not found, skipping tests.`);
    throw new Error(`Role "${roleName}" not found, skipping tests.`);
  }

  return role;
};

export const deleteUserData = async (username: string) => {
  await prisma.user.delete({
    where: { username },
  });
};
