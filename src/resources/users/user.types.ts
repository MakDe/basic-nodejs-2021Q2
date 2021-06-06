export type IUser = {
  id?: string | number | null;
  name: string;
  login: string;
  password?: string;
};

export type IUserHidden = {
  id?: string | number | null | undefined;
  name: string;
  login: string;
};
