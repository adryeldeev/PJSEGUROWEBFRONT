import InputField from "../../Components/Inputs/Inputs";
import ButtonPlus from "../../Components/ButtonPlus/ButtonPlus";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useRef } from "react";
import useApi from "../../Api/Api";
import { useNavigate } from "react-router-dom"; // Importa o hook para navegação
import {
  ContentCadastroBanco,
  DivInputs,
  DivButton,
  Form,
  InfoCadastro,
} from "./CadastrarBancosStyled";
import Swal from "sweetalert2";
const CadastrarBancos = () => {
  const api = useApi();
  const navigate = useNavigate();
  const nomeRef = useRef();
  const agenciaRef = useRef();
  const contaRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      nome: nomeRef.current?.value.trim(),
      agencia: agenciaRef.current?.value.trim(),
      conta: contaRef.current?.value.trim(),
    };

    if (data.nome === "" || !data.agencia || !data.conta) {
      alert("Preencha o nome do tipo de processo.");
      return;
    }

    try {
      const response = await api.post("/createBanco", data);
      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Sucesso!",
          text: "Novo banco cadastrado com sucesso!",
        });
        navigate("/bancos");
      } else {
        alert("Erro ao cadastrar tipo de processo. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      alert("Erro ao cadastrar tipo de processo. Tente novamente.");
    }
  };

  return (
    <ContentCadastroBanco>
      <InfoCadastro>
      <Form>
  <DivInputs>
    <div>
      <label htmlFor="nome">Nome *</label>
      <InputField
        id="nome"
        type="text"
        placeholder="Digite o nome do banco"
        ref={nomeRef}
      />
    </div>
    <div>
      <label htmlFor="agencia">Agência *</label>
      <InputField
        id="agencia"
        type="text"
        placeholder="Digite a agência do banco"
        ref={agenciaRef}
      />
    </div>
    <div>
      <label htmlFor="conta">Conta *</label>
      <InputField
        id="conta"
        type="text"
        placeholder="Digite a conta do banco"
        ref={contaRef}
      />
    </div>
  </DivInputs>

  <DivButton>
    <ButtonPlus
      text="Salvar"
      Icon={IoIosCheckmarkCircleOutline}
      onClick={handleSubmit}
    />
  </DivButton>
</Form>
      </InfoCadastro>
    </ContentCadastroBanco>
  );
};

export default CadastrarBancos;
