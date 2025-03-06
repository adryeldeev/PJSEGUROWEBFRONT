import { useEffect, useState } from "react";
import { ContentTiposDeVeiculos, DivInfo, ModalBackDro, ModalCadastroContainer, ModalCadastroContent, TituloText } from "./TiposDeVeiculoStyled";
import ButtonPlus from "../../Components/ButtonPlus/ButtonPlus";
import Table from "../../Components/Table/Table";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useUI } from "../../Context/UiContext";
import { DivInputs } from "../CadastroTipoDeProcesso/CadastroTDPStyled";
import useApi from "../../Api/Api";
import InputField from "../../Components/Inputs/Inputs";
import Swal from 'sweetalert2'

const TiposDeVeiculo = () => {
  const api = useApi();
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useUI();

  const [tiposDeVeiculo, setTiposDeVeiculo] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
const [dados, setDados] = useState({
  nome:'',
  placa:'',
  marca:'',
 modelo:''
})
 
  const [currentPage, setCurrentPage] = useState(0); // Página atual
  const itemsPerPage = 4; // Número de itens por página

  const fetchData = async () => {
    try {
        setLoading(true);
  
        // Faz a requisição para a API
        const response = await api.get("/tiposDeVeiculos");
  
        // Logando a resposta para ver o que está sendo retornado
        console.log(response.data);
  
        // Acessa a propriedade "tipoVeiculos" no objeto retornado
        const { tipoVeiculos } = response.data;
  
        // Verifica se é uma lista válida
        if (Array.isArray(tipoVeiculos)) {
            setTiposDeVeiculo(tipoVeiculos);
        } else {
            throw new Error("A resposta da API não contém uma lista de tipoVeiculos válida.");
        }
    } catch (err) {
        console.error("Erro ao buscar tipoVeiculos:", err);
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
    { header: "Marca", accessor: "marca" },
    { header: "Placa", accessor: "placa" },
    { header: "Modelo", accessor: "modelo" }
  ];
const handleChange = (e) =>{
  const { name , value} = e.target
  setDados({...dados, [name]: value });
}
 
  const handleEdit = async (row) => {
    setSelectedItem(row);
    setDados({
      nome: row.nome || "",
      placa: row.placa || "",
      marca: row.marca || "",
      modelo: row.modelo || "",
    })

    
    openModal();
  };;

  const handleSave = async (e) => {
    e.preventDefault();
  
    try {
      const response = await api.put(`/updateTiposDeVeiculo/${selectedItem.id}`, dados);
      
      if (response.status === 200 || response.status === 201) {
        Swal.fire("Atualizado!", "Tipo de veículo atualizado com sucesso.", "success");
        // Atualiza a lista local com os novos dados
        const updatedData = tiposDeVeiculo.map((item) =>
          item.id === selectedItem.id ? { ...item, ...dados } : item
        );
        setTiposDeVeiculo(updatedData);
        closeModal();
      } else {
        Swal.fire("Erro!", "Erro ao atualizar tipo de veículo.", "error");
      }
    } catch (error) {
      console.error("Erro ao atualizar tipo de veículo:", error);
      Swal.fire("Erro!", "Erro ao atualizar tipo de veículo.", "error");
    }
  };

  const handleDelete = async (row) => {
    const result = await Swal.fire({
      title: `Tem certeza que deseja excluir ${row.nome}?`,
      text: "Essa ação não pode ser desfeita.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
      reverseButtons: true
    });
  
    if (result.isConfirmed) {
      try {
        const response = await api.delete(`/deleteTiposDeVeiculo/${row.id}`);
        
        if (response.status === 200) {
          Swal.fire("Excluído!", "Tipo de veículo excluído com sucesso.", "success");
          await fetchData(); // Recarrega a lista após a exclusão
        } else {
          Swal.fire("Erro!", "Erro ao excluir tipo de veículo.", "error");
        }
      } catch (error) {
        console.error("Erro ao excluir tipo de veículo:", error);
        Swal.fire("Erro!", "Erro ao excluir tipo de veículo.", "error");
      }
    }
  };


  const handleNavigate = () => {
    navigate("/cadastrar-tipo-de-veiculo");
  };

  // Funções para paginação
  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < tiposDeVeiculo.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBackPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const totalPages = Math.ceil(tiposDeVeiculo.length / itemsPerPage);
  // Dados da página atual
  const paginatedData = Array.isArray(tiposDeVeiculo)
  ? tiposDeVeiculo.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
  : [];
  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <ContentTiposDeVeiculos>
      <DivInfo>
        <TituloText>Lista de Tipos de veículo</TituloText>
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
      placeholder="Digite o nome do veículo"
      value={dados.nome} // Controlado pelo estado
      onChange={handleChange} // Atualiza o estado
    />
  </DivInputs>

  <DivInputs>
    <label htmlFor="placa">Placa *</label>
    <InputField
      id="placa"
      name="placa"
      type="text"
      placeholder="Digite a placa do veículo"
      value={dados.placa}
      onChange={handleChange}
    />
  </DivInputs>

  <DivInputs>
    <label htmlFor="marca">Marca *</label>
    <InputField
      id="marca"
      name="marca"
      type="text"
      placeholder="Digite a marca do veículo"
      value={dados.marca}
      onChange={handleChange}
    />
  </DivInputs>

  <DivInputs>
    <label htmlFor="modelo">Modelo *</label>
    <InputField
  id="modelo"
  name="modelo" // Adiciona o atributo "name"
  type="text"
  placeholder="Digite o modelo do veículo"
  value={dados.modelo}
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
    </ContentTiposDeVeiculos>
  );
};

export default TiposDeVeiculo;
