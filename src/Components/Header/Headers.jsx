import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import useApi from "../../Api/Api";
import { useAuth } from "../../Context/AuthProvider";
import { LogOut} from "lucide-react"; // Ícone de logout do Lucide

const Header = ({ toggleSidebar, isSidebarOpen, isDesktop }) => {
  const api = useApi();
  const auth = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // Estado do menu de usuário

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (auth.user?.id) {
          const response = await api.get(`user/${auth.user.id}`);
          setData(response.data);
        }
      } catch (err) {
        setError("Falha ao carregar dados: " + (err.message || "Erro desconhecido"));
      }
    };

    fetchData();
  }, [auth.user?.id, api]);

  const handleLogout = () => {
    auth.logOut(); // Método de logout do contexto de autenticação
  };

  return (
    <header
      style={{
        background: "#f4f4f4",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Botão de menu responsivo */}
      {!isDesktop && (
        <button
          onClick={toggleSidebar}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "24px",
            marginRight: "10px",
          }}
        >
          {isSidebarOpen ? "✖" : "☰"}
        </button>
      )}

      <div>Bem-vindo, {data?.username || auth.user?.username || "Usuário"}</div>

      {/* Imagem de perfil */}
      <div style={{ position: "relative" }}>
        <img
          src={data?.profilePicture || "https://via.placeholder.com/40"}
          alt="Foto do usuário"
          style={{
            borderRadius: "50%",
            cursor: "pointer",
            opacity: 0.5, // Começa com 50% de opacidade
            transition: "opacity 0.3s",
          }}
          onClick={() => setMenuOpen(!menuOpen)} // Abre o menu ao clicar
          onMouseEnter={(e) => (e.target.style.opacity = "1")} // Efeito hover
          onMouseLeave={(e) => (e.target.style.opacity = "0.5")} // Volta ao normal
        />

        {/* Menu do usuário */}
        {menuOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              right: 0,
              background: "white",
              boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
              borderRadius: "5px",
              padding: "10px",
              minWidth: "150px",
              zIndex: 100,
            }}
          >
            <p style={{ margin: 0, fontWeight: "bold", textAlign: "center" }}>
              {data?.username || auth.user?.username || "Usuário"}
            </p>
            <button
              onClick={handleLogout}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "100%",
                padding: "8px",
                marginTop: "8px",
                background: "#ff4d4d",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </header>
  );
};

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
  isDesktop: PropTypes.bool.isRequired,
};

export default Header;
