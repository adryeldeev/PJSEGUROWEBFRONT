import { createContext, useState, useEffect } from 'react';
import PropTypes from "prop-types";

// Criando o contexto com um valor padrão vazio
export const ApiUrlContext = createContext('');  // Exporte o contexto aqui

// Criando o provedor do contexto
export const ApiUrlProvider = ({ children }) => {
  const [apiUrl, setApiUrl] = useState(import.meta.env.VITE_API_URL || 'https://my-fist-project-production.up.railway.app');

  useEffect(() => {
    // Não é necessário fazer fetch do .env
    // A variável process.env.REACT_APP_API_URL já está disponível no ambiente
  }, []);

  return (
    <ApiUrlContext.Provider value={apiUrl}>
      {children}
    </ApiUrlContext.Provider>
  );
};

// Definindo a propType para garantir que children seja passado
ApiUrlProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
