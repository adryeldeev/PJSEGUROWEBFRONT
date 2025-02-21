import React, { useEffect, useState } from "react";
import { 
    Container, 
    TabelaWrapper, 
    Tabela, 
    BotaoAcoes, 
    Filtros, 
    StatusBadge, 
    AcoesDropdown, 
    BotaoNovo,
    DivDropDown
} from "./ProcessoStyled";
import useApi from "../../Api/Api";
import { useNavigate } from "react-router-dom";

const Processo = () => {
  const api = useApi()
    const [processos, setProcessos] = useState([]);
    const [dropDown, setDropDown] = useState(false);
    const navigate = useNavigate()

    const handleDropDown =()=>{
      setDropDown(!dropDown)
    }

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
                                <td>{processo.sinistro || "N/A"}</td>
                                <td>
                                    <a href={`/vitima/${processo.vitima.id}`}>{processo.vitima.nome}</a>
                                </td>
                                <td>{processo.tipoProcesso.nome}</td>
                                <td>
                                    <StatusBadge status={processo.faseProcesso.nome}>
                                        {processo.faseProcesso.nome}
                                    </StatusBadge>
                                </td>
                                <td>
                                    <DivDropDown>

                                    <BotaoAcoes onClick={handleDropDown}>
                                        Ações
                                    </BotaoAcoes>
                                        {dropDown && (

                                          <AcoesDropdown>
                                            <li>Excluir</li>
                                            <li>Exportar para PDF</li>
                                            <li>Exportar para XLS</li>
                                        </AcoesDropdown>
                                        )}
                                        </DivDropDown>
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
