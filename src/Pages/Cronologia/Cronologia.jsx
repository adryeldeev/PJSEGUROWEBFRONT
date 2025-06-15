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
import Swal from "sweetalert2";

const Cronologia = () => {
  const api = useApi();
  const { id: processoId } = useParams();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editando, setEditando] = React.useState(false);
  const [andamentos, setAndamentos] = React.useState([]);
  const [fasesProcesso, setFasesProcesso] = React.useState([]); // Fases do processo
  const [loading, setLoading] = React.useState(false);
  const [erro, setErro] = React.useState(null);
    const [currentPage, setCurrentPage] = React.useState(0); // Página atual
    const itemsPerPage = 4; // Número de itens por página

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_ANDAMENTO":
        return { ...state, ...action.payload };
      case "UPDATE_FIELD":
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
        const response = await api.get("/fases-processos");
        const { processos } = response.data || [];
        setFasesProcesso(
          processos.map((fase) => ({ label: fase.nome, value: fase.id }))
        );
      } catch {
        setErro("Não foi possível carregar as fases do processo.");
      } finally {
        setLoading(false);
      }
    };
    fetchFasesProcesso();
  }, []);

  React.useEffect(() => {
    fetchAndamentos();
  }, [processoId]);

  const fetchAndamentos = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/andamentos?processoId=${processoId}`);

      if (Array.isArray(response.data.andamentos)) {
        setAndamentos(
          response.data.andamentos.sort((a, b) => new Date(a.data) - new Date(b.data)) // Ordenação correta
        );
      } else {
        setAndamentos([]);
      }
    } catch (error) {
      setErro("Não foi possível carregar os andamentos.");
    } finally {
      setLoading(false);
    }
  };

  const adicionarOuEditarAndamento = async () => {
    if (!novoAndamento.faseProcessoId || novoAndamento.faseProcessoId === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, selecione uma fase válida.",
      });
      return;
    }
const dateOnly = novoAndamento.data;
const dateWithLocalTime = new Date(dateOnly + "T12:00:00"); // adiciona hora local

const andamentoData = {
  observacoes: novoAndamento.observacoes,
  faseProcessoId: Number(novoAndamento.faseProcessoId),
  processoId: Number(processoId),
  data: dateWithLocalTime.toISOString(), // evita conversão para o dia anterior
};

    try {
      if (novoAndamento.id) {
        // Atualizar andamento existente
        await api.put(`/updateProcessos/${processoId}}`, andamentoData);
        Swal.fire({
          icon: "success",
          title: "Sucesso!",
          text: "Andamento atualizado com sucesso!",
        });
      } else {
        // Criar um novo andamento
        await api.post("/createAndamento", andamentoData);
        Swal.fire({
          icon: "success",
          title: "Sucesso!",
          text: "Novo andamento adicionado com sucesso!",
        });
      }

      fetchAndamentos();
      setModalOpen(false);
      setEditando(false);
      dispatch({
        type: "SET_ANDAMENTO",
        payload: { id: null, data: "", faseProcessoId: "", observacoes: "" },
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Ocorreu um erro ao salvar o andamento.",
      });
    }
  };

  const excluirAndamento = async (id) => {
    // Confirmação antes de excluir
    Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderá reverter esta ação!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, excluir!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true); // Set loading to true while deleting
          const response = await api.delete(`/deleteAndamento/${id}`); // Correct URL and method

          if (response.status === 200 || response.status === 204) { // Check for successful deletion (200 or 204)
            setAndamentos(andamentos.filter((item) => item.id !== id)); // Update state after successful deletion

            Swal.fire("Deletado!", "O andamento foi excluído com sucesso.", "success");
          } else {
            console.error("Erro ao excluir andamento:", response.status, response.data);
            Swal.fire({
              icon: "error",
              title: "Erro",
              text: "Falha ao excluir o andamento. Tente novamente mais tarde.",
            });
          }
        } catch (error) {
          console.error("Erro na requisição de exclusão:", error);
          Swal.fire({
            icon: "error",
            title: "Erro",
            text: "Ocorreu um erro ao excluir o andamento. Tente novamente mais tarde.",
          });
        } finally {
          setLoading(false); // Set loading to false after request completes, regardless of success/failure
        }
      }
    });
  };

  const onEdit = (row) => {
    // Preenche os dados do andamento selecionado para edição
    dispatch({ type: "SET_ANDAMENTO", payload: row });
    setModalOpen(true);
    setEditando(true);
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < andamentos.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBackPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedData = Array.isArray(andamentos)
    ? andamentos.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    : [];

  const totalPages = Math.ceil(andamentos.length / itemsPerPage);

  const columns = [
    { header: "Cod.", accessor: "id" },
    { header: "Data", accessor: "data" },
    { header: "Fase", accessor: "faseProcesso" }, // Usando `faseProcesso` diretamente
    { header: "Observações", accessor: "observacoes" },
  ];

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
            columns={columns}
            data={paginatedData}
            onEdit={onEdit} 
            onDelete={(row) => excluirAndamento(row.id)}
            back={handleBackPage}
            next={handleNextPage}
            currentPage={currentPage}
            totalPages={totalPages}
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
                     {fase.data.split("-").reverse().join("/")}
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
          <Button variant="contained" color="primary" onClick={adicionarOuEditarAndamento}>
            {novoAndamento.id ? "Salvar Alterações" : "Salvar"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Cronologia;
