import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { TbLockPassword } from "react-icons/tb";
import { MoveLeft } from 'lucide-react';
import Logo from "../../Img/Logo.webp";
import InputField from "../../Components/Inputs/Inputs";
import { ButtonArrow, ContentCadastro, DivInput, FormCadastro, ImgLogo, InfoCadastro, TituloCadastro } from "./CadastroUserStyled";
import Button from "../../Components/Button/Button";
import axios from "axios";

const CadastroUser = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.username || !formData.email || !formData.password || formData.password !== formData.confirmPassword) {
      setError("Todos os campos são obrigatórios e as senhas devem ser iguais");
      return;
    }
  
    setError("");
  
    try {
      const response = await axios.post("http://localhost:8000/createUser", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 201) {
        navigate("/login"); // Redireciona após sucesso
      } else {
        throw new Error(response.data.message || "Erro ao cadastrar usuário");
      }
    } catch (err) {
      console.error("Cadastro falhou:", err);
      setError(err.response?.data?.message || "Erro ao cadastrar usuário");
    }
  };
  const handleNavigate=()=>{
    navigate('/login')
  }
  return (
    <ContentCadastro>
      <ButtonArrow onClick={handleNavigate}><MoveLeft /></ButtonArrow>
      <InfoCadastro>
        <ImgLogo src={Logo} />
        <TituloCadastro>Cadastra-se</TituloCadastro>
        <FormCadastro onSubmit={handleSubmit}>
  <DivInput>
    <InputField
      type="text"
      placeholder="Digite seu nome"
      id="username"
      value={formData.username}
      onChange={handleChange}
    />
   <FaRegUser />
  </DivInput>
  <DivInput>
    <InputField
      type="email"
      placeholder="Digite seu e-mail"
      id="email"
      value={formData.email}
      onChange={handleChange}
    />
    <AiOutlineMail />
  </DivInput>
  <DivInput>
    <InputField
      type="password"
      placeholder="Digite sua senha"
      id="password"
      value={formData.password}
      onChange={handleChange}
    />
   <TbLockPassword />
  </DivInput>
  <DivInput>
    <InputField
      type="password"
      placeholder="Confirme sua senha"
      id="confirmPassword"
      value={formData.confirmPassword}
      onChange={handleChange}
    />
   <TbLockPassword />
  </DivInput>
  {error && <p style={{ color: "red" }}>{error}</p>}
  <Button text='Cadastrar' type="submit"/>
</FormCadastro>

      </InfoCadastro>
    </ContentCadastro>
  );
};

export default CadastroUser;
