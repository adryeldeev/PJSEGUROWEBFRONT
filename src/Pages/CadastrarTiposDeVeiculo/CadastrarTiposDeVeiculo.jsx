import InputField from "../../Components/Inputs/Inputs";
import ButtonPlus from "../../Components/ButtonPlus/ButtonPlus";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useRef } from "react";
import useApi from "../../Api/Api";
import { useNavigate } from "react-router-dom"; // Importa o hook para navegação
import {
  ContentCadastro,
  DivInputs,
  Form,
  InfoCadastro,
  DivButton
  
} from "./CadastrarTiposDeVeiculosStyled";
import Swal from "sweetalert2";
const CadastrarTiposDeVeiculo = () => {
  const api = useApi();
  const navigate = useNavigate(); // Inicializa o hook de navegação
  const anoRef = useRef();
  const placaRef = useRef();
  const marcaRef = useRef();
  const modeloRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ano:  anoRef.current?.value.trim(),
      placa: placaRef.current?.value.trim(),
      modelo: modeloRef.current?.value.trim(),
      marca: marcaRef.current?.value.trim(),
    };

    if ( !data.marca || !data.placa || !data.modelo || !data.ano) {
      alert("Preencha os campos todos os campos.");
      return;
    }

    try {
      const response = await api.post("/createTiposDeVeiculo", data);
      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Sucesso!",
          text: "Novo tipo de veículo cadastrado com sucesso!",
        });
        navigate("/tipos-de-veiculo");
      } else {
        Swal.fire({
          icon: "error",
          title: "Erro",
          tet: "Erro ao cadastrar novo tipo de veículo. Tente novamente mais tarde.",
        });
      }
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      alert("Erro ao cadastrar tipo de processo. Tente novamente.");
    }
  };

  return (
    <ContentCadastro>
      <h4>Cadastrar tipo de veículo</h4>
      <InfoCadastro>
        <Form>
          <DivInputs>
            <div>

            <label htmlFor="modelo">Modelo *</label>
            <InputField
              id="modelo"
              type="text"
              placeholder="Digite o modelo do veículo"
              ref={modeloRef}
              />
              </div>
          
              <div>

            <label htmlFor="nome">Marca *</label>
            <InputField
              id="marca"
              type="text"
              placeholder="Digite a marca do veículo"
              ref={marcaRef}
              />
              </div>
            <div>
            <label htmlFor="placa">Placa *</label>
            <InputField
              id="placa"
              type="text"
              placeholder="Digite a placa do veículo"
              ref={placaRef}
              />
              </div>
         
          <div>

            <label htmlFor="nome">Ano *</label>
            <InputField
              id="ano"
              type="text"
              placeholder="Digite o ano do veículo"
              ref={placaRef}
              />
              </div>
          </DivInputs>
          <DivButton>
          <ButtonPlus
            text="Salvar"
            Icon={IoIosCheckmarkCircleOutline}
            onClick={handleSubmit} // Envia os dados ao clicar
            />
            </DivButton>
        </Form>
      </InfoCadastro>
    </ContentCadastro>
  );
};

export default CadastrarTiposDeVeiculo;
