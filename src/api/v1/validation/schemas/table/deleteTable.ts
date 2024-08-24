import Joi from "joi";

import { locationIdMessages, tableIdMessages } from "../messages";

export const deleteTableSchema = Joi.object({
  locationId: Joi.string().guid().required().messages(locationIdMessages),
  tableId: Joi.string().guid().required().messages(tableIdMessages),
});
