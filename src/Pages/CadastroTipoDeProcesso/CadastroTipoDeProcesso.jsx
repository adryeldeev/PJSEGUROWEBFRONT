import { ContentCadastro, InfoCadastro, Form, DivInputs } from './CadastroTDPStyled';
import InputField from '../../Components/Inputs/Inputs';
import ButtonPlus from '../../Components/ButtonPlus/ButtonPlus';
import Toggle from '../../Components/Toggle/Toggle';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useRef, useState } from 'react';

const CadastroTipoDeProcesso = () => {
  const nameRef = useRef(); // Referência para o nome
  const [isChecked, setIsChecked] = useState(false); // Estado para o toggle

  // Função para alternar o valor de checked
  const handleToggle = () => {
    setIsChecked((prev) => !prev);
  };

  // Função para enviar os dados para a API
  const handleSubmit = () => {
    const data = {
      name: nameRef.current.value, // Obtém o valor do campo de texto
      active: isChecked, // Envia true se ativo, false se inativo
    };

    console.log('Dados enviados para a API:', data);

    // Aqui você pode usar fetch ou axios para enviar os dados:
    // fetch('/api/endpoint', { method: 'POST', body: JSON.stringify(data) });
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
              ref={nameRef} // Referência para o input
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
