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
import { ContentPrioridades, DivInfo, ModalBackDro, ModalCadastroContainer, ModalCadastroContent, TituloText } from "./PrioridadesStyled";
import Swal from 'sweetalert2'; // Importando o SweetAlert2
const Prioridades = () => {
  const api = useApi();
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useUI();

  const [prioridades, setPrioridades] = useState([]);
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

        // Faz a requisição para a API
        const response = await api.get("/prioridades");

        // Acessa a propriedade "prioridades" no objeto retornado
        const { prioridades } = response.data;

        // Verifica se é uma lista válida
        if (Array.isArray(prioridades)) {
            setPrioridades(prioridades);
        } else {
            throw new Error("A resposta da API não contém uma lista de prioridades válida.");
        }
    } catch (err) {
        console.error("Erro ao buscar prioridades:", err);
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
      const response = await api.put(`/updatePrioridade/${selectedItem.id}`, {
        nome: nome,
        activo: activo,
      });
      if (response.status === 200 || response.status === 201) {
        Swal.fire("Sucesso!", "Tipo de processo atualizado com sucesso!", "success");
        const updatedData = prioridades.map((item) =>
          item.id === selectedItem.id ? { ...item, nome, activo } : item
        );
        setPrioridades(updatedData);
        closeModal();
      } else {
        Swal.fire("Erro!", "Erro ao atualizar tipo de processo.", "error");
      }
    } catch (error) {
      console.error("Erro ao atualizar tipo de processo:", error);
      Swal.fire("Erro!", "Erro ao atualizar tipo de processo.", "error");
    }
  };

  const handleDelete = async (row) => {
    const confirmDelete = await Swal.fire({
      title: `Tem certeza que deseja excluir ${row.nome}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    });
  
    if (confirmDelete.isConfirmed) {
      try {
        const response = await api.delete(`/deletePrioridade/${row.id}`);
        
        // Verifica a mensagem de erro dentro da resposta e trata de acordo
        if (response.status === 200) {
          Swal.fire('Deletado!', response.data.message, 'success');
          await fetchData(); // Recarrega a lista após a exclusão
        } else if (response.data.message && response.data.message.includes('vinculada a processos')) {
          // Caso a prioridade esteja vinculada a um processo, tratamos como um erro específico, mas sem erro 400
          Swal.fire('Erro!', response.data.message, 'error');
        } else {
          Swal.fire('Erro!', 'Erro desconhecido ao deletar prioridade.', 'error');
        }
      } catch (error) {
        // Aqui podemos verificar se o erro foi de status 400, mas com a mensagem da resposta
        if (error.response && error.response.data && error.response.data.message) {
          Swal.fire('Erro!', error.response.data.message, 'error');
        } else {
          console.error("Erro ao excluir prioridade:", error);
          Swal.fire('Erro!', 'Erro ao excluir prioridade.', 'error');
        }
      }
    }
  };


  const handleNavigate = () => {
    navigate("/cadastrar-prioridade");
  };

  // Funções para paginação
  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < prioridades.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBackPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const totalPages = Math.ceil(prioridades.length / itemsPerPage);
  // Dados da página atual
  const paginatedData = Array.isArray(prioridades)
  ? prioridades.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
  : [];
  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <ContentPrioridades>
      <DivInfo>
        <TituloText>Lista de Prioridades</TituloText>
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
       currentPage={currentPage}
      totalPages={totalPages}
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
                <button type="submit">Salvar</button>
                <button type="button" onClick={closeModal}>
                  Cancelar
                </button>
              </form>
            </ModalCadastroContent>
          </ModalCadastroContainer>
        </ModalBackDro>
      )}
    </ContentPrioridades>
  );
};

export default Prioridades;
