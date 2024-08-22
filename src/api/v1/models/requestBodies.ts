import { Request } from "express";
import { TUserTokenData } from "./user";

export type TRegisterBody = {
  username: string;
  password: string;
  roleId: string;
};

export type TLoginBody = {
  username: string;
  password: string;
};

export type TAuthenticatedRequest = Request & {
  cookies: {
    jwt: string;
  };
  user: TUserTokenData;
};

export type TCreateLocationBody = {
  name: string;
  displayName: string;
  coordinates: {
    x: number;
    y: number;
  };
};
