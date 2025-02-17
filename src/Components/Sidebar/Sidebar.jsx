import PropTypes from 'prop-types';
import { StyledNavLink, SidebarContainer, SidebarHeader } from "./SidebarStyled";

const Sidebar = ({ isOpen, isDesktop }) => {
  const menuItems = [
    { path: "/", label: "Início" },
    { path: '/criarProcesso', label: 'Processo' },
    { path: "/processos", label: "Fases dos processos" },
    { path: "/bancos", label: "Bancos" },
    { path: "/prioridades", label: "Prioridades" },
    { path: "/seguradoras", label: "Seguradoras" },
    { path: "/documentos", label: "Tipos de documentos" },
    { path: "/tipos-de-processo", label: "Tipos de Processos" },
    { path: "/tipos-de-veiculo", label: "Tipos de veículo" },
    { path: "/vitimas", label: "Vítimas" },
    { path: "/conta", label: "Conta" }
  ];

  return (
    <SidebarContainer isOpen={isOpen} isDesktop={isDesktop}>
      <SidebarHeader>Menu</SidebarHeader>
      <nav>
        {menuItems.map((item) => (
          <StyledNavLink key={item.path} to={item.path}>
            {item.label}
          </StyledNavLink>
        ))}
      </nav>
    </SidebarContainer>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isDesktop: PropTypes.bool.isRequired,
};
export default Sidebar;