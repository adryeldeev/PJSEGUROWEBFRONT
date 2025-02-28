import { useEffect, useReducer, useState } from "react";
import PropTypes from "prop-types";
import { 
  DivContent, InfoBox, InfoContainer, Input, Label, Title, DivSinistroInput 
} from "./SinistroStyled";
import Veiculo from "../../Components/Veiculo/Veiculo";
import Delegacia from "../../Components/Delegacia/Delegacia";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import useApi from "../../Api/Api";
import { useParams } from "react-router-dom";

// Estado inicial
const initialState = {
  dataSinistro: "",
  numero: "",
  dataAbertura: "",
  veiculo: { marca: "", modelo: "", placa: "", ano: "" },
  delegacia: { delegacia: "", uf: "", cidade: "", dataBo: "", numeroBo: "" },
};

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_VALUE":
      return { ...state, [action.field]: action.value };
    case "SET_VEICULO":
      return { ...state, veiculo: { ...state.veiculo, [action.field]: action.value } };
    case "SET_DELEGACIA":
      return { ...state, delegacia: { ...state.delegacia, [action.field]: action.value } };
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

  // Buscar dados do sinistro ao carregar a página
  useEffect(() => {
    if (processoId) {
      const fetchSinistro = async () => {
        try {
          const response = await api.get(`/sinistro/${processoId}`);
          const { dataSinistro, numero, dataAbertura, tipoDeVeiculo, delegacia } = response.data;
          
          dispatch({ type: "SET_VALUE", field: "dataSinistro", value: dataSinistro || "" });
          dispatch({ type: "SET_VALUE", field: "numero", value: numero || "" });
          dispatch({ type: "SET_VALUE", field: "dataAbertura", value: dataAbertura || "" });
          dispatch({ type: "SET_VEICULO", field: "marca", value: tipoDeVeiculo?.marca || "" });
          dispatch({ type: "SET_VEICULO", field: "modelo", value: tipoDeVeiculo?.modelo || "" });
          dispatch({ type: "SET_VEICULO", field: "placa", value: tipoDeVeiculo?.placa || "" });
          dispatch({ type: "SET_VEICULO", field: "ano", value: tipoDeVeiculo?.ano || "" });
          dispatch({ type: "SET_DELEGACIA", field: "delegacia", value: delegacia?.delegacia || "" });
          dispatch({ type: "SET_DELEGACIA", field: "uf", value: delegacia?.uf || "" });
          dispatch({ type: "SET_DELEGACIA", field: "cidade", value: delegacia?.cidade || "" });
          dispatch({ type: "SET_DELEGACIA", field: "dataBo", value: delegacia?.dataBo || "" });
          dispatch({ type: "SET_DELEGACIA", field: "numeroBo", value: delegacia?.numeroBo || "" });
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
      const dadosComProcessoId = {
        dataSinistro: state.dataSinistro,
        numero: state.numero,
        dataAbertura: state.dataAbertura,
        processoId,
        tipoDeVeiculo: state.veiculo,
        delegacia: state.delegacia,
      };

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
                onChange={(e) => dispatch({ type: "SET_VALUE", field: "dataSinistro", value: e.target.value })}
              />
            ) : (
              <p>{state.dataSinistro}</p>
            )}
          </InfoBox>

          <InfoBox>
            <Label>Número</Label>
            {isEditing ? (
              <Input
                type="text"
                value={state.numero}
                onChange={(e) => dispatch({ type: "SET_VALUE", field: "numero", value: e.target.value })}
              />
            ) : (
              <p>{state.numero}</p>
            )}
          </InfoBox>

          <InfoBox>
            <Label>Data de Abertura</Label>
            {isEditing ? (
              <Input
                type="date"
                value={state.dataAbertura}
                onChange={(e) => dispatch({ type: "SET_VALUE", field: "dataAbertura", value: e.target.value })}
              />
            ) : (
              <p>{state.dataAbertura}</p>
            )}
          </InfoBox>
        </DivSinistroInput>
      </InfoContainer>

      <Veiculo
        inputs={[
          { name: "marca", label: "Marca do Veículo", type: "text" },
          { name: "modelo", label: "Modelo", type: "text" },
          { name: "placa", label: "Placa", type: "text" },
          { name: "ano", label: "Ano", type: "number" },
        ]}
        values={state.veiculo}
        onChange={(e) => dispatch({ type: "SET_VEICULO", field: e.target.name, value: e.target.value })}
        isEditing={isEditing}
      />

      <Delegacia values={state.delegacia} isEditing={isEditing} 
      inputs={[
        { name: "delegacia", label: "Delegacia", type: "text" },
        { name: "uf", label: "UF", type: "text" },
        { name: "cidade", label: "Cidade", type: "text" },
        { name: "dataBo", label: "Data do BO", type: "date" },
        { name: "numeroBo", label: "Número do BO", type: "text" },
      ]}
      onChange={(e) => dispatch({ type: "SET_DELEGACIA", field: e.target.name, value: e.target.value })}
      />

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
