import Err from "../../../models/Error";
import { prisma } from "../../../server";

export const checkCategoriesExistById = async (categoriesId: string[]) => {
  const categories = await prisma.category.findMany({ where: { uuid: { in: categoriesId } } });

  if (categories.length !== categoriesId.length) {
    throw new Err("Category not found.", { statusCode: 404, name: "Not Found", place: "checkCategoriesExistById" });
  }

  return categories;
};
