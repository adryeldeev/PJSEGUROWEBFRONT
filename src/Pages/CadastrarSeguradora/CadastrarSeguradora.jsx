import InputField from '../../Components/Inputs/Inputs';
import ButtonPlus from '../../Components/ButtonPlus/ButtonPlus';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useRef } from 'react';
import useApi from '../../Api/Api';
import { useNavigate } from 'react-router-dom'; // Importa o hook para navegação
import { ContentCadastroSeguradora, DivInputs, Form, InfoCadastro } from './CadastrarSeguradoraStyled';
import Swal from 'sweetalert2'
const CadastrarSeguradora = () => {
  const api = useApi();
  const navigate = useNavigate(); 
  const nomeRef = useRef();


;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      nome: nomeRef.current?.value.trim(),
     
    };

    if (data.nome === ""  ) {
      alert('Preencha o nome da seguradora.');
      return;
    }

    try {
      const response = await api.post('/createSeguradora', data); 
      if (response.status === 200 || response.status === 201) { 
        Swal.fire({
          icon:'success',
          title:'Sucesso!',
          text:'Nova Seguradora cadadstrada com sucesso!'
        })
        navigate('/seguradoras'); 
      } else {
       
        Swal.fire({
          icon:'error',
          title:'Erro',
          text:'Erro ao cadastrar seguradora. Tente novamente mais tarde.'
        })
      }
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      alert('Erro ao cadastrar o nome da seguradora. Tente novamente.');
    }
  };

  return (
    <ContentCadastroSeguradora>
      <h4>Cadastrar seguradora</h4>
      <InfoCadastro>
        <Form>
          <DivInputs>
            <label htmlFor="nome">Nome *</label>
            <InputField
              id="nome"
              type="text"
              placeholder="Digite o nome da seguradora"
              ref={nomeRef} 
            />
          </DivInputs>
         
          
          
          <ButtonPlus
            text="Salvar"
            Icon={IoIosCheckmarkCircleOutline}
            onClick={handleSubmit} // Envia os dados ao clicar
          />
        </Form>
      </InfoCadastro>
    </ContentCadastroSeguradora>
  );
};

export default CadastrarSeguradora;
