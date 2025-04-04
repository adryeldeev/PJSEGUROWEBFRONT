import { useState } from "react";
import useApi from "../../Api/Api";
import { Button, Card, Container, Input } from "./RequestPasswordResetStyled";
import { NavLink } from "react-router-dom";

export const RequestPasswordReset = () => {
    const api = useApi()
    const [email, setEmail] = useState("");
  
  
    const handleRequestReset = async () => {
      try {
        await api.post("/requestpassword", { email });
        alert("E-mail de recuperação enviado!");
      } catch (error) {
        alert("Erro ao enviar e-mail de recuperação.");
      }
    };
  
    return (
      <Container>
        <Card>
          <h2>Recuperação de Senha</h2>
          <p>Digite seu e-mail para receber um link de redefinição.</p>
          <Input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={handleRequestReset}>Enviar</Button>
          <p>Ainda não tem uma conta?</p>
          <NavLink to="/cadastrarUser">Criar conta</NavLink>
        </Card>
      </Container>
    );
  };
  