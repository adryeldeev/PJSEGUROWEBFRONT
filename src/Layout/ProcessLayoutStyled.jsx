import styled from 'styled-components';

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  /* Media query para telas menores */
  @media (max-width: 768px) {
    padding: 12px;
    gap: 16px;
  }

  @media (max-width: 480px) {
    padding: 8px;
    gap: 12px;
  }
`;

export const ContentArea = styled.div`
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
  min-height: 300px;

  /* Media query para telas menores */
  @media (max-width: 768px) {
    padding: 12px;
  }

  @media (max-width: 480px) {
    padding: 8px;
  }
`;

