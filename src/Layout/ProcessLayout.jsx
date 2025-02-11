import { Outlet } from "react-router-dom";
import { ContentArea, LayoutContainer } from "./ProcessLayoutStyled";
import CentralTabs from "../Components/CampoNavBar/CentralTabs";




const ProcessLayout = () => {
    
  return (
    <LayoutContainer>
     
      {/* Abas Centrais */}
      <CentralTabs />

      {/* Área de Conteúdo Dinâmico */}
      <ContentArea>
        <Outlet />
      </ContentArea>
      
    </LayoutContainer>
  );
};

export default ProcessLayout;
