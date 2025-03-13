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
    background-color: #d9534f;
    color: white;
  }

  &.prioridade {
    background-color: #a94442;
    color: white;
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
  color: #666;
`;

export const Value = styled.span`
  display: block;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-top: 5px;
`;
