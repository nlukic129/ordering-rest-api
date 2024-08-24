import Joi from "joi";

import { categoryIdMessages, locationIdMessages, tableCategoriesMessages, tableIdMessages, tableNameMessages } from "../messages";

export const editTableSchema = Joi.object({
  id: Joi.string().guid().required().messages(tableIdMessages),
  name: Joi.string().min(1).max(20).lowercase().required().messages(tableNameMessages),
  locationId: Joi.string().guid().required().messages(locationIdMessages),
  categories: Joi.array().items(Joi.string().guid().messages(categoryIdMessages)).required().messages(tableCategoriesMessages),
});
