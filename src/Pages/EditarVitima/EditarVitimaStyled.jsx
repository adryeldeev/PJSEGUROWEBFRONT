import styled  from 'styled-components'

export const Form = styled.form`
display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 colunas */
  gap: 20px;
  margin-top: 20px;
`

export const ButtonSalvar = styled.button`
    margin-top: 10px;
      padding: 10px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      &:hover{
      background-color:#f0f0f0;
      color:#000
      }
`


export const DivInputs = styled.div`
  display: flex;
  flex-direction: column;
  
  label {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  select {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    cursor: pointer;
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
  }
    `