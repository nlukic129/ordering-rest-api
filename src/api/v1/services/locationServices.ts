import Err from "../../../models/Error";
import { prisma } from "../../../server";
import { checkLocationNotExists } from "./../validation/locationCheck";

export const createLocationService = async (name: string, displayName: string, coordinates: { x: number; y: number }) => {
  try {
    await checkLocationNotExists(name);

    const location = await prisma.location.create({
      data: {
        name,
        display_name: displayName,
        coordinates: {
          create: {
            x: coordinates.x,
            y: coordinates.y,
          },
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
