import { DivInputs, Input } from "./CamposInuptStyled";
import PropTypes from "prop-types";
const CampoInput = ({ label, id, type = "text", value, onChange, placeholder }) => (
  <DivInputs>
    <label htmlFor={id}>{label}</label>
    <Input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </DivInputs>
);

CampoInput.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
};

export default CampoInput
