import Joi from "joi";

import { locationIdMessages, userIdMessages } from "../messages";

export const connectUserSchema = Joi.object({
  locationId: Joi.string().guid().required().messages(locationIdMessages),
  userId: Joi.string().guid().required().messages(userIdMessages),
});
