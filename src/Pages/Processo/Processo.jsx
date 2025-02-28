import React, { useEffect, useState } from "react";
import { 
    Container, 
    TabelaWrapper, 
    Tabela, 
    BotaoAcoes, 
    Filtros, 
    StatusBadge, 
    BotaoNovo,
  
} from "./ProcessoStyled";
import Swal from "sweetalert2";  // Importando o Swal
import useApi from "../../Api/Api";
import { useNavigate, NavLink } from "react-router-dom";

const Processo = () => {
  const api = useApi()
    const [processos, setProcessos] = useState([]);
    const navigate = useNavigate()

  
    const handleDelete = async (id) => {
        const processo = processos.find((p) => p.id === id);
      
        const confirmDelete = await Swal.fire({
          title: `Tem certeza que deseja excluir o processo ${processo?.vitima?.nome || "?"}?`,
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
      
              // Atualiza a lista removendo o item deletado
              setProcessos((prevProcessos) => prevProcessos.filter((item) => item.id !== id));
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
                
                if(Array.isArray(response.data)){
                    setProcessos(response.data);

                }

                
            } catch (error) {
                console.error("Erro ao buscar processos", error);
            }
        }
        fetchData();
    }, []);

    const handleNavigate=()=>{
      navigate('/criarProcesso')

    }

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
                        {processos.map((processo) => (
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
        </Container>
    );
};

export default Processo;
