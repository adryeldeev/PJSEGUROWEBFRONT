import PropTypes from 'prop-types'
import { DivButtons } from './ButtonPlusStyled'


const ButtonPlus = ({onClick, backgroundColor, text, Icon}) => {
  return (
   <DivButtons>
    <button onClick={onClick} style={{backgroundColor}} > {Icon && <Icon/>} {text}</button>
   </DivButtons>
  )
}

ButtonPlus.propTypes = {
  onClick: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  Icon: PropTypes.elementType
}

export default ButtonPlus