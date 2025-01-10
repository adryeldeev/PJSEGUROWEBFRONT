import PropTypes from "prop-types";
import { CiCircleCheck } from "react-icons/ci";
import { GrChapterNext } from "react-icons/gr";
import { BsSkipBackward } from "react-icons/bs";
import { MdBlock } from "react-icons/md";
import {
  DivContentTable,
  TableContent,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  ButtonDelete,
  ButtonEdit,
  Title,
  ButtonsDiv,
  ButtonAdd,
} from "./TableStyled"; // Certifique-se de ajustar o caminho para o arquivo styled

const Table = ({ columns, data, onEdit, onDelete, back, next }) => {
  return (
    <DivContentTable>
      <Title>Resultados</Title>
      <TableContent>
        <Thead>
          <Tr>
            {columns.map((column) => (
              <Th key={column.accessor}>{column.header}</Th>
            ))}
            {(onEdit || onDelete) && <Th>Ações</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {columns.map((column) => (
                <Td key={column.accessor}>
                {column.accessor === 'activo' ? (
                  row[column.accessor] ? (
                    <CiCircleCheck style={{ color: 'green', fontSize: '15px' }} />
                  ) : (
                    <MdBlock style={{ color: 'red' }} />
                  )
                ) : column.accessor === 'pendencia' ? (
                  row[column.accessor] ? (
                    <CiCircleCheck style={{ color: 'green', fontSize: '15px' }} />
                  ) : (
                    <MdBlock style={{ color: 'red' }} />
                  )
                ) : column.accessor === 'muda_fase'?(
                  row[column.accessor] ? (
                    <CiCircleCheck style={{ color: 'green', fontSize: '15px' }} />
                  ) : (
                    <MdBlock style={{ color: 'red', fontSize: '15px' }} />
                  )
                ) : (
                  row[column.accessor]
                )}
              </Td>
              ))}
              {(onEdit || onDelete) && (
                <Td>
                  {onEdit && <ButtonEdit onClick={() => onEdit(row)}>Editar</ButtonEdit>}
                  {onDelete && <ButtonDelete onClick={() => onDelete(row)}>Deletar</ButtonDelete>}
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </TableContent>
      <ButtonsDiv>
        <ButtonAdd>
          <BsSkipBackward onClick={back} />
        </ButtonAdd>
        <ButtonAdd>
          <GrChapterNext onClick={next} />
        </ButtonAdd>
      </ButtonsDiv>
    </DivContentTable>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  back: PropTypes.func,
  next: PropTypes.func,
};

export default Table;
