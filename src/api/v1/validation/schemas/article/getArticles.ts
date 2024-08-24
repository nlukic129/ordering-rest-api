import Joi from "joi";

import { locationIdMessages } from "../messages";

export const getArticlesSchema = Joi.object({
  locationId: Joi.string().guid().required().messages(locationIdMessages),
});
