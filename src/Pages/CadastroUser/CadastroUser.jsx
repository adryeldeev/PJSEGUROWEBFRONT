import { ContentCadastro, FormCadastro, ImgLogo, InfoCadastro, TituloCadastro } from './CadastroUserStyled'
import Logo from '../..Img/Logo.webp';
import InputField from '../../Components/Inputs/Inputs';
const CadastroUser = () => {
  return (
    <>
    <ContentCadastro>
    <InfoCadastro>
        <ImgLogo 
        src={Logo}
        />
    <TituloCadastro>
        Cadastra-se
    </TituloCadastro>
    <FormCadastro>
        {/* Campos do formulário */}
        {/*... */}
        <InputField
        />
    </FormCadastro>
    
        
    </InfoCadastro>

        
  
    </ContentCadastro>

    </>
  )
}

export default CadastroUser