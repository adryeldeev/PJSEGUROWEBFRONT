import { useReducer } from "react";
import PropTypes from "prop-types";
import { 
  DivContent, InfoBox, InfoContainer, Input, Label, Title, DivSinistroInput 
} from "./SinistroStyled";
import Veiculo from "../../Components/Veiculo/Veiculo";
import Delegacia from "../../Components/Delegacia/Delegacia";
import { Button } from "@mui/material";

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

  return (
    <DivContent>
      <Title>Sinistro</Title>

      <InfoContainer>
        <DivSinistroInput>
          <InfoBox>
            <Label>Data do Sinistro</Label>
            <Input 
              type="date"
              value={state.dataSinistro}
              onChange={(e) => dispatch({ type: "SET_VALUE", field: "dataSinistro", value: e.target.value })}
            />
          </InfoBox>

          <InfoBox>
            <Label>Número</Label>
            <Input 
              type="text"
              value={state.numero}
              onChange={(e) => dispatch({ type: "SET_VALUE", field: "numero", value: e.target.value })}
            />
          </InfoBox>

          <InfoBox>
            <Label>Data de Abertura</Label>
            <Input 
              type="date"
              value={state.dataAbertura}
              onChange={(e) => dispatch({ type: "SET_VALUE", field: "dataAbertura", value: e.target.value })}
            />
          </InfoBox>
        </DivSinistroInput>
      </InfoContainer>

      {/* Seção Veículo */}
      <Veiculo
        inputs={[
          { name: "marca", label: "Marca do Veículo", type: "text" },
          { name: "modelo", label: "Modelo", type: "text" },
          { name: "placa", label: "Placa", type: "text" },
          { name: "ano", label: "Ano", type: "number" },
        ]}
        values={state.veiculo}
        onChange={(e) => dispatch({ type: "SET_VEICULO", field: e.target.name, value: e.target.value })}
      />

      {/* Seção Delegacia */}
      <Delegacia
        inputs={[
          { name: "delegacia", label: "Delegacia", type: "text" },
          { name: "uf", label: "UF", type: "text" },
          { name: "cidade", label: "Cidade", type: "text" },
          { name: "dataBo", label: "Data do BO", type: "date" },
          { name: "numeroBo", label: "Número do BO", type: "text" },
        ]}
        values={state.delegacia}
        onChange={(e) => dispatch({ type: "SET_DELEGACIA", field: e.target.name, value: e.target.value })}
      />

      <Button onClick={() => dispatch({ type: "RESET" })}>Limpar</Button>
    </DivContent>
  );
};

Sinistro.propTypes = {
  tipoDeVeiculo: PropTypes.object.isRequired,
};

export default Sinistro;
