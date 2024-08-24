import { Request, Response, NextFunction } from "express";
import { RequestHandler } from "express";

import { TCreateArticleBody } from "../models/requestBodies";
import { TUserTokenData } from "../models/user";
import { createArticleService, getArticlesService } from "../services/articleService";
import { ResponseSuccess } from "../models/responseBodies";
import { checkIsAuthenticatedRequestType } from "../utils/typeCheck";
import Err from "../../../models/Error";

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

export const getArticlesController = async (req: Request, res: Response, next: NextFunction) => {
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
