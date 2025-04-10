import styled from 'styled-components';

export const ContentCadastroBanco = styled.div`
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
`;

export const InfoCadastro = styled.div`
  margin-top: 20px;
`;
export const DivInputs = styled.div`
  display: flex;
  flex-direction: column; /* Padrão para telas menores */
  gap: 20px;
  width: 100%;

  div {
    display: flex;
    flex-direction: column; /* Labels acima dos inputs */
    gap: 5px;
    width: 100%;
  }

  @media (min-width: 768px) {
    flex-direction: row; /* Em telas maiores, exibe os itens lado a lado */
    justify-content: space-between; /* Distribui os itens horizontalmente */
    gap: 15px;

    div {
      flex: 1; /* Faz com que os itens ocupem o mesmo espaço */
      max-width: 100%; /* Limita a largura de cada item */
    }
    input[type='text']{
    width:100%;

    }
  }
`;

export const DivButton = styled.div`
  display: flex;
  justify-content: flex-start; /* Alinha o botão à esquerda */
  margin-top: 20px; /* Adiciona espaçamento acima do botão */
`;

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
     @media (min-width: 768px) {
     gap:5px;
     }
`;




