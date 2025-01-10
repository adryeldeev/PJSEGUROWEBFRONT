import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useRef, useState } from "react";
import useApi from "../../Api/Api";
import { useNavigate } from "react-router-dom";

import {
  ContentCadastro,
  DivInputs,
  Form,
  InfoCadastro,
} from "./CadastrarPrioridadesStyled";
import Toggle from "../../Components/Toggle/Toggle";
import ButtonPlus from "../../Components/ButtonPlus/ButtonPlus";
import InputField from "../../Components/Inputs/Inputs";

const CadastrarPrioridades = () => {
  const api = useApi();
  const navigate = useNavigate();
  const nomeRef = useRef();
  const [isChecked, setIsChecked] = useState(false); 
  const [corFundo, setCorFundo] = useState("#ffffff"); // Estado inicial para a cor de fundo
  const [corFonte, setCorFonte] = useState("#000000"); // Estado inicial para a cor da fonte

  const handleToggle = () => {
    setIsChecked((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      nome: nomeRef.current?.value.trim(),
      cor_fundo: corFundo,
      cor_fonte: corFonte,
      activo: isChecked,
    };

    if (data.nome === "") {
      alert("Preencha o nome da prioridade.");
      return;
    }

    try {
      const response = await api.post("/createPrioridade", data);
      if (response.status === 200 || response.status === 201) {
        alert("Cadastro realizado com sucesso!");
        navigate("/prioridades");
      } else {
        alert("Erro ao cadastrar a prioridade. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      alert("Erro ao cadastrar prioridade. Tente novamente.");
    }
  };

  return (
    <ContentCadastro>
      <InfoCadastro>
        <Form>
          <DivInputs>
            <label htmlFor="nome">Nome *</label>
            <InputField
              id="nome"
              type="text"
              placeholder="Digite o nome da  prioridade"
              ref={nomeRef} 
            />
          </DivInputs>
          <DivInputs>
            <label htmlFor="corFundo">Cor de Fundo *</label>
            <input
              id="corFundo"
              type="color"
              value={corFundo}
              onChange={(e) => setCorFundo(e.target.value)}
            />
          </DivInputs>
          <DivInputs>
            <label htmlFor="corFonte">Cor da Fonte *</label>
            <input
              id="corFonte"
              type="color"
              value={corFonte}
              onChange={(e) => setCorFonte(e.target.value)}
            />
          </DivInputs>
          <DivInputs>
            <Toggle
              id="toggle-1"
              checked={isChecked} 
              label="Ativo"
              onClick={handleToggle} 
            />
          </DivInputs>
          <ButtonPlus
            text="Salvar"
            Icon={IoIosCheckmarkCircleOutline}
            onClick={handleSubmit} 
          />
        </Form>
      </InfoCadastro>
    </ContentCadastro>
  );
};

export default CadastrarPrioridades;
