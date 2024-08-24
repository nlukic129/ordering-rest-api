import Err from "../../../models/Error";
import { prisma } from "../../../server";

export const checkRoleExists = async (roleId: string) => {
  const role = await prisma.role.findUnique({ where: { uuid: roleId } });
  if (!role) {
    throw new Err("Role not found.", { statusCode: 404, name: "Not Found", place: "checkRoleExists" });
  }
};
