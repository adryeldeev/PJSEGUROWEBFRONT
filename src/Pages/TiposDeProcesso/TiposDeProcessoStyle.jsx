import styled from "styled-components";



export const ContentTipos = styled.div`
  max-width:100%;
  height:100%;
`
export const DivInfo = styled.div`
position: relative;
  display:flex;
  align-items:center;
  justify-content:space-between;
  max-width:100%;

    svg {
    position: absolute;
    left: 265px;
    top: 70%;
    transform: translateY(-50%);
    color: #000;
    pointer-events: none; /* Garante que o clique não atinge o ícone */
  }
`

export const TituloText = styled.h2`

font-size:10px;

`
export const ImgLogo = styled.img`


`
