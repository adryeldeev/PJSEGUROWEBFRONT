import * as React from "react";
import { Button, Modal, Box, TextField, Typography, Select, MenuItem } from "@mui/material";
import { useParams } from "react-router-dom";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Table from "../../Components/Table/Table";
import useApi from "../../Api/Api";
const Cronologia = () => {
  const api = useApi();
const { id: processoId } = useParams();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editando, setEditando] = React.useState(false);
  const [andamentos, setAndamentos] = React.useState([]);
  const [fasesProcesso, setFasesProcesso] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [erro, setErro] = React.useState(null);

  // Reducer para gerenciar o estado do novo andamento
  const reducer = (state, action) => {
    return { ...state, [action.field]: action.value };
  };
  const [novoAndamento, dispatch] = React.useReducer(reducer, {
    id: null, // Adicionar ID para identificar quando um andamento já existe
    data: "",
    fase: "",
    observacao: "",
    processoId: Number(processoId),
  });

  // Buscar fases do processo
  React.useEffect(() => {
    const fetchFasesProcesso = async () => {
      try {
        setLoading(true);
        const response = await api.get("/processos");
        const { processos } = response.data || [];
        setFasesProcesso(processos.map((fase) => ({ label: fase.nome, value: fase.id })));
      } catch {
        setErro("Não foi possível carregar as fases do processo.");
      } finally {
        setLoading(false);
      }
    };
    fetchFasesProcesso();
  }, []);

  // Função para adicionar um novo andamento
  const adicionarAndamento = async () => {
    const andamentoData = {
      observacoes: novoAndamento.observacao, // Ajustando para o nome esperado no backend
    faseId: Number(novoAndamento.fase), // Convertendo fase para número
    processoId: Number(processoId), // Garantindo que o processoId seja um número
    data: novoAndamento.data ? new Date(novoAndamento.data).toISOString() : new Date().toISOString()// Certificando-se de que o ID do processo é enviado corretamente
    };
  
    console.log("Novo andamento a ser enviado:", andamentoData);
  
    try {
      if (novoAndamento.id) {
        // Se o andamento já existe, fazemos um UPDATE (PUT)
        const response = await api.put(`/updateAndamento/${novoAndamento.id}`, andamentoData);
        setAndamentos((prev) => prev.map((item) => (item.id === novoAndamento.id ? response.data : item)));
      } else {
        // Caso contrário, criamos um novo andamento (POST)
        const response = await api.post("/createAndamento", andamentoData);
        setAndamentos((prev) => [...prev, response.data]);
      }
  
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao adicionar andamento:", error);
    }
  };

  // Função para excluir um andamento
  const excluirAndamento = (id) => {
    setAndamentos(andamentos.filter((item) => item.id !== id));
  };

  // Configuração das colunas da tabela
  const columns = [
    { header: "Cod.", accessor: "id" },
    { header: "Data", accessor: "data" },
    { header: "Operador", accessor: "operador" },
    { header: "Observações", accessor: "observacao" },
    { header: "Fase", accessor: "fase" },
  ];
  if(loading){
    return <Box>Carregando...</Box>
  }

  return (
    <div>
      <Typography variant="h5">Cronologia do Processo</Typography>

      {editando ? (
        <div>
          <Button variant="contained" color="secondary" onClick={() => setEditando(false)} style={{ marginBottom: 10 }}>
            Voltar
          </Button>

          <Button variant="contained" color="primary" onClick={() => setModalOpen(true)} style={{ margin: "0 10px" }}>
            Novo Andamento
          </Button>

          <Table columns={columns} data={andamentos} onDelete={(row) => excluirAndamento(row.id)} />
        </div>
      ) : (
        <div>
          <Timeline position="alternate">
            {andamentos.map((fase, index) => (
              <TimelineItem key={fase.id}>
                <TimelineSeparator>
                  <TimelineDot color={index === 0 ? "success" : "secondary"} />
                  {index < andamentos.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="h6">{fase.fase}</Typography>
                  <Typography variant="body2">{fase.data} - {fase.operador}</Typography>
                  <Typography variant="body2">{fase.observacao}</Typography>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>

          <Button variant="contained" color="primary" onClick={() => setEditando(true)} style={{ marginTop: 10 }}>
            Editar
          </Button>
        </div>
      )}

      {/* Modal para Novo Andamento */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={{ width: 400, padding: 4, backgroundColor: "white", margin: "auto", marginTop: "10%" }}>
          <Typography variant="h6">Adicionar Novo Andamento</Typography>
          <TextField
            fullWidth
            label="Data"
            type="date"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={novoAndamento.data}
            onChange={(e) => dispatch({ field: "data", value: e.target.value })}
          />
          <Select
            fullWidth
            value={novoAndamento.fase}
            onChange={(e) => dispatch({ field: "fase", value: e.target.value })}
            displayEmpty
          >
            <MenuItem value="" disabled>Selecione uma fase</MenuItem>
            {fasesProcesso.map((fase) => (
              <MenuItem key={fase.value} value={fase.value}>{fase.label}</MenuItem>
            ))}
          </Select>
          <TextField
            fullWidth
            label="Observação"
            margin="normal"
            value={novoAndamento.observacao}
            onChange={(e) => dispatch({ field: "observacao", value: e.target.value })}
          />
          <Button variant="contained" color="primary" onClick={adicionarAndamento} style={{ marginTop: 10 }}>
            Salvar
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Cronologia;
