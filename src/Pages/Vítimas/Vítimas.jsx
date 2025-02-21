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
              // Primeira requisição - verifica se a vítima está vinculada a um processo
              const response = await api.delete(`/deleteVitima/${row.id}`);
      
              // Verifica se a resposta foi bem-sucedida (status 200)
              if (response.status === 200) {
                  Swal.fire('Deletado!', response.data.message, 'success');
                  await fetchData(); // Recarrega a lista após a exclusão
              }
          } catch (error) {
              // Verifica se o erro foi causado por um status 400
              if (error.response && error.response.status === 400) {
                  Swal.fire({
                      title: error.response.data.message, // Mensagem retornada pelo backend
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonText: 'Ok',
                      cancelButtonText: false
                  });
              } else {
                  // Para outros erros, exibe a mensagem padrão de erro
                  console.error("Erro ao excluir vítima e processos:", error);
                  Swal.fire('Erro!', 'Erro ao excluir vítima e processos.', 'error');
              }
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
  const navigateEdit = (row) => {
    navigate(`/editar-vitima/${row.id}`);
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
