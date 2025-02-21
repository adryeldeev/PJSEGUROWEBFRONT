import styled from "styled-components";

export const Container = styled.div`
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
    max-width: 1200px;
    margin: auto;
`;

export const Filtros = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    flex-wrap: wrap;

    button {
        background: #007bff;
        color: white;
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-bottom: 5px;

        &:hover {
            background: #0056b3;
        }
    }
`;

export const BotaoNovo = styled.button`
    background: #28a745;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 5px;

    &:hover {
        background: #218838;
    }
`;

// Contêiner para permitir rolagem horizontal em telas pequenas
export const TabelaWrapper = styled.div`
    overflow-x: auto;
`;

export const Tabela = styled.table`
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

    th, td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #ddd;
        white-space: nowrap; // Evita quebras de texto na tabela
    }

    th {
        background: #f4f4f4;
    }

    @media (max-width: 768px) {
        th, td {
            font-size: 12px;
            padding: 8px;
        }
    }
`;


export const BotaoAcoes = styled.button`
    background-color: #f44336;
    color: white;
    border:none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    display: inline-block;
   
`;



export const StatusBadge = styled.span`
    background: ${({ status }) => 
        status.includes("Andamento") ? "#28a745" :
        status.includes("Seguradora") ? "#007bff" :
        status.includes("Negado") ? "#dc3545" : "#6c757d"};
    color: white;
    padding: 6px 10px;
    border-radius: 12px;
    font-size: 12px;
    
    @media (max-width: 768px) {
        font-size: 10px;
        padding: 4px 8px;
    }
`;
