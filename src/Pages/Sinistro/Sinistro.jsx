import React, { useState, useReducer } from 'react';
import PropTypes from 'prop-types'
import { DivContent, InfoBox, InfoContainer, Input, Label, Title, Span } from './SinistroStyled';

// Definição do reducer
const sinistroReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return action.payload; // Reseta os dados para os originais
    default:
      return state;
  }
};

const Sinistro = ({ initialData }) => {
  const [isEditing, setIsEditing] = useState(false);

  // Estado inicial vindo de `initialData` ou valores vazios
  const [sinistroData, dispatch] = useReducer(sinistroReducer, initialData || {
    dataSinistro: '',
    numeroSinistro: '',
    dataAbertura: ''
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'UPDATE_FIELD', field: name, value });
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Aqui você pode chamar uma API para salvar os dados
  };

  const handleCancelClick = () => {
    dispatch({ type: 'RESET', payload: initialData }); // Restaura os valores originais
    setIsEditing(false);
  };

  return (
    <DivContent>
      <Title>Sinistro</Title>

      <InfoContainer>
        <InfoBox>
          <Label>Data do Sinistro</Label>
          {isEditing ? (
            <Input 
              type="date" 
              name="dataSinistro" 
              value={sinistroData.dataSinistro} 
              onChange={handleChange} 
            />
          ) : (
            <Span>{sinistroData.dataSinistro || 'Não Informado'}</Span>
          )}
        </InfoBox>

        <InfoBox>
          <Label>Número do Sinistro</Label>
          {isEditing ? (
            <Input 
              type="text" 
              name="numeroSinistro" 
              value={sinistroData.numeroSinistro} 
              onChange={handleChange} 
            />
          ) : (
            <Span>{sinistroData.numeroSinistro || 'Não Informado'}</Span>
          )}
        </InfoBox>

        <InfoBox>
          <Label>Data da Abertura</Label>
          {isEditing ? (
            <Input 
              type="date" 
              name="dataAbertura" 
              value={sinistroData.dataAbertura} 
              onChange={handleChange} 
            />
          ) : (
            <Span>{sinistroData.dataAbertura || 'Não Informado'}</Span>
          )}
        </InfoBox>
      </InfoContainer>

      <div>
        {isEditing ? (
          <>
            <button onClick={handleSaveClick}>Salvar</button>
            <button onClick={handleCancelClick}>Cancelar</button>
          </>
        ) : (
          <button onClick={handleEditClick}>Editar</button>
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
}


export default Sinistro;
