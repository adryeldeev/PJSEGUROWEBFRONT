import * as React from "react";
import { Button, Modal, Box, TextField, Typography } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Table from "../../Components/Table/Table";

const Cronologia = () => {
  

const [andamentos, setAndamentos] = React.useState([
  { id: 1, data: "03/02/2021", operador: "Felipe Ribeiro", observacao: "Andamento inicial", fase: "Pré-cadastro" },
]);

const [modalOpen, setModalOpen] = React.useState(false);
const [editando, setEditando] = React.useState(false); // Estado para alternar entre timeline e tabela
const [novoAndamento, setNovoAndamento] = React.useState({ observacao: "", fase: "" });

// Função para adicionar um novo andamento
const adicionarAndamento = () => {
  if (!novoAndamento.observacao || !novoAndamento.fase) return;

  const novo = {
    id: andamentos.length + 1,
    data: new Date().toLocaleDateString(),
    operador: "Usuário Atual", // Pode pegar do contexto do usuário logado
    observacao: novoAndamento.observacao,
    fase: novoAndamento.fase,
  };

  setAndamentos([novo, ...andamentos]); // Adiciona no topo
  setModalOpen(false);
  setNovoAndamento({ observacao: "", fase: "" }); // Reseta o formulário
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

return (
  <div>
    <Typography variant="h5">Cronologia do Processo</Typography>

    {editando ? (
      // 📌 MODO EDIÇÃO (Tabela e Botões)
      <div>
        <Button variant="contained" color="secondary" onClick={() => setEditando(false)} style={{ marginBottom: 10 }}>
          Voltar
        </Button>

        <Button variant="contained" color="primary" onClick={() => setModalOpen(true)} style={{ margin: "0 10px" }}>
          Novo Andamento
        </Button>

        {/* Tabela de Andamentos */}
        <Table columns={columns} data={andamentos} onDelete={(row) => excluirAndamento(row.id)} />
      </div>
    ) : (
      // 📌 MODO VISUALIZAÇÃO (Timeline)
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

        {/* Botão de Editar (Mostra a tabela) */}
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
          label="Observação"
          margin="normal"
          value={novoAndamento.observacao}
          onChange={(e) => setNovoAndamento({ ...novoAndamento, observacao: e.target.value })}
        />
        <TextField
          fullWidth
          label="Fase"
          margin="normal"
          value={novoAndamento.fase}
          onChange={(e) => setNovoAndamento({ ...novoAndamento, fase: e.target.value })}
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
