import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthProvider from "./Context/AuthProvider";
import PrivateRoute from "./Routes/PrivateRoute";
import DashboardLayout from "./Layout/DashboardLayout";
import Login from "./Pages/Login/Login";
import TiposDeProcesso from "./Pages/TiposDeProcesso/TiposDeProcesso";
import Prioridades from "./Pages/Prioridades/Prioridades";
import Dashboard from "./Pages/Dashboard/Darshboard";
import CadastroUser from "./Pages/CadastroUser/CadastroUser";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastrarUser" element={<CadastroUser />} />
          <Route element={<PrivateRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tipos-de-processo" element={<TiposDeProcesso />} />
              <Route path="/prioridades" element={<Prioridades />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
