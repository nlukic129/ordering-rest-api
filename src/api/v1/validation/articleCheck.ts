import Err from "../../../models/Error";
import { prisma } from "../../../server";

export const checkArticleUniqueNameCode = async (name: string, code: number) => {
  const article = await prisma.article.findMany({ where: { OR: [{ name }, { code }] } });

  if (article.length > 0) {
    throw new Err("Article name or code already exists.", { statusCode: 409, name: "Conflict", place: "checkArticleUniqueNameCode" });
  }
};
