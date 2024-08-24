import sharp from "sharp";

import Err from "../../../models/Error";
import { prisma } from "../../../server";
import { TCreateArticleBody } from "../models/requestBodies";
import { TUserTokenData } from "../models/user";
import { checkCategoriesExistById } from "../validation/categoryCheck";
import { checkLocationExistsById } from "../validation/locationCheck";
import { checkUserHasLocation } from "../validation/userCheck";
import { getImage, insertImage } from "../s3/s3connection";
import { checkArticleUniqueNameCode } from "../validation/articleCheck";

export const createArticleService = async (user: TUserTokenData, articleData: TCreateArticleBody, articleImage: Express.Multer.File) => {
  try {
    const { name, description, price, code, categories, locationId } = articleData;
    const priceNum = parseFloat(price);
    const codeNum = parseInt(code);

    await checkLocationExistsById(locationId);
    await checkCategoriesExistById(categories);
    await checkUserHasLocation(user, locationId);
    await checkArticleUniqueNameCode(name, codeNum);

    const article = await prisma.article.create({
      data: {
        name,
        description,
        price: priceNum,
        code: codeNum,
        image: "",
        locationId,
        categories: {
          connect: categories.map((categoryId) => ({ uuid: categoryId })),
        },
      },
      select: { uuid: true, name: true, description: true, price: true, code: true, locationId: true, categories: true, image: true },
    });

    const buffer = await sharp(articleImage.buffer).resize({ width: 500 }).toBuffer();
    await insertImage(article.uuid, buffer, articleImage.mimetype);

    const image = await getImage(article.uuid);

    await prisma.article.update({
      where: { uuid: article.uuid },
      data: { image },
    });

    article.image = image;

    return article;
  } catch (err) {
    if (err instanceof Err) {
      throw err;
    }
    console.log(err);
    throw new Err("Filed to create article", { statusCode: 500, name: "Database Error", place: "createArticleService" });
  }
};
