import Err from "../../../models/Error";
import { prisma } from "../../../server";

export const checkTableExistsById = async (id: string) => {
  const table = await prisma.table.findUnique({ where: { uuid: id } });

  if (!table) {
    throw new Err("Table not found.", { statusCode: 404, name: "Not Found", place: "checkTableExistsById" });
  }

  return table;
};
