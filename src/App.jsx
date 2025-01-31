import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthProvider from "./Context/AuthProvider";
import PrivateRoute from "./Routes/PrivateRoute";
import DashboardLayout from "./Layout/DashboardLayout";
import Login from "./Pages/Login/Login";
import TiposDeProcesso from "./Pages/TiposDeProcesso/TiposDeProcesso";
import Prioridades from "./Pages/Prioridades/Prioridades";
import Dashboard from "./Pages/Dashboard/Darshboard";
import CadastroUser from "./Pages/CadastroUser/CadastroUser";
import CadastroTipoDeProcesso from './Pages/CadastroTipoDeProcesso/CadastroTipoDeProcesso';
import { UIProvider } from './Context/UiContext'; // Importe o UIProvider
import CadastrarPrioridades from './Pages/CadastrarPrioridades/CadastrarPrioridades';
import FaseDoProcesso from './Pages/FaseDoProcesso/FaseDoProcesso';
import CadastrarFaseDoProcesso from './Pages/CadastrarFaseDoProcesso/CadastrarFaseDoProcesso';
import TiposDeVeiculo from './Pages/TiposDeVeiculo/TiposDeVeiculo';
import CadastrarTiposDeVeiculo from './Pages/CadastrarTiposDeVeiculo/CadastrarTiposDeVeiculo';
import Clientes from './Pages/Clientes/Clientes';
import CadastrarCliente from './Pages/CadastrarClientes/CadastrarCliente';
import CadastrarBancos from './Pages/CadastrarBancos/CadastrarBancos';
import Bancos from './Pages/Bancos/Bancos';
import CadastrarSeguradora from './Pages/CadastrarSeguradora/CadastrarSeguradora';
import Seguradora from './Pages/Seguradora/Seguradora';
import TiposDeDocumento from './Pages/TiposDeDocumento/TiposDeDocumento';
import CadastrarDocumento from './Pages/CadastroDeDocumento/CadastroDeDocumento';
import CriarProcesso from './Pages/CriarProcesso/CriarProcesso';
import { ApiUrlProvider } from './Context/ApiUrlProvider';
import Profile from './Pages/Profile/Profile';
import Vítimas from './Pages/Vítimas/Vítimas';

function App() {
  return (
    <Router>
      <AuthProvider>
        <UIProvider>  {/* Envolva tudo com o UIProvider */}
          <ApiUrlProvider>

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastrarUser" element={<CadastroUser />} />
            <Route element={<PrivateRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tipos-de-processo" element={<TiposDeProcesso />} />
                <Route path="/prioridades" element={<Prioridades />} />
                <Route path="/processos" element={<FaseDoProcesso />} />
                <Route path="/clientes" element={<Clientes />} />
                <Route path="/bancos" element={<Bancos />} />
                <Route path="/seguradoras" element={<Seguradora />} />
                <Route path="/documentos" element={<TiposDeDocumento />} />
                <Route path="/vitimas" element={<Vítimas />} />
                <Route path="/tipos-de-veiculo" element={<TiposDeVeiculo/>}/>
                <Route path="/cadastrar-tipo-de-processo" element={<CadastroTipoDeProcesso />} />
                <Route path="/cadastrar-prioridade" element={<CadastrarPrioridades />} />
                <Route path="/cadastrar-fase-de-processo" element={<CadastrarFaseDoProcesso />} />
                <Route path="/cadastrar-tipo-de-veiculo" element={<CadastrarTiposDeVeiculo />} />
                <Route path="/cadastrar-cliente" element={<CadastrarCliente />} />
                <Route path="/cadastrar-banco" element={<CadastrarBancos />} />
                <Route path="/cadastrar-seguradora" element={<CadastrarSeguradora />} />
                <Route path="/cadastrar-documento" element={<CadastrarDocumento />} />
                <Route path="/criarProcesso" element={<CriarProcesso />} />
                <Route path="/conta" element={<Profile />} />
              </Route>
            </Route>
          </Routes>
          </ApiUrlProvider>
        </UIProvider>  {/* Fim do UIProvider */}
      </AuthProvider>
    </Router>
  );
}

export default App;
