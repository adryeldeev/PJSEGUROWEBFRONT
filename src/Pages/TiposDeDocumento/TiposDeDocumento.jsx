import { useEffect, useState } from "react";
import ButtonPlus from "../../Components/ButtonPlus/ButtonPlus";
import Table from "../../Components/Table/Table";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useUI } from "../../Context/UiContext";
import { DivInputs } from "../CadastroTipoDeProcesso/CadastroTDPStyled";
import useApi from "../../Api/Api";
import InputField from "../../Components/Inputs/Inputs";
import Swal from 'sweetalert2';
import {
  ContentTiposDeDocumento,
  DivInfo,
  ModalBackDro,
  ModalCadastroContainer,
  ModalCadastroContent,
  TituloText,
} from "./TiposDeDocumentoStyled";

const TiposDeDocumento = () => {
  const api = useApi();
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useUI();

  const [document, setDocument] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [tipo, setTipo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [clienteId, setClienteId] = useState(""); // Novo estado para clienteId
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get("/documentos");
      setDocument(response.data);
    } catch (err) {
      console.error("Erro ao buscar documentos:", err);
      setError("Falha ao carregar os dados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Tipo", accessor: "tipo" },
    { header: "Descrição", accessor: "descricao" },
    { header: "Arquivo", accessor: "arquivoUrl" },
  ];

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEdit = (row) => {
    setSelectedItem(row);
    setTipo(row.tipo || "");
    setDescricao(row.descricao || "");
    setClienteId(row.clienteId || ""); // Set clienteId ao editar
    openModal();
  };

  const resetForm = () => {
    setTipo("");
    setDescricao("");
    setClienteId("");  // Reset clienteId
    setFile(null);
    setSelectedItem(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append("tipo", tipo);
      formData.append("descricao", descricao);
      formData.append("clienteId", clienteId);  // Adicionar clienteId
      if (file) formData.append("file", file);
  
      if (selectedItem) {
        const response = await api.put(`/updateDocumento/${selectedItem.id}`, formData);
  
        if (response.status === 200 || response.status === 201) {
          Swal.fire({
            title: 'Sucesso!',
            text: 'Documento atualizado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          fetchData(); // Recarrega a lista de documentos
          closeModal();
          resetForm();
        } else {
          Swal.fire({
            title: 'Erro!',
            text: 'Erro ao atualizar documento.',
            icon: 'error',
            confirmButtonText: 'Tentar novamente',
          });
        }
      } else {
        Swal.fire({
          title: 'Erro!',
          text: 'Nenhum documento selecionado para atualização.',
          icon: 'error',
          confirmButtonText: 'Fechar',
        });
      }
    } catch (error) {
      console.error("Erro ao salvar documento:", error);
      Swal.fire({
        title: 'Erro!',
        text: 'Erro ao salvar documento.',
        icon: 'error',
        confirmButtonText: 'Tentar novamente',
      });
    }
  };

  const handleDelete = async (row) => {
    Swal.fire({
      title: `Tem certeza que deseja excluir ${row.tipo}?`,
      text: "Essa ação não pode ser desfeita.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, excluir!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await api.delete(`/deleteDocumento/${row.id}`);
          if (response.status === 200) {
            Swal.fire("Excluído!", response.data.message, "success");
            fetchData();
          } else {
            Swal.fire("Erro", "Erro ao deletar documento.", "error");
          }
        } catch (error) {
          console.error("Erro ao excluir documento:", error);
          Swal.fire("Erro", "Erro ao excluir documento.", "error");
        }
      }
    });
  };

  const handleNavigate = () => {
    navigate("/cadastrar-documento");
  };

  const totalPages = Math.ceil(document.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBackPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedData = Array.isArray(document)
    ? document.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    : [];

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ContentTiposDeDocumento>
      <DivInfo>
        <TituloText>Lista de Tipos de Documentos</TituloText>
        <ButtonPlus text="Novo" backgroundColor="blue" Icon={AiOutlinePlusCircle} onClick={handleNavigate} />
      </DivInfo>
      <Table
        columns={columns}
        data={paginatedData}
        onEdit={handleEdit}
        onDelete={handleDelete}
        back={handleBackPage}
        next={handleNextPage}
        currentPage={currentPage}
       totalPages={totalPages}
      />
      {isOpen && (
        <ModalBackDro onClick={closeModal}>
          <ModalCadastroContainer onClick={(e) => e.stopPropagation()}>
            <ModalCadastroContent>
              <form onSubmit={handleSave}>
                <DivInputs>
                  <label htmlFor="tipo">Tipo *</label>
                  <InputField
                    id="tipo"
                    type="text"
                    placeholder="Digite o nome do tipo de documento"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                  />
                </DivInputs>
                <DivInputs>
                  <label htmlFor="descricao">Descrição *</label>
                  <InputField
                    id="descricao"
                    type="text"
                    placeholder="Digite a descrição do tipo de documento"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                  />
                </DivInputs>
                <DivInputs>
                  <label htmlFor="clienteId">Cliente ID *</label>
                  <InputField
                    id="clienteId"
                    type="text"
                    placeholder="Digite o cliente ID"
                    value={clienteId}  // Mostrar e permitir edição do clienteId
                    onChange={(e) => setClienteId(e.target.value)}
                  />
                </DivInputs>
                <DivInputs>
                  <input type="file" onChange={handleFileChange} />
                </DivInputs>
                <button type="submit">Salvar</button>
                <button
                  type="button"
                  onClick={() => {
                    closeModal();
                    resetForm();
                  }}
                >
                  Cancelar
                </button>
              </form>
            </ModalCadastroContent>
          </ModalCadastroContainer>
        </ModalBackDro>
      )}
    </ContentTiposDeDocumento>
  );
};

export default TiposDeDocumento;
