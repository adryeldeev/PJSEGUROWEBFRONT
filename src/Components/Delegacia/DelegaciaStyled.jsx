import styled from "styled-components";

export const DivContentDelegacia = styled.div`
margin-top:30px;
`

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
`;

export const Titulo = styled.h1`
  font-size: 14px;
`;

export const DivDelegaciaInput = styled.div`
  display: flex;
  gap: 15px; /* Espaço entre os inputs */
  flex-wrap: wrap; /* Permite que os inputs quebrem linha se não couberem */
`;

export const Input = styled.input`
  width: 100%;
  height: 40px; /* Corrigido de 'heigth' para 'height' */
  padding: 10px;
  outline: none;
  border: 1px solid #ccc;
`;

export const InfoBox = styled.div`
  background-color: #f8f8f8;
  padding: 10px;
  border-radius: 8px;
  min-width: 200px;
  flex: 1;
  text-align: left;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const Label = styled.span`
  display: block;
  font-size: 14px;
  font-weight: bold;
  color: #666;
  margin-bottom: 5px;
`;
