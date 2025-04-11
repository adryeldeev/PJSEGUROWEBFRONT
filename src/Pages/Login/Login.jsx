import {
  ButtonLogin,
  ContentLogin,
  DivInputsLogin,
  DivLinks,
  FormLogin,
  ImgLogo,
  InfoContentLogin,
  InputLogin,
  LinkPassword,
  TitleLogin,
  IconWrapper,
} from "./LoginStyled";
import { AiOutlineMail } from "react-icons/ai";
import { TbLockPassword } from "react-icons/tb";
import Logo from "../../Img/Logo.webp";
import { useState } from "react";
import { useAuth } from "../../Context/AuthProvider";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const { loginAction, error } = useAuth(); // Acessa o erro do contexto

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [id]: value,
    }));
  };

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    await loginAction(input); // Chama a ação de login
  };

  return (
    <ContentLogin>
      <InfoContentLogin>
        <ImgLogo src={Logo} />
        <TitleLogin>Faça seu login</TitleLogin>
        <FormLogin onSubmit={handleSubmitEvent}>
          <DivInputsLogin>
            <IconWrapper>
              <AiOutlineMail />
            </IconWrapper>
            <InputLogin
              type="email"
              id="email"
              placeholder="Email"
              value={input.email}
              onChange={handleInputChange}
            />
          </DivInputsLogin>
          <DivInputsLogin>
            <IconWrapper>
              <TbLockPassword />
            </IconWrapper>
            <InputLogin
              type="password"
              id="password"
              placeholder="Senha"
              value={input.password}
              onChange={handleInputChange}
            />
          </DivInputsLogin>
          <ButtonLogin type="submit">Entrar</ButtonLogin>
        </FormLogin>
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Exibe o erro */}
        <DivLinks>
          <LinkPassword>
            Não é cadastrado?{" "}
            <NavLink to="/cadastrarUser" style={{ color: "#ffc107" }}>
              Cadastrar-se aqui
            </NavLink>
          </LinkPassword>
          <LinkPassword>
            <NavLink to="/forgot-password">Esqueceu a senha?</NavLink>
          </LinkPassword>
        </DivLinks>
      </InfoContentLogin>
    </ContentLogin>
  );
};

export default Login;
