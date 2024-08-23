import Err from "../../../models/Error";
import { prisma } from "../../../server";
import { TUserTokenData } from "../models/user";
import { checkCategoriesExistById } from "../validation/categoryCheck";
import { checkLocationExistsById } from "../validation/locationCheck";
import { checkUserHasLocation } from "../validation/userCheck";

export const createTableService = async (name: string, locationId: string, categories: string[], user: TUserTokenData) => {
  try {
    await checkLocationExistsById(locationId);
    await checkCategoriesExistById(categories);
    await checkUserHasLocation(user.uuid, locationId);

    const table = await prisma.table.create({
      data: {
        name,
        locationId,
        categories: {
          connect: categories.map((categoryId) => ({ uuid: categoryId })),
        },
      },
    });

    return table;
  } catch (err) {
    if (err instanceof Err) {
      throw err;
    }
    throw new Err("Failed to create table", { statusCode: 500, name: "Database Error", place: "createTableService" });
  }
};

export const getTablesService = async (locationId: string, user: TUserTokenData) => {
  try {
    await checkLocationExistsById(locationId);
    await checkUserHasLocation(user.uuid, locationId);

    const tables = await prisma.table.findMany({
      where: {
        locationId,
      },
    });

    return tables;
  } catch (err) {
    if (err instanceof Err) {
      throw err;
    }
    throw new Err("Failed to retrieve tables", { statusCode: 500, name: "Database Error", place: "getTablesService" });
  }
};
