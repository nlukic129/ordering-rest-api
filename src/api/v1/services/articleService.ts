import sharp from "sharp";

import Err from "../../../models/Error";
import { prisma } from "../../../server";
import { TCreateArticleBody, TEditArticleBody } from "../models/requestBodies";
import { TUserTokenData } from "../models/user";
import { checkCategoriesExistById } from "../validation/categoryCheck";
import { checkLocationExistsById } from "../validation/locationCheck";
import { checkUserHasLocation } from "../validation/userCheck";
import { getImage, insertImage } from "../s3/s3connection";
import { checkArticleExistsById, checkArticleUniqueNameCode } from "../validation/articleCheck";

export const createArticleService = async (user: TUserTokenData, articleData: TCreateArticleBody, articleImage: Express.Multer.File | undefined) => {
  try {
    const { name, description, price, code, categories, locationId } = articleData;
    const priceNum = parseFloat(price);
    const codeNum = parseInt(code);

    if (articleImage === undefined) {
      throw new Err("Image is required", { statusCode: 400, name: "Bad Request", place: "createArticleService" });
    }

    await checkLocationExistsById(locationId);
    await checkUserHasLocation(user, locationId);
    await checkCategoriesExistById(categories);
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

export const editArticleService = async (user: TUserTokenData, articleData: TEditArticleBody, articleImage: Express.Multer.File | undefined) => {
  try {
    const { id, name, description, price, code, categories, locationId } = articleData;
    const priceNum = parseFloat(price);
    const codeNum = parseInt(code);
    const isImageExist = articleImage !== undefined;

    await checkLocationExistsById(locationId);
    await checkUserHasLocation(user, locationId);
    await checkCategoriesExistById(categories);
    await checkArticleExistsById(id);

    if (isImageExist) {
      const buffer = await sharp(articleImage!.buffer).resize({ width: 500 }).toBuffer();
      await insertImage(id, buffer, articleImage!.mimetype);
    }

    const article = await prisma.article.update({
      where: { uuid: id },
      data: {
        name,
        description,
        price: priceNum,
        code: codeNum,
        locationId,
        ...(isImageExist && { image: await getImage(id) }),
        categories: {
          set: categories.map((categoryId) => ({ uuid: categoryId })),
        },
      },
      select: { uuid: true, name: true, description: true, price: true, code: true, locationId: true, categories: true, image: true },
    });

    return article;
  } catch (err) {
    if (err instanceof Err) {
      throw err;
    }
    throw new Err("Filed to edit article", { statusCode: 500, name: "Database Error", place: "editArticleService" });
  }
};

export const getArticlesService = async (locationId: string, user: TUserTokenData) => {
  try {
    await checkLocationExistsById(locationId);
    await checkUserHasLocation(user, locationId);

    const articles = await prisma.article.findMany({
      where: { locationId },
      select: { uuid: true, name: true, description: true, price: true, code: true, locationId: true, categories: true, image: true },
    });

    return articles;
  } catch (err) {
    if (err instanceof Err) {
      throw err;
    }
    console.log(err);
    throw new Err("Filed to get articles", { statusCode: 500, name: "Database Error", place: "getArticlesService" });
  }
};

export const deleteArticleService = async (locationId: string, articleId: string, user: TUserTokenData) => {
  try {
    await checkLocationExistsById(locationId);
    await checkUserHasLocation(user, locationId);
    await checkArticleExistsById(articleId);

    await prisma.article.delete({ where: { uuid: articleId } });

    return;
  } catch (err) {
    console.log(err);
    if (err instanceof Err) {
      throw err;
    }

    throw new Err("Filed to delete article", { statusCode: 500, name: "Database Error", place: "deleteArticleService" });
  }
};
