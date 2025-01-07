import PropTypes from 'prop-types';
import { LabelSwitch, ToggleSwitch } from './ToggleStyled';
import { Switch } from '@mui/material';

const Toggle = ({  onChange, id, label, checked, onClick, ref }) => {
  return (
    <div>
      <LabelSwitch htmlFor={id}>{label}</LabelSwitch>
      <ToggleSwitch>
      <Switch {...label} onChange={onChange} onClick={onClick} checked={checked} ref={ref}/>
      </ToggleSwitch>
    </div>
  );
};

Toggle.propTypes = {

  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  ref: PropTypes.any // eslint-disable-line
 };
  

export default Toggle;
