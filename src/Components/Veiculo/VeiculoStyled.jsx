import styled from 'styled-components';

export const DivTipo = styled.div`
  width: 100%;
  position: relative;
`;

export const DivConteudo = styled.div`
  display: flex;
  justify-content: space-between; /* Alinha o título e o botão */
  align-items: center; /* Centraliza verticalmente */
  padding: 10px 0;
`;

export const Titulo = styled.h1`
  font-weight: bold;
  margin: 0;
`;

export const DivButton = styled.div`
  position: relative; /* Para o dropdown funcionar */
`;

export const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
`;

export const UlList = styled.ul`
  position: absolute;
  top: 40px; /* Distância do botão */
  right: 0; /* Alinha à direita */
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin: 0;
  padding: 5px 0;
  z-index: 1000;
  list-style: none;
  width: max-content;
`;

export const Li = styled.li`
  padding: 5px 15px;
  cursor: pointer;
`;
export const DivSpans = styled.div`
display:flex;
flex-direction:column;
width:100%`;

export const BtnToggle = styled.button`
  background: #ccc;
  color: #000;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
`;