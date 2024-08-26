import { Request, Response, NextFunction } from "express";

import Err from "../../../models/Error";
import { TCreateArticleBody, TEditArticleBody } from "../models/requestBodies";
import { TUserTokenData } from "../models/user";
import { createArticleService, deleteArticleService, editArticleService, getArticlesService } from "../services/articleService";
import { ResponseSuccess } from "../models/responseBodies";
import { checkIsAuthenticatedRequestType } from "../utils/typeCheck";
import { TDeleteArticleParams, TGetArticleParams } from "../models/requestParams";

type TCreateArticlesRequest = Request & {
  file: Express.Multer.File | undefined;
  body: TCreateArticleBody;
  user: TUserTokenData;
};

type TEditArticlesRequest = Request & {
  file: Express.Multer.File | undefined;
  body: TEditArticleBody;
  user: TUserTokenData;
};
export const createArticleController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customReq = req as TCreateArticlesRequest;

    const articleData = customReq.body;
    const articleImage = customReq.file;
    const user = customReq.user;

    const article = await createArticleService(user, articleData, articleImage);

    return res.status(201).json(new ResponseSuccess<typeof article>("Article created successfully.", article));
  } catch (err) {
    return next(err);
  }
};

export const editArticleController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customReq = req as TEditArticlesRequest;

    const articleData = customReq.body;
    const articleImage = customReq.file;
    const user = customReq.user;

    const article = await editArticleService(user, articleData, articleImage);

    return res.status(201).json(new ResponseSuccess<typeof article>("Article edited successfully.", article));
  } catch (err) {
    return next(err);
  }
};

export const getArticlesController = async (req: Request<TGetArticleParams>, res: Response, next: NextFunction) => {
  try {
    const locationId = req.params.locationId;

    if (!checkIsAuthenticatedRequestType(req)) {
      throw new Err("Your token is not valid, please login.", { statusCode: 403, name: "Authentication Error", place: "getTablesController" });
    }

    const user = req.user;

    const articles = await getArticlesService(locationId, user);

    return res.status(200).json(new ResponseSuccess<typeof articles>("Articles retrieved successfully.", articles));
  } catch (err) {
    return next(err);
  }
};

export const deleteArticleController = async (req: Request<TDeleteArticleParams>, res: Response, next: NextFunction) => {
  try {
    const { locationId, articleId } = req.params;

    if (!checkIsAuthenticatedRequestType(req)) {
      throw new Err("Your token is not valid, please login.", { statusCode: 403, name: "Authentication Error", place: "deleteArticleController" });
    }

    const user = req.user;

    await deleteArticleService(locationId, articleId, user);

    return res.status(200).json(new ResponseSuccess("Article deleted successfully.", {}));
  } catch (err) {
    return next(err);
  }
};
