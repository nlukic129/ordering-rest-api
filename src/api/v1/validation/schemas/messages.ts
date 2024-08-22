export const usernameMessages = {
  "string.base": "Username must be a string.",
  "string.empty": "Username cannot be empty.",
  "string.min": "Username must be at least {#limit} characters long.",
  "string.max": "Username can be at most {#limit} characters long.",
  "any.required": "Username is required.",
};

export const passwordMessages = {
  "string.base": "Password must be a string.",
  "string.empty": "Password cannot be empty.",
  "string.min": "Password must be at least {#limit} characters long.",
  "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
  "any.required": "Password is required.",
};

export const confirmPasswordMessages = {
  "string.base": "Confirm password must be a string.",
  "string.empty": "Confirm password cannot be empty.",
  "any.only": "Confirm password must match the password.",
  "any.required": "Confirm password is required.",
};

export const roleIdMessages = {
  "string.base": "Role ID must be a string.",
  "string.empty": "Role ID cannot be empty.",
  "string.guid": "Role ID must be a valid UUID version 4.",
  "any.required": "Role ID is required.",
};

export const locationNameMessages = {
  "string.base": "Location name must be a string.",
  "string.empty": "Location name cannot be empty.",
  "string.lowercase": "Location name must be lowercase.",
  "string.min": "Location name must be at least {#limit} characters long.",
  "string.max": "Location name can be at most {#limit} characters long.",
  "any.required": "Location name is required.",
};

export const locationDisplayNameMessages = {
  "string.base": "Location display name must be a string.",
  "string.empty": "Location display name cannot be empty.",
  "string.min": "Location display name must be at least {#limit} characters long.",
  "string.max": "Location display name can be at most {#limit} characters long.",
  "any.required": "Location display name is required.",
};

export const locationCoordinatesMessages = {
  "object.base": "Coordinates must be an object.",
  "object.empty": "Coordinates cannot be empty.",
  "object.required": "Coordinates are required.",
};

export const xCoordinatesMessages = {
  "number.base": "X-coordinate must be a number.",
  "any.required": "X-coordinate is required.",
};

export const yCoordinatesMessages = {
  "number.base": "Y-coordinate must be a number.",
  "any.required": "Y-coordinate is required.",
};
