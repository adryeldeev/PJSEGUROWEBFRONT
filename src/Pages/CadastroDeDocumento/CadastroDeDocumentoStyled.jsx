import styled from 'styled-components';

export const ContentCadastroDeDocumento = styled.div`
  padding: 20px;
  max-width: 900px;
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
  flex-direction: column; /* Padrão para telas menores */
  gap: 20px;
  width:100%;
  div {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  @media (min-width: 768px) {
    flex-direction: row; /* Em telas maiores, exibe os itens lado a lado */
    justify-content: space-between; /* Distribui os itens horizontalmente */
    gap: 5px;

    div {
      max-width: 100%; /* Limita a largura de cada item */
    }
  
    input[type="text"] {
    width: 100%; /* Faz com que os inputs ocupem toda a largura disponível */
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
  
  button {
    align-self: flex-end; /* Alinha o botão à direita */
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
    @media (min-width: 768px){
    gap:5px;
    
    }
`;





