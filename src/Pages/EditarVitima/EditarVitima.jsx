import { useEffect, useReducer, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useApi from "../../Api/Api";
import Toggle from "../../Components/Toggle/Toggle";
import CampoInput from "../../Components/CamposInputs/CamposInputs";
import Swal from "sweetalert2";
import { Form, ButtonSalvar, DivInputs } from "./EditarVitimaStyled";

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
  activo: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "TOGGLE_ACTIVE":
      return { ...state, activo: !state.activo };
    case "SET_DATA":
      return { ...action.payload };
    case "SET_SEXO":
      return { ...state, sexo: action.value };
    default:
      return state;
  }
}

const EditarVitima = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [dataLoaded, setDataLoaded] = useState(false);
  const isFirstLoad = useRef(true); // Ref para rastrear se os dados já foram carregados
  const { id } = useParams();
  const api = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchVitima() {
      try {
        const response = await api.get(`/vitima/${id}`);
        if (response.status === 200) {
          const data = response.data;

          if (isFirstLoad.current) {
            dispatch({
              type: "SET_DATA",
              payload: {
                ...data,
                data_nascimento: data.data_nascimento
                  ? data.data_nascimento.split("T")[0]
                  : "",
                data_emissao: data.data_emissao
                  ? data.data_emissao.split("T")[0]
                  : "",
              },
            });
            isFirstLoad.current = false; // Marca que os dados foram carregados
            setDataLoaded(true);
          }
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
    if (!dataLoaded) return; // Impede mudanças antes dos dados serem carregados
  
   
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    
    dispatch({ type: "SET_FIELD", field: e.target.id, value });
  };
  const handleSexoChange = (e) => {
    dispatch({ type: "SET_SEXO", value: e.target.value });
  };

  const handleSave = async () => {
    if (state.rg && state.rg.length < 11) {
      return Swal.fire(
        "Aviso",
        "O RG deve conter pelo menos 11 caracteres.",
        "warning"
      );
    }

    // Verifica CEP apenas se for preenchido
    if (state.cep && state.cep.replace(/\D/g, "").length !== 8) {
      return Swal.fire(
        "Aviso",
        "O CEP deve conter exatamente 8 números.",
        "warning"
      );
    }
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
      <CampoInput
        label="Nome *"
        id="nome"
        value={state.nome}
        onChange={handleInputChange}
        disabled={!dataLoaded}
      />
      <CampoInput
        label="CPF *"
        id="cpf"
        value={state.cpf}
        onChange={handleInputChange}
        placeholder="999.999.999-99"
        disabled={!dataLoaded}
      />
      <CampoInput
        label="RG"
        id="rg"
        value={state.rg}
        onChange={handleInputChange}
        disabled={!dataLoaded}
      />
      <CampoInput
        label="Data de nascimento"
        id="data_nascimento"
        type="date"
        value={state.data_nascimento}
        onChange={handleInputChange}
        disabled={!dataLoaded}
      />
      <CampoInput
        label="Data de emissão"
        id="data_emissao"
        type="date"
        value={state.data_emissao}
        onChange={handleInputChange}
        disabled={!dataLoaded}
      />
      <CampoInput
        label="Orgão expedidor"
        id="orgao_expedidor"
        value={state.orgao_expedidor}
        onChange={handleInputChange}
        disabled={!dataLoaded}
      />
      <CampoInput
        label="Profissão"
        id="profissao"
        value={state.profissao}
        onChange={handleInputChange}
        disabled={!dataLoaded}
      />
      <CampoInput
        label="Renda mensal"
        id="renda_mensal"
        type="number"
        value={state.renda_mensal}
        onChange={handleInputChange}
        disabled={!dataLoaded}
      />
      <CampoInput
        label="Cep"
        id="cep"
        value={state.cep}
        onChange={handleInputChange}
        disabled={!dataLoaded}
      />
      <CampoInput
        label="UF"
        id="uf"
        value={state.uf}
        onChange={handleInputChange}
        disabled={!dataLoaded}
      />
      <CampoInput
        label="Endereço"
        id="endereco"
        value={state.endereco}
        onChange={handleInputChange}
        disabled={!dataLoaded}
      />
      <DivInputs>
        <label htmlFor="sexo">Sexo</label>
        <select
          name="sexo"
          id="sexo"
          value={state.sexo}
          onChange={handleSexoChange}
        >
          <option value="">Selecione</option>
          <option value="MASCULINO">Masculino</option>
          <option value="FEMININO">Feminino</option>
        </select>
      </DivInputs>
      <CampoInput
        label="Número"
        id="numero"
        value={state.numero}
        onChange={handleInputChange}
        disabled={!dataLoaded}
      />
      <CampoInput
        label="Complemento"
        id="complemento"
        value={state.complemento}
        onChange={handleInputChange}
        disabled={!dataLoaded}
      />
      <CampoInput
        label="Bairro"
        id="bairro"
        value={state.bairro}
        onChange={handleInputChange}
        disabled={!dataLoaded}
      />
      <CampoInput
        label="Cidade"
        id="cidade"
        value={state.cidade}
        onChange={handleInputChange}
        disabled={!dataLoaded}
      />
      <CampoInput
        label="E-mail"
        id="email"
        type="email"
        value={state.email}
        onChange={handleInputChange}
        disabled={!dataLoaded}
      />
      <CampoInput
        label="Telefone 01"
        id="telefone01"
        value={state.telefone01}
        onChange={handleInputChange}
        disabled={!dataLoaded}
      />
      <CampoInput
        label="Telefone 02"
        id="telefone02"
        value={state.telefone02}
        onChange={handleInputChange}
        disabled={!dataLoaded}
      />
      <Toggle
        id="toggle-1"
        checked={state.activo}
        label="Ativo"
        onClick={() => dataLoaded && dispatch({ type: "TOGGLE_ACTIVE" })}
      />
      <ButtonSalvar type="button" onClick={handleSave} disabled={!dataLoaded}>
        Salvar
      </ButtonSalvar>
    </Form>
  );
};

export default EditarVitima;
