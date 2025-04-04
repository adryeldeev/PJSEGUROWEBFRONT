import styled from "styled-components";

export const ContentCadastro = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const InfoCadastro = styled.div`
  width: 100%;
  @media (min-width: 768px) {
  display:flex;
     flex-direction: row;
     justify-content:space-between;
  }

`;

export const DivInputs = styled.div`
  display: flex;
  flex-wrap: wrap; /* Permite que os itens quebrem a linha quando necessário */
  gap: 20px;
  width: 100%;

  div {
    display: flex;
    flex-direction: column; /* Mantém o label acima do input */
    width: 100%; /* Padrão mobile: ocupa 100% */
  }

  label {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    padding: 10px;
  }

 
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
     @media (min-width: 768px) {
     width:100%;
     flex-direction: row;
     justify-content:space-between;
  }

`;
