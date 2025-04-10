import styled from 'styled-components';

export const ContentCadastroSeguradora = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  h4{
    margin-bottom: 40px; /* Adiciona espaçamento abaixo do título */
    font-size: 20px; /* Tamanho da fonte do título */
    font-weight: bold; /* Negrito */
    color: #333; /* Cor do texto */
  }
`;

export const InfoCadastro = styled.div`
  margin-top: 40px;
`;
export const DivInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  label {
    font-size: 16px;
    font-weight: bold;
  }

` 

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  label {
    font-size: 16px;
    font-weight: bold;
  }

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
`;




