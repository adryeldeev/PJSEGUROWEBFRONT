import React, { useState, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DivContent, InfoBox, InfoContainer, Input, Label, Title, Span, DivSinistroInput, InfoSpnas } from './SinistroStyled';
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
  tipoDeVeiculo: { 
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

  const handleSave = async (tipo, dadosParaAtualizar) => {
    const { numero, dataSinistro, dataAbertura } = state.sinistro; // Aqui você pega os campos do estado

    // Verifica se algum dos campos obrigatórios está vazio
    if (!numero || !dataSinistro || !dataAbertura) {
      // Se algum campo obrigatório estiver vazio, mostra o alerta
      Swal.fire({
        icon: 'warning',
        title: 'Campos obrigatórios!',
        text: 'Por favor, preencha todos os campos do sinistro!',
      });
      return; // Impede o salvamento se os campos não estiverem preenchidos
    }

    try {
      // Adiciona o processoId aos dados para atualização
      const dadosComProcessoId = { ...dadosParaAtualizar, processoId: state.sinistro.processoId };
  
      let response;
      if (dadosParaAtualizar.id) { // Atualizar
        response = await api.put(`/sinistro/${dadosParaAtualizar.id}`, dadosComProcessoId);
      } else { // Criar
        response = await api.post(`/sinistro`, dadosComProcessoId);
      }
  
      Swal.fire({
        icon: "success",
        title: tipo === "sinistro" ? "Sinistro" : tipo === "veiculo" ? "Veículo" : "Delegacia",
        text: `${tipo.charAt(0).toUpperCase() + tipo.slice(1)} foi ${dadosParaAtualizar.id ? 'atualizado' : 'cadastrado'} com sucesso!`,
      });
  
      // Atualizar o estado após a criação ou atualização
      if (tipo === "sinistro") {
        dispatch({ type: "UPDATE_SINISTRO", field: "sinistro", value: response.data });
      } else if (tipo === "veiculo") {
        dispatch({ type: "UPDATE_VEICULO", field: "tipoDeVeiculo", value: response.data });
      } else if (tipo === "delegacia") {
        dispatch({ type: "UPDATE_DELEGACIA", field: "delegacia", value: response.data });
      }
    } catch (error) {
      console.error("Erro ao salvar", tipo, error);
      Swal.fire({
        icon: "error",
        title: `Erro ao salvar ${tipo}`,
        text: `Houve um problema ao ${dadosParaAtualizar.id ? 'atualizar' : 'cadastrar'} os dados do ${tipo}.`,
      });
    }
  };

  const handleSaveClick = async (tipo) => {
    if (tipo === "sinistro") {
      const dadosParaAtualizar = { sinistro: state.sinistro };
      await handleSave(tipo, dadosParaAtualizar);
    } else if (tipo === "veiculo") {
      const dadosParaAtualizar = { tipoDeVeiculo: state.tipoDeVeiculo };
      await handleSave(tipo, dadosParaAtualizar);
    } else if (tipo === "delegacia") {
      const dadosParaAtualizar = { delegacia: state.delegacia };
      await handleSave(tipo, dadosParaAtualizar);
    }
  };
  
  useEffect(() => {
    const fetchSinistro = async () => {
      try {
        const response = await api.get(`/sinistro/${processoId}`); // Ajuste a rota conforme necessário
        if (response.data) {
          dispatch({ type: "UPDATE_SINISTRO", field: "dataSinistro", value: response.data.dataSinistro || "" });
          dispatch({ type: "UPDATE_SINISTRO", field: "numero", value: response.data.numero || "" });
          dispatch({ type: "UPDATE_SINISTRO", field: "dataAbertura", value: response.data.dataAbertura || "" });
    
          // Atualiza os dados do tipoDeVeiculo
          if (response.data.tipoDeVeiculo) {
            dispatch({ type: "UPDATE_VEICULO", field: "marca", value: response.data.tipoDeVeiculo.marca || "" });
            dispatch({ type: "UPDATE_VEICULO", field: "modelo", value: response.data.tipoDeVeiculo.modelo || "" });
            dispatch({ type: "UPDATE_VEICULO", field: "placa", value: response.data.tipoDeVeiculo.placa || "" });
            dispatch({ type: "UPDATE_VEICULO", field: "ano", value: response.data.tipoDeVeiculo.ano || "" });
          }
    
          // Atualiza os dados da delegacia
          if (response.data.delegacia) {
            dispatch({ type: "UPDATE_DELEGACIA", field: "delegacia", value: response.data.delegacia.delegacia || "" });
            dispatch({ type: "UPDATE_DELEGACIA", field: "uf", value: response.data.delegacia.uf || "" });
            dispatch({ type: "UPDATE_DELEGACIA", field: "cidade", value: response.data.delegacia.cidade || "" });
            dispatch({ type: "UPDATE_DELEGACIA", field: "dataBo", value: response.data.delegacia.dataBo || "" });
            dispatch({ type: "UPDATE_DELEGACIA", field: "numeroBo", value: response.data.delegacia.numeroBo || "" });
          }
        }
      } catch (error) {
        console.error("Erro ao buscar sinistro:", error);
      }
    };
  
    if (processoId) {
      fetchSinistro();
    }
  }, [processoId]);

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
                onChange={(e) => handleChange(e, "UPDATE_SINISTRO")} 
              />
            ) : (
              <Span>{state.sinistro.dataSinistro}</Span>
            )}
          </InfoBox>

          <InfoBox>
            <Label>Número</Label>
            {isEditing ? (
              <Input 
                type="text" 
                name="numero" 
                value={state.sinistro.numero} 
                onChange={(e) => handleChange(e, "UPDATE_SINISTRO")} 
              />
            ) : (
              <Span>{state.sinistro.numero}</Span>
            )}
          </InfoBox>

          <InfoBox>
            <Label>Data de Abertura</Label>
            {isEditing ? (
              <Input 
                type="date" 
                name="dataAbertura" 
                value={state.sinistro.dataAbertura} 
                onChange={(e) => handleChange(e, "UPDATE_SINISTRO")} 
              />
            ) : (
              <Span>{state.sinistro.dataAbertura}</Span>
            )}
          </InfoBox>
        </DivSinistroInput>
      </InfoContainer>

      {/* Seção Veículo */}
      <Veiculo
        veiculo={state.tipoDeVeiculo}
        isEditing={isEditing}
        onChange={handleChange}
      />

      {/* Seção Delegacia */}
      <Delegacia
        delegacia={state.delegacia}
        isEditing={isEditing}
        onChange={handleChange}
      />

      {isEditing ? (
        <Button onClick={() => handleSaveClick("sinistro")}>Salvar</Button>
      ) : (
        <Button onClick={handleEditClick}>Editar</Button>
      )}
      {isEditing && (
        <Button onClick={handleCancelClick}>Cancelar</Button>
      )}
    </DivContent>
  );
};

Sinistro.propTypes = {
  tipoDeVeiculo: PropTypes.object.isRequired,
};

export default Sinistro;
