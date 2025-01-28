import  { useEffect, useState } from "react";
import {
  DivProcesso,
  DivHeader,
  DivContentInputs,
  DivInputs,
  DivContent,
  ModalBackDro,
  ModalCadastroContainer,
  ModalCadastroContent,
  Form,
  Input,
} from "./CriarProcessoStyled";
import ButtonSelect from "../../Components/ButtonSelect/ButtonSelect";
import useApi from "../../Api/Api";
import DynamicVitma from "../../Components/DynamicVitima/DynamicVitma";
import { useUI } from "../../Context/UiContext";

const CriarProcesso = () => {
  const api = useApi();
  const { isOpen, openModal, closeModal } = useUI();

  // Estados para armazenar opções de cada select
  const [fasesProcesso, setFasesProcesso] = useState([]);
  const [tiposProcesso, setTiposProcesso] = useState([]);
  const [prioridades, setPrioridades] = useState([]);

  // Estados para armazenar os valores selecionados
  const [faseSelecionada, setFaseSelecionada] = useState("");
  const [tipoSelecionado, setTipoSelecionado] = useState("");
  const [prioridadeSelecionada, setPrioridadeSelecionada] = useState("");

  // Estado para o modal
  const [nome, setNome] = useState(""); // Adicionado estado para o campo de entrada
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  // Função para buscar Fases do Processo
  const fetchFasesProcesso = async () => {
    try {
      setLoading(true);
      const response = await api.get("/processos");
      const { processos } = response.data || [];
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
      const response = await api.get("/tiposProcesso");
      const tipos = response.data || [];
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
      const response = await api.get("/prioridades");
      const { prioridades } = response.data || [];
      const prioridadesFormatadas = prioridades.map((prioridade) => ({ label: prioridade.nome, value: prioridade.id }));
      setPrioridades(prioridadesFormatadas);
    } catch (err) {
      console.error("Erro ao buscar prioridades:", err);
      setErro("Não foi possível carregar as prioridades.");
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    openModal(); // Certifique-se de que o contexto useUI está funcionando
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
            <DivInputs>
              <ButtonSelect
                label="Fase *"
                options={fasesProcesso}
                value={faseSelecionada}
                onChange={(e) => setFaseSelecionada(e.target.value)}
              />
            </DivInputs>
            <DivInputs>
              <ButtonSelect
                label="Tipo *"
                options={tiposProcesso}
                value={tipoSelecionado}
                onChange={(e) => setTipoSelecionado(e.target.value)}
              />
            </DivInputs>
            <DivInputs>
              <ButtonSelect
                label="Prioridade *"
                options={prioridades}
                value={prioridadeSelecionada}
                onChange={(e) => setPrioridadeSelecionada(e.target.value)}
              />
            </DivInputs>
          </DivContentInputs>
        </DivHeader>
      </DivProcesso>
      <DynamicVitma onClick={handleClick} />
      {isOpen && (
        <ModalBackDro onClick={closeModal}>
          <ModalCadastroContainer onClick={(e) => e.stopPropagation()}>
            <ModalCadastroContent>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("Salvar:", nome);
                  closeModal();
                }}
              >
                <DivInputs>
                  <label htmlFor="nome">Nome *</label>
                  <Input
                    id="nome"
                    type="text"
                    placeholder="Digite o nome do tipo de processo"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </DivInputs>
                <button type="submit">Salvar</button>
                <button type="button" onClick={closeModal}>
                  Cancelar
                </button>
              </Form>
            </ModalCadastroContent>
          </ModalCadastroContainer>
        </ModalBackDro>
      )}
    </DivContent>
  );
};

export default CriarProcesso;
