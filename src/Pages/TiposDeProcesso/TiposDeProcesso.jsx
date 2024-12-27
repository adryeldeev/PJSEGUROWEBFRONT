import Button from '../../Components/Button/Button'
import { AiOutlinePlusCircle } from "react-icons/ai";
import { ContentTipos, DivInfo, TituloText } from './TiposDeProcessoStyle'

const TiposDeProcesso = () => {
  return (
    <ContentTipos>
      <DivInfo>
        <TituloText>Lista de Tipos de Processo</TituloText>
        <Button text='Novo' style={{backgroundColor:'blue', color:'#fff'}}/>
        <AiOutlinePlusCircle />
      </DivInfo>
    </ContentTipos>
 
  )
}

export default TiposDeProcesso