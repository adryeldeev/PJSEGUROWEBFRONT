import PropTypes from 'prop-types';
import { LabelSwitch, ToggleSwitch } from './ToggleStyled';
import { Switch } from '@mui/material';
import  { forwardRef } from 'react';
const Toggle = forwardRef(({ onChange, id, label, checked, onClick }, ref) => {
  return (
    <div>
      <LabelSwitch htmlFor={id}>{label}</LabelSwitch>
      <ToggleSwitch>
        <Switch
          id={id}
          onChange={onChange}
          onClick={onClick}
          checked={checked}
          inputRef={ref} // Uso correto do ref
        />
      </ToggleSwitch>
    </div>
  );
});

Toggle.displayName = 'Toggle';
// Validação das props
Toggle.propTypes = {
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  ref: PropTypes.any, // eslint-disable-line
};

// Valor padrão para `onClick` (não obrigatório)
Toggle.defaultProps = {
  onClick: null,
};

export default Toggle;
