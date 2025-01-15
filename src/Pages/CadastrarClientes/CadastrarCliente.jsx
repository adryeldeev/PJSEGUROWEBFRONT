import InputField from '../../Components/Inputs/Inputs';
import ButtonPlus from '../../Components/ButtonPlus/ButtonPlus';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useRef } from 'react';
import useApi from '../../Api/Api';
import { useNavigate } from 'react-router-dom'; // Importa o hook para navegação
import { ContentCadastroCliente, DivInputs, Form, InfoCadastro } from './CadastrarClienteStyled';

const CadastrarCliente = () => {
  const api = useApi();
  const navigate = useNavigate(); 
  const nomeRef = useRef();
  const cpfRef = useRef();
  const rgRef = useRef();

;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      nome: nomeRef.current?.value.trim(),
      cpf: cpfRef.current?.value.trim(),
      rg: rgRef.current?.value.trim(),
    };

    if (data.nome === "" || !data.cpf || !data.rg  ) {
      alert('Preencha o nome do tipo de processo.');
      return;
    }

    try {
      const response = await api.post('/createCliente', data); 
      if (response.status === 200 || response.status === 201) { 
        alert('Cadastro realizado com sucesso!');
        navigate('/clientes'); 
      } else {
        alert('Erro ao cadastrar tipo de processo. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      alert('Erro ao cadastrar tipo de processo. Tente novamente.');
    }
  };

  return (
    <ContentCadastroCliente>
      <InfoCadastro>
        <Form>
          <DivInputs>
            <label htmlFor="nome">Nome *</label>
            <InputField
              id="nome"
              type="text"
              placeholder="Digite o nome do cliente"
              ref={nomeRef} 
            />
          </DivInputs>
          <DivInputs>
            <label htmlFor="cpf">CPF *</label>
            <InputField
              id="cpf"
              type="text"
              placeholder="Digite o CPF do cliente"
              ref={cpfRef} 
            />
          </DivInputs>
          <DivInputs>
            <label htmlFor="rg">RG *</label>
            <InputField
              id="rg"
              type="text"
              placeholder="Digite o RG do cliente"
              ref={rgRef} 
            />
          </DivInputs>
          
          
          <ButtonPlus
            text="Salvar"
            Icon={IoIosCheckmarkCircleOutline}
            onClick={handleSubmit} // Envia os dados ao clicar
          />
        </Form>
      </InfoCadastro>
    </ContentCadastroCliente>
  );
};

export default CadastrarCliente;
