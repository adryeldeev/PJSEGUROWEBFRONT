import InputField from '../../Components/Inputs/Inputs';
import ButtonPlus from '../../Components/ButtonPlus/ButtonPlus';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useRef, useState } from 'react';
import useApi from '../../Api/Api';
import { useNavigate } from 'react-router-dom';
import { ContentCadastroDeDocumento, DivInputs, Form, InfoCadastro } from './CadastroDeDocumentoStyled';

const CadastrarDocumento = () => {
  const api = useApi();
  const navigate = useNavigate();
  const tipoRef = useRef();
  const descricaoRef = useRef();
  const clienteIdRef = useRef(); // Novo ref para clienteId
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação dos campos
    const tipo = tipoRef.current?.value.trim();
    const descricao = descricaoRef.current?.value.trim();
    const clienteId = clienteIdRef.current?.value.trim(); // Obter o clienteId

    if (!tipo || !descricao || !file || !clienteId) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      // Criar objeto FormData
      const formData = new FormData();
      formData.append('tipo', tipo);
      formData.append('descricao', descricao);
      formData.append('file', file);
      formData.append('clienteId', clienteId); // Adicionar clienteId ao FormData

      // Enviar dados ao backend
      const response = await api.post('/uploadDocumento', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200 || response.status === 201) {
        alert('Documento cadastrado com sucesso!');
        navigate('/documentos');
      } else {
        alert('Erro ao cadastrar o documento. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      alert('Erro ao cadastrar o documento. Tente novamente.');
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
            <label htmlFor="clienteId">Cliente ID *</label>
            <InputField
              id="clienteId"
              type="text"
              placeholder="Digite o ID do cliente"
              ref={clienteIdRef} // Ref para o campo clienteId
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
          <ButtonPlus
            text="Salvar"
            Icon={IoIosCheckmarkCircleOutline}
          />
        </Form>
      </InfoCadastro>
    </ContentCadastroDeDocumento>
  );
};

export default CadastrarDocumento;
