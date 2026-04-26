import { createContext, useEffect, useState, type ReactNode } from "react";
import type {
  AuthContextType,
  LoginRequest,
  LogoutRequest,
  RegisterRequest,
  User,
} from "../types";
import {
  loginService,
  registerService,
  logoutService,
} from "../services/authService";
import { getMe } from "../services/userService";

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isAuthenticated = !!user;
  
  useEffect(() => {
    const checkSession = async () => {
      try {
        setUser(await getMe());
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    checkSession();
  }, []);

  const login = async (data: LoginRequest) => {
    try {
      const response = await loginService(data);
      console.log("response completo:", response)
      const { token, refreshToken, message, ...userData } = response
      console.log("userData:", userData)
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      setUser(userData);

      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      const response = await registerService(data);
      const { token, refreshToken, message, ...userData } = response
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      setUser(userData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async (data: LogoutRequest) => {
    try {
      const response = await logoutService(data);
      localStorage.clear();
      setUser(null);
      return response;
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
