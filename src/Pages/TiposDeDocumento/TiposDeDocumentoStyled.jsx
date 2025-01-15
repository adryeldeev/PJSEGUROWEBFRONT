import styled from "styled-components";



export const ContentTiposDeDocumento = styled.div`
  max-width:100%;
  height:100%;
`
export const DivInfo = styled.div`
position: relative;
  display:flex;
  align-items:center;
  justify-content:space-between;
  max-width:100%;
 

   
`
export const TituloText = styled.h2`
font-size:15px;

`
export const ModalBackDro = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
   
`;

export const ModalCadastroContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  max-width: 100%;
`;

export const ModalCadastroContent = styled.div`
  display: flex;
  flex-direction: column;

  form {
    display: flex;
    flex-direction: column;

    div {
      margin-bottom: 10px;

      label {
        display: block;
        margin-bottom: 5px;
      }

      input {
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
      }
    }

    button {
      margin-top: 10px;
      padding: 10px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:nth-child(2) {
        background: #6c757d;
      }
    }
  }
`
