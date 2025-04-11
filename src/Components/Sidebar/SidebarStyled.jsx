import { NavLink } from "react-router-dom";
import styled from "styled-components";

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
export const SidebarOverlay = styled.div`
  display: ${({ isOpen, isDesktop }) => (isOpen && !isDesktop ? "block" : "none")};
  position: fixed;
  top: 70px; /* altura do seu header */
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999; /* abaixo do sidebar */
`;
export const SidebarHeader = styled.div`
  padding: 20px;
  font-size: 1.2rem;
  font-weight: bold;
`;

export const StyledNavLink = styled(NavLink)`
  display: block;
  padding: 10px 20px;
  color: #fff;
  text-decoration: none;

  &.active {
    background-color: #ffc107;
    color: #ffffff;
  }

  &:hover {
    background-color: #2c3e50;
  }
`;

export const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  span {
    font-size: 1rem;
  }

  svg {
    font-size: 1.2rem;
  }
`;