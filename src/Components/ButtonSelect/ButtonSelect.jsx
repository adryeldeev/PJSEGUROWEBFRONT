import { DivSelect, LabelSelect, Option, Select,ContentSelect } from './ButtoSelectStyled';
import PropTypes from 'prop-types'
const ButtonSelect = ({ options = [], label, onChange, value }) => {
  return (
    <DivSelect>
      <ContentSelect>
      {label && <LabelSelect>{label}</LabelSelect>}

      <Select onChange={onChange} value={value}> 
          <Option value="">Selecione</Option>
          {options.map((option, index) => (
          <Option key={index} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
        </ContentSelect>
    </DivSelect>
  );
};

ButtonSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,  
  label: PropTypes.string,
}
export default ButtonSelect;
