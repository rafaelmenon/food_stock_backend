export type UserDTO = {
  name: string;
  email: string;
  password: string;
};

export type UsersDTO = {
  name: string;
  email: string;
};

export type ReturnUserDTO = {
  id?: number;
  code: number;
  message: string;
};

export type ReturnUsersDTO = {
  total: number;
  totalPage: number;
  users: UsersDTO[];
};
