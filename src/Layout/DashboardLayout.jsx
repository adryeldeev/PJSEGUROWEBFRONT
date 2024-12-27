import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar/Sidebar";
import Header from "../Components/Header/Headers";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768); // Checa se é desktop na inicialização

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Ajusta o estado quando o tamanho da janela muda
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
      if (window.innerWidth > 768) {
        setIsSidebarOpen(false); // Fecha a Sidebar em telas grandes
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh", position: "relative" }}>
      {/* Barra lateral */}
      <Sidebar isOpen={isDesktop || isSidebarOpen} isDesktop={isDesktop} />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Cabeçalho */}
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} isDesktop={isDesktop} />
        {/* Conteúdo da página */}
        <main style={{ padding: "20px", overflowY: "auto" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
