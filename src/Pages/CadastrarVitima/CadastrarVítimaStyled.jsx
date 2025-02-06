import styled from 'styled-components'


export const ContentCadastrarVitima = styled.div`
width:100%;
heigth:auto;
`;

export const Titulo = styled.h1`
font-size: 14px;
font-weight: bold;
`;

export const DivForm = styled.div`
width:100%;
heigth:auto;

`

export const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 3 colunas */
  gap: 20px;
  margin-top:20px;

  label {
    font-size: 14px;
    font-weight: bold;
  }
  input{
  height: 30px;
  padding: 0 10px; 
 
  &:placeholder{
    padding: 0 10px; 
    }
  }

  button {
    grid-column: span 1; /* Ocupa as 3 colunas */
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
width:60%;
height: 30px;
padding: 0 10px; 
outline:none;
border: 1px solid #ccc;

`;

export const DivInputs = styled.div`
  display: flex;
  flex-direction: column;
`;