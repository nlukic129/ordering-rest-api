import { TAuthenticatedRequest } from "../models/requestBodies";
import { TUserTokenData } from "../models/user";

export const checkIsTokenDataType = (value: any): value is TUserTokenData => {
  return (
    typeof value === "object" &&
    typeof (value as TUserTokenData).uuid === "string" &&
    typeof (value as TUserTokenData).username === "string" &&
    typeof (value as TUserTokenData).role === "string"
  );
};

export const checkIsAuthenticatedRequestType = (value: any): value is TAuthenticatedRequest => {
  return typeof value === "object" && typeof value.cookies === "object" && typeof value.cookies.jwt === "string";
};
