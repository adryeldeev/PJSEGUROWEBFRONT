import axios from 'axios';
import { useAuth } from '../Context/AuthProvider.jsx';


const useApi = () => {
  const { token } = useAuth(); // Obtém o token do contexto

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Fallback para desenvolvimento
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Interceptor para adicionar o token
  api.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return api;
};

export default useApi;