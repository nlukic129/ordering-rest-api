import Err from "../../../models/Error";
import { prisma } from "../../../server";
import { TUserTokenData } from "../models/user";
import { checkCategoriesExistById } from "../validation/categoryCheck";
import { checkLocationExistsById } from "../validation/locationCheck";
import { checkTableExistsById } from "../validation/tableCheck";
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

export const editTableService = async (id: string, name: string, locationId: string, categories: string[], user: TUserTokenData) => {
  try {
    await checkLocationExistsById(locationId);
    await checkCategoriesExistById(categories);
    await checkUserHasLocation(user.uuid, locationId);
    await checkTableExistsById(id);

    const table = await prisma.table.update({
      where: {
        uuid: id,
      },
      data: {
        name,
        locationId,
        categories: {
          set: categories.map((categoryId) => ({ uuid: categoryId })),
        },
      },
    });

    return table;
  } catch (err) {
    if (err instanceof Err) {
      throw err;
    }
    throw new Err("Failed to edit table", { statusCode: 500, name: "Database Error", place: "editTableService" });
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

export const deleteTableService = async (tableId: string, locationId: string, user: TUserTokenData) => {
  try {
    await checkLocationExistsById(locationId);
    await checkUserHasLocation(user.uuid, locationId);
    await checkTableExistsById(tableId);

    const table = await prisma.table.delete({
      where: {
        uuid: tableId,
      },
    });

    return table;
  } catch (err) {
    if (err instanceof Err) {
      throw err;
    }
    throw new Err("Failed to delete table", { statusCode: 500, name: "Database Error", place: "deleteTableService" });
  }
};
