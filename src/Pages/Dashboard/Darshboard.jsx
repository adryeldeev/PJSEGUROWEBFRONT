import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import useApi from "../../Api/Api";
import { useAuth } from "../../Context/AuthProvider";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

const Dashboard = () => {
  const api = useApi();
  const auth = useAuth();
  const [processos, setProcessos] = useState([]);
  const [faseData, setFaseData] = useState([]);

  const [stats, setStats] = useState({
    total: 0,
    finalizados: 0,
    pendentes: 0,
    analise: 0,
    negados: 0,
    hoje: 0,
    semana: 0,
    mesAtual: 0,
    mesAnterior: 0,
    taxaSucesso: 0,
    tempoMedio: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/processos");
        const dados = Array.isArray(response.data) ? response.data : [];
        setProcessos(dados);
      } catch (error) {
        console.error("Erro ao buscar processos", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (processos.length === 0) return;

    const now = dayjs();
    const inicioSemana = now.startOf("week");
    const inicioMes = now.startOf("month");
    const inicioMesAnterior = now.subtract(1, "month").startOf("month");
    const fimMesAnterior = now.subtract(1, "month").endOf("month");

    let finalizados = 0,
      pendentes = 0,
      analise = 0,
      negados = 0,
      hoje = 0,
      semana = 0,
      mesAtual = 0,
      mesAnterior = 0,
      tempoTotal = 0,
      tempoCount = 0;

    processos.forEach((p) => {
      const fase = p.faseProcesso?.nome || "";
      const criadoEm = dayjs(p.createdAt);
      const finalizadoEm = dayjs(p.updatedAt);

      if (fase.toLowerCase().includes("finalizado")) finalizados++;
      else if (fase.toLowerCase().includes("pendente")) pendentes++;
      else if (fase.toLowerCase().includes("análise") || fase.toLowerCase().includes("analise")) analise++;
      else if (fase.toLowerCase().includes("negado")) negados++;

     if (criadoEm.isBetween(now.startOf("day"), now.endOf("day"), null, "[]")) hoje++;
      if (criadoEm.isAfter(inicioSemana)) semana++;
      if (criadoEm.isAfter(inicioMes)) mesAtual++;
      if (criadoEm.isBetween(inicioMesAnterior, fimMesAnterior, null, "[]")) mesAnterior++;

      if (fase.toLowerCase().includes("finalizado") && p.createdAt && p.updatedAt) {
        const diff = finalizadoEm.diff(criadoEm, "day");
        tempoTotal += diff;
        tempoCount++;
      }
    });

    const taxaSucesso = ((finalizados / processos.length) * 100).toFixed(1);
    const tempoMedio = tempoCount > 0 ? (tempoTotal / tempoCount).toFixed(1) : 0;

    setStats({
      total: processos.length,
      finalizados,
      pendentes,
      analise,
      negados,
      hoje,
      semana,
      mesAtual,
      mesAnterior,
      taxaSucesso,
      tempoMedio,
    });

    // Distribuição por fase
    const faseCount = processos.reduce((acc, processo) => {
      const nomeFase = processo.faseProcesso?.nome || "Desconhecido";
      acc[nomeFase] = (acc[nomeFase] || 0) + 1;
      return acc;
    }, {});

    const faseArray = Object.keys(faseCount).map((key) => ({
      name: key,
      value: faseCount[key],
    }));

    setFaseData(faseArray);
  }, [processos]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28BFE", "#FF6384"];

  const indicadorCard = (titulo, valor) => (
    <Grid item xs={6} sm={4} md={3}>
      <Card sx={{ height: "100%" }}>
        <CardContent>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {titulo}
          </Typography>
          <Typography variant="h5">{valor}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard de Processos
      </Typography>

      <Grid container spacing={2} mb={4}>
        {indicadorCard("Total de Processos", stats.total)}
        {indicadorCard("Finalizados", stats.finalizados)}
        {indicadorCard("Pendentes", stats.pendentes)}
        {indicadorCard("Em Análise", stats.analise)}
        {indicadorCard("Negados", stats.negados)}
        {indicadorCard("Criados Hoje", stats.hoje)}
        {indicadorCard("Esta Semana", stats.semana)}
        {indicadorCard("Mês Atual", stats.mesAtual)}
        {indicadorCard("Mês Anterior", stats.mesAnterior)}
        {indicadorCard("% Sucesso", `${stats.taxaSucesso}%`)}
        {indicadorCard("Tempo Médio (dias)", stats.tempoMedio)}
      </Grid>

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" align="center">
                Distribuição de Processos por Fase
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={faseData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {faseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
