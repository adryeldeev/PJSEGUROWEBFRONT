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
  
  PageInfo,  // Novo componente de exibição de página
  NavigationButton,  // Botões de navegação estilizados
} from "./ProcessoStyled";
import { GrChapterNext } from "react-icons/gr";
import { BsSkipBackward } from "react-icons/bs";
import Swal from "sweetalert2"; // Importando o Swal
import useApi from "../../Api/Api";
import { useNavigate, NavLink } from "react-router-dom";

const Processo = () => {
  const api = useApi();
  const [processos, setProcessos] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  const handleDelete = async (id) => {
    const processo = processos.find((p) => p.id === id);

    const confirmDelete = await Swal.fire({
      title: `Tem certeza que deseja excluir o processo ${
        processo?.vitima?.nome || "?" }?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await api.delete(`/processos/${id}`);

        if (response.status === 200 || response.status === 201) {
          Swal.fire({
            title: "Sucesso!",
            text: "Processo deletado com sucesso!",
            icon: "success",
          });

          setProcessos((prevProcessos) =>
            prevProcessos.filter((item) => item.id !== id)
          );
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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("/processos");

        if (Array.isArray(response.data)) {
          setProcessos(response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar processos", error);
      }
    }
    fetchData();
  }, []);

  const handleNavigate = () => {
    navigate("/criarProcesso");
  };

  const totalPages = Math.ceil(processos.length / itemsPerPage);

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

  const paginatedData = Array.isArray(processos)
    ? processos.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    : [];

  return (
    <Container>
      <h2>Lista de Processos</h2>

      <Filtros>
        <button>Filtrar</button>
        <BotaoNovo onClick={handleNavigate}>+ Novo</BotaoNovo>
      </Filtros>

      <TabelaWrapper>
        <Tabela>
          <thead>
            <tr>
              <th>ASL</th>
              <th>Sinistro</th>
              <th>Vítima</th>
              <th>Tipo</th>
              <th>Fase</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((processo) => (
              <tr key={processo.id}>
                <td>-</td>
                <td>{processo.sinistro?.[0]?.numero || "N/A"}</td>
                <td>
                  <NavLink to={`/processo/${processo.id}/informacoes`}>
                    {processo.vitima?.nome || "Nome da vítima não disponível"}
                  </NavLink>
                </td>
                <td>{processo.tipoProcesso.nome}</td>
                <td>
                  <StatusBadge status={processo.faseProcesso.nome}>
                    {processo.faseProcesso.nome}
                  </StatusBadge>
                </td>
                <td>
                  <BotaoAcoes onClick={() => handleDelete(processo.id)}>
                    Deletar
                  </BotaoAcoes>
                </td>
              </tr>
            ))}
          </tbody>
        </Tabela>
      </TabelaWrapper>

      <ButtonsDiv>
        <NavigationButton onClick={handleBackPage} disabled={currentPage === 0}>
          <BsSkipBackward />
        </NavigationButton>

        <PageInfo>
          Página {currentPage + 1} de {totalPages}
        </PageInfo>

        <NavigationButton
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
        >
          <GrChapterNext />
        </NavigationButton>
      </ButtonsDiv>
    </Container>
  );
};

export default Processo;
