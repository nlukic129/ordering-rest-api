export type TUserTokenData = {
  uuid: string;
  username: string;
  role: string;
};

export type TUserRoles = "ADMIN" | "MANAGER" | "WAITER" | "BAR" | "KITCHEN";
