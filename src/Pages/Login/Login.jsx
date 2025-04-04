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
  const [error, setError] = useState("");
  const auth = useAuth();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [id]: value,
    }));
  };

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    setError("");
    if (input.email && input.password) {
      try {
        await auth.loginAction({
          email: input.email,
          password: input.password,
        });
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError("Por favor, preencha ambos os campos");
    }
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
        {error && <p style={{ color: "red" }}>{error}</p>}
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
