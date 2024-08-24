import Joi from "joi";

import { locationIdMessages } from "../messages";

export const getTablesSchema = Joi.object({
  locationId: Joi.string().guid().required().messages(locationIdMessages),
});
