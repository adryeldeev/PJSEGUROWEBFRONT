import { useEffect, useState } from "react";
import ButtonPlus from "../../Components/ButtonPlus/ButtonPlus";
import Table from "../../Components/Table/Table";

import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useUI } from "../../Context/UiContext";
import InputField from "../../Components/Inputs/Inputs";
import Toggle from "../../Components/Toggle/Toggle";
import { DivInputs } from "../CadastroTipoDeProcesso/CadastroTDPStyled";
import useApi from "../../Api/Api";
import { ContentFaseProcessos, DivInfo, ModalBackDro, ModalCadastroContainer, ModalCadastroContent, TituloText } from "./FaseDoProcessoStyled";

const FaseDoProcesso = () => {
  const api = useApi();
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useUI();

  const [processos, setProcessos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const [nome, setNome] = useState("");
  const [activo, setActivo] = useState(false);
  const [pendencia, setPendencia] = useState(false);
  const [mudaFase, setMudaFase] = useState(false);

  const [currentPage, setCurrentPage] = useState(0); // Página atual
  const itemsPerPage = 4; // Número de itens por página

  const fetchData = async () => {
    try {
        setLoading(true);

        // Faz a requisição para a API
        const response = await api.get("/processos");

        // Acessa a propriedade "processos" no objeto retornado
        const { processos } = response.data;

        // Verifica se é uma lista válida
        if (Array.isArray(processos)) {
            setProcessos(processos);
        } else {
            throw new Error("A resposta da API não contém uma lista de processos válida.");
        }
    } catch (err) {
        console.error("Erro ao buscar processos:", err);
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
    { header: "Nome", accessor: "nome" },
    { header: "Pedencia", accessor: "pedencia" },
    { header: "Muda Fase", accessor: "mudaFase" },
    { header: "Ativo", accessor: "activo" },
  ];

  const handleEdit = async (row) => {
    setSelectedItem(row);
    setNome(row.nome);
    setActivo(row.activo);
    setPendencia(row.pendencia);
    setMudaFase(row.mudaFase);
    openModal();
  };

  const handleSave = async () => {
    try {
      const response = await api.put(`/updateProcesso/${selectedItem.id}`, {
        nome: nome,
        activo: activo,
        pendencia: pendencia,
        muda_fase: mudaFase,
      });
      if (response.status === 200 || response.status === 201) {
        alert("Tipo de processo atualizado com sucesso!");
        const updatedData = processos.map((item) =>
          item.id === selectedItem.id ? { ...item, nome, activo, pendencia, muda_fase:mudaFase } : item
        );
        setProcessos(updatedData);
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
        const response = await api.delete(`/deleteProcesso/${row.id}`);
        if (response.status === 200 || response.status === 201) {
          alert("Prioridade deletado com sucesso!");
          const filteredData = processos.filter(
            (item) => item.id !== row.id
          );
          setProcessos(filteredData);
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
    navigate("/cadastrar-fase-de-processo");
  };

  // Funções para paginação
  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < processos.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBackPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Dados da página atual
  const paginatedData = Array.isArray(processos)
  ? processos.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
  : [];
  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <ContentFaseProcessos>
      <DivInfo>
        <TituloText>Lista de Fase Do Processo</TituloText>
        <ButtonPlus
          text="Novo"
          backgroundColor="blue"
          Icon={AiOutlinePlusCircle}
          onClick={handleNavigate}
        />
      </DivInfo>
     {loading ? (
      <p>Carregando...</p>
     ): error ? (
      <p>{error}</p>
     ) :(
       <Table
       columns={columns}
       data={paginatedData} // Dados da página atual
       onEdit={handleEdit}
       onDelete={handleDelete}
       back={handleBackPage} // Função de voltar
       next={handleNextPage} // Função de avançar
       />
      )}
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
                <DivInputs>
                  <Toggle
                    id="toggle-2"
                    type="checkbox"
                    checked={pendencia}
                    label="Pendência"
                    onClick={() => setPendencia((prev) => !prev)}
                  />
                </DivInputs>
                <DivInputs>
                  <Toggle
                    id="toggle-3"
                    type="checkbox"
                    checked={mudaFase}
                    label="Muda Fase"
                    onClick={() => setMudaFase((prev) => !prev)}
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
    </ContentFaseProcessos>
  );
};

export default FaseDoProcesso;
