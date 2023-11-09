export interface AuthRegisterBody {
  email: string;
  username: string;
  password: string;
}

export interface User {
  tag: String;
  email: string;
  username: string;
  password: string;
  token: string;
  createdAt: Date;
  icon: string;
}

export interface SimpleUser {
  username: string;
  createdAt: Date;
}

export interface EditUserBody {
  id: string;
  username: string;
  icon: string;
  password: string;
}
