import { useReducer, useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, MenuItem, Button } from "@mui/material";
import Toggle from "../../Components/Toggle/Toggle";
import { Table } from "lucide-react";
import useApi from "../../Api/Api";
import { useParams } from "react-router-dom";

const CheckList = () => {
  const { id: processoId } = useParams();
  const api = useApi();
  const [modalOpen, setModalOpen] = useState(false);
  const [checkList, setCheckList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  const initialState = {
    descricao: "",
    obrigatorio: false,
    entrega: false,
    arquivo: null,
    processoId: Number(processoId),
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_FIELD":
        return { ...state, [action.field]: action.value };
      case "TOGGLE_OBRIGATORIO":
        return { ...state, obrigatorio: !state.obrigatorio };
      case "TOGGLE_ENTREGA":
        return { ...state, entrega: !state.entrega };
      case "SET_FILE":
        return { ...state, arquivo: action.value };
      case "RESET":
        return initialState;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/checklist");
        setCheckList(response.data);
      } catch (err) {
        console.error("Erro ao buscar documentos:", err);
      }
    };
    fetchData();
  }, []);

  const handleFileChange = (e) => {
    dispatch({ type: "SET_FILE", value: e.target.files[0] });
  };

  const adicionarCheckList = async () => {
    const checkData = {
      descricao: state.descricao,
      obrigatorio: state.obrigatorio,
      entregue: state.entrega,
      arquivo: state.arquivo ? state.arquivo : null,
      processoId: Number(processoId),
    };

    try {
      await api.post("/checklist", checkData);
      setCheckList([...checkList, checkData]); // Atualiza lista localmente
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao adicionar checklist:", error);
    }
  };

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Arquivo", accessor: "arquivoUrl" },
    { header: "Descrição", accessor: "descricao" },
    { header: "Obrigatório", accessor: "obrigatorio" },
    { header: "Entregue", accessor: "entregue" },
  ];

  const handleNextPage = () => {
    if (currentPage < Math.ceil(checkList.length / itemsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBackPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedData = checkList.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <>
      <Typography variant="h5">CheckList</Typography>

      <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>
        + Adicionar
      </Button>

      <Table
        columns={columns}
        data={paginatedData}
        back={handleBackPage}
        next={handleNextPage}
        onDelete={(row) => console.log("Excluindo andamento", row.id)}
      />

      {/* Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={{ width: 400, padding: 4, backgroundColor: "white", margin: "auto", marginTop: "10%" }}>
          <TextField
            fullWidth
            label="Descrição *"
            type="text"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={state.descricao}
            onChange={(e) => dispatch({ type: "UPDATE_FIELD", field: "descricao", value: e.target.value })}
          />

          <MenuItem>
            <label htmlFor="toggle-obrigatorio">Obrigatório *</label>
            <Toggle
              id="toggle-obrigatorio"
              checked={state.obrigatorio}
              label="Ativo"
              onClick={() => dispatch({ type: "TOGGLE_OBRIGATORIO" })}
            />
          </MenuItem>

          <MenuItem>
            <label htmlFor="toggle-entregue">Entregue *</label>
            <Toggle
              id="toggle-entregue"
              checked={state.entrega}
              label="Ativo"
              onClick={() => dispatch({ type: "TOGGLE_ENTREGA" })}
            />
          </MenuItem>

          <MenuItem>
            <TextField
              fullWidth
              label="Upload arquivo *"
              type="file"
              margin="normal"
              InputLabelProps={{ shrink: true }}
              onChange={handleFileChange}
            />
          </MenuItem>

          <Button variant="contained" color="primary" onClick={adicionarCheckList}>
            Salvar
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default CheckList;
