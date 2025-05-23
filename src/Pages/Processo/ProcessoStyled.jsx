import styled from "styled-components";

export const Container = styled.div`
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
    max-width: 1200px;
    margin: auto;
   
    
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

`;

export const Filtros = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    flex-wrap: wrap;

    button {
        background: #007bff;
        color: white;
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-bottom: 5px;

        &:hover {
            background: #0056b3;
        }
    }
`;

export const BotaoNovo = styled.button`
    background: #28a745;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 5px;

    &:hover {
        background: #218838;
    }
`;

// Contêiner para permitir rolagem horizontal em telas pequenas
export const TabelaWrapper = styled.div`
  overflow-x: auto;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

export const Tabela = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background: #f4f4f4;
  }

  @media (max-width: 768px) {
    display: block; /* Exibe a tabela como bloco */
  }
`;
export const Thead = styled.thead`
  background-color: #f4f4f4;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column; /* Exibe os cabeçalhos em coluna */
    gap: 10px; /* Espaçamento entre os itens */
  }
`;

export const Tr = styled.tr`
  @media (max-width: 768px) {
    display: block; /* Cada linha vira um bloco */
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
  }
`;
export const Th = styled.th`
  padding: 8px;
  min-width: 50px;
  text-align: left;

  @media (max-width: 768px) {
    display: block; /* Cada cabeçalho vira um bloco */
    text-align: left;
  }
`;
export const Td = styled.td`
  padding: 8px;
  min-width: 50px;
  text-align: left;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ddd;

    &:last-child {
      border-bottom: none;
    }

    &::before {
      content: attr(data-label); /* Exibe o rótulo da coluna */
      font-weight: bold;
      margin-right: 10px;
    }
  }
`;
export const BotaoAcoes = styled.button`
    background-color: #f44336;
    color: white;
    border:none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    display: inline-block;
   
`;



export const StatusBadge = styled.span`
    background: ${({ status }) => 
        status.includes("Andamento") ? "#28a745" :
        status.includes("Seguradora") ? "#007bff" :
        status.includes("Negado") ? "#dc3545" : "#6c757d"};
    color: white;
    padding: 6px 10px;
    border-radius: 12px;
    font-size: 12px;
    
    @media (max-width: 768px) {
        font-size: 10px;
        padding: 4px 8px;
    }
`;

export const ButtonsDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
  width: 100%;
  margin-bottom: 10px;
`;

export const PageInfo = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin: 0 20px;
  display: flex;
  align-items: center;
`;

// Botões de navegação com estilo
export const NavigationButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #d6d6d6;
    cursor: not-allowed;
  }
`;
