import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  max-width: 400px;
  height: 40px;
  padding: 8px 12px;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007BFF;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: none;
  }
`;

export const Select = styled.select`
  width: 100%;
  max-width: 400px;
  height: 40px;
  padding: 8px 12px;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  background: white;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007BFF;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: none;
  }
`;

export const DivInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 420px;

  @media (max-width: 768px) {
    max-width: none;
  }
`;
