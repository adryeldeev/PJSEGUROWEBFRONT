import PropTypes from 'prop-types';
import { InputFieldStyle } from './InputStyled';
import  { forwardRef } from 'react';

const InputField = forwardRef(({ type, value, onChange, placeholder, id, label }, ref) => {
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <InputFieldStyle
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        ref={ref} // Encaminha o ref para o elemento DOM
      />
    </div>
  );
});

// Adicionando um nome de exibição para depuração
InputField.displayName = 'InputField';

// Adicionando validações de props
InputField.propTypes = {
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
};

InputField.defaultProps = {
  type: 'text',
  value: undefined,
  onChange: null,
  placeholder: '',
  label: null,
};

export default InputField;
