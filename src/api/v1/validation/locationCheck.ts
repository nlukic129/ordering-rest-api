import Err from "../../../models/Error";
import { prisma } from "../../../server";

export const checkLocationNotExists = async (name: string) => {
  const location = await prisma.location.findUnique({ where: { name } });

  if (location) {
    throw new Err("Location with this name already exists.", { statusCode: 400, name: "Bad Request", place: "checkLocationNotExists" });
  }
};

export const checkLocationExistsById = async (uuid: string) => {
  const location = await prisma.location.findUnique({ where: { uuid } });

  if (!location) {
    throw new Err("Location not found.", { statusCode: 404, name: "Not Found", place: "checkLocationExistsById" });
  }

  return location;
};
