import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  nombre: string;
  rol: 'admin' | 'encargado';
}

interface AuthContextType {
  user: User | null;
  login: (nombre: string, password: string) => Promise<boolean>;
  logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);


import axios from 'axios';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (nombre: string, password: string) => {
    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/login` : 'http://127.0.0.1:8000/api/login',
        { nombre, password }
      );
      setUser({ nombre: res.data.nombre, rol: res.data.rol });
      return true;
    } catch (err) {
      return false;
    }
  };
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
