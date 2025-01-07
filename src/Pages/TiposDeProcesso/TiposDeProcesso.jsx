import { useEffect, useState } from "react";
import ButtonPlus from "../../Components/ButtonPlus/ButtonPlus";
import Table from "../../Components/Table/Table";
import {
  ContentTipos,
  DivInfo,
  ModalBackDro,
  ModalCadastroContainer,
  ModalCadastroContent,
  TituloText,
} from "./TiposDeProcessoStyle";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import useApi from "../../Api/Api";
import { useUI } from "../../Context/UiContext";
import { DivInputs } from "../CadastroTipoDeProcesso/CadastroTDPStyled";
import Toggle from "../../Components/Toggle/Toggle";
import InputField from "../../Components/Inputs/Inputs";

const TiposDeProcesso = () => {
  const api = useApi();
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useUI();

  const [tiposProcesso, setTiposProcesso] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const [nome, setNome] = useState("");
  const [activo, setActivo] = useState(false);

  const [currentPage, setCurrentPage] = useState(0); // Página atual
  const itemsPerPage = 4; // Número de itens por página

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get("/tiposProcesso");
      setTiposProcesso(response.data);
      setLoading(false);
    } catch (err) {
      setError("Falha ao carregar dados: " + err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Nome", accessor: "nome" },
    { header: "Ativo", accessor: "activo" },
  ];

  const handleEdit = async (row) => {
    setSelectedItem(row);
    setNome(row.nome);
    setActivo(row.activo);
    openModal();
  };

  const handleSave = async () => {
    try {
      const response = await api.put(`/updateTipoProcesso/${selectedItem.id}`, {
        nome: nome,
        activo: activo,
      });
      if (response.status === 200 || response.status === 201) {
        alert("Tipo de processo atualizado com sucesso!");
        const updatedData = tiposProcesso.map((item) =>
          item.id === selectedItem.id ? { ...item, nome, activo } : item
        );
        setTiposProcesso(updatedData);
        closeModal();
      } else {
        alert("Erro ao atualizar tipo de processo.");
      }
    } catch (error) {
      console.error("Erro ao atualizar tipo de processo:", error);
      alert("Erro ao atualizar tipo de processo.");
    }
  };

  const handleDelete = async (row) => {
    const confirmDelete = window.confirm(
      `Tem certeza que deseja excluir ${row.nome}?`
    );
    if (confirmDelete) {
      try {
        const response = await api.delete(`/deleteTipoProcesso/${row.id}`);
        if (response.status === 200 || response.status === 201) {
          alert("Tipo de processo deletado com sucesso!");
          const filteredData = tiposProcesso.filter(
            (item) => item.id !== row.id
          );
          setTiposProcesso(filteredData);
        } else {
          alert("Erro ao deletar tipo de processo.");
        }
      } catch (error) {
        console.error("Erro ao excluir tipo de processo:", error);
        alert("Erro ao excluir tipo de processo.");
      }
    }
  };

  const handleNavigate = () => {
    navigate("/cadastrar-tipo-de-processo");
  };

  // Funções para paginação
  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < tiposProcesso.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBackPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Dados da página atual
  const paginatedData = tiposProcesso.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <ContentTipos>
      <DivInfo>
        <TituloText>Lista de Tipos de Processo</TituloText>
        <ButtonPlus
          text="Novo"
          backgroundColor="blue"
          Icon={AiOutlinePlusCircle}
          onClick={handleNavigate}
        />
      </DivInfo>

      <Table
        columns={columns}
        data={paginatedData} // Dados da página atual
        onEdit={handleEdit}
        onDelete={handleDelete}
        back={handleBackPage} // Função de voltar
        next={handleNextPage} // Função de avançar
      />

      {isOpen && (
        <ModalBackDro onClick={closeModal}>
          <ModalCadastroContainer onClick={(e) => e.stopPropagation()}>
            <ModalCadastroContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
              >
                <DivInputs>
                  <label htmlFor="nome">Nome *</label>
                  <InputField
                    id="nome"
                    type="text"
                    placeholder="Digite o nome do tipo de processo"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </DivInputs>
                <DivInputs>
                  <Toggle
                    id="toggle-1"
                    type="checkbox"
                    checked={activo}
                    label="Ativo"
                    onClick={() => setActivo((prev) => !prev)}
                  />
                </DivInputs>
                <button type="submit">Salvar</button>
                <button type="button" onClick={closeModal}>
                  Cancelar
                </button>
              </form>
            </ModalCadastroContent>
          </ModalCadastroContainer>
        </ModalBackDro>
      )}
    </ContentTipos>
  );
};

export default TiposDeProcesso;
