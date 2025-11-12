// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type User = {
  id?: number;
  email: string;
  name?: string;
};

export type AuthContextType = {
  token: string | null;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Ao iniciar, tenta restaurar token do AsyncStorage
  useEffect(() => {
    const restore = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        const storedUser = await AsyncStorage.getItem("user");
        if (storedToken) {
          setToken(storedToken);
        }
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.warn("Erro ao restaurar auth:", err);
      } finally {
        setLoading(false);
      }
    };
    restore();
  }, []);

  // login tipado que retorna Promise<void>
  const login = async (email: string, password: string) => {
    // validação simples local — substitua por chamada real à API
    return new Promise<void>(async (resolve, reject) => {
      try {
        // Simulação de chamada à API:
        // Ex.: const resp = await api.post('/auth/login', { email, password });
        // const { token, user } = resp.data;

        if (email === "prof@teste.com" && password === "123456") {
          const fakeToken = "jwt-ficticio";
          const fakeUser: User = { email, name: "Professor Teste", id: 1 };

          await AsyncStorage.setItem("token", fakeToken);
          await AsyncStorage.setItem("user", JSON.stringify(fakeUser));
          setToken(fakeToken);
          setUser(fakeUser);
          resolve();
        } else {
          // credenciais inválidas
          reject(new Error("Credenciais inválidas"));
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
    } catch (err) {
      console.warn("Erro ao limpar storage:", err);
    } finally {
      setToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
