
import PropTypes from "prop-types";
import { InfoContainer, InfoBox, Label, Input, DivDelegaciaInput, Titulo,DivContentDelegacia } from "./DelegaciaStyled";

const Delegacia = ({ inputs, onChange, values }) => {

  return (
    <DivContentDelegacia>
      <Titulo>Delegacia</Titulo>

      <InfoContainer>
        <DivDelegaciaInput>
          {inputs.map((input, index) => (
            <InfoBox key={index}>
              <Label>{input.label}</Label>
              <Input
               key={index}
               fullWidth
               type={input.type}
               margin="normal"
               name={input.name}
               value={values[input.name] || ""}
                onChange={onChange}
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
  onChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default Delegacia;
