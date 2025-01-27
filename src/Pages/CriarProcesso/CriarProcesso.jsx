import React, { useEffect, useState } from "react";
import { DivProcesso, DivHeader, DivContentInputs, DivInputs, DivContent } from "./CriarProcessoStyled";
import ButtonSelect from "../../Components/ButtonSelect/ButtonSelect";
import useApi from "../../Api/Api";
import DynamicVitma from "../../Components/DynamicVitima/DynamicVitma";

const CriarProcesso = () => {
  const api = useApi();

  // Estados para armazenar opções de cada select
  const [fasesProcesso, setFasesProcesso] = useState([]);
  const [tiposProcesso, setTiposProcesso] = useState([]);
  const [prioridades, setPrioridades] = useState([]);

  // Estados para armazenar os valores selecionados
  const [faseSelecionada, setFaseSelecionada] = useState("");
  const [tipoSelecionado, setTipoSelecionado] = useState("");
  const [prioridadeSelecionada, setPrioridadeSelecionada] = useState("");

  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  // Função para buscar Fases do Processo
  const fetchFasesProcesso = async () => {
    try {
      setLoading(true);
      const response = await api.get("/processos"); // Endpoint para buscar fases
      const { processos } = response.data || [];
      // Formatar dados no formato { label, value }
      const fases = processos.map((fase) => ({ label: fase.nome, value: fase.id }));
      setFasesProcesso(fases);
    } catch (err) {
      console.error("Erro ao buscar fases do processo:", err);
      setErro("Não foi possível carregar as fases do processo.");
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar Tipos de Processo
  const fetchTiposProcesso = async () => {
    try {
      setLoading(true);
      const response = await api.get("/tiposProcesso"); // Endpoint para buscar tipos
      const tipos = response.data || [];
      // Formatar dados no formato { label, value }
      const tiposFormatados = tipos.map((tipo) => ({ label: tipo.nome, value: tipo.id }));
      setTiposProcesso(tiposFormatados);
    } catch (err) {
      console.error("Erro ao buscar tipos de processo:", err);
      setErro("Não foi possível carregar os tipos de processo.");
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar Prioridades
  const fetchPrioridades = async () => {
    try {
      setLoading(true);
      const response = await api.get("/prioridades"); // Endpoint para buscar prioridades
      const { prioridades } = response.data || [];
      // Formatar dados no formato { label, value }
      const prioridadesFormatadas = prioridades.map((prioridade) => ({ label: prioridade.nome, value: prioridade.id }));
      setPrioridades(prioridadesFormatadas);
    } catch (err) {
      console.error("Erro ao buscar prioridades:", err);
      setErro("Não foi possível carregar as prioridades.");
    } finally {
      setLoading(false);
    }
  };

  // Carregar os dados ao montar o componente
  useEffect(() => {
    fetchFasesProcesso();
    fetchTiposProcesso();
    fetchPrioridades();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
  <DivContent>

    <DivProcesso>
      <DivHeader>
        <h1>Processo</h1>
        <DivContentInputs>
          {/* Fases do Processo */}
          <DivInputs>
            <ButtonSelect
              label="Fase *"
              options={fasesProcesso} // Dados de fases carregados
              value={faseSelecionada}
              onChange={(e) => setFaseSelecionada(e.target.value)}
            />
          </DivInputs>

          {/* Tipos de Processo */}
          <DivInputs>
            <ButtonSelect
              label="Tipo *"
              options={tiposProcesso} // Dados de tipos carregados
              value={tipoSelecionado}
              onChange={(e) => setTipoSelecionado(e.target.value)}
            />
          </DivInputs>

          {/* Prioridades */}
          <DivInputs>
            <ButtonSelect
              label="Prioridade *"
              options={prioridades} // Dados de prioridades carregados
              value={prioridadeSelecionada}
              onChange={(e) => setPrioridadeSelecionada(e.target.value)}
              />
          </DivInputs>
        </DivContentInputs>
      </DivHeader>
    </DivProcesso>
    <DynamicVitma />
    </DivContent>

  );
};

export default CriarProcesso;
