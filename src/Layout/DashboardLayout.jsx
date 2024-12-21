import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar/Sidebar";
import Header from "../Components/Header/Headers";

const DashboardLayout = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Barra lateral */}
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Cabeçalho */}
        <Header />
        {/* Conteúdo da página */}
        <main style={{ padding: "20px", overflowY: "auto" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
