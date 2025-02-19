import { Link } from "react-router-dom";
import styled from "styled-components";

// Estilizando o NavLink com styled-components
export const SidebarContainer = styled.aside`
  position: ${({ isDesktop }) => (isDesktop ? "static" : "fixed")};
  top: ${({ isDesktop }) => (isDesktop ? "0" : "70px")};
  left: ${({ isOpen }) => (isOpen ? "0" : "-250px")};
  width: 250px;
  height: 100%;
  background: #000;
  color: #fff;
  transition: left 0.3s ease;
  z-index: 1000;
`;

export const SidebarHeader = styled.div`
  padding: 20px;
  font-size: 1.2rem;
  font-weight: bold;
`;

export const StyledNavLink = styled(Link)`
  display: block;
  padding: 10px 20px;
  color: #fff;
  text-decoration: none;

  &.active {
    background-color: #ffc107;
    color:#ffffff;
  }

  &:hover {
    background-color: #2c3e50;
  }
`;