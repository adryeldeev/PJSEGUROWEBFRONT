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
  faseProcesso: { nome: null },
  prioridade: { id: "", nome: null },

  seguradora: { id: "", nome: null },
  vitima: { endereco: "", email: "", telefone01: "" },
  seguradoras: [], // Estado para as seguradoras
  prioridades: [], // Estado para as prioridades
};

// Reducer para gerenciar o estado do formulário
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PROCESSO":
      return {
        ...state,
        ...action.payload,
      };
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_NESTED_FIELD":
      return {
        ...state,
        [action.field]: {
          ...state[action.field],
          [action.subField]: action.value,
        },
      };
    case "SET_SEGURADORAS":
      return { ...state, seguradoras: action.payload }; // Atualiza as seguradoras

    case "SET_PRIORIDADES":
      return { ...state, prioridades: action.payload }; // Atualiza as prioridades
    default:
      return state;
  }
};

const Informacoes = () => {
  const api = useApi();
  const { id: processoId } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isEditing, setIsEditing] = useState(false);
  const dataLoadedRef = useRef(false); // Evita recarregar os dados várias vezes

  // Buscar dados do processo
  useEffect(() => {
    if (processoId && !dataLoadedRef.current) {
      const fetchProcesso = async () => {
        try {
          const response = await api.get(`/processos/${processoId}`);
           console.log("Dados do processo recebidos:", response.data);
          dispatch({ type: "SET_PROCESSO", payload: response.data });
          dataLoadedRef.current = true; // Marca como carregado
        } catch (error) {
          console.error("Erro ao buscar processo:", error);
        }
      };
      fetchProcesso();
    }
  }, [processoId, api]);

  // Buscar seguradoras
  useEffect(() => {
    const fetchSeguradoras = async () => {
      try {
        const response = await api.get("/seguradoras");
        dispatch({
          type: "SET_SEGURADORAS",
          payload: response.data.seguradoras || [],
        });
      } catch (error) {
        console.error("Erro ao buscar seguradoras:", error);
      }
    };
    fetchSeguradoras();
  }, []);

  // Buscar fases do processo

  // Buscar prioridades
  useEffect(() => {
    const fetchPrioridades = async () => {
      try {
        const response = await api.get("/prioridades");
        dispatch({
          type: "SET_PRIORIDADES",
          payload: response.data.prioridades || [],
        });
      } catch (error) {
        console.error("Erro ao buscar prioridades:", error);
      }
    };
    fetchPrioridades();
  }, []);

  // Atualizar processo no backend
  const handleSave = async () => {
    try {
      const payload = {
        tipoProcessoId: state.tipoProcessoId
          ? parseInt(state.tipoProcessoId, 10)
          : undefined,
        faseProcessoId: state.faseProcessoId
          ? parseInt(state.faseProcessoId, 10)
          : undefined,
        prioridadeId: state.prioridade?.id
          ? parseInt(state.prioridade.id, 10)
          : undefined,
        seguradoraId: state.seguradora?.id
          ? parseInt(state.seguradora.id, 10)
          : undefined,
        vitimaId: state.vitima?.id,
        vitima: {
          email: state.vitima?.email,
          telefone01: state.vitima?.telefone01,
          endereco: state.vitima?.endereco,
        },
        seguradora: {
          id: state.seguradora?.id ? parseInt(state.seguradora.id, 10) : undefined,
          nome: state.seguradora?.nome || "",
        },
      };
  
      console.log("Payload enviado para API:", payload);
  
      await api.put(`/updateProcessos/${processoId}`, payload);
  
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao atualizar processo:", error);
    }
  };

  if (!state.faseProcesso?.nome) {
    return <p>Carregando...</p>;
  }

  return (
    <DivContent>
      <InfoContainer>
        <InfoBox className="fase">
          <Label>Fase</Label>

          <Value>{state.faseProcesso?.nome}</Value>
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
              {state.prioridades.map((prioridade) => (
                <option key={prioridade.id} value={prioridade.id}>
                  {prioridade.nome}
                </option>
              ))}
            </select>
          ) : (
            <Value>{state.prioridade?.nome}</Value>
          )}
        </InfoBox>
      </InfoContainer>

      <InfoContainer>
        <InfoBox>
          <Label>Operador</Label>

          <Value>{state.user?.username || "Não informado"}</Value>
        </InfoBox>

        <InfoBox>
          <Label>Data de Cadastro</Label>
          
            <Value>{new Date(state.criado_em).toLocaleDateString()}</Value>
        
        </InfoBox>

        <InfoBox>
          <Label>Seguradora</Label>
          {isEditing ? (
            <select
            value={state.seguradora?.id || ""}
            onChange={(e) => {
              const selectedId = e.target.value;
              const selectedSeguradora = state.seguradoras.find(
                (s) => s.id.toString() === selectedId
              );
          
              dispatch({
                type: "SET_NESTED_FIELD",
                field: "seguradora",
                subField: "id",
                value: selectedId,
              });
          
              dispatch({
                type: "SET_NESTED_FIELD",
                field: "seguradora",
                subField: "nome",
                value: selectedSeguradora ? selectedSeguradora.nome : "",
              });
            }}
          >
            <option value="">Selecione uma seguradora</option>
            {state.seguradoras.map((seguradora) => (
              <option key={seguradora.id} value={seguradora.id}>
                {seguradora.nome}
              </option>
            ))}
          </select>
          ) : (
            <Value>{state.seguradora?.nome || 'Não informado'}</Value>
          )}
        </InfoBox>

        <InfoBox>
          <Label>Endereço</Label>
          {isEditing ? (
            <Input
              type="text"
              value={state.vitima.endereco}
              onChange={(e) =>
                dispatch({
                  type: "SET_NESTED_FIELD",
                  field: "vitima",
                  subField: "endereco",
                  value: e.target.value,
                })
              }
            />
          ) : (
            <Value>{state.vitima?.endereco || "Não informado"}</Value>
          )}
        </InfoBox>

        <InfoBox>
          <Label>Email</Label>
          {isEditing ? (
            <Input
              type="email"
              value={state.vitima.email}
              onChange={(e) =>
                dispatch({
                  type: "SET_NESTED_FIELD",
                  field: "vitima",
                  subField: "email",
                  value: e.target.value,
                })
              }
            />
          ) : (
            <Value>{state.vitima?.email || "Não informado"}</Value>
          )}
        </InfoBox>

        <InfoBox>
          <Label>Telefone</Label>
          {isEditing ? (
            <Input
              type="tel"
              value={state.vitima.telefone01}
              onChange={(e) =>
                dispatch({
                  type: "SET_NESTED_FIELD",
                  field: "vitima",
                  subField: "telefone01",
                  value: e.target.value,
                })
              }
            />
          ) : (
            <Value>{state.vitima?.telefone01 || "Não informado"}</Value>
          )}
        </InfoBox>
      </InfoContainer>

      <Button color="primary" onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? "Cancelar" : "Editar"}
      </Button>
      {isEditing && (
        <Button color="success" onClick={handleSave}>
          Salvar
        </Button>
      )}
    </DivContent>
  );
};

export default Informacoes;
