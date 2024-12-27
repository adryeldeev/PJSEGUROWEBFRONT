import PropTypes from 'prop-types'
import { useEffect, useState } from "react";
import useApi from "../../Api/Api";
import { useAuth } from "../../Context/AuthProvider";


const Header = ({ toggleSidebar, isSidebarOpen, isDesktop }) => {
  const api = useApi();
  const auth = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

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

  return (
    <header
    style={{
      background: "#f4f4f4",
      padding: "10px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    {/* Botão de menu responsivo */}
    {!isDesktop && <button
      onClick={toggleSidebar}
      style={{
        display: "block",
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "24px",
        marginRight: "10px",
      }}
      >
      {isSidebarOpen ? "✖" : "☰"}
    </button>
    }
      <div>Bem-vindo, {data?.username || auth.user?.username || "Usuário"}</div>
      <div>
        <img
          src={data?.profilePicture || "https://via.placeholder.com/40"}
          alt="Foto do usuário"
          style={{ borderRadius: "50%", cursor: "pointer" }}
        />
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
