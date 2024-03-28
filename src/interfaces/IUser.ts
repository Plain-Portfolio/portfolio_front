interface User {
  email: string;
  password: string;
}
interface LoginResponse {
  user: LoginUser;
  token: string;
}
interface LoginUser extends User {
  id: number;
  nickname: string;
}

export type { User, LoginUser, LoginResponse };
