import { useEffect, useState } from "react";
import { ContentCliente, DivInfo, ModalBackDro, ModalCadastroContainer, ModalCadastroContent, TituloText } from "./ClientesStyled";
import ButtonPlus from "../../Components/ButtonPlus/ButtonPlus";
import Table from "../../Components/Table/Table";

import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useUI } from "../../Context/UiContext";
import { DivInputs } from "../CadastroTipoDeProcesso/CadastroTDPStyled";
import useApi from "../../Api/Api";
import InputField from "../../Components/Inputs/Inputs";

const Clientes = () => {
  const api = useApi();
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useUI();

  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
const [dados, setDados] = useState({
  nome:'',
  cpf:'',
  rg:'',
})
 
  const [currentPage, setCurrentPage] = useState(0); // Página atual
  const itemsPerPage = 4; // Número de itens por página

  const fetchData = async () => {
    try {
        setLoading(true);
  
        // Faz a requisição para a API
        const response = await api.get("/clientes");
  
        // Logando a resposta para ver o que está sendo retornado
        console.log(response.data);
  
        // Acessa a propriedade "tipoVeiculos" no objeto retornado
        const { clientes } = response.data;
  
        // Verifica se é uma lista válida
        if (Array.isArray(clientes)) {
            setClientes(clientes);
        } else {
            throw new Error("A resposta da API não contém uma lista de clientes válida.");
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
    { header: "CPF", accessor: "cpf" },
    { header: "RG", accessor: "rg" },
  ];
const handleChange = (e) =>{
  const { name , value} = e.target
  setDados({...dados, [name]: value });
}
 
  const handleEdit = async (row) => {
    setSelectedItem(row);
    setDados({
      nome: row.nome || "",
      cpf: row.cpf || "",
      rg: row.rg || "",
    })

    
    openModal();
  };;

  const handleSave = async (e) => {
    e.preventDefault();
  
    try {
      // Envia os dados atualizados para a API
      const response = await api.put(`/updateCliente/${selectedItem.id}`, dados);
  
      if (response.status === 200 || response.status === 201) {
        alert("Tipo de veículo atualizado com sucesso!");
  
        // Atualiza a lista local com os novos dados
        const updatedData = clientes.map((item) =>
          item.id === selectedItem.id ? { ...item, ...dados } : item
        );
        setClientes(updatedData);
  
        closeModal(); 
      } else {
        alert("Erro ao atualizar tipo de veículo.");
      }
    } catch (error) {
      console.error("Erro ao atualizar tipo de veículo:", error);
      alert("Erro ao atualizar tipo de veículo.");
    }
  };

  const handleDelete = async (row) => {
    const confirmDelete = window.confirm(
        `Tem certeza que deseja excluir ${row.nome}?`
    );
    if (confirmDelete) {
        try {
            const response = await api.delete(`/deleteCliente/${row.id}`);
            if (response.status === 200){
              alert(response.data.message)
              
                await fetchData(); // Recarrega a lista após a exclusão
            } else {
                alert("Erro ao deletar cliente.");
            }
        } catch (error) {
            console.error("Erro ao excluir cliente:", error);
            alert("Erro ao excluircliente.");
        }
    }
};


  const handleNavigate = () => {
    navigate("/cadastrar-cliente");
  };

  // Funções para paginação
  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < clientes.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBackPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Dados da página atual
  const paginatedData = Array.isArray(clientes)
  ? clientes.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
  : [];
  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <ContentCliente>
      <DivInfo>
        <TituloText>Lista de Clientes</TituloText>
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
            <form onSubmit={handleSave}>
  <DivInputs>
    <label htmlFor="nome">Nome *</label>
    <InputField
      id="nome"
      name="nome"
      type="text"
      placeholder="Digite o nome do cliente"
      value={dados.nome} // Controlado pelo estado
      onChange={handleChange} // Atualiza o estado
    />
  </DivInputs>

  <DivInputs>
    <label htmlFor="cpf">CPF *</label>
    <InputField
      id="cpf"
      name="cpf"
      type="text"
      placeholder="Digite o CPF do cliente"
      value={dados.cpf}
      onChange={handleChange}
    />
  </DivInputs>

  <DivInputs>
    <label htmlFor="rg">RG *</label>
    <InputField
      id="rg"
      name="rg"
      type="text"
      placeholder="Digite o RG do cliente"
      value={dados.rg}
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
    </ContentCliente>
  );
};

export default Clientes;
