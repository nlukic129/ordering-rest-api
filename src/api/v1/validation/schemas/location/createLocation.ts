import Joi from "joi";

import {
  locationCoordinatesMessages,
  locationDisplayNameMessages,
  locationNameMessages,
  xCoordinatesMessages,
  yCoordinatesMessages,
} from "../messages";

export const createLocationSchema = Joi.object({
  name: Joi.string().min(1).max(20).lowercase().required().messages(locationNameMessages),
  displayName: Joi.string().min(1).max(20).required().messages(locationDisplayNameMessages),
  coordinates: Joi.object({ x: Joi.number().required().messages(xCoordinatesMessages), y: Joi.number().required().messages(yCoordinatesMessages) })
    .required()
    .messages(locationCoordinatesMessages),
});
