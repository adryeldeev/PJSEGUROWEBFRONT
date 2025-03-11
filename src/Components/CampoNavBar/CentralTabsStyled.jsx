import styled from 'styled-components'


export  const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  background-color: #f4f4f4;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
  display:flex;
  flex-direction:column;
  width:100%;
  }
`;

export const TabButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: ${(props) => (props.active ? "#ffc107" : "#ffffff")};
  color: ${(props) => (props.active ? "#ffffff" : "#333333")};
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.active ? "#e6a900" : "#e6e6e6")};
  }

  svg {
    font-size: 18px;
  }
`;