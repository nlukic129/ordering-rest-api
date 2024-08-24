import Joi from "joi";

import { articleIdMessages, locationIdMessages } from "../messages";

export const deleteArticleSchema = Joi.object({
  locationId: Joi.string().guid().required().messages(locationIdMessages),
  articleId: Joi.string().guid().required().messages(articleIdMessages),
});
