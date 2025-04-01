import { useEffect, useState } from "react";
import ButtonPlus from "../../Components/ButtonPlus/ButtonPlus";
import Table from "../../Components/Table/Table";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useUI } from "../../Context/UiContext";
import { DivInputs } from "../CadastroTipoDeProcesso/CadastroTDPStyled";
import useApi from "../../Api/Api";
import InputField from "../../Components/Inputs/Inputs";
import { ContentSeguradora, DivInfo, ModalBackDro, ModalCadastroContainer, ModalCadastroContent, TituloText } from "./SeguradoraStyled";
import Swal from 'sweetalert2';

const Seguradora = () => {
  const api = useApi();
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useUI();

  const [seguradora, setSeguradora] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
const [dados, setDados] = useState({
  nome:'',
 
})
 
  const [currentPage, setCurrentPage] = useState(0); // Página atual
  const itemsPerPage = 4; // Número de itens por página

  const fetchData = async () => {
    try {
        setLoading(true);
  
        // Faz a requisição para a API
        const response = await api.get("/seguradoras");
  
       
  
        // Acessa a propriedade "tipoVeiculos" no objeto retornado
        const { seguradoras } = response.data;
  
        // Verifica se é uma lista válida
        if (Array.isArray(seguradoras)) {
            setSeguradora(seguradoras);
        } else {
            throw new Error("A resposta da API não contém uma lista de seguradora válida.");
        }
    } catch (err) {
        console.error("Erro ao buscar seguradora:", err);
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
 
  ];
const handleChange = (e) =>{
  const { name , value} = e.target
  setDados({...dados, [name]: value });
}
 
  const handleEdit = async (row) => {
    setSelectedItem(row);
    setDados({
      nome: row.nome || "",
     
    })

    
    openModal();
  };;

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/updateSeguradora/${selectedItem.id}`, dados);

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          title: "Sucesso!",
          text: "Tipo de veículo atualizado com sucesso!",
          icon: "success",
          confirmButtonText: "OK"
        });

        const updatedData = seguradora.map((item) =>
          item.id === selectedItem.id ? { ...item, ...dados } : item
        );
        setSeguradora(updatedData);
        closeModal();
      } else {
        Swal.fire({
          title: "Erro!",
          text: "Erro ao atualizar tipo de veículo.",
          icon: "error",
          confirmButtonText: "OK"
        });
      }
    } catch (error) {
      console.error("Erro ao atualizar tipo de veículo:", error);
      Swal.fire({
        title: "Erro!",
        text: "Erro ao atualizar tipo de veículo.",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  };

  const handleDelete = async (row) => {
    const confirmDelete = await Swal.fire({
      title: `Tem certeza que deseja excluir ${row.nome}?`,
      text: "Essa ação não pode ser desfeita.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await api.delete(`/deleteSeguradora/${row.id}`);
        if (response.status === 200) {
          Swal.fire({
            title: "Excluído!",
            text: response.data.message,
            icon: "success",
            confirmButtonText: "OK"
          });
          await fetchData(); // Recarrega a lista após a exclusão
        } else {
          Swal.fire({
            title: "Erro!",
            text: "Erro ao deletar cliente.",
            icon: "error",
            confirmButtonText: "OK"
          });
        }
     } catch (error) {
               console.error("Erro ao excluir seguradora:", error);
               if (error.response && error.response.status === 400) {
                   Swal.fire("Erro!", error.response.data.message || "Erro ao excluir seguradora.", "error");
               } else {
                   Swal.fire({
                       title: "Erro!",
                       text: "Erro ao excluir seguradora.",
                       icon: "error",
                       confirmButtonColor: "#d33",
                   });
               }
           }
    }
  };



  const handleNavigate = () => {
    navigate("/cadastrar-seguradora");
  };

  // Funções para paginação
  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < seguradora.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBackPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const totalPages = Math.ceil(seguradora.length / itemsPerPage);
  // Dados da página atual
  const paginatedData = Array.isArray(seguradora)
  ? seguradora.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
  : [];
  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <ContentSeguradora>
      <DivInfo>
        <TituloText>Lista de Seguradora</TituloText>
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
            <form onSubmit={handleSave}>
  <DivInputs>
    <label htmlFor="nome">Nome *</label>
    <InputField
      id="nome"
      name="nome"
      type="text"
      placeholder="Digite o nome da seguradora"
      value={dados.nome} // Controlado pelo estado
      onChange={handleChange} // Atualiza o estado
      currentPage={currentPage}
      totalPages={totalPages}
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
    </ContentSeguradora>
  );
};

export default Seguradora;
