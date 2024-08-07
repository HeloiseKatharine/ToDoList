import axios from "../axiosConfig";
import React, { useContext, useState, ReactNode, createContext } from "react";
import { RegisterContextType, User } from "../interfaces/interfaces";

const RegisterContext = createContext<RegisterContextType | undefined>(
  undefined
);

export const RegisterProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorRegister, setErrorRegister] = useState<string | null>(null);

  const register = async (
    username: string,
    password: string,
    email: string
  ) => {
    setLoading(true);
    setErrorRegister(null);

    try {
      email = username;
      const response = await axios.post("/user/", {
        username,
        password,
        email,
      });
      setUser(response.data);
      setLoading(true);
    } catch (err: any) {
      setErrorRegister(err.response?.data?.message || "Falha no cadastro.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <RegisterContext.Provider
      value={{ loading, errorRegister, register, logout }}
    >
      {children}
    </RegisterContext.Provider>
  );
};

export const useRegister = (): RegisterContextType => {
  const context = useContext(RegisterContext);
  if (context === undefined) {
    throw new Error(
      "useRegister deve ser usado dentro de um RegisterProvider."
    );
  }
  return context;
};
