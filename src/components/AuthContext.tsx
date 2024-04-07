import React, { createContext, useEffect, useState } from "react";
import { LoginResponse } from "../interfaces/IUser";
import { getToken } from "../utils/token";

const AuthContext = createContext({
  isLoggedIn: !!getToken(),
  userInfo: {
    token: getToken(),
    user: {
      userId: localStorage.getItem("user_id"),
      email: localStorage.getItem("email"),
    },
  } as UserInfo | undefined,
  login: (loginData: UserInfo): void => {},
  logout: (): void => {},
});

type Props = { children: React.ReactNode };

type UserInfo = {
  token: string;
  user: { userId: string; email: string; nickname: string };
};

const AuthProvider = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);

  useEffect(() => {
    setIsLoggedIn(!!getToken());
  }, []);

  const login = ({ token, user }: UserInfo) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user_id", user.userId);
    localStorage.setItem("email", user.email);
    localStorage.setItem("nickname", user.nickname);
    setIsLoggedIn(true);
    setUserInfo({ token, user });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("email");
    localStorage.removeItem("nickname");
    setIsLoggedIn(false);
    setUserInfo(undefined);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
