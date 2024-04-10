interface User {
  email: string;
  password: string;
}
interface LoginUser extends User {
  id: number;
  nickname: string;
}
interface LoginResponse extends LoginUser {
  userId?: number;
  token: string;
}

export type { User, LoginUser, LoginResponse };
