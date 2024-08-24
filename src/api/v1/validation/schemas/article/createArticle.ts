import Joi from "joi";

import {
  articleCategoriesMessages,
  articleCodeMessages,
  articleDescriptionMessages,
  articleLocationIdMessages,
  articleNameMessages,
  articlePriceMessages,
  categoryIdMessages,
} from "../messages";

export const createArticleSchema = Joi.object({
  name: Joi.string().min(1).max(20).lowercase().required().messages(articleNameMessages),
  description: Joi.string().min(1).max(100).required().messages(articleDescriptionMessages),
  price: Joi.number().required().messages(articlePriceMessages),
  code: Joi.number().required().messages(articleCodeMessages),
  locationId: Joi.string().guid().required().messages(articleLocationIdMessages),
  categories: Joi.array().items(Joi.string().guid().messages(categoryIdMessages)).required().messages(articleCategoriesMessages),
});
