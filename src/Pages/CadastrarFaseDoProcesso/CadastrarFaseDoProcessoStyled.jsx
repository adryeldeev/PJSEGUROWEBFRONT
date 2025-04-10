import styled from 'styled-components';

export const ContentCadastroFaseDoProcesso = styled.div`
  padding: 20px;
  max-width: 900px; /* Limita a largura máxima do container */
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
    gap: 10px;

     div {
      flex: 1; /* Faz com que os itens ocupem o mesmo espaço */
      max-width: 100%; /* Limita a largura de cada item */
    }
      input[type="text"], input[type="color"] {
    width: 100%; /* Faz com que os inputs ocupem toda a largura disponível */
    height: 30px; /* Altura do seletor de cor */
    font-size: 13px;
    }
  }
`;

export const DivToggles = styled.div`
  display: flex;
  flex-direction: column; /* Padrão para telas menores */
  gap: 10px;

  @media (min-width: 768px) {
    flex-direction: row; /* Em telas maiores, exibe os toggles lado a lado */
    gap: 20px;
  }
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
    gap:10px;
    
    }
`;