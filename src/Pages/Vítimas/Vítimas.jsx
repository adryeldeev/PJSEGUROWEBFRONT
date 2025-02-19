import  { useEffect, useState } from 'react'
import { AiOutlinePlusCircle } from "react-icons/ai";
import useApi from '../../Api/Api'
import { useNavigate } from 'react-router-dom'
import ButtonPlus from '../../Components/ButtonPlus/ButtonPlus';
import Table from '../../Components/Table/Table';
import { ContentVitimas, DivInfo, TituloText } from './VitimasStyled';
import Swal from 'sweetalert2'

const Vítimas = () => {
  const api = useApi()
  const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [vitima, setVitima] = useState([])

    const [currentPage, setCurrentPage] = useState(0); // Página atual
    const itemsPerPage = 4; // Número de itens por página
    const columns = [
        { header: "ID", accessor: "id" },
        { header: "CPF", accessor: "cpf" },
        { header: "Nome", accessor: "nome" },
        { header: "Consedido", accessor: "concedido" },
        { header: "Activo", accessor: "activo" }
     
      ];

      const fetchData = async () => {
          try {
              setLoading(true);
        
              // Faz a requisição para a API
              const response = await api.get("/vitimas");
          
              const  vitimas  = response.data;

              if (Array.isArray(vitimas)) {
                setVitima(vitimas);
              } else {
                  throw new Error("A resposta da API não contém uma lista de vitimas válida.");
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
      
const handleDelete = async (row) => {
          try {
              const response = await api.delete(`/deleteVitima/${row.id}`);
      
              if (response.data.message === "Essa vítima está vinculada a um processo, deseja excluir?") {
                  // Exibe o alerta para o usuário confirmar a exclusão
                  const confirmDelete = await Swal.fire({
                      title: response.data.message,
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonText: 'Sim, excluir!',
                      cancelButtonText: 'Cancelar'
                  });
      
                  if (confirmDelete.isConfirmed) {
                      // Se o usuário confirmar, realiza a exclusão novamente
                      const deleteResponse = await api.delete(`/deleteVitima/${row.id}`);
                      if (deleteResponse.status === 200) {
                          Swal.fire('Deletado!', deleteResponse.data.message, 'success');
                          await fetchData(); // Recarrega a lista após a exclusão
                      } else {
                          Swal.fire('Erro!', 'Erro ao excluir vítima.', 'error');
                      }
                  }
              } else {
                  Swal.fire('Deletado!', response.data.message, 'success');
                  await fetchData(); // Recarrega a lista após a exclusão
              }
          } catch (error) {
              console.error("Erro ao excluir vítima:", error);
              Swal.fire('Erro!', 'Erro ao excluir vítima.', 'error');
          }
      };
        

  // Funções para paginação
  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < vitima.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBackPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNavigate = () => {
    navigate("/cadastrarVitima");
  };
  const navigateEdit = () => {
    navigate("/editar-vitima");
  };

  const paginatedData = Array.isArray(vitima) ?
  vitima.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage) : [];

    if (loading) {
        return <p>Carregando...</p>;
      }
    
      if (error) {
        return <p>{error}</p>;
      }
  return (
      <ContentVitimas>
         <DivInfo>
           <TituloText>Lista de Vítimas</TituloText>
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
          onEdit={navigateEdit}
          onDelete={handleDelete}
          back={handleBackPage} // Função de voltar
          next={handleNextPage} // Função de avançar
          />
         )}
       </ContentVitimas>
  )
}

export default Vítimas
