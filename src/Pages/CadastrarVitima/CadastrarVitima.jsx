import React, { useReducer } from 'react';
import { ContentCadastrarVitima, DivForm, DivInputs, Form, Input, Titulo } from './CadastrarVítimaStyled';
import useApi from '../../Api/Api';
import Toggle from '../../Components/Toggle/Toggle';
import { useNavigate } from 'react-router-dom';

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
  vitimaId: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_INPUT':
      return { ...state, [action.field]: action.value };
    case 'FORMAT_CPF':
      return { ...state, cpf: formatCpf(action.value) };
    case 'TOGGLE_ACTIVE':
      return { ...state, activo: !state.activo };
    case 'SET_VITIMA_ID':
      return { ...state, vitimaId: action.value };
      case 'SET_SEXO':
        return {...state, sexo: action.value };
    case 'SET_PROFISSAO':
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const formatCpf = (cpf) => {
  return cpf
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{2})$/, '$1-$2');
};

const CadastrarVitima = () => {
  const navigate = useNavigate();
  const api = useApi();
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    dispatch({ type: 'SET_INPUT', field: id, value });
  };

  const handleCpfChange = (e) => {
    dispatch({ type: 'FORMAT_CPF', value: e.target.value });
  };

  const handleToggleChange = () => {
    dispatch({ type: 'TOGGLE_ACTIVE' });
  };
  const handleSexoChange = (e) => {
    dispatch({ type: 'SET_SEXO', value: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (state.nome === '' || state.cpf === '') {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const response = await api.post('/createVitima', state);
      if (response.status === 200 || response.status === 201) {
        dispatch({ type: 'SET_VITIMA_ID', value: response.data.id });
        alert('Vítima cadastrada com sucesso!');
        navigate('/vitimas');
      } else {
        alert('Erro ao cadastrar vítima.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar vítima:', error);
      alert('Erro ao conectar com o backend.');
    }
  };


  const handleCancelar = () => {
    navigate('/vitimas');
  };

  return (
    <ContentCadastrarVitima>
      <Titulo>Dados Pessoais</Titulo>
      <DivForm>
        <Form onSubmit={handleSubmit}>
          <DivInputs>
            <label htmlFor="nome">Nome *</label>
            <Input id="nome" type="text" value={state.nome} onChange={handleInputChange} />
          </DivInputs>
          <DivInputs>
            <label htmlFor="cpf">Cpf *</label>
            <Input id="cpf" type="text" placeholder="999.999.999-99" value={state.cpf} onChange={handleCpfChange} />
          </DivInputs>
          <DivInputs>
            <label htmlFor="cpf">Rg </label>
            <Input id="cpf" type="text"  value={state.rg} onChange={handleCpfChange} />
          </DivInputs>
          <DivInputs>
            <label htmlFor="dataNascimento">Data de nascimento</label>
            <Input id="cpf" type="date"  value={state.data_nascimento} onChange={handleCpfChange} />
          </DivInputs>
          <DivInputs>
            <label htmlFor="cpf">Data de emissão</label>
            <Input id="cpf" type="date"  value={state.data_emissao} onChange={handleCpfChange} />
          </DivInputs>
          <DivInputs>
            <label htmlFor="orgaoExpedidor">Orgão expedidor</label>
            <Input id="orgaoExpedidor" type="text"  value={state.orgao_expedidor} onChange={handleCpfChange} />
          </DivInputs>
          <DivInputs>
            <label htmlFor="profissao">Profissão</label>
            <Input id="cpf" type="text"  value={state.profissao} onChange={handleCpfChange} />
          </DivInputs>
          <DivInputs>
            <label htmlFor="rendaMensal"></label>
            <Input id="rendaMensal" type="text"  value={state.renda_mensal} onChange={handleCpfChange} />
          </DivInputs>
          <DivInputs>
            <label htmlFor="cep">Cep </label>
            <Input id="cep" type="text"  value={state.cep} onChange={handleCpfChange} />
          </DivInputs>
          <DivInputs>
            <label htmlFor="uf">Uf</label>
            <Input id="uf" type="text"  value={state.uf} onChange={handleCpfChange} />
          </DivInputs>
          <DivInputs>
            <label htmlFor="endereco">Endereço</label>
            <Input id="endereco" type="text"  value={state.endereco} onChange={handleCpfChange} />
          </DivInputs>
          <DivInputs>
            <label htmlFor="numero">Numero</label>
            <Input id="numero" type="text" value={state.numero} onChange={handleCpfChange} />
          </DivInputs>
          <DivInputs>
                          <label htmlFor="sexo">Sexo</label>
                          <select name="sexo" id="sexo"
                           value={state.sexo}
                           onChange={ handleSexoChange}
                           >
                            <option value="">Selecione</option>
                            <option value="MASCULINO">Masculino</option>
                            <option value="FEMININO">Feminino</option>
                          </select>
                        </DivInputs>
          <DivInputs>
            <label htmlFor="complemento">Complemento </label>
            <Input id="complemento" type="text"  value={state.complemento} onChange={handleCpfChange} />
          </DivInputs>
          <DivInputs>
            <label htmlFor="bairro">Bairro</label>
            <Input id="bairro" type="text"  value={state.bairro} onChange={handleCpfChange} />
          </DivInputs>
          <DivInputs>
            <label htmlFor="cidade">Cidade </label>
            <Input id="cidade" type="text"  value={state.cidade} onChange={handleCpfChange} />
          </DivInputs>
          <DivInputs>
            <label htmlFor="email">E-mail</label>
            <Input id="email" type="text"  value={state.email} onChange={handleCpfChange} />
          </DivInputs>
          <DivInputs>
            <label htmlFor="telefone01">Telefone 01</label>
            <Input id="telefone01" type="text"  value={state.telefone01} onChange={handleCpfChange} />
          </DivInputs>
          <DivInputs>
            <label htmlFor="telefone02">Telefone 02 </label>
            <Input id="telefone02" type="text" value={state.cpf} onChange={handleCpfChange} />
          </DivInputs>
          
          <DivInputs>
            <Toggle id="toggle-1" checked={state.activo} label="Ativo" onClick={handleToggleChange} />
          </DivInputs>
          <button type="submit">Salvar</button>
          <button type="button" onClick={handleCancelar}>Cancelar</button>
        </Form>
      </DivForm>
    </ContentCadastrarVitima>
  );
};

export default CadastrarVitima;