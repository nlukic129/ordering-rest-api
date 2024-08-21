import Err from "../../../models/Error";
import { prisma } from "../../../server";

export const checkUserExists = async (username: string) => {
  const user = await prisma.user.findUnique({ where: { username } });
  if (user) {
    throw new Err("User with this username already exists.", { statusCode: 400, name: "Bad Request", place: "checkUserExists" });
  }
};
