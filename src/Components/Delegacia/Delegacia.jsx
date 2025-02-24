import { useState } from "react";
import PropTypes from "prop-types";
// Certifique-se de importar os componentes necessários
import { InfoContainer, InfoBox, Label, Input, DivDelegaciaInput, Titulo } from "./DelegaciaStyled"; // Exemplo de importação

const Delegacia = ({ inputs }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  return (
    <div>
        <Titulo>Delegacia</Titulo>

      <InfoContainer>
        <DivDelegaciaInput>

        <InfoBox>
          {inputs.map((input, index) => (
            <div key={index}>
              <Label>{input.label}</Label>
              <Input
                fullWidth
                type={input.type}
                margin="normal"
                InputLabelProps={{ shrink: true }}
                value={formData[input.name] || ""}
                onChange={(e) => handleChange(e, input.name)}
              />
            </div>
          ))}
        </InfoBox>
        </DivDelegaciaInput>
      </InfoContainer>
    </div>
  );
};

Delegacia.propTypes = {
  inputs:PropTypes.func.isRequired,

}
export default Delegacia;
