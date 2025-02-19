import styled from "styled-components";

export const DivContent = styled.div`
width:100%;
heigth:auto;
`;
export const DivProcesso = styled.div`

  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
 
`;

export const DivHeader = styled.div`
  margin-bottom: 20px;

`;


export const DivContentInputs = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 10px;
`;


export const DivInputsModal = styled.div`
   display: flex;
  flex-direction: column;
  gap: 5px;

  label {
    font-size: 14px;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
` 


export const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 colunas */
  gap: 20px;
  max-height: 400px; /* Define a altura máxima */
  overflow-y: auto; /* Adiciona scroll se necessário */
  padding-right: 10px; /* Para evitar que o conteúdo fique colado na borda do scroll */

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



export const ModalBackDro = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
   
`;

export const ModalCadastroContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 700px; /* Ajuste a largura do modal */
  max-width: 100%;
`;

export const ModalCadastroContent = styled.div`
  display: flex;
  flex-direction: column;

  
    div {
      margin-bottom: 10px;

      label {
        display: block;
        margin-bottom: 5px;
      }

    }

    button {
      margin-top: 10px;
      padding: 10px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:nth-child(2) {
        background: #6c757d;
      }
    }
  
`
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

export const BotaoCriarProcesso = styled.button`
  margin-top: 20px;  // Isso vai criar o espaço entre o DynamicVitma e o botão
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;