import PropTypes from 'prop-types'
import { StyledNavLink } from "./SidebarStyled";


const Sidebar = ({ isOpen, isDesktop }) => {
  const menuItems = [
    { path: "/", label: "Início" },
    {path:'/criarProcesso', label: 'Processo'},
    { path: "/processos", label: "Fase dos processos"},
    { path: "/tipos-de-processo", label: "Tipos de Processos" },
    { path: "/prioridades", label: "Prioridades" },
    { path:"/tipos-de-veiculo", label:"Tipos de veículo"},
    { path:"/documentos", label:"Tipos de documentos"},
    { path:"/clientes", label:"Clientes"},
    { path:"/bancos", label:"Bancos"},
    { path:"/seguradoras", label:"Seguradoras"},
    { path:"/conta", label:"Conta"},
  ];

  return (
    <aside
      style={{
        position: isDesktop ? "static" : "fixed", // Posição fixa para mobile, estática para desktop
        top: isDesktop ? 0 : '70px',
        left: isOpen ? 0 : "-250px", // Controla visibilidade em mobile
        width: isDesktop ? "250px" : "250px", // Largura sempre fixa
        height: "100%",
        background: "#2c3e50",
        color: "#fff",
        transition: "left 0.3s ease",
        zIndex: 1000, // Sobrepõe o conteúdo em mobile
      }}
    >
      <div style={{ padding: "20px", fontSize: "1.2rem", fontWeight: "bold" }}>
        Menu
      </div>
      <nav>
        {menuItems.map((item) => (
          <StyledNavLink key={item.path} to={item.path}>
            {item.label}
          </StyledNavLink>
        ))}
      </nav>
    </aside>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isDesktop: PropTypes.bool.isRequired,
};
export default Sidebar;
