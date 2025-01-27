import { useState } from "react";
import PropTypes from "prop-types";
import {DivVitma,DivConteudo,Titulo,DivButton,Button,UlList, Li,BtnToggle,DivSpans } from './DynamicVitimaStyled'

const DynamicVitma = ({ onNavigate, onClick }) => {
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const toggleDropDown = () => {
    setDropDownVisible(!dropDownVisible);
  };

  return (
    <DivVitma>
      <DivConteudo>
        <Titulo>Vítima*</Titulo>
        <DivButton>
          <Button onClick={toggleDropDown}>Ações</Button>
          {dropDownVisible && (
            <UlList>
              <Li>
                <BtnToggle onClick={onNavigate}>Encontrar Vítima</BtnToggle>
              </Li>
              <Li>
                <BtnToggle onClick={onClick}>Criar Vítima</BtnToggle>
              </Li>
            </UlList>
          )}
        </DivButton>
      </DivConteudo>

      <DivSpans>
        <span>
          Selecione uma vítima no menu: <strong>Ações > Encontrar Vítima</strong>
        </span>
        <span>
          Caso não encontre, crie uma nova vítima no menu:{" "}
          <strong>Ações > Criar Vítima</strong>
        </span>
      </DivSpans>
    </DivVitma>
  );
};

DynamicVitma.propTypes = {
  onNavigate: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DynamicVitma;
