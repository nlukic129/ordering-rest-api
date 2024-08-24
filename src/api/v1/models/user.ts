export type TUserTokenData = {
  uuid: string;
  username: string;
  role: TUserRoles;
};

export type TUserRoles = "ADMIN" | "MANAGER" | "WAITER" | "BAR" | "KITCHEN";
