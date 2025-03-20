import { useReducer, useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, MenuItem, Button } from "@mui/material";
import Toggle from "../../Components/Toggle/Toggle";
import useApi from "../../Api/Api";
import { useParams } from "react-router-dom";
import Table from "../../Components/Table/Table";
import Swal from "sweetalert2";

const CheckList = () => {
  const { id: processoId } = useParams();
  const api = useApi();
  const [modalOpen, setModalOpen] = useState(false);
  const [checkList, setCheckList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [editingId, setEditingId] = useState(null); // Armazena ID para edição
  const itemsPerPage = 4;

  const initialState = {
    descricao: "",
    obrigatorio: false,
    entregue: false,
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
        return { ...state, entregue: !state.entregue };
      case "SET_FILE":
        return { ...state, arquivo: action.value };
      case "RESET":
        return initialState;
      case "SET_EDIT":
        return { ...action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/checklist/${processoId}`); // Filtra pelo ID do processo
        setCheckList(response.data);
      } catch (err) {
        console.error("Erro ao buscar checklist:", err);
      }
    };
  
    if (processoId) { // Só busca se o processoId estiver disponível
      fetchData();
    }
  }, [processoId]);

  const handleFileChange = (e) => {
    dispatch({ type: "SET_FILE", value: e.target.files[0] });
  };

  const adicionarOuAtualizarCheckList = async () => {
    if (!state.descricao) {
      alert("A descrição é obrigatória.");
      return;
    }
  
    const formData = new FormData();
    formData.append("descricao", state.descricao);
    formData.append("obrigatorio", state.obrigatorio ? "true" : "false");
    formData.append("entregue", state.entregue ? "true" : "false");
    formData.append("processoId", Number(processoId));
  
    if (state.arquivo) {
      formData.append("file", state.arquivo);  // Adiciona o arquivo, mas só se existir
    }
    
    try {
      let response;
      if (editingId) {
        response = await api.put(`/updateChecklist/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        Swal.fire({
          icon: "success",
          title: "Sucesso!",
          text: "Check list atualizao com sucesso!",
        });
      } else {
        response = await api.post("/createChecklist", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        Swal.fire({
          icon: "success",
          title: "Sucesso!",
          text: "Check list cadastrado com sucesso!",
        });
      }

      if (response.status === 201 || response.status === 200) {
        if (editingId) {
          // Atualiza o checklist existente no estado
          setCheckList((prev) =>
              prev.map((item) =>
                  item.id === editingId ? { ...item, ...response.data } : item
              )
          );
   
      } else {
          // Adiciona o novo checklist ao estado
          setCheckList([...checkList, response.data]);
         
      }
        setModalOpen(false);
        dispatch({ type: "RESET" });
        setEditingId(null);
      }
    } catch (error) {
      alert("Erro ao salvar checklist.");
      console.error("Erro ao adicionar/atualizar checklist:", error);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    dispatch({ type: "SET_EDIT", payload: item });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este checklist?")) return;

    try {
      const response = await api.delete(`/deleteChecklist/${id}`);
      if (response.status === 200) {
        setCheckList((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      alert("Erro ao excluir checklist.");
      console.error("Erro ao excluir checklist:", error);
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

  const paginatedData = Array.isArray(checkList) ? checkList.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage) : [];
  const totalPages = Math.ceil(checkList.length / itemsPerPage);

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
        onEdit={handleEdit} // Adiciona funcionalidade de edição
        onDelete={(row) => handleDelete(row.id)} // Adiciona funcionalidade de exclusão
       
        currentPage={currentPage}
        totalPages={totalPages}
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
              onClick={() => dispatch({ type: "TOGGLE_OBRIGATORIO" })}
            />
          </MenuItem>

          <MenuItem>
            <label htmlFor="toggle-entregue">Entregue *</label>
            <Toggle
              id="toggle-entregue"
              checked={state.entregue}
              onClick={() => dispatch({ type: "TOGGLE_ENTREGA" })}
            />
          </MenuItem>

          <MenuItem>
            <TextField
              fullWidth
              label="Upload arquivo "
              type="file"
              margin="normal"
              InputLabelProps={{ shrink: true }}
              onChange={handleFileChange}
            />
          </MenuItem>

          <Button variant="contained" color="primary" onClick={adicionarOuAtualizarCheckList}>
            {editingId ? "Atualizar" : "Salvar"}
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default CheckList;
