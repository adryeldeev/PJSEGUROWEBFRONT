import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, Container, Input, InputWrapper, Link } from "./ResetPasswordStyled";
import { TbLockPassword } from "react-icons/tb";
import axios from "axios";
export const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
  
    const handleResetPassword = async () => {
      if (!token) {
        alert("Token inválido ou expirado.");
        return;
      }
  
      if (newPassword !== confirmPassword) {
        alert("As senhas devem ser iguais.");
        return;
      }
  
      try {
        await axios.post("http://localhost:8000/resetpassword", { token, newPassword, confirmNewPassword: confirmPassword });
        alert("Senha redefinida com sucesso!");
        navigate("/login");
      } catch (error) {
        alert("Erro ao redefinir a senha.");
      }
    };
  
    return (
      <Container>
        <Card>
          <h2>Redefinir Senha</h2>
          <p>Digite sua nova senha.</p>
          <InputWrapper>
            <TbLockPassword /> 
            <Input
              type="password"
              placeholder="Nova senha"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <TbLockPassword /> 
            <Input
              type="password"
              placeholder="Confirme a nova senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </InputWrapper>
          <Button onClick={handleResetPassword}>Redefinir Senha</Button>
          <Link href="/login">Já tem uma conta? Login</Link>
        </Card>
      </Container>
    );
  };