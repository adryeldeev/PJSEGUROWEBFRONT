import React, { useEffect, useState } from "react";
import {
  Container,
  TabelaWrapper,
  Tabela,
  BotaoAcoes,
  Filtros,
  StatusBadge,
  BotaoNovo,
  ButtonsDiv,
  PageInfo,
  Tr,
  Td,
  Th,
  Thead,
  NavigationButton,
} from "./ProcessoStyled";
import { GrChapterNext } from "react-icons/gr";
import { BsSkipBackward } from "react-icons/bs";
import Swal from "sweetalert2";
import useApi from "../../Api/Api";
import { useNavigate, NavLink } from "react-router-dom";
import InputField from "../../Components/Inputs/Inputs";

const Processo = () => {
  const api = useApi();
  const navigate = useNavigate();
  
  const [processos, setProcessos] = useState([]);
  const [filteredProcessos, setFilteredProcessos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("/processos");
        if (Array.isArray(response.data)) {
          setProcessos(response.data);
          setFilteredProcessos(response.data); // Inicializar lista filtrada
        }
      } catch (error) {
        console.error("Erro ao buscar processos", error);
      }
    }
    fetchData();
  }, []);

  // Filtragem pelo nome da vítima
  useEffect(() => {
    if (searchTerm) {
      const filtered = processos.filter((processo) =>
        processo.vitima?.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProcessos(filtered);
    } else {
      setFilteredProcessos(processos);
    }
  }, [searchTerm, processos]);

  const handleDelete = async (id) => {
    const processo = processos.find((p) => p.id === id);
    const confirmDelete = await Swal.fire({
      title: `Tem certeza que deseja excluir o processo ${
        processo?.vitima?.nome || "?"
      }?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await api.delete(`/deleteProcessos/${id}`);
        if (response.status === 200 || response.status === 201) {
          Swal.fire({
            title: "Sucesso!",
            text: "Processo deletado com sucesso!",
            icon: "success",
          });

          setProcessos((prev) => prev.filter((item) => item.id !== id));
        }
      } catch (error) {
        console.error("Erro ao excluir processo:", error);
        Swal.fire({
          title: "Erro!",
          text: error.response?.data?.message || "Erro ao excluir o processo.",
          icon: "error",
        });
      }
    }
  };

  const handleNavigate = () => {
    navigate("/criarProcesso");
  };

  // Paginação
  const totalPages = Math.ceil(filteredProcessos.length / itemsPerPage);
  const paginatedData = filteredProcessos.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <Container>
      <h2>Lista de Processos</h2>

      <Filtros>
        <button onClick={() => setShowSearchInput(!showSearchInput)}>
          Filtrar
        </button>

        {showSearchInput && (
          <InputField
            type="text"
            placeholder="Pesquisar pelo nome da vítima..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}

        <BotaoNovo onClick={handleNavigate}>+ Novo</BotaoNovo>
      </Filtros>

      <TabelaWrapper>
  <Tabela>
    <Thead>
      <Tr>
        <Th>ASL</Th>
        <Th>Sinistro</Th>
        <Th>Vítima</Th>
        <Th>Tipo</Th>
        <Th>Fase</Th>
        <Th>Ações</Th>
      </Tr>
    </Thead>
    <tbody>
      {paginatedData.map((processo) => (
        <Tr key={processo.id}>
          <Td data-label="ASL">-</Td>
          <Td data-label="Sinistro">{processo.sinistro?.numero || "N/A"}</Td>
          <Td data-label="Vítima">
            <NavLink to={`/processo/${processo.id}/informacoes`}>
              {processo.vitima?.nome || "Nome da vítima não disponível"}
            </NavLink>
          </Td>
          <Td data-label="Tipo">{processo.tipoProcesso.nome}</Td>
          <Td data-label="Fase">
            <StatusBadge status={processo.faseProcesso.nome}>
              {processo.faseProcesso.nome}
            </StatusBadge>
          </Td>
          <Td data-label="Ações">
            <BotaoAcoes onClick={() => handleDelete(processo.id)}>Deletar</BotaoAcoes>
          </Td>
        </Tr>
      ))}
    </tbody>
  </Tabela>
</TabelaWrapper>

      <ButtonsDiv>
        <NavigationButton
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
        >
          <BsSkipBackward />
        </NavigationButton>

        <PageInfo>
          Página {currentPage + 1} de {totalPages}
        </PageInfo>

        <NavigationButton
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={currentPage === totalPages - 1}
        >
          <GrChapterNext />
        </NavigationButton>
      </ButtonsDiv>
    </Container>
  );
};

export default Processo;
