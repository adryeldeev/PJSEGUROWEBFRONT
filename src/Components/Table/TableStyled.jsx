import styled from "styled-components";

export const DivContentTable = styled.div`
  max-width: 100%;
  height: 100%;
`;


export const TableWrapper = styled.div`
  max-width: 100%;
  overflow-x: auto;
  margin-top: 20px;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
  }
`;

export const Title = styled.h2`
  font-size: 12px;
  color: #333;
  `
;
export const TableContent = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const Thead = styled.thead`
  background-color: #f2f2f2;
  text-align: center;
`;

export const Tbody = styled.tbody`
  text-align: center;
  overflow-y: auto;
  max-height: 300px;
`;

export const Th = styled.th`
  padding: 8px;
  min-width: 50px;
`;

export const Tr = styled.tr`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    border: 1px solid #ddd;
    margin-bottom: 10px;
    padding: 10px;
  }
`;

export const Td = styled.td`
  padding: 8px;
  min-width: 50px;
  text-align: center;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ddd;

    &::before {
      content: attr(data-label);
      font-weight: bold;
      margin-right: 10px;
    }
  }
`;
export const Link = styled.a`
  text-decoration: none;
  color: #007bff;
  `
;

export const ButtonDelete = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 4px;
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
`;

export const PageInfo = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin: 0 20px;
  display: flex;
  align-items: center;
`;

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
