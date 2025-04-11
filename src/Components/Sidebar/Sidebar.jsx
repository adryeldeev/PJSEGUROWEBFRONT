import PropTypes from 'prop-types';
import { StyledNavLink, SidebarContainer, SidebarHeader, NavItem, SidebarOverlay } from "./SidebarStyled";
import {
  FaTachometerAlt, FaFolderOpen, FaProjectDiagram, FaUniversity, FaFlag,
  FaShieldAlt, FaFileAlt, FaCar, FaUserInjured, FaUserCircle
} from "react-icons/fa";

const Sidebar = ({ isOpen, isDesktop, onClose }) => {
  const menuItems = [
    { path: "/", label: "Dashboard", icon: <FaTachometerAlt /> },
    { path: '/processos', label: 'Processos', icon: <FaFolderOpen /> },
    { path: "/fase-do-processos", label: "Fases dos processos", icon: <FaProjectDiagram /> },
    { path: "/bancos", label: "Bancos", icon: <FaUniversity /> },
    { path: "/prioridades", label: "Prioridades", icon: <FaFlag /> },
    { path: "/seguradoras", label: "Seguradoras", icon: <FaShieldAlt /> },
    { path: "/documentos", label: "Tipos de documentos", icon: <FaFileAlt /> },
    { path: "/tipos-de-processo", label: "Tipos de Processos", icon: <FaProjectDiagram /> },
    { path: "/tipos-de-veiculo", label: "Tipos de veículo", icon: <FaCar /> },
    { path: "/vitimas", label: "Vítimas", icon: <FaUserInjured /> },
    { path: "/conta", label: "Conta", icon: <FaUserCircle /> }
  ];

  return (
    <>
      <SidebarContainer isOpen={isOpen} isDesktop={isDesktop}>
        <SidebarHeader>Menu</SidebarHeader>
        <nav>
          {menuItems.map((item) => (
            <StyledNavLink key={item.path} to={item.path} onClick={onClose}>
              <NavItem>
                {item.icon}
                <span>{item.label}</span>
              </NavItem>
            </StyledNavLink>
          ))}
        </nav>
      </SidebarContainer>
      
      {/* Overlay fora da sidebar, cobre o fundo e fecha ao clicar */}
      <SidebarOverlay isOpen={isOpen} isDesktop={isDesktop} onClick={onClose} />
    </>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isDesktop: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Sidebar;
