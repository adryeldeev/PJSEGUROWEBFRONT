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

