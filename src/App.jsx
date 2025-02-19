import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./Context/AuthProvider";
import PrivateRoute from "./Routes/PrivateRoute";
import DashboardLayout from "./Layout/DashboardLayout";
import Login from "./Pages/Login/Login";
import TiposDeProcesso from "./Pages/TiposDeProcesso/TiposDeProcesso";
import Prioridades from "./Pages/Prioridades/Prioridades";
import Dashboard from "./Pages/Dashboard/Darshboard";
import CadastroUser from "./Pages/CadastroUser/CadastroUser";
import CadastroTipoDeProcesso from './Pages/CadastroTipoDeProcesso/CadastroTipoDeProcesso';
import { UIProvider } from './Context/UiContext';
import CadastrarPrioridades from './Pages/CadastrarPrioridades/CadastrarPrioridades';
import FaseDoProcesso from './Pages/FaseDoProcesso/FaseDoProcesso';
import CadastrarFaseDoProcesso from './Pages/CadastrarFaseDoProcesso/CadastrarFaseDoProcesso';
import TiposDeVeiculo from './Pages/TiposDeVeiculo/TiposDeVeiculo';
import CadastrarTiposDeVeiculo from './Pages/CadastrarTiposDeVeiculo/CadastrarTiposDeVeiculo';
import Clientes from './Pages/Clientes/Clientes';
import CadastrarBancos from './Pages/CadastrarBancos/CadastrarBancos';
import Bancos from './Pages/Bancos/Bancos';
import CadastrarSeguradora from './Pages/CadastrarSeguradora/CadastrarSeguradora';
import Seguradora from './Pages/Seguradora/Seguradora';
import TiposDeDocumento from './Pages/TiposDeDocumento/TiposDeDocumento';
import CadastrarDocumento from './Pages/CadastroDeDocumento/CadastroDeDocumento';
import CriarProcesso from './Pages/CriarProcesso/CriarProcesso';
import { ApiUrlProvider } from './Context/ApiUrlProvider';
import Profile from './Pages/Profile/Profile';
import Vitimas from './Pages/Vítimas/Vítimas';
import CadastrarVitima from './Pages/CadastrarVitima/CadastrarVitima';
import ProcessLayout from './Layout/ProcessLayout';
import Informacoes from './Pages/Informacoes/Informacoes';
import Sinistro from './Pages/Sinistro/Sinistro';
import CheckList from './Pages/Check/Check';
import Cronologia from './Pages/Cronologia/Cronologia';

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/cadastrarUser", element: <CadastroUser /> },
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "/", element: <Dashboard /> },
          { path: "/tipos-de-processo", element: <TiposDeProcesso /> },
          { path: "/prioridades", element: <Prioridades /> },
          { path: "/processos", element: <FaseDoProcesso /> },
          { path: "/clientes", element: <Clientes /> },
          { path: "/bancos", element: <Bancos /> },
          { path: "/seguradoras", element: <Seguradora /> },
          { path: "/documentos", element: <TiposDeDocumento /> },
          { path: "/vitimas", element: <Vitimas /> },
          { path: "/tipos-de-veiculo", element: <TiposDeVeiculo /> },
          { path: "/cadastrar-tipo-de-processo", element: <CadastroTipoDeProcesso /> },
          { path: "/cadastrar-prioridade", element: <CadastrarPrioridades /> },
          { path: "/cadastrar-fase-de-processo", element: <CadastrarFaseDoProcesso /> },
          { path: "/cadastrar-tipo-de-veiculo", element: <CadastrarTiposDeVeiculo /> },
          { path: "/cadastrar-banco", element: <CadastrarBancos /> },
          { path: "/cadastrar-seguradora", element: <CadastrarSeguradora /> },
          { path: "/cadastrar-documento", element: <CadastrarDocumento /> },
          { path: "/criarProcesso", element: <CriarProcesso /> },
          { path: "/cadastrarVitima", element: <CadastrarVitima /> },
          { path: "/conta", element: <Profile /> },
          {
            path: "/processo/:id",
            element: <ProcessLayout />,
            children: [
              { path: "informacoes", element: <Informacoes /> },
              { path: "sinistro", element: <Sinistro /> },
              { path: "checklist", element: <CheckList /> },
              { path: "cronologia", element: <Cronologia /> },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <UIProvider>
        <ApiUrlProvider>
          <RouterProvider router={router} />
        </ApiUrlProvider>
      </UIProvider>
    </AuthProvider>
  );
}

export default App;
