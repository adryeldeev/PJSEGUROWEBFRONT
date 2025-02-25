import { useState } from "react";

import PropTypes from "prop-types";
import { Button, Modal, Box, TextField, Typography } from "@mui/material";
import { useUI } from "../../Context/UiContext";
import {DivTipo,DivConteudo,Titulo, DivButton, UlList, Li, BtnToggle,DivSpans }  from './VeiculoStyled';


const Veiculo = ({ inputs, onChange, values  }) => {
 
  const { isOpen,openModal, closeModal } = useUI();
  const [dropDownVisible, setDropDownVisible] = useState(false);
 

  const toggleDropDown = () => {
    setDropDownVisible(!dropDownVisible);
  };



  return (
    <div>
      
      <DivTipo>
        <DivConteudo>
          <Titulo>Tipo de Veículo*</Titulo>
          <DivButton>
            <Button onClick={toggleDropDown}>Ações</Button>
            {dropDownVisible && (
              <UlList>
                <Li>
                  <BtnToggle onClick={openModal}>Criar Veículo</BtnToggle>
                </Li>
              </UlList>
            )}
          </DivButton>
        </DivConteudo>

        <DivSpans>
          <span>
            Caso não encontre, crie uma nova vítima no menu:{" "}
            <strong>Ações &gt; Criar veículo</strong>
          </span>
        </DivSpans>
      </DivTipo>

      {/* MODAL */}
      <Modal open={isOpen} onClose={closeModal}>
       
        <Box sx={{ width: 400, padding: 4, backgroundColor: "white", margin: "auto", marginTop: "10%" }}>
          <Typography variant="h6">Criar Veículo</Typography>

          {inputs.map((input, index) => (
            <TextField
            key={index}
            fullWidth
            label={input.label}
            type={input.type}
            margin="normal"
            name={input.name}
            value={values[input.name] || ""}
            onChange={onChange}
            />
          ))}

          <Button
            variant="contained"
            color="primary"
            onClick={closeModal}
            sx={{ marginTop: 2 }}
          >
            Salvar
          </Button>
        </Box>
     </Modal>
    </div>
  );
};

Veiculo.propTypes = {
  inputs: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,

}

export default Veiculo;
