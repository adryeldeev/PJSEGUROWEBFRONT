import styled from "styled-components";

export const DivContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1200px; /* Definindo um limite de largura máxima para telas grandes */
  margin: 0 auto; /* Centraliza o conteúdo */
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    
    max-width: 80%; /* Definindo um limite de largura máxima para telas grandes */
  }
`;

export const Title = styled.h2`
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 28px;
  color: #333;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    width:100%
  }
`;

export const InfoSpans = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  box-sizing: border-box;
  
  &:focus {
    border-color: #007bff;
  }
`;

export const InfoBox = styled.div`
  background-color: #f8f8f8;
  padding: 15px;
  border-radius: 8px;
  min-width: 250px;
  flex: 1;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 80%;
  }
`;

export const Label = styled.span`
  display: block;
  font-size: 14px;
  font-weight: bold;
  color: #666;
  margin-bottom: 5px;
  `;
  
  export const Value = styled.span`
  display: block;
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

export const Span = styled.span`
  font-size: 16px;
`;

export const DivSinistroInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    }
    `;
    
    export const InfoBoxWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    background-color: #f8f8f8;
    padding: 15px;
    border-radius: 8px;
    min-width: 250px;
    flex: 1;
    
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    flex-direction: column;
   
  }
`;

export const InfoBoxItem = styled.p`
  flex: 1 1 100px; /* Flexibilidade no tamanho das caixas */
  min-width: 200px;
  background: #f8f9fa;
  padding: 12px;
  border-radius: 8px;

  font-weight: bold;
  color: #333;
  text-align:and;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #0056b3;
  }
  
  &:focus {
    outline: none;
  }
`;
