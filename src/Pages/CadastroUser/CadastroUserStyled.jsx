import styled from "styled-components";

export const ContentCadastro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  background-color: #f4f4f4;
  padding: 20px;
`;

export const InfoCadastro = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

export const ImgLogo = styled.img`
  width: 120px;
  height: 120px;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    width: 140px;
    height: 140px;
  }
`;

export const TituloCadastro = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

export const FormCadastro = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DivInput = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  background: #f9f9f9;
  border-radius: 5px;
  padding: 10px;
  border: 1px solid #ddd;

  svg {
    color: #999;
    margin-right: 10px;
    font-size: 18px;
  }

  input {
    flex: 1;
    border: none;
    background: transparent;
    font-size: 16px;
    outline: none;
  }
`;

export const ButtonArrow = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  position: absolute;
  top: 20px;
  left: 20px;
`;

export const LinkLogin = styled.a`
  display: block;
  margin-top: 15px;
  color: #007bff;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;
