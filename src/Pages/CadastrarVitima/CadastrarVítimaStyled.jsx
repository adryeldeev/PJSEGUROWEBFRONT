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
  max-height: 400px; /* Define a altura máxima */
  overflow-y: auto; /* Adiciona scroll se necessário */
  padding-right: 10px; /* Para evitar que o conteúdo fique colado na borda do scroll */

  label {
    font-size: 14px;
    font-weight: bold;
  }

  button {
    grid-column: span 3; /* Ocupa as 3 colunas */
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
width:80%;
max-heigth:100%;
outline:none;
border: 1px solid #ccc;
&:placeholder{
  white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block; /* Garante que funcione */
    max-width: 100%; /* Garante que o placeholder respeite o tamanho do input */
}

`;

export const DivInputs = styled.div`
  display: flex;
  flex-direction: column;
`;