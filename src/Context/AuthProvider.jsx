import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('')
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();

  const loginAction = async (data) => {
    try {
      const response = await axios.post("http://localhost:8000/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const res = response.data;
  
      if (res.token) {
        // Armazena o token retornado pela API
        setToken(res.token);
        localStorage.setItem("site", res.token);
        navigate("/");  // Ou para o dashboard, se for o caso
      } else {
        throw new Error(res.message || "Login failed");
      }
    } catch (err) {
      console.error("Login failed:", error);
      setError(err.message);  // Exibe o erro no formulário
    }
  };
  

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
