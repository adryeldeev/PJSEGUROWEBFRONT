import { useState } from 'react'
import { TabButton, TabsContainer } from './CentralTabsStyled';
import { useNavigate, useParams } from 'react-router-dom';
import { Info, FileText,  CircleCheck, Clock, } from 'lucide-react'

const CentralTabs = () => {
  const { id } = useParams();
    const menuItemsNavBar = [
      { id: 1, label: "Informações", icon: <Info />, route: `/processo/${id}/informacoes` },
      { id: 2, label: "Sinistro", icon: <FileText />, route: `/processo/${id}/sinistro` },
      { id: 4, label: "Checklist", icon: <CircleCheck />, route: `/processo/${id}/checklist` },
      { id: 5, label: "Cronologia", icon: <Clock />, route: `/processo/${id}/cronologia` },
      ]
      const [activeTab, setActiveTab] = useState("Informações");
      const navigate = useNavigate();
    
      return (
        <TabsContainer>
          {menuItemsNavBar.map((tab) => (
            <TabButton
              key={tab.id}
              active={activeTab === tab.label}
              onClick={() => {
                setActiveTab(tab.label);
                navigate(tab.route);
              }}
            >
              {tab.icon}
              {tab.label}
            </TabButton>
          ))}
        </TabsContainer>
      );
}

export default CentralTabs
