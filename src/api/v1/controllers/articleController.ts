import { Request, Response, NextFunction } from "express";
import { RequestHandler } from "express";

import Err from "../../../models/Error";
import { TCreateArticleBody } from "../models/requestBodies";
import { TUserTokenData } from "../models/user";
import { createArticleService, deleteArticleService, getArticlesService } from "../services/articleService";
import { ResponseSuccess } from "../models/responseBodies";
import { checkIsAuthenticatedRequestType } from "../utils/typeCheck";
import { TDeleteArticleParams, TGetArticleParams } from "../models/requestParams";

type TCreateArticlesRequest = Request & {
  file: Express.Multer.File;
  body: TCreateArticleBody;
  user: TUserTokenData;
};
export const createArticleController: RequestHandler = async (req, res, next) => {
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
