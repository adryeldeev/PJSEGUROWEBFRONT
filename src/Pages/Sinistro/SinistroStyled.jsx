import styled from "styled-components";

export const DivContent = styled.div`

  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

export const Title = styled.h2`
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 24px;

  `;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction:column;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
`;
export const InfoSpnas = styled.div`
 display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
`
export const Input = styled.input`
width:60%;
heigth:40px;
padding: 10px;
outline:none;
border:1px solid #ccc;


`

export const InfoBox = styled.div`
  background-color: #f8f8f8;
  padding: 10px;
  border-radius: 8px;
  min-width: 200px;
  flex: 1;
  text-align: and;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  
`;

export const Label = styled.span`
  display: block;
  font-size: 14px;
  font-weight: bold;
  color: #666;
`;

export const Value = styled.span`
  display: block;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-top: 5px;
`;

export const Span = styled.span`
  font-size: 16px;
`
export const DivSinistroInput = styled.div`
display:flex;

`


export const InfoBoxWrapper = styled.div`
  display: flex;

  background-color: #f8f8f8;
  padding: 10px;
  border-radius: 8px;
  min-width: 200px;
  flex: 1;
  text-align: and;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  /* Em telas menores, os itens ficarão empilhados */
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const InfoBoxItem = styled.p`
  gap:5px;
  flex: 1 1 200px; /* Garante que os itens fiquem lado a lado, mínimo de 200px */
  min-width: 200px;
  background: #f8f9fa;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  color: #333;
`;