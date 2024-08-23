import Joi from "joi";

import { categoryIdMessages, tableCategoriesMessages, tableLocationIdMessages, tableNameMessages } from "../messages";

export const createTableSchema = Joi.object({
  name: Joi.string().min(1).max(20).lowercase().required().messages(tableNameMessages),
  locationId: Joi.string().guid().required().messages(tableLocationIdMessages),
  categories: Joi.array().items(Joi.string().guid().messages(categoryIdMessages)).required().messages(tableCategoriesMessages),
});
