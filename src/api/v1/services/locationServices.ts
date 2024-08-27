import Err from "../../../models/Error";
import { prisma } from "../../../server";
import { checkUserExistsById } from "../validation/userCheck";
import { checkLocationExistsById, checkLocationNotExists } from "./../validation/locationCheck";

export const createLocationService = async (name: string, displayName: string, coordinates: { x: number; y: number }) => {
  try {
    await checkLocationNotExists(name);

    const location = await prisma.location.create({
      data: {
        name,
        display_name: displayName,
        coordinates: {
          x: coordinates.x,
          y: coordinates.y,
        },
      },
      select: { uuid: true, name: true, display_name: true, coordinates: true },
    });

    return location;
  } catch (err) {
    if (err instanceof Err) {
      throw err;
    }
    throw new Err("Failed to create location", { statusCode: 500, name: "Database Error", place: "createLocationService" });
  }
};

export const connectUserService = async (userId: string, locationId: string) => {
  try {
    await checkLocationExistsById(locationId);
    const user = await checkUserExistsById(userId);

    if (user.role.name === "ADMIN") {
      throw new Err("Admin user cannot be connected to a location", { statusCode: 400, name: "Bad Request", place: "connectUserService" });
    }

    if (user.locations.find((location) => location.uuid === locationId)) {
      throw new Err("User already connected to this location", { statusCode: 400, name: "Bad Request", place: "connectUserService" });
    }

    await prisma.user.update({
      where: { uuid: userId },
      data: {
        locations: {
          connect: { uuid: locationId },
        },
      },
    });
  } catch (err) {
    if (err instanceof Err) {
      throw err;
    }
    throw new Err("Failed to connect user", { statusCode: 500, name: "Database Error", place: "connectUserService" });
  }
};
