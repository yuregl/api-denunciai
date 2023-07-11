export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  admin?: boolean;
  active?: boolean 
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IResponseToken {
  token: string;
  userId: string
}

export interface ICredentials {
  id: string;
  uuid: string;
}

export interface IUserUpdate {
  name?: string;
  full_name?: string;
  password?: string;
  admin?: boolean;
}