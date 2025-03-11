import { useEffect, useReducer, useState, useRef } from "react";
import PropTypes from "prop-types";
import {
  DivContent,
  InfoBox,
  InfoContainer,
  Input,
  Label,
  Title,
  DivSinistroInput,
  InfoBoxWrapper,
  InfoBoxItem,
} from "./SinistroStyled";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import useApi from "../../Api/Api";
import { useParams } from "react-router-dom";
import Veiculo from "../../Components/Veiculo/Veiculo";
import Delegacia from "../../Components/Delegacia/Delegacia";

// Estado inicial **plano**
const initialState = {
  dataSinistro: "",
  numero: "",
  dataAbertura: "",
  marca: "",
  modelo: "",
  placa: "",
  ano: "",
  delegacia: "",
  uf: "",
  cidade: "",
  dataBo: "",
  numeroBo: "",
};

// Reducer atualizado
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_VALUE":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const Sinistro = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isEditing, setIsEditing] = useState(false);
  const api = useApi();
  const { id: processoId } = useParams();
  const dataLoadedRef = useRef(false);

  // Buscar os dados do sinistro
  useEffect(() => {
    if (processoId && !dataLoadedRef.current) {
      const fetchSinistro = async () => {
        try {
          const response = await api.get(`/sinistro/${processoId}`);
          if (response.data) {
            const sinistro = response.data;
            
            // Preenchendo os dados do sinistro
            dispatch({ type: "SET_VALUE", field: "dataSinistro", value: sinistro.dataSinistro || "" });
            dispatch({ type: "SET_VALUE", field: "numero", value: sinistro.numero || "" });
            dispatch({ type: "SET_VALUE", field: "dataAbertura", value: sinistro.dataAbertura || "" });
  
            // Preenchendo os dados do veículo
            if (sinistro.tipoDeVeiculo) {
              dispatch({ type: "SET_VALUE", field: "marca", value: sinistro.tipoDeVeiculo.marca || "" });
              dispatch({ type: "SET_VALUE", field: "modelo", value: sinistro.tipoDeVeiculo.modelo || "" });
              dispatch({ type: "SET_VALUE", field: "placa", value: sinistro.tipoDeVeiculo.placa || "" });
              dispatch({ type: "SET_VALUE", field: "ano", value: sinistro.tipoDeVeiculo.ano || "" });
            }
  
            // Preenchendo os dados da delegacia
            if (sinistro.delegacia) {
              dispatch({ type: "SET_VALUE", field: "delegacia", value: sinistro.delegacia.delegacia || "" });
              dispatch({ type: "SET_VALUE", field: "uf", value: sinistro.delegacia.uf || "" });
              dispatch({ type: "SET_VALUE", field: "cidade", value: sinistro.delegacia.cidade || "" });
              dispatch({ type: "SET_VALUE", field: "dataBo", value: sinistro.delegacia.dataBo || "" });
              dispatch({ type: "SET_VALUE", field: "numeroBo", value: sinistro.delegacia.numeroBo || "" });
            }
          }
          dataLoadedRef.current = true;
        } catch (error) {
          console.error("Erro ao buscar sinistro:", error);
        }
      };
      fetchSinistro();
    }
  }, [processoId, api]);

  // Salvar ou atualizar sinistro
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!state.dataSinistro || !state.numero || !state.dataAbertura) {
      Swal.fire({
        icon: "warning",
        title: "Campos obrigatórios!",
        text: "Por favor, preencha todos os campos do sinistro!",
      });
      return;
    }

    try {
      const dadosComProcessoId = { ...state, processoId };

      console.log("Enviando payload:", dadosComProcessoId);

      if (processoId) {
        await api.put(`/sinistro/${processoId}`, dadosComProcessoId);
      } else {
        await api.post("/sinistro", dadosComProcessoId);
      }

      Swal.fire({
        icon: "success",
        title: "Sinistro",
        text: `Sinistro foi ${processoId ? "atualizado" : "cadastrado"} com sucesso!`,
      });

      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao salvar sinistro:", error);

      Swal.fire({
        icon: "error",
        title: "Erro ao salvar sinistro",
        text: `Houve um problema ao ${processoId ? "atualizar" : "cadastrar"} os dados do sinistro.`,
      });
    }
  };

  return (
    <DivContent>
      <Title>Sinistro</Title>

      <InfoContainer>
        <DivSinistroInput>
          <InfoBox>
            <Label>Data do Sinistro</Label>
            {isEditing ? (
              <Input
                type="date"
                value={state.dataSinistro}
                onChange={(e) =>
                  dispatch({ type: "SET_VALUE", field: "dataSinistro", value: e.target.value })
                }
              />
            ) : (
              <p>{new Date(state.dataSinistro).toLocaleDateString() || "Não informado"}</p>
            )}
          </InfoBox>

          <InfoBox>
            <Label>Número do sinistro</Label>
            {isEditing ? (
              <Input
                type="text"
                value={state.numero}
                onChange={(e) =>
                  dispatch({ type: "SET_VALUE", field: "numero", value: e.target.value })
                }
              />
            ) : (
              <p>{state.numero || "Não informado"}</p>
            )}
          </InfoBox>

          <InfoBox>
            <Label>Data de Abertura</Label>
            {isEditing ? (
              <Input
                type="date"
                value={state.dataAbertura}
                onChange={(e) =>
                  dispatch({ type: "SET_VALUE", field: "dataAbertura", value: e.target.value })
                }
              />
            ) : (
              <p>{new Date(state.dataAbertura).toLocaleDateString() || "Não informado"}</p>
            )}
          </InfoBox>
        </DivSinistroInput>
      </InfoContainer>

      {/* Dados do Veículo */}
      {isEditing ? (
        <Veiculo
          inputs={[
            { name: "marca", label: "Marca do Veículo", type: "text" },
            { name: "modelo", label: "Modelo", type: "text" },
            { name: "placa", label: "Placa", type: "text" },
            { name: "ano", label: "Ano", type: "number" },
          ]}
          values={{
            marca: state.marca || "",
            modelo: state.modelo || "",
            placa: state.placa || "",
            ano: state.ano || "",
          }}
          onChange={(e) =>
            dispatch({ type: "SET_VALUE", field: e.target.name, value: e.target.value })
          }
        />
      ) : (
      

        <InfoBoxWrapper>
        <div>
          <Label>Marca</Label>
          <InfoBoxItem>{state?.marca || "Não informado"}</InfoBoxItem>
        </div>
        <div>
          <Label>Modelo</Label>
          <InfoBoxItem>{state?.modelo || "Não informado"}</InfoBoxItem>
        </div>
        <div>
          <Label>Placa</Label>
          <InfoBoxItem>{state?.placa || "Não informado"}</InfoBoxItem>
        </div>
        <div>
          <Label>Ano</Label>
          <InfoBoxItem>{state?.ano || "Não informado"}</InfoBoxItem>
        </div>
      </InfoBoxWrapper>
      
      )}

      {/* Dados da Delegacia */}
      {isEditing ? (
        <Delegacia
          inputs={[
            { name: "delegacia", label: "Delegacia", type: "text" },
            { name: "uf", label: "UF", type: "text" },
            { name: "cidade", label: "Cidade", type: "text" },
            { name: "dataBo", label: "Data do BO", type: "date" },
            { name: "numeroBo", label: "Número do BO", type: "text" },
          ]}
          values={{
            delegacia: state.delegacia || "",
            uf: state.uf || "",
            cidade: state.cidade || "",
            dataBo: state.dataBo || "",
            numeroBo: state.numeroBo || "",
          }}
          onChange={(e) =>
            dispatch({ type: "SET_VALUE", field: e.target.name, value: e.target.value })
          }
        />
      ) : (
        <InfoBoxWrapper>
        <div>
          <Label>Delegacia</Label>
          <InfoBoxItem>{state?.delegacia || "Não informado"}</InfoBoxItem>
        </div>
        <div>
          <Label>UF</Label>
          <InfoBoxItem>{state?.uf || "Não informado"}</InfoBoxItem>
        </div>
        <div>
          <Label>Cidade</Label>
          <InfoBoxItem>{state?.cidade || "Não informado"}</InfoBoxItem>
        </div>
        <div>
          <Label>Data do BO</Label>
          <InfoBoxItem>{new Date(state.dataBo).toLocaleDateString() || "Não informado"}</InfoBoxItem>
        </div>
        <div>
          <Label>Número do BO</Label>
          <InfoBoxItem>{state?.numeroBo || "Não informado"}</InfoBoxItem>
        </div>
      </InfoBoxWrapper>
      )}

      {isEditing ? (
        <Button onClick={handleSubmit}>Salvar</Button>
      ) : (
        <Button onClick={() => setIsEditing(true)}>Editar</Button>
      )}
    </DivContent>
  );
};

Sinistro.propTypes = {
  tipoDeVeiculo: PropTypes.object,
};

export default Sinistro;
