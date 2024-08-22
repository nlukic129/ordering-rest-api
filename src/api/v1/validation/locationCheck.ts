import Err from "../../../models/Error";
import { prisma } from "../../../server";

export const checkLocationNotExists = async (name: string) => {
  const location = await prisma.location.findUnique({ where: { name } });

  if (location) {
    throw new Err("Location with this name already exists.", { statusCode: 400, name: "Bad Request", place: "checkLocationNotExists" });
  }
};
