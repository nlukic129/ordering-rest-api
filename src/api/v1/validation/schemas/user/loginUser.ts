import Joi from "joi";

import { usernameMessages, passwordMessages } from "../messages";

export const loginUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages(usernameMessages),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"))
    .required()
    .messages(passwordMessages),
});
