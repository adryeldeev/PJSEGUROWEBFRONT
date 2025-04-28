import styled from "styled-components";

export const DivContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
`;
export const Input = styled.input`
width:60%;
heigth:40px;
padding: 10px;
outline:none;
border:1px solid #ccc;
`

export const InfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
`;

export const InfoBox = styled.div`
  background-color: #f8f8f8;
  padding: 10px;
  border-radius: 8px;
  min-width: 200px;
  flex: 1;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  &.fase {
    background-color: #e67e22; /* Laranja claro */
    color: #fff; /* Texto branco */
    font-weight: bold;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }
  
  &.prioridade {
    background-color: #d35400; /* Laranja escuro */
    color: #fff; /* Texto branco */
    font-weight: bold;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }

    select {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    cursor: pointer;
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
`;

export const Label = styled.span`
  display: block;
  font-size: 14px;
  font-weight: bold;
  color: #000;
`;

export const Value = styled.span`
  display: block;
  font-size: 16px;
  font-weight: bold;
  color: #000;
  margin-top: 5px;
`;
