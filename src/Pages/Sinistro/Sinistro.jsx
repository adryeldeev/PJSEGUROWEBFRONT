import React, { useState, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DivContent, InfoBox, InfoContainer, Input, Label, Title, Span, DivSinistroInput } from './SinistroStyled';
import Veiculo from '../../Components/Veiculo/Veiculo';
import Delegacia from '../../Components/Delegacia/Delegacia';
import { Button } from "@mui/material";
import useApi from '../../Api/Api';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

// Definição do reducer
const initialState = {
  sinistro: {
    dataSinistro: "",
    numero: "",
    dataAbertura: "",
    processoId: null, // O valor de processoId será atribuído depois
  },
  veiculo: {
    marca: "",
    modelo: "",
    placa: "",
    ano: "",
    sinistroId: null, // Adicionado sinistroId aqui
  },
  delegacia: {
    delegacia: "",
    uf: "",
    cidade: "",
    dataBo: "",
    numeroBo: "",
    sinistroId: null, // Adicionado sinistroId aqui
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_SINISTRO":
      return { ...state, sinistro: { ...state.sinistro, [action.field]: action.value } };
    case "UPDATE_VEICULO":
      return { ...state, veiculo: { ...state.veiculo, [action.field]: action.value } };
    case "UPDATE_DELEGACIA":
      return { ...state, delegacia: { ...state.delegacia, [action.field]: action.value } };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const Sinistro = () => {
  const api = useApi();
  const { id: processoId } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (processoId) {
      dispatch({ type: "UPDATE_SINISTRO", field: "processoId", value: Number(processoId) });
    }
  }, [processoId]);

  useEffect(() => {
    if (state.sinistro.processoId) {
      dispatch({ type: "UPDATE_VEICULO", field: "sinistroId", value: state.sinistro.processoId });
      dispatch({ type: "UPDATE_DELEGACIA", field: "sinistroId", value: state.sinistro.processoId });
    }
  }, [state.sinistro.processoId]);

  const handleEditClick = () => setIsEditing(true);

  const handleChange = (e, type) => {
    const { name, value } = e.target;
    // Verifique se o campo é de data e formate corretamente
    let formattedValue = value;
    if (name === "dataSinistro" || name === "dataAbertura") {
      // Formatar a data no formato correto (YYYY-MM-DD) para inputs do tipo "date"
      formattedValue = value ? new Date(value).toISOString().split('T')[0] : '';
    }
    dispatch({ type, field: name, value: formattedValue });
  };

  const handleSaveClick = async (tipo) => {
    let dadosParaAtualizar = {};

    if (tipo === "sinistro") {
      dadosParaAtualizar = { sinistro: state.sinistro };
    } else if (tipo === "veiculo") {
      dadosParaAtualizar = { veiculo: state.veiculo };
    } else if (tipo === "delegacia") {
      dadosParaAtualizar = { delegacia: state.delegacia };
    }

    try {
      await api.put(`/updateSinistro/${processoId}`, dadosParaAtualizar); // Ajuste a rota conforme necessário
      Swal.fire({
        icon: "success",
        title: "Atualização realizada",
        text: `Os dados de ${tipo} foram atualizados com sucesso!`,
      });
    } catch (error) {
      console.error(`Erro ao atualizar ${tipo}:`, error);
      Swal.fire({
        icon: "error",
        title: "Erro ao salvar",
        text: `Houve um problema ao atualizar os dados de ${tipo}.`,
      });
    }
  };

  const handleCancelClick = () => {
    dispatch({ type: "RESET" });
    setIsEditing(false);
    Swal.fire({
      icon: "warning",
      title: "Edição cancelada",
      text: "Os dados não foram alterados.",
    });
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
                name="dataSinistro" 
                value={state.sinistro.dataSinistro}
                onChange={handleChange} 
              />
            ) : (
              <Span>{state.sinistro.dataSinistro || 'Não Informado'}</Span>
            )}
          </InfoBox>

          <InfoBox>
            <Label>Número do Sinistro</Label>
            {isEditing ? (
              <Input 
                type="text" 
                name="numero" 
                value={state.sinistro.numero} 
                onChange={handleChange} 
              />
            ) : (
              <Span>{state.sinistro.numero || 'Não Informado'}</Span>
            )}
          </InfoBox>

          <InfoBox>
            <Label>Data da Abertura</Label>
            {isEditing ? (
              <Input 
                type="date" 
                name="dataAbertura" 
                value={state.sinistro.dataAbertura} 
                onChange={handleChange} 
              />
            ) : (
              <Span>{state.sinistro.dataAbertura || 'Não Informado'}</Span>
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
        onChange={(e) => handleChange(e, "UPDATE_VEICULO")}
        values={state.veiculo}
      />

      <Delegacia
        inputs={[
          { name: "delegacia", label: "Delegacia", type: "text" },
          { name: "uf", label: "Uf", type: "text" },
          { name: "cidade", label: "Cidade", type: "text" },
          { name: "dataBo", label: "Data do BO", type: "date" },
          { name: "numeroBo", label: "Número do BO", type: "text" },
        ]}
        onChange={(e) => handleChange(e, "UPDATE_DELEGACIA")}
        values={state.delegacia}
      />

      <div>
        {isEditing ? (
          <>
            <Button onClick={() => handleSaveClick("sinistro")}>Salvar Sinistro</Button>
            <Button onClick={() => handleSaveClick("veiculo")}>Salvar Veículo</Button>
            <Button onClick={() => handleSaveClick("delegacia")}>Salvar Delegacia</Button>
            <Button color="secondary" onClick={handleCancelClick}>Cancelar</Button>
          </>
        ) : (
          <Button onClick={handleEditClick}>Editar</Button>
        )}
      </div>
    </DivContent>
  );
};

Sinistro.propTypes = {
  initialData: PropTypes.shape({
    dataSinistro: PropTypes.string,
    numeroSinistro: PropTypes.string,
    dataAbertura: PropTypes.string
  })
};

export default Sinistro;
