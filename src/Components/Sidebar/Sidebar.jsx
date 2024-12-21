import { StyledNavLink } from "./SidebarStyled";

const Sidebar = () => {
  const menuItems = [
    { path: "/", label: "Início" },
    { path: "/tipos-de-processo", label: "Processos" },
    { path: "/prioridades", label: "Prioridades" },
    
  ];

  return (
    <aside style={{ width: "250px", background: "#2c3e50", color: "#fff" }}>
      <div style={{ padding: "20px", fontSize: "1.2rem", fontWeight: "bold" }}>
        DPVAT Digital
      </div>
      <nav>
        {menuItems.map((item) => (
          <StyledNavLink
            key={item.path}
            to={item.path}
           
          >
            {item.label}
          </StyledNavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
