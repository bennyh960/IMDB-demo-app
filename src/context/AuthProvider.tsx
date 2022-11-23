import React, { useState, createContext } from "react";

export interface Users {
  id: string | null;
  userName: string | null;
  email: string | null;
  password?: string | null;
  token?: string | null;
}

interface Auth {
  authUser: Users;
  setAuthUser: (user: Users) => void;
}

const UsersInitalState = {
  id: null,
  userName: null,
  email: null,
  password: null,
  token: null,
};

const AuthContext = createContext<Auth>({
  authUser: UsersInitalState,
  setAuthUser: (user: Users) => void {},
});

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [authUser, setAuthUser] = useState<Users>(UsersInitalState);
  return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
