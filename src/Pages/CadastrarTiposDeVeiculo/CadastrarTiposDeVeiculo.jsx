import InputField from '../../Components/Inputs/Inputs';
import ButtonPlus from '../../Components/ButtonPlus/ButtonPlus';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useRef } from 'react';
import useApi from '../../Api/Api';
import { useNavigate } from 'react-router-dom'; // Importa o hook para navegação
import { ContentCadastro, DivInputs, Form, InfoCadastro } from './CadastrarTiposDeVeiculosStyled';

const CadastrarTiposDeVeiculo = () => {
  const api = useApi();
  const navigate = useNavigate(); // Inicializa o hook de navegação
  const nomeRef = useRef();
  const placaRef = useRef();
  const marcaRef = useRef();
  const modeloRef = useRef();

;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      nome: nomeRef.current?.value.trim(),
      placa: placaRef.current?.value.trim(),
      modelo: modeloRef.current?.value.trim(),
      marca: marcaRef.current?.value.trim(),
    };

    if (data.nome === "" || !data.marca || !data.placa || !data.modelo  ) {
      alert('Preencha o nome do tipo de processo.');
      return;
    }

    try {
      const response = await api.post('/createTiposDeVeiculo', data); 
      if (response.status === 200 || response.status === 201) { 
        alert('Cadastro realizado com sucesso!');
        navigate('/tipos-de-veiculo'); 
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
              placeholder="Digite o nome do veículo"
              ref={nomeRef} 
            />
          </DivInputs>
          <DivInputs>
            <label htmlFor="nome">Placa *</label>
            <InputField
              id="nome"
              type="text"
              placeholder="Digite a placa do veículo"
              ref={placaRef} 
            />
          </DivInputs>
          <DivInputs>
            <label htmlFor="nome">Modelo *</label>
            <InputField
              id="nome"
              type="text"
              placeholder="Digite o modelo do veículo"
              ref={modeloRef} 
            />
          </DivInputs>
          <DivInputs>
            <label htmlFor="nome">Marca *</label>
            <InputField
              id="marca"
              type="text"
              placeholder="Digite a marca do veículo"
              ref={marcaRef} 
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

export default CadastrarTiposDeVeiculo;
