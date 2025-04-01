import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import useApi from "../../Api/Api";
import { useAuth } from "../../Context/AuthProvider";
import { LogOut } from "lucide-react"; // Ícone de logout do Lucide
import { HeaderContainer, MenuButton, ProfileImage, UserMenu, LogoutButton } from './HeaderStyled'; // Importando os styled components

const Header = ({ toggleSidebar, isSidebarOpen, isDesktop }) => {
  const api = useApi();
  const auth = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const baseUrl = "http://localhost:8000"; // Ou a URL do seu servidor

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (auth.user?.id) {
          const response = await api.get(`user/${auth.user.id}`);
          setData(response.data.user);
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
    <HeaderContainer>
      {/* Botão de menu responsivo */}
      {!isDesktop && (
        <MenuButton onClick={toggleSidebar}>
          {isSidebarOpen ? "✖" : "☰"}
        </MenuButton>
      )}

      <div>Bem-vindo, {data?.username || auth.user?.username || "Usuário"}</div>

      {/* Imagem de perfil */}
      <div style={{ position: "relative" }}>
        <ProfileImage
          src={ data?.profileImage ? `${baseUrl}${data?.profileImage} ` : "/path/to/default/image"}
          alt="Foto do usuário"
          onClick={() => setMenuOpen(!menuOpen)} // Abre o menu ao clicar
        />

        {/* Menu do usuário */}
        {menuOpen && (
          <UserMenu>
            <p>{data?.username || auth.user?.username || "Usuário"}</p>
            <LogoutButton onClick={handleLogout}>
              <LogOut size={16} />
              Logout
            </LogoutButton>
          </UserMenu>
        )}
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </HeaderContainer>
  );
};

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
  isDesktop: PropTypes.bool.isRequired,
};

export default Header;
