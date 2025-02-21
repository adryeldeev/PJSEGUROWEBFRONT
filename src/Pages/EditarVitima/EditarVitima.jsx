import  { useEffect, useReducer } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useApi from "../../Api/Api";
import Toggle from "../../Components/Toggle/Toggle";
import CampoInput from "../../Components/CamposInputs/CamposInputs";
import Swal from "sweetalert2";
import { Form, ButtonSalvar} from './EditarVitimaStyled'

const initialState = {
  nome: "",
  cpf: "",
  rg: "",
  data_nascimento: "",
  data_emissao: "",
  orgao_expedidor: "",
  profissao: "",
  renda_mensal: "",
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
  ativo: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "TOGGLE_ACTIVE":
      return { ...state, ativo: !state.ativo };
    case "SET_DATA":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

const EditarVitima = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { id } = useParams();
  const api = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchVitima() {
      try {
        const response = await api.get(`/vitima/${id}`);
        if (response.status === 200) {
          const data = response.data;
          dispatch({
            type: "SET_DATA",
            payload: {
              ...data,
              data_nascimento: data.data_nascimento ? data.data_nascimento.split("T")[0] : "",
              data_emissao: data.data_emissao ? data.data_emissao.split("T")[0] : "",
            },
          });
        }
      } catch (error) {
        Swal.fire("Erro", "Erro ao buscar vítima", "error");
        console.error("Erro ao buscar vítima", error);
        navigate("/vitimas");
      }
    }
    fetchVitima();
  }, [id, api, navigate]);

  const handleInputChange = (e) => {
    dispatch({ type: "SET_FIELD", field: e.target.id, value: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await api.put(`/updateVitima/${id}`, state);
      if (response.status === 200) {
        Swal.fire("Sucesso!", "Vítima atualizada com sucesso!", "success");
        navigate("/vitimas");
      }
    } catch (error) {
      Swal.fire("Erro", "Erro ao atualizar vítima", "error");
      console.error("Erro ao atualizar vítima", error);
    }
  };

  return (
    <Form>
      <h2>Editando Vítima: {state.nome}</h2>
      <CampoInput label="Nome *" id="nome" value={state.nome} onChange={handleInputChange} />
      <CampoInput label="CPF *" id="cpf" value={state.cpf} onChange={handleInputChange} placeholder="999.999.999-99" />
      <CampoInput label="RG " id="rg" value={state.rg} onChange={handleInputChange} />
      <CampoInput label="Data de nascimento" id="data_nascimento" type="date" value={state.data_nascimento} onChange={handleInputChange} />
      <CampoInput label="Data de emissão" id="data_emissao" type="date" value={state.data_emissao} onChange={handleInputChange} />
      <CampoInput label="Orgão expedidor " id="orgao_expedidor" value={state.orgao_expedidor} onChange={handleInputChange} />
      <CampoInput label="Profissão" id="profissao" value={state.profissao} onChange={handleInputChange} />
      <CampoInput label="Renda mensal " id="renda_mensal" value={state.renda_mensal} onChange={handleInputChange} />
      <CampoInput label="Cep" id="cep" value={state.cep} onChange={handleInputChange} />
      <CampoInput label="UF" id="uf" value={state.uf} onChange={handleInputChange} />
      <CampoInput label="Endereço " id="endereco" value={state.endereco} onChange={handleInputChange} />
      <CampoInput label="Número " id="numero" value={state.numero} onChange={handleInputChange} />
      <CampoInput label="Complemento " id="complemento" value={state.complemento} onChange={handleInputChange} />
      <CampoInput label="Bairro" id="bairro" value={state.bairro} onChange={handleInputChange} />
      <CampoInput label="Cidade" id="cidade" value={state.cidade} onChange={handleInputChange} />
      <CampoInput label="E-mail" id="email" value={state.email} onChange={handleInputChange} />
      <CampoInput label="Telefone 01" id="telefone01" value={state.telefone01} onChange={handleInputChange} />
      <CampoInput label="Telefone 02" id="telefone02" value={state.telefone02} onChange={handleInputChange} />
      <Toggle id="toggle-1" checked={state.ativo} label="Ativo" onClick={() => dispatch({ type: "TOGGLE_ACTIVE" })} />
      <ButtonSalvar type="button" onClick={handleSave}>Salvar</ButtonSalvar>
    </Form>
  );
};

export default EditarVitima;
