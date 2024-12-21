const Header = () => {
    return (
      <header style={{ background: "#f4f4f4", padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>Bem-vindo, Felipe Ribeiro!</div>
        <div>
          <img
            src="https://via.placeholder.com/40"
            alt="Foto do usuário"
            style={{ borderRadius: "50%", cursor: "pointer" }}
          />
        </div>
      </header>
    );
  };
  
  export default Header;
  