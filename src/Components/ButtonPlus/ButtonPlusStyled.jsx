import styled from "styled-components";

export const DivButtons = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 100%;

  button {

    border: none;
    color: #fff;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;

    &:hover {
      background-color: #ddd;
    }
  }
     svg {
     margin:0 5px;
    color: #fff;
    pointer-events: none; /* Garante que o clique não atinge o ícone */
  }

`