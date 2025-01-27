import styled from "styled-components";

export const DivSelect = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ContentSelect = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const LabelSelect = styled.label`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
`;

export const Select = styled.select`
  width: 100%;
  max-width: 250px; /* Ajuste conforme necessário */
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 14px;
  color: #333;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  outline:none;
  
`;

export const Option = styled.option`
  padding: 8px;
`;

export const DivButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;
