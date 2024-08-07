import axios from "../axiosConfig";
import React, {
  useContext,
  useState,
  ReactNode,
  createContext,
  useEffect,
} from "react";
import { AuthContextType, User } from "../interfaces/interfaces";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const tokenAccess = localStorage.getItem("tokenAccess");
    if (tokenAccess) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${tokenAccess}`;
    }
  }, []);

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/user/login/", { username, password });
      const tokenAccess = response.data.access;

      setUser(response.data);
      setLoading(true);
      localStorage.setItem("tokenAccess", tokenAccess);
      axios.defaults.headers.common["Authorization"] = `Bearer ${tokenAccess}`;
    } catch (err: any) {
      setError(err.response?.data?.message || "Falha no login.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("tokenAccess");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider.");
  }
  return context;
};
