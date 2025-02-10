import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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
  const { id } = useParams();
  const [processo, setProcesso] = useState(null);
  const [prioridades, setPrioridades] = useState([]);
  const [seguradoras, setSeguradoras] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch processo
  useEffect(() => {
    const fetchProcesso = async () => {
      try {
        const response = await api.get(`/processos/${id}`);
        setProcesso(response.data);
      } catch (error) {
        console.error("Erro ao buscar processo:", error);
      }
    };

    fetchProcesso();
  }, [id]);

  // Fetch prioridades
  useEffect(() => {
    const fetchPrioridades = async () => {
      try {
        const response = await api.get("/prioridades");
        const { prioridades } = response.data;

        setPrioridades(prioridades);
      } catch (error) {
        console.error("Erro ao buscar prioridades:", error);
      }
    };

    fetchPrioridades();
  }, []);

  // Fetch seguradoras
  useEffect(() => {
    const fetchSeguradoras = async () => {
      try {
        const response = await api.get("/seguradoras");
        const { seguradoras } = response.data;

        setSeguradoras(seguradoras);
      } catch (error) {
        console.error("Erro ao buscar seguradoras:", error);
      }
    };

    fetchSeguradoras();
  }, []);

  if (!processo || !prioridades.length || !seguradoras.length) {
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
            <Input type="text" />
          ) : (
            <Value>{processo.user?.nome || "Não informado"}</Value>
          )}
        </InfoBox>

        <InfoBox>
          <Label>Data de Cadastro</Label>
          {isEditing ? (
            <Input type="date" />
          ) : (
            <Value>{new Date(processo.criado_em).toLocaleDateString()}</Value>
          )}
        </InfoBox>

        <InfoBox>
          <Label>Seguradora</Label>
          {isEditing ? (
            <select >
              {seguradoras.map((seguradora) => (
                <option key={seguradora.id} value={seguradora.id}>
                  {seguradora.nome}
                </option>
              ))}
            </select>
          ) : (
            <Value>{processo.sinistro?.seguradora || "Não informado"}</Value>
          )}
        </InfoBox>

        <InfoBox>
          <Label>Endereço</Label>
          {isEditing ? (
            <Input type="text"  />
          ) : (
            <Value>{processo.vitima?.endereco || "Não informado"}</Value>
          )}
        </InfoBox>

        <InfoBox>
          <Label>Email</Label>
          {isEditing ? (
            <Input type="email"  />
          ) : (
            <Value>{processo.vitima?.email || "Não informado"}</Value>
          )}
        </InfoBox>

        <InfoBox>
          <Label>Telefone</Label>
          {isEditing ? (
            <Input type="tel" />
          ) : (
            <Value>{processo.vitima?.telefone01 || "Não informado"}</Value>
          )}
        </InfoBox>
      </InfoContainer>

      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? "Cancelar" : "Editar"}
      </button>
    </DivContent>
  );
};

export default Informacoes;
