import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
const BASE_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("adminToken") || "");
  const [login, setLogin] = useState(() => !!localStorage.getItem("adminToken"));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const userLogin = async (username, password) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${BASE_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) throw new Error("Credenciais inválidas");
      const data = await response.json();
      setToken(data.token);
      setLogin(true);
      localStorage.setItem("adminToken", data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const userLogout = () => {
    setToken("");
    setLogin(false);
    localStorage.removeItem("adminToken");
  };

  return (
    <AuthContext.Provider value={{ login, userLogin, userLogout, token, error, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
