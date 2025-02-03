import React, { useState } from 'react'
import { ContentCadastrarVitima, DivForm, DivInputs, Form, Input, Titulo } from './CadastrarVítimaStyled'
import useApi from '../../Api/Api'
import Toggle from '../../Components/Toggle/Toggle'
import { useNavigate } from 'react-router-dom'

const CadastrarVitima = () => {
    const navigate = useNavigate()
    const api = useApi()
    const [dadosVitima, setDadosVitima] = useState({
    nome: '',
    cpf: '',
    rg: '',
    data_nascimento: null,
    renda_mensal:null,
    data_emissao:null,
    orgao_expedidor:'',
    sexo: '',
    endereco: '',
    numero: null,
    bairro: '',
    cidade: '',
    estado: '',
    profissao:null,
    cep:null,
    uf:null,
    telefone01:null,
    telefone02: null,
    email: '',
    })
    
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setDadosVitima((prevState) => ({
          ...prevState,
          [id]: value
        }));
      };

      const handleToggleChange = () => {
        setDadosVitima((prevState) => ({
          ...prevState,
          activo: !prevState.activo
        }));
      };
      const handleSexoChange = (e) => {
        setDadosVitima((prevState) => ({
          ...prevState,
          sexo: e.target.value
        }));
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        
        if (dadosVitima.nome === '' || dadosVitima.cpf === '') {
            alert('Preencha todos os campos obrigatórios.');
            return;
        }
    
        if (!isValidCpf(dadosVitima.cpf)) {
            alert('CPF inválido. Formato correto: 999.999.999-99.');
            return;
        }
    
        try {
            api.post('/createVitima', dadosVitima)
                .then(response => {
                    if (response.status === 200 || response.status === 201) {
                        alert('Vítima cadastrada com sucesso!');
                        navigate("/vitimas");
                        setDadosVitima({
                          nome: '',
                          cpf: '',
                          rg: '',
                          data_nascimento: '',
                          renda_mensal:'',
                          data_emissao:'',
                          orgao_expedidor:'',
                          sexo: '',
                          endereco: '',
                          numero: '',
                          bairro: '',
                          cidade: '',
                          estado: '',
                          pais: '',
                          telefone: '',
                          email: '',
                        });
                    } else {
                        alert('Erro ao cadastrar vítima.');
                    }
                })
                .catch(error => {
                    console.error('Erro ao cadastrar vítima:', error);
                    alert('Erro ao cadastrar vítima.');
                });
        } catch (error) {
            console.error('Erro ao conectar com o backend:', error);
            alert('Erro ao conectar com o backend.');
        }
    };
      const formatCpf = (cpf) => {
        return cpf.replace(/\D/g, '') // Remove tudo que não for número
                  .replace(/(\d{3})(\d)/, '$1.$2')
                  .replace(/(\d{3})(\d)/, '$1.$2')
                  .replace(/(\d{3})(\d{2})$/, '$1-$2');
      };
      
      const isValidCpf = (cpf) => {
        return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
      };
      
      const handleCpfChange = (e) => {
        const formattedCpf = formatCpf(e.target.value);
        setDadosVitima((prevState) => ({
          ...prevState,
          cpf: formattedCpf
        }));
      };
      
      const handleCancelar =() =>{
        navigate('/vitimas')
      }
  return (

   <ContentCadastrarVitima>
    <Titulo>Dados Pessoais</Titulo>
    <DivForm>
        <Form
        >
                        <DivInputs>
                          <label htmlFor="nome">Nome *</label>
                          <Input
                          id="nome"
                          type="text"
                          value={dadosVitima.nome}
                          onChange={handleInputChange}
        />
                        </DivInputs>
                        <DivInputs>
                          <label htmlFor="cpf">Cpf *</label>
                          <Input
                            id="cpf"
                            type="text"
                            placeholder="999.999.999-99"
                            value={dadosVitima.cpf}
                            onChange={handleCpfChange}
                          />
                        </DivInputs>
                        <DivInputs>
                          <label htmlFor="rg">Rg*</label>
                          <Input
                            id="rg"
                            type="text"
                            value={dadosVitima.rg}
                            onChange={handleInputChange}
                          />
                        </DivInputs>
                        <DivInputs>
                          <label htmlFor="dataNascimento">Data de nascimento *</label>
                          <Input
                            id="dataNascimento"
                            type="text"
                            value={dadosVitima.data_nascimento}
                            onChange={handleInputChange}
                          />
                        </DivInputs>
                        <DivInputs>
                          <label htmlFor="dataEmissao">Data de emissão </label>
                          <Input
                            id="dataEmissao"
                            type="text"
                            value={dadosVitima.data_emissao}
                            onChange={handleInputChange}
                            
                          />
                        </DivInputs>
                        <DivInputs>
                          <label htmlFor="orgaoExpedidor">Orgão expedidor </label>
                          <Input
                            id="orgaoExpedidor"
                            type="text"
                            value={dadosVitima.orgao_expedidor}
                            onChange={handleInputChange}
                          />
                        </DivInputs>
                        <DivInputs>
                          <label htmlFor="profissao">Profissão *</label>
                          <Input
                            id="profissao"
                            type="text"
                            value={dadosVitima.profissao}
                            onChange={handleInputChange}
                          />
                        </DivInputs>
                        <DivInputs>
                          <label htmlFor="rendaMensal">Renda mensal</label>
                          <Input
                            id="rendaMensal"
                            type="text"
                            value={dadosVitima.renda_mensal}
                            onChange={handleInputChange}
                          />
                        </DivInputs>
                        <DivInputs>
                          <label htmlFor="cep">Cep</label>
                          <Input
                            id="cep"
                            type="text"
                            value={dadosVitima.cep}
                            onChange={handleInputChange}
                          />
                        </DivInputs>
                        <DivInputs>
                          <label htmlFor="uf">Uf</label>
                          <Input
                            id="uf"
                            type="text"
                            value={dadosVitima.uf}
                            onChange={handleInputChange}
                          />
                        </DivInputs>
                        <DivInputs>
                          <label htmlFor="endereco">Endereço</label>
                          <Input
                            id="endereco"
                            type="text"
                            placeholder="Digite o endereço"
                            value={dadosVitima.endereco}
                            onChange={handleInputChange}
                          />
                        </DivInputs>
                        <DivInputs>
                          <label htmlFor="numero">Numero</label>
                          <Input
                            id="numero"
                            type="text"
                            value={dadosVitima.numero}
                            onChange={handleInputChange}
                          />
                        </DivInputs>
                        <DivInputs>
                          <label htmlFor="sexo">Sexo</label>
                          <select name="sexo" id="sexo"
                           value={dadosVitima.sexo}
                           onChange={ handleSexoChange}
                           >
                            <option value="">Selecione</option>
                            <option value="MASCULINO">Masculino</option>
                            <option value="FEMININO">Feminino</option>
                          </select>
                        </DivInputs>
                        <DivInputs>
                          <label htmlFor="complemento">Complemento</label>
                          <Input
                            id="complemento"
                            type="text"
                            value={dadosVitima.complemento}
                           onChange={handleInputChange}
                          />
                        </DivInputs>
                        <DivInputs>
                          <label htmlFor="bairro">Bairro</label>
                          <Input
                            id="bairro"
                            type="text"
                            value={dadosVitima.bairro}
                           onChange={handleInputChange}
                          />
                        </DivInputs>
                        <DivInputs>
                          <label htmlFor="cidade">Cidade</label>
                          <Input
                            id="cidade"
                            type="text"
                            value={dadosVitima.cidade}
                           onChange={handleInputChange}
                          />
                        </DivInputs>
                        <DivInputs>
                          <label htmlFor="email">E-mail</label>
                          <Input
                            id="email"
                            type="email"
                            value={dadosVitima.email}
                           onChange={handleInputChange}
                          />
                        </DivInputs>
                        <DivInputs>
                          <label htmlFor="telefone01">Telefone 01</label>
                          <Input
                            id="telefone01"
                            type="number"
                            value={dadosVitima.telefone01}
                           onChange={handleInputChange}
                          />
                        </DivInputs>
                        <DivInputs>
                          <label htmlFor="telefone02">Telefone 02</label>
                          <Input
                            id="telefone02"
                            type="number"
                            value={dadosVitima.telefone02}
                           onChange={handleInputChange}
                          />
                        </DivInputs>
                        <DivInputs>
                         <Toggle
                          id="toggle-1"
                          checked={dadosVitima.activo}
                          label="Ativo"
                          onClick={handleToggleChange}
                         />
                        </DivInputs>
        
                        <button type="submit"
                         disabled={dadosVitima.loading}
                         onClick={handleSubmit}
                        
                        >Salvar</button>
                        <button type="button" onClick={handleCancelar}>
                          Cancelar
                        </button>
                      </Form>
    </DivForm>
   </ContentCadastrarVitima>
  )
}

export default CadastrarVitima
