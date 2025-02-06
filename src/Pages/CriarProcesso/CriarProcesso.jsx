import  { useEffect, useReducer, useState } from "react";
import {
  DivProcesso,
  DivHeader,
  DivContentInputs,
  DivInputs,
  DivContent,
  ModalBackDro,
  ModalCadastroContainer,
  ModalCadastroContent,
  Form

} from "./CriarProcessoStyled";
import ButtonSelect from "../../Components/ButtonSelect/ButtonSelect";
import useApi from "../../Api/Api";
import DynamicVitma from "../../Components/DynamicVitima/DynamicVitma";
import { useUI } from "../../Context/UiContext";
import Toggle from "../../Components/Toggle/Toggle";
import CampoInput from "../../Components/CamposInputs/CamposInputs";
import { useParams } from "react-router-dom";

// Definição inicial do estado do modal
const initialState = {
  nome: '',
  cpf: '',
  rg: '',
  data_nascimento: null,
  renda_mensal: null,
  data_emissao: null,
  orgao_expedidor: '',
  sexo: '',
  endereco: '',
  numero: null,
  bairro: '',
  cidade: '',
  estado: '',
  profissao: null,
  cep: null,
  uf: null,
  telefone01: null,
  telefone02: null,
  email: '',
  activo: false
};

// Reducer para gerenciar mudanças no estado
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_INPUT":
      return { ...state, [action.field]: action.value };
    case "SET_ALL":
      return { ...state, ...action.data };
    case "TOGGLE_ACTIVE":
      return { ...state, activo: !state.activo };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};
const CriarProcesso = () => {
  const api = useApi();
  const { isOpen, openModal, closeModal } = useUI();
  const { vitimaId } = useParams();

  const [fasesProcesso, setFasesProcesso] = useState([]);
  const [tiposProcesso, setTiposProcesso] = useState([]);
  const [prioridades, setPrioridades] = useState([]);

  const [faseSelecionada, setFaseSelecionada] = useState("");
  const [tipoSelecionado, setTipoSelecionado] = useState("");
  const [prioridadeSelecionada, setPrioridadeSelecionada] = useState("");

  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const [dadosModal, dispatch] = useReducer(reducer, initialState);

  const handleInputChange = (e) => {
    dispatch({ type: "SET_INPUT", field: e.target.id, value: e.target.value });
  };

  const fetchFasesProcesso = async () => {
    try {
      setLoading(true);
      const response = await api.get("/processos");
      const { processos } = response.data || [];
      setFasesProcesso(processos.map((fase) => ({ label: fase.nome, value: fase.id })));
    } catch {
      setErro("Não foi possível carregar as fases do processo.");
    } finally {
      setLoading(false);
    }
  };

  const fetchTiposProcesso = async () => {
    try {
      setLoading(true);
      const response = await api.get("/tiposProcesso");
      const tipos = response.data || [];
      setTiposProcesso(tipos.map((tipo) => ({ label: tipo.nome, value: tipo.id })));
    } catch {
      setErro("Não foi possível carregar os tipos de processo.");
    } finally {
      setLoading(false);
    }
  };

  const fetchPrioridades = async () => {
    try {
      setLoading(true);
      const response = await api.get("/prioridades");
      const { prioridades } = response.data || [];
      setPrioridades(prioridades.map((p) => ({ label: p.nome, value: p.id })));
    } catch {
      setErro("Não foi possível carregar as prioridades.");
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    openModal();
  };

  const handleCriarProcesso = async (e) => {
    e.preventDefault();
    if (!faseSelecionada || !tipoSelecionado || !prioridadeSelecionada) {
      setErro("Por favor, selecione Fase, Tipo e Prioridade.");
      return;
    }

    if (!dadosModal.nome || !dadosModal.cpf) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    if (!isValidCpf(dadosModal.cpf)) {
      alert("CPF inválido. Formato correto: 999.999.999-99.");
      return;
    }

    const processoData = {
      faseProcessoId: faseSelecionada,
      tipoProcessoId: tipoSelecionado,
      prioridadeId: prioridadeSelecionada,
      vitimaId: vitimaId,
    };

    try {
      const response = await api.post(`/criarProcessoV/${vitimaId}`, processoData);
      if (response.status === 200 || response.status === 201) {
        alert("Processo criado com sucesso!");
        setFaseSelecionada("");
        setTipoSelecionado("");
        setPrioridadeSelecionada("");
        dispatch({ type: "RESET" });
        closeModal();
      } else {
        alert("Erro ao tentar criar o processo.");
      }
    } catch (error) {
      console.error("Erro ao criar processo:", error);
    }
  };

  useEffect(() => {
    fetchFasesProcesso();
    fetchTiposProcesso();
    fetchPrioridades();
  }, []);

  const formatCpf = (cpf) => {
    return cpf.replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{2})$/, "$1-$2");
  };

  const isValidCpf = (cpf) => {
    return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
  };

  const handleCpfChange = async (e) => {
    const formattedCpf = formatCpf(e.target.value);
    dispatch({ type: "SET_INPUT", field: "cpf", value: formattedCpf });

    const unformattedCpf = formattedCpf.replace(/\D/g, "");
    if (unformattedCpf.length === 11) {
      try {
        const response = await api.get(`/findVitimaByCpf/${unformattedCpf}`);
        const vitimaData = response.data;
        dispatch({ type: "SET_ALL", data: vitimaData });
      } catch {
        setErro("Vítima não encontrada ou erro na busca.");
      }
    }
  };

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
      {erro && <p>{erro}</p>}
      <button type="button" onClick={handleCriarProcesso}>
   Criar Processo
</button>
{isOpen && (
        <ModalBackDro onClick={closeModal}>
          <ModalCadastroContainer onClick={(e) => e.stopPropagation()}>
            <ModalCadastroContent>
              <Form>
                <CampoInput label="Nome *" id="nome" value={dadosModal.nome} onChange={handleInputChange} />
                <CampoInput label="CPF *" id="cpf" value={dadosModal.cpf} onChange={handleCpfChange} placeholder="999.999.999-99" />
                <Toggle id="toggle-1" checked={dadosModal.activo} label="Ativo" onClick={() => dispatch({ type: "TOGGLE_ACTIVE" })} />
                <button type="button" onClick={closeModal}>Salvar</button>
              </Form>
            </ModalCadastroContent>
          </ModalCadastroContainer>
        </ModalBackDro>
      )}
    </DivContent>
  );
};

export default CriarProcesso;
