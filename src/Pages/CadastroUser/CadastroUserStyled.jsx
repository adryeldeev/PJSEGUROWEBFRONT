import styled from "styled-components";

export const ContentCadastro = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px;
`;
export const InfoCadastro = styled.div`
  display: flex;
  flex-direction: column;
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

export const TituloCadastro = styled.h2`
  text-align: center;
`;

export const FormCadastro = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 20px;

`


