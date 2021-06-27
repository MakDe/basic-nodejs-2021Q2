export type IUser = {
  id: string;
  name: string;
  login: string;
  password?: string;
};

export type IUserHidden = {
  id: string;
  name: string;
  login: string;
};
