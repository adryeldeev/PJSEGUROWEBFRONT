import { NavLink } from "react-router-dom";
import styled from "styled-components";

// Estilizando o NavLink com styled-components
export const StyledNavLink = styled(NavLink)`
  display: block;
  padding: 10px 20px;
  color: #fff;
  text-decoration: none;

  &.active {
    background-color: #34495e; /* Cor do fundo quando ativo */
  }

  &:hover {
    background-color: #2c3e50; /* Cor de fundo ao passar o mouse */
  }
`;