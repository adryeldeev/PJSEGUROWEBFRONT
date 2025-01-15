import styled from 'styled-components';

export const ContentCadastroSeguradora = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

export const InfoCadastro = styled.div`
  margin-top: 20px;
`;
export const DivInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  label {
    font-size: 16px;
    font-weight: bold;
  }

` 

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  label {
    font-size: 16px;
    font-weight: bold;
  }

  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;




