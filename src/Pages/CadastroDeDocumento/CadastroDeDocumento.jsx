import InputField from "../../Components/Inputs/Inputs";
import ButtonPlus from "../../Components/ButtonPlus/ButtonPlus";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useRef, useState } from "react";
import useApi from "../../Api/Api";
import { useNavigate } from "react-router-dom";
import {
  ContentCadastroDeDocumento,
  DivInputs,
  Form,
  InfoCadastro,
} from "./CadastroDeDocumentoStyled";
import Swal from "sweetalert2";
const CadastrarDocumento = () => {
  const api = useApi();
  const navigate = useNavigate();
  const tipoRef = useRef();
  const descricaoRef = useRef();
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação dos campos
    const tipo = tipoRef.current?.value.trim();
    const descricao = descricaoRef.current?.value.trim();

    if (!tipo || !descricao || !file) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      // Criar objeto FormData
      const formData = new FormData();
      formData.append("tipo", tipo);
      formData.append("descricao", descricao);
      formData.append("file", file);

      // Enviar dados ao backend
      const response = await api.post("/uploadDocumento", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Sucesso!",
          text: "Novo documento cadastrado com sucesso!",
        });
        navigate("/documentos");
      } else {
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Falha ao cadastrar o documento. Tente novamente mais tarde.",
        });
      }
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      alert("Erro ao cadastrar o documento. Tente novamente.");
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <ContentCadastroDeDocumento>
      <InfoCadastro>
        <Form onSubmit={handleSubmit}>
          <DivInputs>
            <label htmlFor="tipo">Tipo *</label>
            <InputField
              id="tipo"
              type="text"
              placeholder="Digite o tipo de documento"
              ref={tipoRef}
            />
          </DivInputs>
          <DivInputs>
            <label htmlFor="descricao">Descrição *</label>
            <InputField
              id="descricao"
              type="text"
              placeholder="Digite a descrição do documento"
              ref={descricaoRef}
            />
          </DivInputs>

          <DivInputs>
            <label htmlFor="upload">Upload Documento *</label>
            <InputField
              id="upload"
              name="file"
              type="file"
              onChange={handleFileChange}
            />
          </DivInputs>
          <ButtonPlus text="Salvar" Icon={IoIosCheckmarkCircleOutline} />
        </Form>
      </InfoCadastro>
    </ContentCadastroDeDocumento>
  );
};

export default CadastrarDocumento;
