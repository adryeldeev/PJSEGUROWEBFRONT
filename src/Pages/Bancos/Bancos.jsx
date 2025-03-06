import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import ButtonPlus from "../../Components/ButtonPlus/ButtonPlus";
import Table from "../../Components/Table/Table";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useUI } from "../../Context/UiContext";
import { DivInputs } from "../CadastroTipoDeProcesso/CadastroTDPStyled";
import useApi from "../../Api/Api";
import InputField from "../../Components/Inputs/Inputs";
import { ContentBanco, DivInfo, ModalBackDro, ModalCadastroContainer, ModalCadastroContent, TituloText } from "./BancoStyled";

const Bancos = () => {
  const api = useApi();
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useUI();

  const [bancos, setBancos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
const [dados, setDados] = useState({
  nome:'',
  agencia:'',
  conta:'',
})
 
  const [currentPage, setCurrentPage] = useState(0); // Página atual
  const itemsPerPage = 4; // Número de itens por página

  const fetchData = async () => {
    try {
        setLoading(true);
  
        // Faz a requisição para a API
        const response = await api.get("/bancos");
  
        
        const { bancos } = response.data;
  
        // Verifica se é uma lista válida
        if (Array.isArray(bancos)) {
            setBancos(bancos);
        } else {
            throw new Error("A resposta da API não contém uma lista de bancos válida.");
        }
    } catch (err) {
        console.error("Erro ao buscar clientes:", err);
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
    { header: "Agencia", accessor: "agencia" },
    { header: "Conta", accessor: "conta" },
  ];
const handleChange = (e) =>{
  const { name , value} = e.target
  setDados({...dados, [name]: value });
}
 
  const handleEdit = async (row) => {
    setSelectedItem(row);
    setDados({
      nome: row.nome || "",
      agencia: row.agencia || "",
    conta: row.conta || "",
    })

    
    openModal();
  };;

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put(`/updateBanco/${selectedItem.id}`, dados);

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          title: "Sucesso!",
          text: "Banco atualizado com sucesso!",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });

        const updatedData = bancos.map((item) =>
          item.id === selectedItem.id ? { ...item, ...dados } : item
        );
        setBancos(updatedData);
        closeModal();
      } else {
        throw new Error("Erro ao atualizar banco.");
      }
    } catch (error) {
      console.error("Erro ao atualizar banco:", error);
      Swal.fire({
        title: "Erro!",
        text: "Erro ao atualizar banco.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleDelete = async (row) => {
    Swal.fire({
      title: `Tem certeza que deseja excluir ${row.nome}?`,
      text: "Essa ação não pode ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await api.delete(`/deleteBanco/${row.id}`);
          if (response.status === 200) {
            Swal.fire({
              title: "Excluído!",
              text: response.data.message,
              icon: "success",
              confirmButtonColor: "#3085d6",
            });

            await fetchData();
          } else {
            throw new Error("Erro ao deletar banco.");
          }
        } catch (error) {
          console.error("Erro ao excluir banco:", error);
          Swal.fire({
            title: "Erro!",
            text: "Erro ao excluir banco.",
            icon: "error",
            confirmButtonColor: "#d33",
          });
        }
      }
    });
  }


  const handleNavigate = () => {
    navigate("/cadastrar-banco");
  };

  // Funções para paginação
  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < bancos.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBackPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const totalPages = Math.ceil(bancos.length / itemsPerPage);

  // Dados da página atual
  const paginatedData = Array.isArray(bancos)
  ? bancos.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
  : [];
  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <ContentBanco>
      <DivInfo>
        <TituloText>Lista de Bancos</TituloText>
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
      placeholder="Digite o nome do banco"
      value={dados.nome} // Controlado pelo estado
      onChange={handleChange} // Atualiza o estado
    />
  </DivInputs>

  <DivInputs>
    <label htmlFor="agencia">Agencia *</label>
    <InputField
      id="agencia"
      name="agencia"
      type="text"
      placeholder="Digite a agencia do banco"
      value={dados.agencia}
      onChange={handleChange}
    />
  </DivInputs>

  <DivInputs>
    <label htmlFor="conta">Conta *</label>
    <InputField
      id="conta"
      name="conta"
      type="text"
      placeholder="Digite a conta do banco"
      value={dados.conta}
      onChange={handleChange}
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
    </ContentBanco>
  );
};

export default Bancos;
