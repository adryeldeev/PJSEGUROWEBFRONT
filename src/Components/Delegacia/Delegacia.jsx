import { useState } from "react";
import PropTypes from "prop-types";
import { InfoContainer, InfoBox, Label, Input, DivDelegaciaInput, Titulo,DivContentDelegacia } from "./DelegaciaStyled";

const Delegacia = ({ inputs }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  return (
    <DivContentDelegacia>
      <Titulo>Delegacia</Titulo>

      <InfoContainer>
        <DivDelegaciaInput>
          {inputs.map((input, index) => (
            <InfoBox key={index}>
              <Label>{input.label}</Label>
              <Input
                type={input.type}
                value={formData[input.name] || ""}
                onChange={(e) => handleChange(e, input.name)}
              />
            </InfoBox>
          ))}
        </DivDelegaciaInput>
      </InfoContainer>
    </DivContentDelegacia>
  );
};

Delegacia.propTypes = {
  inputs: PropTypes.array.isRequired,
};

export default Delegacia;
