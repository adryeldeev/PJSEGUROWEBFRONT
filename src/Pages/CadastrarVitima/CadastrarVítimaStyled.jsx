import styled from 'styled-components';

export const ContentCadastrarVitima = styled.div`
  width: 100%;
  height: auto;
`;

export const Titulo = styled.h1`
  font-size: 14px;
  font-weight: bold;
`;

export const DivForm = styled.div`
  width: 100%;
  height: auto;
`;

export const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 colunas */
  gap: 20px;
  margin-top: 20px;

  label {
    font-size: 14px;
    font-weight: bold;
  }

  input {
    height: 30px;
    padding: 0 10px;
    
    &:placeholder {
      padding: 0 10px;
    }

    &:focus {
      border-color: #007bff; /* Cor de borda ao focar */
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Adiciona sombra ao redor */
    }
  }

  button {
    grid-column: span 1; /* Ocupa as 2 colunas */
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
`;

export const Input = styled.input`
  width: 60%;
  height: 30px;
  padding: 0 10px;
  outline: none;
  border: 1px solid #ccc;

  &:focus {
    border-color: #007bff; /* Cor de borda ao focar */
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Adiciona sombra ao redor */
  }
`

export const DivInputs = styled.div`
  display: flex;
  flex-direction: column;
  
  label {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
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
  }
    `