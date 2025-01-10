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

function App() {
  return (
    <Router>
      <AuthProvider>
        <UIProvider>  {/* Envolva tudo com o UIProvider */}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastrarUser" element={<CadastroUser />} />
            <Route element={<PrivateRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tipos-de-processo" element={<TiposDeProcesso />} />
                <Route path="/prioridades" element={<Prioridades />} />
                <Route path="/processos" element={<FaseDoProcesso />} />
                <Route path="/tipos-de-veiculo" element={<TiposDeVeiculo/>}/>
                <Route path="/cadastrar-tipo-de-processo" element={<CadastroTipoDeProcesso />} />
                <Route path="/cadastrar-prioridade" element={<CadastrarPrioridades />} />
                <Route path="/cadastrar-fase-de-processo" element={<CadastrarFaseDoProcesso />} />
              </Route>
            </Route>
          </Routes>
        </UIProvider>  {/* Fim do UIProvider */}
      </AuthProvider>
    </Router>
  );
}

export default App;
