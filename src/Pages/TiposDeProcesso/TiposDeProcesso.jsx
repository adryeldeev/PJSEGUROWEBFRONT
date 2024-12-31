import { useState } from 'react';
import ButtonPlus from '../../Components/ButtonPlus/ButtonPlus';
import Table from '../../Components/Table/Table';
import { ContentTipos, DivInfo, TituloText } from './TiposDeProcessoStyle';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const TiposDeProcesso = () => {
  const navigate = useNavigate()

    const [data, setData] = useState([
    { id: 1, name: "Processo 1", active: "Sim" },
    { id: 2, name: "Processo 2", active: "Não" },
  ]);
  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Nome", accessor: "name" },
    { header: "Ativo", accessor: "active" },
  ];

  // Função para editar um item
  const handleEdit = (row) => {
    const newName = prompt("Digite o novo nome:", row.name);
    if (newName) {
      const updatedData = data.map((item) =>
        item.id === row.id ? { ...item, name: newName } : item
      );
      setData(updatedData);
      console.log("Item atualizado:", row.id, "Novo nome:", newName);
    }
  };

  // Função para deletar um item
  const handleDelete = (row) => {
    const confirmDelete = window.confirm(`Tem certeza que deseja excluir "${row.name}"?`);
    if (confirmDelete) {
      const filteredData = data.filter((item) => item.id !== row.id);
      setData(filteredData);
      console.log("Item deletado:", row.id);
    }
  };

  const handleNavigate=()=>{
    navigate('/cadastrar-tipo-de-processo')
  }
  return (
    <ContentTipos>
      <DivInfo>
        <TituloText>Lista de Tipos de Processo</TituloText>
        <ButtonPlus
      text="Novo"
      backgroundColor="blue"
      Icon={AiOutlinePlusCircle}
      onClick={handleNavigate}
/>
      </DivInfo>
      <Table columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete} />
    </ContentTipos>
  );
};

export default TiposDeProcesso;
