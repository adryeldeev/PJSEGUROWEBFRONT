import { useEffect, useState } from "react";
import { Container, Grid, Card, CardContent, Typography } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import useApi from "../../Api/Api";
import { useAuth } from "../../Context/AuthProvider";

const Dashboard = () => {
  const api = useApi();
  const auth = useAuth();
  const [processos, setProcessos] = useState([]);
  const [faseData, setFaseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/processos");
        setProcessos(response);
      } catch (error) {
        console.error("Erro ao buscar processos", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (processos.length > 0) {
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
    }
  }, [processos]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28BFE", "#FF6384"];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard de Processos
      </Typography>
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
