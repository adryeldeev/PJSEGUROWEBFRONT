import styled from 'styled-components';

export const DivContentTable = styled.div`
  max-width: 100%;
  height: 100%;
`;

export const TableContent = styled.table`
  width: 100%;
  min-width: 600px;  /* Garante que a tabela tenha uma largura mínima, se necessário */
  border-collapse: collapse;
`;

export const TableWrapper = styled.div`
  max-width: 100%;
  overflow-x: auto; /* Habilita o scroll horizontal */
  white-space: nowrap; /* Garante que o conteúdo não quebre linha */
  margin-top: 20px; /* Adiciona espaçamento superior, opcional */

  /* Adiciona a rolagem horizontal para telas menores que 768px */
  @media (max-width: 768px) {
    overflow-x: auto; /* Habilita o scroll horizontal em telas pequenas */
  }
`;

export const Title = styled.h2`
  font-size: 12px;
  color: #333;
`;

export const Thead = styled.thead`
  background-color: #f2f2f2;
  text-align: center;
`;

export const Tbody = styled.tbody`
  text-align: center;
  overflow-y: auto; /* Permite rolagem vertical */
  max-height: 300px; /* Limita a altura, ajustando conforme necessário */
`;

export const Th = styled.th`
  padding: 8px;
  min-width: 50px;
`;

export const Tr = styled.tr``;

export const Td = styled.td`
  padding: 8px;
  min-width: 50px;
`;

export const ButtonDelete = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 4px;
  margin-top: 10px;
`;

export const ButtonEdit = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 4px;
`;

export const ButtonsDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
  width: 100%;
  margin-bottom: 10px;
`;

export const ButtonAdd = styled.button`
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 4px;
  margin-top: 10px;
`;
export const Link = styled.a`
  text-decoration: none;
  color: #007bff;
`;


