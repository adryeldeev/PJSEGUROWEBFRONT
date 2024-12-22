import PropTypes from 'prop-types';
import { InputFieldStyle } from './InputStyled';

const InputField = ({ type, value, onChange, placeholder, id, label }) => {
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <InputFieldStyle
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

// Adicionando validações de props
InputField.propTypes = {
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
};

// Valores padrões para props opcionais
InputField.defaultProps = {
  type: 'text',
  placeholder: '',
  label: null,
};

export default InputField;
