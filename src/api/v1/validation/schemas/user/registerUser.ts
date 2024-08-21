import Joi from "joi";

import { usernameMessages, passwordMessages, confirmPasswordMessages, roleIdMessages } from "../messages";

export const registerUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages(usernameMessages),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"))
    .required()
    .messages(passwordMessages),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages(confirmPasswordMessages),
  roleId: Joi.string().guid({ version: "uuidv4" }).required().messages(roleIdMessages),
});
