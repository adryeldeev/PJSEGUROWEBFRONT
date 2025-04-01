import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background: #f4f4f4;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  margin-right: 10px;
`;

export const ProfileImage = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  opacity: 0.5; /* Começa com 50% de opacidade */
  transition: opacity 0.3s;

  &:hover {
    opacity: 1; /* Efeito hover */
  }
`;

export const UserMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 10px;
  min-width: 150px;
  z-index: 100;

  p {
    margin: 0;
    font-weight: bold;
    text-align: center;
  }
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 8px;
  margin-top: 8px;
  background: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
