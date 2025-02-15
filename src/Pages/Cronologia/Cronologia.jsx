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

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_ANDAMENTO':
        return { ...state, ...action.payload };
      case 'UPDATE_FIELD':
        return { ...state, [action.field]: action.value };
      default:
        return state;
    }
  };

  const [novoAndamento, dispatch] = React.useReducer(reducer, {
    id: null,
    data: "",
    faseProcessoId: "",
    observacoes: "",
    processoId: Number(processoId),
  });

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

  const fetchAndamentos = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/andamentos?processoId=${processoId}`);
      setAndamentos(Array.isArray(response.data.andamentos ) ? response.data.andamentos : []);
    } catch {
      setErro("Não foi possível carregar os andamentos.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchAndamentos();
  }, [processoId]);

  const adicionarAndamento = async () => {
    if (!novoAndamento.faseProcessoId || novoAndamento.faseProcessoId === 0) {
      alert("Por favor, selecione uma fase válida.");
      return;
    }

    const andamentoData = {
      observacoes: novoAndamento.observacoes,
      faseProcessoId: Number(novoAndamento.faseProcessoId),
      processoId: Number(processoId),
      data: novoAndamento.data ? novoAndamento.data : new Date().toISOString().slice(0, 10),
    };

    try {
      let response;
      if (novoAndamento.id) {
        response = await api.put(`/updateAndamento/${novoAndamento.id}`, andamentoData);
        setAndamentos((prev) => prev.map((item) => (item.id === novoAndamento.id ? response.data : item)));
      } else {
        response = await api.post("/createAndamento", andamentoData);
        setAndamentos((prev) => [...prev, response.data]);
      }
      setModalOpen(false);
      setEditando(false);
      fetchAndamentos();
      dispatch({ type: 'SET_ANDAMENTO', payload: {
        id: null,
        data: "",
        faseProcessoId: "",
        observacoes: "",
      }});
    } catch (error) {
      alert("Ocorreu um erro ao adicionar o andamento.");
    }
  };

  const excluirAndamento = (id) => {
    setAndamentos(andamentos.filter((item) => item.id !== id));
  };

  return (
    <div>
      <Typography variant="h5">Cronologia do Processo</Typography>
      {editando ? (
        <div>
          <Button variant="contained" color="secondary" onClick={() => setEditando(false)}>
            Voltar
          </Button>
          <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>
            Novo Andamento
          </Button>
          <Table
            columns={[
              { header: "Cod.", accessor: "id" },
              { header: "Data", accessor: "data" },
              { header: "Fase", accessor: "faseProcesso.nome" },
              { header: "Observações", accessor: "observacoes" },
              {
                header: "Ações",
                Cell: ({ row }) => (
                  <Button onClick={() => {
                    setModalOpen(true);
                    dispatch({ type: 'SET_ANDAMENTO', payload: row.original });
                  }} variant="contained" color="primary">
                    Editar
                  </Button>
                )
              }
            ]}
            data={andamentos}
            onDelete={(row) => excluirAndamento(row.id)}
          />
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
        <Typography variant="h6">
          {fase.faseProcesso?.nome || "Fase desconhecida"}
        </Typography>
        <Typography variant="body2">{fase.observacoes}</Typography>
        <Typography variant="body2">
          {new Date(fase.data).toLocaleDateString("pt-BR")}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  ))}
</Timeline>
          <Button variant="contained" color="primary" onClick={() => setEditando(true)}>
            Editar
          </Button>
        </div>
      )}

  <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={{ width: 400, padding: 4, backgroundColor: "white", margin: "auto", marginTop: "10%" }}>
          <Typography variant="h6">{novoAndamento.id ? "Editar Andamento" : "Adicionar Novo Andamento"}</Typography>
          <TextField
            fullWidth
            label="Data"
            type="date"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={novoAndamento.data}
            onChange={(e) => dispatch({ type: "UPDATE_FIELD", field: "data", value: e.target.value })}
          />
          <Select
            fullWidth
            value={novoAndamento.faseProcessoId}
            onChange={(e) => dispatch({ type: "UPDATE_FIELD", field: "faseProcessoId", value: e.target.value })}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Selecione uma fase
            </MenuItem>
            {fasesProcesso.map((fase) => (
              <MenuItem key={fase.value} value={fase.value}>
                {fase.label}
              </MenuItem>
            ))}
          </Select>
          <TextField
            fullWidth
            label="Observação"
            margin="normal"
            value={novoAndamento.observacoes}
            onChange={(e) => dispatch({ type: "UPDATE_FIELD", field: "observacoes", value: e.target.value })}
          />
          <Button variant="contained" color="primary" onClick={adicionarAndamento}>
            {novoAndamento.id ? "Salvar Alterações" : "Salvar"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Cronologia;
