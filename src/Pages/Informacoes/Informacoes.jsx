import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import {
  DivContent,
  InfoContainer,
  InfoBox,
  Label,
  Value,
  Input,
} from "./InformacoesStyled";
import useApi from "../../Api/Api";

const Informacoes = () => {
  const api = useApi();
  const { id: processoId } = useParams();
  const [processo, setProcesso] = useState(null);
  const [prioridades, setPrioridades] = useState([]);
  const [seguradoras, setSeguradoras] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProcesso = async () => {
      try {
        const response = await api.get(`/processos/${processoId}`);
      
        setProcesso(response.data);
      } catch (error) {
        console.error("Erro ao buscar processo:", error);
      }
    };
    if (processoId) {
      fetchProcesso();
    }
  }, [processoId]);

  useEffect(() => {
    const fetchPrioridades = async () => {
      try {
        const response = await api.get("/prioridades");

        setPrioridades(response.data.prioridades || []);
      } catch (error) {
        console.error("Erro ao buscar prioridades:", error);
      }
    };
    fetchPrioridades();
  }, []);

  useEffect(() => {
    const fetchSeguradoras = async () => {
      try {
        const response = await api.get("/seguradoras");
     
        setSeguradoras(response.data.seguradoras || []);
      } catch (error) {
        console.error("Erro ao buscar seguradoras:", error);
      }
    };
    fetchSeguradoras();
  }, []);

  if (!processo || prioridades.length === 0) {
    return <p>Carregando...</p>;
  }

  return (
    <DivContent>
      <InfoContainer>
        <InfoBox className="fase">
          <Label>Fase</Label>
          <Value className="fase-value">{processo.faseProcesso?.nome || "Não informado"}</Value>
        </InfoBox>

        <InfoBox className="prioridade">
          <Label>Prioridade</Label>
          {isEditing ? (
            <select>
              {prioridades.map((prioridade) => (
                <option key={prioridade.id} value={prioridade.id}>
                  {prioridade.nome}
                </option>
              ))}
            </select>
          ) : (
            <Value className="prioridade-value">{processo.prioridade?.nome || "Não informado"}</Value>
          )}
        </InfoBox>
      </InfoContainer>

      <InfoContainer>
        <InfoBox>
          <Label>Operador</Label>
          {isEditing ? (
            <Input type="text" defaultValue={processo.user?.username || ""} />
          ) : (
            <Value>{processo.user?.username || "Não informado"}</Value>
          )}
        </InfoBox>

        <InfoBox>
          <Label>Data de Cadastro</Label>
          {isEditing ? (
            <Input type="date" defaultValue={new Date(processo.criado_em).toISOString().split("T")[0]} />
          ) : (
            <Value>{new Date(processo.criado_em).toLocaleDateString()}</Value>
          )}
        </InfoBox>

        <InfoBox>
          <Label>Seguradora</Label>
          {isEditing ? (
            <select>
              {seguradoras.map((seguradora) => (
                <option key={seguradora.id} value={seguradora.id}>
                  {seguradora.nome}
                </option>
              ))}
            </select>
          ) : (
            <Value>
              {processo.sinistro.length > 0 ? processo.sinistro[0].seguradora : "Não informado"}
            </Value>
          )}
        </InfoBox>

        <InfoBox>
          <Label>Endereço</Label>
          {isEditing ? (
            <Input type="text" defaultValue={processo.vitima?.endereco || ""} />
          ) : (
            <Value>{processo.vitima?.endereco || "Não informado"}</Value>
          )}
        </InfoBox>

        <InfoBox>
          <Label>Email</Label>
          {isEditing ? (
            <Input type="email" defaultValue={processo.vitima?.email || ""} />
          ) : (
            <Value>{processo.vitima?.email || "Não informado"}</Value>
          )}
        </InfoBox>

        <InfoBox>
          <Label>Telefone</Label>
          {isEditing ? (
            <Input type="tel" defaultValue={processo.vitima?.telefone01 || ""} />
          ) : (
            <Value>{processo.vitima?.telefone01 || "Não informado"}</Value>
          )}
        </InfoBox>
      </InfoContainer>

      <Button color="primary" onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? "Cancelar" : "Editar"}
      </Button>
    </DivContent>
  );
};

export default Informacoes;

