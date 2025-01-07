import { ContentCadastro, InfoCadastro, Form, DivInputs } from './CadastroTDPStyled';
import InputField from '../../Components/Inputs/Inputs';
import ButtonPlus from '../../Components/ButtonPlus/ButtonPlus';
import Toggle from '../../Components/Toggle/Toggle';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useRef, useState } from 'react';
import useApi from '../../Api/Api';
import { useNavigate } from 'react-router-dom'; // Importa o hook para navegação

const CadastroTipoDeProcesso = () => {
  const api = useApi();
  const navigate = useNavigate(); // Inicializa o hook de navegação
  const nomeRef = useRef();
  const [isChecked, setIsChecked] = useState(false); 

  const handleToggle = () => {
    setIsChecked((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      nome: nomeRef.current?.value.trim(),
      activo: isChecked,
    };

    if (data.nome === "" ) {
      alert('Preencha o nome do tipo de processo.');
      return;
    }

      console.log(data)
    try {
      const response = await api.post('/createTipoProcesso', data); 
      if (response.status === 200 || response.status === 201) { 
        alert('Cadastro realizado com sucesso!');
        navigate('/tipos-de-processo'); 
      } else {
        alert('Erro ao cadastrar tipo de processo. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      alert('Erro ao cadastrar tipo de processo. Tente novamente.');
    }
  };

  return (
    <ContentCadastro>
      <InfoCadastro>
        <Form>
          <DivInputs>
            <label htmlFor="nome">Nome *</label>
            <InputField
              id="nome"
              type="text"
              placeholder="Digite o nome do tipo de processo"
              ref={nomeRef} // Referência para o input
            />
          </DivInputs>
          <DivInputs>
            <Toggle
              id="toggle-1"
              type="checkbox"
              checked={isChecked} // Passa o estado atual
              label="Ativo"
              onClick={handleToggle} // Alterna entre ativo e inativo
            />
          </DivInputs>
          <ButtonPlus
            text="Salvar"
            Icon={IoIosCheckmarkCircleOutline}
            onClick={handleSubmit} // Envia os dados ao clicar
          />
        </Form>
      </InfoCadastro>
    </ContentCadastro>
  );
};

export default CadastroTipoDeProcesso;
