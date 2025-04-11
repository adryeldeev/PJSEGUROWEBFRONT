import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(""); // Estado para armazenar mensagens de erro
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();

  const loginAction = async (data) => {
    try {
      const response = await axios.post(
        "https://my-fist-project-production.up.railway.app/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      const res = response.data;
  
      if (res.token) {
        setToken(res.token);
        localStorage.setItem("site", res.token);
  
        setUser(res.userData);
        localStorage.setItem("user", JSON.stringify(res.userData)); // <--- ESSENCIAL
  
        setError("");
        navigate("/");
      } else {
        throw new Error(res.message || "Login falhou");
      }
    } catch (err) {
      console.error("Login failed:", err.message);
  
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 401:
            setError("E-mail ou senha incorreta. Tente novamente.");
            break;
          case 404:
            setError("Usuário não encontrado. Verifique o email.");
            break;
          default:
            setError("Erro ao fazer login. Tente novamente mais tarde.");
        }
      } else {
        setError("Erro de conexão. Verifique sua internet.");
      }
    }
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("site");
  
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);
  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    localStorage.removeItem("user"); 
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};