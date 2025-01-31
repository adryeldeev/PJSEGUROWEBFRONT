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
import Toggle from "../../Components/Toggle/Toggle";

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

  //dados do modal
  const [dadosModal, setDadosModal] = useState({
    nome: "",
    cpf: "",
    rg: "",
    dataNascimento: "",
    dataEmissao: "",
    orgaoExpedidor: "",
    profissao: "",
    rendaMensal: "",
    cep: "",
    uf: "",
    endereco: "",
    numero: "",
    sexo: "",
    complemento: "",
    bairro: "",
    cidade: "",
    email: "",
    telefone01: "",
    telefone02: "",
    activo:false
  });

  // Estado para o modal
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);



  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setDadosModal((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleToggleChange = () => {
    setDadosModal((prevState) => ({
      ...prevState,
      activo: !prevState.activo
    }));
  };
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

  const handleCriarProcesso = async (e) => {
    e.preventDefault();
  
    const processoData = {
      faseSelecionada,
      tipoSelecionado,
      prioridadeSelecionada,
      ...dadosModal // Inclui todos os dados do modal
    };
  
    console.log("Enviando processo:", processoData);
    try {
      const response = await api.post("/criarProcesso", processoData);
      console.log("Processo criado com sucesso:", response.data);
      closeModal();
    } catch (error) {
      console.error("Erro ao criar processo:", error);
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
      <button type="submit" onSubmit={handleCriarProcesso}>
        Criar Processo
      </button>
      {isOpen && (
        <ModalBackDro onClick={closeModal}>
          <ModalCadastroContainer onClick={(e) => e.stopPropagation()}>
            <ModalCadastroContent>
              <Form
               
              >
                <DivInputs>
                  <label htmlFor="nome">Nome *</label>
                  <Input
                  id="nome"
                  type="text"
                  placeholder="Digite o nome do tipo de processo"
                  value={dadosModal.nome}
                  onChange={handleInputChange}
/>
                </DivInputs>
                <DivInputs>
                  <label htmlFor="cpf">Cpf *</label>
                  <Input
                    id="cpf"
                    type="text"
                    placeholder="Digite o cpf"
                    value={dadosModal.cpf}
                    onChange={handleInputChange}
                  />
                </DivInputs>
                <DivInputs>
                  <label htmlFor="rg">Rg*</label>
                  <Input
                    id="rg"
                    type="text"
                    placeholder="Digite o RG"
                    value={dadosModal.rg}
                    onChange={handleInputChange}
                  />
                </DivInputs>
                <DivInputs>
                  <label htmlFor="dataNascimento">Data de nascimento *</label>
                  <Input
                    id="dataNascimento"
                    type="text"
                    placeholder="Digite a data de nascimento"
                    value={dadosModal.dataNascimento}
                    onChange={handleInputChange}
                  />
                </DivInputs>
                <DivInputs>
                  <label htmlFor="dataEmissao">Data de emissão </label>
                  <Input
                    id="dataEmissao"
                    type="text"
                    placeholder="Digite a data de emissão"
                    value={dadosModal.dataEmissao}
                    onChange={handleInputChange}
                    
                  />
                </DivInputs>
                <DivInputs>
                  <label htmlFor="orgaoExpedidor">Orgão expedidor </label>
                  <Input
                    id="orgaoExpedidor"
                    type="text"
                    placeholder="Digite o orgão expedidor"
                    value={dadosModal.orgaoExpedidor}
                    onChange={handleInputChange}
                  />
                </DivInputs>
                <DivInputs>
                  <label htmlFor="profissao">Profissão *</label>
                  <Input
                    id="profissao"
                    type="text"
                    placeholder="Digite a profissão"
                    value={dadosModal.profissao}
                    onChange={handleInputChange}
                  />
                </DivInputs>
                <DivInputs>
                  <label htmlFor="rendaMensal">Renda mensal</label>
                  <Input
                    id="rendaMensal"
                    type="text"
                    placeholder="Digite a renda mensal"
                    value={dadosModal.rendaMensal}
                    onChange={handleInputChange}
                  />
                </DivInputs>
                <DivInputs>
                  <label htmlFor="cep">Cep</label>
                  <Input
                    id="cep"
                    type="text"
                    placeholder="Digite o  cep"
                    value={dadosModal.cep}
                    onChange={handleInputChange}
                    
                  />
                </DivInputs>
                <DivInputs>
                  <label htmlFor="uf">Uf</label>
                  <Input
                    id="uf"
                    type="text"
                    placeholder="Digite a uf"
                    value={dadosModal.uf}
                    onChange={handleInputChange}
                 
                  />
                </DivInputs>
                <DivInputs>
                  <label htmlFor="endereco">Endereço</label>
                  <Input
                    id="endereco"
                    type="text"
                    placeholder="Digite o endereço"
                    value={dadosModal.endereco}
                    onChange={handleInputChange}
                 
                  />
                </DivInputs>
                <DivInputs>
                  <label htmlFor="numero">Numero</label>
                  <Input
                    id="numero"
                    type="text"
                    placeholder="Digite o numero da residência"
                    value={dadosModal.numero}
                    onChange={handleInputChange}
                 
                  />
                </DivInputs>
                <DivInputs>
                  <label htmlFor="sexo">Sexo</label>
                  <select name="sexo" id="sexo"
                   value={dadosModal.sexo}
                   onChange={handleInputChange}
                   >
                    <option value="">Selecione</option>
                    <option value="MASCULINO">Masculino</option>
                    <option value="FEMININO">Feminino</option>
                  </select>
                </DivInputs>
                <DivInputs>
                  <label htmlFor="complemento">Complemento</label>
                  <Input
                    id="complemento"
                    type="text"
                    placeholder="Digite o complemento"
                    value={dadosModal.complemento}
                   onChange={handleInputChange}
                 
                  />
                </DivInputs>
                <DivInputs>
                  <label htmlFor="bairro">Bairro</label>
                  <Input
                    id="bairro"
                    type="text"
                    placeholder="Digite o bairro"
                    value={dadosModal.bairro}
                   onChange={handleInputChange}
                 
                  />
                </DivInputs>
                <DivInputs>
                  <label htmlFor="cidade">Cidade</label>
                  <Input
                    id="cidade"
                    type="text"
                    placeholder="Digite a cidade"
                    value={dadosModal.cidade}
                   onChange={handleInputChange}
                 
                  />
                </DivInputs>
                <DivInputs>
                  <label htmlFor="email">E-mail</label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Digite o e-mail"
                    value={dadosModal.email}
                   onChange={handleInputChange}
                 
                  />
                </DivInputs>
                <DivInputs>
                  <label htmlFor="telefone01">Telefone 01</label>
                  <Input
                    id="telefone01"
                    type="number"
                    placeholder="Digite o numero do telefone"
                    value={dadosModal.telefone01}
                   onChange={handleInputChange}
                 
                  />
                </DivInputs>
                <DivInputs>
                  <label htmlFor="telefone02">Telefone 02</label>
                  <Input
                    id="telefone02"
                    type="number"
                    placeholder="Digite o numero do telefone"
                    value={dadosModal.telefone02}
                   onChange={handleInputChange}
                 
                  />
                </DivInputs>
                <DivInputs>
                 <Toggle
                  id="toggle-1"
                  checked={dadosModal.activo}
                  label="Ativo"
                  onClick={handleToggleChange}
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
