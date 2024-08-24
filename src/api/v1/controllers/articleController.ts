import { Request, Response, NextFunction } from "express";
import { RequestHandler } from "express";

import { TCreateArticleBody } from "../models/requestBodies";
import { TUserTokenData } from "../models/user";
import { createArticleService } from "../services/articleService";
import { ResponseSuccess } from "../models/responseBodies";

type TCreateArticlesRequest = Request & {
  file: Express.Multer.File;
  body: TCreateArticleBody;
  user: TUserTokenData;
};
export const createArticle: RequestHandler = async (req, res, next) => {
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
