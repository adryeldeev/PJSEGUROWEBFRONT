import { useParams } from "react-router-dom";
import { useEffect, useReducer, useRef, useState } from "react";
import { Button } from "@mui/material";
import {
  DivContent,
  InfoContainer,
  InfoBox,
  Label,
  Value,
  Input,
} from "./InformacoesStyled";
import useApi from "../../Api/Api";

// Estado inicial do reducer
const initialState = {
  faseProcesso: { nome: "Não informado" },
  prioridade: { id: "", nome: "Não informado" },
  user: { username: "" },
  criado_em: "",
  seguradora: { id: "", nome: "Não informado" },
  vitima: { endereco: "", email: "", telefone01: "" },
};

// Reducer para gerenciar o estado do formulário
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PROCESSO":
      return { ...state, ...action.payload };
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_NESTED_FIELD":
      return {
        ...state,
        [action.field]: { ...state[action.field], [action.subField]: action.value },
      };
    default:
      return state;
  }
};

const Informacoes = () => {
  const api = useApi();
  const { id: processoId } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [prioridades, setPrioridades] = useState([]);
  const [seguradoras, setSeguradoras] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const dataLoadedRef = useRef(false); // Evita recarregar os dados várias vezes

  // Buscar dados do processo
  useEffect(() => {
    if (processoId && !dataLoadedRef.current) {
      const fetchProcesso = async () => {
        try {
          const response = await api.get(`/processos/${processoId}`);
          dispatch({ type: "SET_PROCESSO", payload: response.data });
          dataLoadedRef.current = true; // Marca como carregado
        } catch (error) {
          console.error("Erro ao buscar processo:", error);
        }
      };
      fetchProcesso();
    }
  }, [processoId, api]);

  // Buscar prioridades
  useEffect(() => {
    const fetchPrioridades = async () => {
      try {
        const response = await api.get("/prioridades");
        setPrioridades(response.data.prioridades || []);
      } catch (error) {
        console.error("Erro ao buscar prioridades:", error);
      }
    };
    fetchPrioridades();
  }, []);

  // Buscar seguradoras
  useEffect(() => {
    const fetchSeguradoras = async () => {
      try {
        const response = await api.get("/seguradoras");
        setSeguradoras(response.data.seguradoras || []);
      } catch (error) {
        console.error("Erro ao buscar seguradoras:", error);
      }
    };
    fetchSeguradoras();
  }, []);

  // Atualizar processo no backend
  const handleSave = async () => {
    try {
      await api.put(`/processos/${processoId}`, state);
      setIsEditing(false); // Volta para modo de visualização
    } catch (error) {
      console.error("Erro ao atualizar processo:", error);
    }
  };

  if (!state.faseProcesso.nome || prioridades.length === 0) {
    return <p>Carregando...</p>;
  }

  return (
    <DivContent>
      <InfoContainer>
        <InfoBox className="fase">
          <Label>Fase</Label>
          <Value className="fase-value">{state.faseProcesso.nome}</Value>
        </InfoBox>

        <InfoBox className="prioridade">
          <Label>Prioridade</Label>
          {isEditing ? (
            <select
              value={state.prioridade.id}
              onChange={(e) =>
                dispatch({
                  type: "SET_NESTED_FIELD",
                  field: "prioridade",
                  subField: "id",
                  value: e.target.value,
                })
              }
            >
              {prioridades.map((prioridade) => (
                <option key={prioridade.id} value={prioridade.id}>
                  {prioridade.nome}
                </option>
              ))}
            </select>
          ) : (
            <Value>{state.prioridade.nome}</Value>
          )}
        </InfoBox>
      </InfoContainer>

      <InfoContainer>
        <InfoBox>
          <Label>Operador</Label>
          {isEditing ? (
            <Input
              type="text"
              value={state.user.username}
              onChange={(e) =>
                dispatch({ type: "SET_NESTED_FIELD", field: "user", subField: "username", value: e.target.value })
              }
            />
          ) : (
            <Value>{state.user.username || "Não informado"}</Value>
          )}
        </InfoBox>

        <InfoBox>
          <Label>Data de Cadastro</Label>
          {isEditing ? (
            <Input
              type="date"
              value={state.criado_em.split("T")[0]}
              onChange={(e) => dispatch({ type: "SET_FIELD", field: "criado_em", value: e.target.value })}
            />
          ) : (
            <Value>{new Date(state.criado_em).toLocaleDateString()}</Value>
          )}
        </InfoBox>

        <InfoBox>
          <Label>Seguradora</Label>
          {isEditing ? (
            <select
              value={state.seguradora.id}
              onChange={(e) =>
                dispatch({
                  type: "SET_NESTED_FIELD",
                  field: "seguradora",
                  subField: "id",
                  value: e.target.value,
                })
              }
            >
              {seguradoras.map((seguradora) => (
                <option key={seguradora.id} value={seguradora.id}>
                  {seguradora.nome}
                </option>
              ))}
            </select>
          ) : (
            <Value>{state.seguradora.nome}</Value>
          )}
        </InfoBox>

        <InfoBox>
          <Label>Endereço</Label>
          {isEditing ? (
            <Input
              type="text"
              value={state.vitima.endereco}
              onChange={(e) =>
                dispatch({ type: "SET_NESTED_FIELD", field: "vitima", subField: "endereco", value: e.target.value })
              }
            />
          ) : (
            <Value>{state.vitima.endereco || "Não informado"}</Value>
          )}
        </InfoBox>

        <InfoBox>
          <Label>Email</Label>
          {isEditing ? (
            <Input
              type="email"
              value={state.vitima.email}
              onChange={(e) =>
                dispatch({ type: "SET_NESTED_FIELD", field: "vitima", subField: "email", value: e.target.value })
              }
            />
          ) : (
            <Value>{state.vitima.email || "Não informado"}</Value>
          )}
        </InfoBox>

        <InfoBox>
          <Label>Telefone</Label>
          {isEditing ? (
            <Input
              type="tel"
              value={state.vitima.telefone01}
              onChange={(e) =>
                dispatch({ type: "SET_NESTED_FIELD", field: "vitima", subField: "telefone01", value: e.target.value })
              }
            />
          ) : (
            <Value>{state.vitima.telefone01 || "Não informado"}</Value>
          )}
        </InfoBox>
      </InfoContainer>

      <Button color="primary" onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? "Cancelar" : "Editar"}
      </Button>
      {isEditing && <Button color="success" onClick={handleSave}>Salvar</Button>}
    </DivContent>
  );
};

export default Informacoes;
