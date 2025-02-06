import { DivInputs, Input } from "./CamposInuptStyled";
import PropTypes from "prop-types";
const CampoInput = ({ label, id, type = "text",onBlur, value, onChange, placeholder }) => (
  <DivInputs>
    <label htmlFor={id}>{label}</label>
    <Input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
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
    onBlur: PropTypes.func,
};

export default CampoInput
