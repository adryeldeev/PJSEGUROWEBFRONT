import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useRef, useState } from "react";
import useApi from "../../Api/Api";
import { useNavigate } from "react-router-dom";
import Toggle from "../../Components/Toggle/Toggle";
import ButtonPlus from "../../Components/ButtonPlus/ButtonPlus";
import InputField from "../../Components/Inputs/Inputs";
import {
  ContentCadastroFaseDoProcesso,
  DivInputs,
  Form,
  InfoCadastro,
  DivToggles
} from "./CadastrarFaseDoProcessoStyled";
import Swal from 'sweetalert2'
const CadastrarFaseDoProcesso = () => {
  const api = useApi();
  const navigate = useNavigate();
  const nomeRef = useRef();

  // Criação de estados separados para cada toggle
  const [isAtivo, setIsAtivo] = useState(false);
  const [isPendencia, setIsPendencia] = useState(false);
  const [isMudaFase, setIsMudaFase] = useState(false);

  const [corFundo, setCorFundo] = useState("#ffffff");
  const [corFonte, setCorFonte] = useState("#000000");

  // Função genérica para lidar com a mudança de estado dos toggles
  const handleToggle = (toggle) => {
    switch (toggle) {
      case "ativo":
        setIsAtivo((prev) => !prev);
        break;
      case "pendencia":
        setIsPendencia((prev) => !prev);
        break;
      case "mudafase":
        setIsMudaFase((prev) => !prev);
        break;
      default:
        break;
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      nome: nomeRef.current?.value.trim(),
      cor_fundo: corFundo,
      cor_fonte: corFonte,
      activo: isAtivo, // Usando o estado de "Ativo"
      pendencia: isPendencia, // Usando o estado de "Pendência"
      muda_fase: isMudaFase, // Usando o estado de "Muda Fase"
    };

    if (data.nome === "") {
      alert("Preencha o nome da prioridade.");
      return;
    }

    try {
      const response = await api.post("/createProcesso", data);
      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon:'success',
          title:'Sucesso',
          text:'Nova fase do processo cadastrada com sucesso!'
        })
        navigate("/fase-do-processos");
      } else {
        Swal.fire({
          icon:'error',
          title:'Erro',
          text:'Erro ao cadastrar fase do processo. Tente novamente mais tarde.'
        })
      }
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      alert("Erro ao cadastrar fase do processo. Tente novamente.");
    }
  };

  return (
    <ContentCadastroFaseDoProcesso>
      <h4>Cadastrar fase do processo</h4>
      <InfoCadastro>
      <Form>
  <DivInputs>
    <div>
      <label htmlFor="nome">Nome *</label>
      <InputField
        id="nome"
        type="text"
        placeholder="Digite o nome da processo"
        ref={nomeRef}
      />
    </div>
    <div>
      <label htmlFor="corFundo">Cor de Fundo *</label>
      <input
        id="corFundo"
        type="color"
        value={corFundo}
        onChange={(e) => setCorFundo(e.target.value)}
      />
    </div>
    <div>
      <label htmlFor="corFonte">Cor da Fonte *</label>
      <input
        id="corFonte"
        type="color"
        value={corFonte}
        onChange={(e) => setCorFonte(e.target.value)}
      />
    </div>
  </DivInputs>

  <DivToggles>
    <Toggle
      id="toggle-1"
      type="checkbox"
      checked={isAtivo}
      label="Ativo"
      onClick={() => handleToggle("ativo")}
    />
    <Toggle
      id="toggle-2"
      type="checkbox"
      checked={isPendencia}
      label="Pendência"
      onClick={() => handleToggle("pendencia")}
    />
    <Toggle
      id="toggle-3"
      type="checkbox"
      checked={isMudaFase}
      label="Muda Fase"
      onClick={() => handleToggle("mudafase")}
    />
  </DivToggles>

  <ButtonPlus
    text="Salvar"
    Icon={IoIosCheckmarkCircleOutline}
    onClick={handleSubmit}
  />
</Form>
      </InfoCadastro>
    </ContentCadastroFaseDoProcesso>
  );
};

export default CadastrarFaseDoProcesso;
