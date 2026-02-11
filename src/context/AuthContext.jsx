import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { API_AUTH } from "../config/api";

const AuthContext = createContext(null);

const TOKEN_KEY = "admin_token";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getToken = () => localStorage.getItem(TOKEN_KEY);

  const setToken = (token) => {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  };

  const fetchUser = async () => {
    const token = getToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.get(`${API_AUTH}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (true) {
        setUser(data.user);
      } else {
        setToken(null);
        setUser(null);
      }
    } catch {
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (email, password) => {
    const { data } = await axios.post(`${API_AUTH}/login`, { email, password });
    const role = (data.user?.role && String(data.user.role).toLowerCase()) || "";
    if (role !== "admin") {
      setToken(null);
      throw new Error("Admin access required");
    }
    setToken(data.token);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const authHeader = () => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, fetchUser, getToken, authHeader }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
