import React, { createContext, useState, ReactNode } from "react";

interface AuthContextType {
  userInfos: UserInfos;
  changeUser: (newUser: UserInfos) => void;
}

interface UserInfos {
  name: string;
  avatar: string;
  token: string;
}

export const AuthContext = createContext<AuthContextType>({
  userInfos: { name: "", avatar: "", token: "" },
  changeUser: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userInfos, setUserInfos] = useState<UserInfos>({
    name: "",
    avatar: "",
    token: "",
  });

  const changeUser = (newUser: UserInfos) => {
    console.log("oi");
    console.log(newUser);
    setUserInfos(newUser);
  };

  const contextValue: AuthContextType = {
    userInfos,
    changeUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
