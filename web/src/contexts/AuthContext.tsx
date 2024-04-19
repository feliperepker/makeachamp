"use client";
import { ReactNode, createContext } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { api } from "../services/api";

export interface AuthContextDataProps {
  signIn: () => Promise<void>;
}
interface AuthProviderProps {
  children: ReactNode;
}
export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const response = await api.post("/users", {
        access_token: tokenResponse.access_token,
      });
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      const userInfoResponse = await api.get("/me");
      localStorage.setItem(
        "user-cubetimer",
        JSON.stringify(userInfoResponse.data.user)
      );
      localStorage.setItem("token-cubetimer", response.data.token);
    },
  });

  async function signIn() {
    login();
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
