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
import { useNavigate} from "react-router-dom";


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
  activo: false,
  vitimaId:null,
};

// Reducer para gerenciar mudanças no estado
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_INPUT":
      return { ...state, [action.field]:action.field === 'cpf'? formatCpf(action.value) : action.value };
      case 'FORMAT_CPF':
        return { ...state, cpf: formatCpf(action.value) };
    case "SET_ALL":
      return { ...state, 
        ...action.data, 
        cpf: formatCpf(action.data.cpf)};
    case "TOGGLE_ACTIVE":
      return { ...state, activo: !state.activo };
      case 'SET_SEXO':
        return {...state, sexo: action.value };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};
const formatCpf = (cpf) => {
  return cpf.replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{2})$/, "$1-$2");
};
const CriarProcesso = () => {
  const api = useApi();
  const navigate = useNavigate()
  const { isOpen, openModal, closeModal } = useUI();


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
  
    // Validação de dados obrigatórios
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
  
    let vitimaId = dadosModal.vitimaId;
  
    if (!vitimaId) {
      // Se a vítima não existir, cria uma nova vítima
      try {
        const vitimaData = {
          nome: dadosModal.nome,
          cpf: dadosModal.cpf,
          rg: dadosModal.rg,
          data_nascimento: dadosModal.data_nascimento,
          data_emissao: dadosModal.data_emissao,
          orgao_expedidor: dadosModal.orgao_expedidor,
          sexo: dadosModal.sexo,
          endereco: dadosModal.endereco,
          numero: dadosModal.numero,
          bairro: dadosModal.bairro,
          cidade: dadosModal.cidade,
          estado: dadosModal.estado,
          profissao: dadosModal.profissao,
          cep: dadosModal.cep,
          uf: dadosModal.uf,
          telefone01: dadosModal.telefone01,
          telefone02: dadosModal.telefone02,
          email: dadosModal.email,
          activo: dadosModal.activo,
         
        };
  
        // Cria a nova vítima
        const response = await api.post('/createVitima', vitimaData);
        vitimaId = response.data.id; // Obtém o id da nova vítima criada
      } catch (error) {
        alert("Erro ao criar nova vítima.");
        return;
      }
    }
  
    // Agora, cria o processo com o vitimaId, seja de uma vítima existente ou criada
    const processoData = {
      faseProcessoId: faseSelecionada,
      tipoProcessoId: tipoSelecionado,
      prioridadeId: prioridadeSelecionada,
      vitimaId: vitimaId,
    };
  
    try {
      const response = await api.post('/createProcessoV', processoData);
      console.log("Resposta da API:", response);
    
      if (response.status === 200 || response.status === 201) {
        const { processo } = response.data; 
        const id = processo?.id;
        
    
        if (id) {
          navigate(`/processo/${id}`);
          alert("Processo criado com sucesso!");
          setFaseSelecionada("");
          setTipoSelecionado("");
          setPrioridadeSelecionada("");
          dispatch({ type: "RESET" });
          closeModal();
        } else {
          alert("Erro ao tentar criar o processo: ID não retornado.");
        }
      } else {
        alert("Erro ao tentar criar o processo: Status inesperado.");
      }
    } catch (error) {
      console.error("Erro ao criar processo:", error);
    }
    }

  const handleSexoChange = (e) => {
    dispatch({ type: 'SET_SEXO', value: e.target.value });
  };

  useEffect(() => {
    fetchFasesProcesso();
    fetchTiposProcesso();
    fetchPrioridades();
  }, []);

  

  const isValidCpf = (cpf) => {
    return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
  };

  const handleCpfChange = (e) => {
    const rawCpf = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
  
    if (rawCpf.length <= 11) {
      const formattedCpf = formatCpf(rawCpf);
      dispatch({ type: "SET_INPUT", field: "cpf", value: formattedCpf });
    }
  };
  
  const handleCpfBlur = async () => {
    const rawCpf = dadosModal.cpf.replace(/\D/g, ""); // Remove pontos e traços
  
    if (rawCpf.length === 11) {
      try {
        // Primeiro, tenta buscar a vítima no banco
        const response = await api.get(`/findVitimaByCpf/${rawCpf}`);
        const vitimaData = response.data;
  
        if (vitimaData) {
          // Se a vítima já existir, preenche os dados e o vitimaId
          dispatch({ type: "SET_ALL", data: vitimaData });
          dispatch({ type: "SET_INPUT", field: "vitimaId", value: vitimaData.id });
        } else {
          // Se a vítima não existir, você pode deixar o modal pronto para criar uma nova vítima
          dispatch({ type: "RESET" }); // Pode resetar os dados para criar uma nova vítima
          setErro("Vítima não encontrada. Complete os dados para criar uma nova vítima.");
        }
      } catch (error) {
        setErro("Erro ao tentar buscar a vítima.");
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
                <CampoInput label="Nome *" id="nome" value={dadosModal.nome} onChange={handleInputChange}
                 />
                <CampoInput label="CPF *" id="cpf"
                value={dadosModal.cpf} 
                onChange={handleCpfChange} 
                onBlur={handleCpfBlur}
                placeholder="999.999.999-99" />
                <CampoInput label="RG " id="rg" value={dadosModal.rg} onChange={handleInputChange}  />
                <CampoInput label="Data de nascimento " id="dataNascimento" type="date" value={dadosModal.data_nascimento} onChange={handleInputChange} />
                <CampoInput label="Data de emissão" id="dataEmissao" type="date" value={dadosModal.data_emissao} onChange={handleInputChange} />
                <CampoInput label="Orgão expedidor " id="orgaoExpedidor" value={dadosModal.orgao_expedidor} onChange={handleInputChange} />
                <CampoInput label="Profissão" id="profissao" value={dadosModal.profissao} onChange={handleInputChange} />
                <CampoInput label="Renda mensal " id="rendaMensal" value={dadosModal.renda_mensal} onChange={handleInputChange} />
                <CampoInput label="Cep" id="cep" value={dadosModal.cep} onChange={handleInputChange} />
                <CampoInput label="Uf " id="uf" value={dadosModal.uf} onChange={handleInputChange} />
                <CampoInput label="Endereço " id="endereco" value={dadosModal.endereco} onChange={handleInputChange} />
                <CampoInput label="Numero " id="numero" value={dadosModal.numero} onChange={handleInputChange} />
                <DivInputs>
                                          <label htmlFor="sexo">Sexo</label>
                                          <select name="sexo" id="sexo"
                                           value={dadosModal.sexo}
                                           onChange={ handleSexoChange}
                                           >
                                            <option value="">Selecione</option>
                                            <option value="MASCULINO">Masculino</option>
                                            <option value="FEMININO">Feminino</option>
                                          </select>
                                        </DivInputs>
                          
                <CampoInput label="Complemento " id="complemento" value={dadosModal.complemento} onChange={handleInputChange} />
                <CampoInput label="Bairro" id="bairro" value={dadosModal.bairro} onChange={handleInputChange} />
                <CampoInput label="Cidade" id="cidade" value={dadosModal.cidade} onChange={handleInputChange} />
                <CampoInput label="E-mail " id="email" value={dadosModal.email} onChange={handleInputChange} />
                <CampoInput label="Telefone 01" id="telefone01" value={dadosModal.telefone01} onChange={handleInputChange} />
                <CampoInput label="Telefone 02" id="telefone02" value={dadosModal.telefone02} onChange={handleInputChange} />
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
