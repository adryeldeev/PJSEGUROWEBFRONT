import styled from "styled-components";

export const ContentLogin = styled.div`
  width: 100%;
  height: 100%;
  background-color:#ccc;
`;

export const InfoContentLogin = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f5f5f5;
  padding: 20px;

  @media (min-width: 768px) {
    height: 70%; /* Ajuste para tablets */
  }

  @media (min-width: 1024px) {
    height: 80%; /* Ajuste para desktops */
  }
`;

export const ImgLogo = styled.img`
  width: 100px;
  height: 100px;

  @media (min-width: 768px) {
    width: 120px;
    height: 120px;
  }

  @media (min-width: 1024px) {
    width: 150px;
    height: 150px;
  }
`;

export const TitleLogin = styled.h1`
  font-size: 20px;
  color: #333;

  @media (min-width: 768px) {
    font-size: 25px;
  }

  @media (min-width: 1024px) {
    font-size: 30px;
  }
`;

export const FormLogin = styled.form`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  @media (min-width: 768px) {
    height: 50%; /* Ajuste para tablets */
  }

`

export const DivInputsLogin = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10px;
`;

export const InputLogin = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline:none;
  &::placeholder {
      color: #000;
    }
    
    `;
    
    export const ButtonLogin = styled.button`
  width: 100%;
    border: 1px solid #ccc;
  padding: 10px 20px;
  outline:none;
  background-color: yellow;
`

export const ErrorMessage = styled.p`
  color: red;
`;

export const LinkRegister = styled.a`
  margin-top: 10px;
  text-decoration: underline;
`;
export const LinkPassword = styled.a`
  margin-left:160px;
  text-decoration: underline;
`;


