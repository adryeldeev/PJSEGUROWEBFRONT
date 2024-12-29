import PropTypes from "prop-types";
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
} from "./TableStyled"; // Certifique-se de ajustar o caminho para o arquivo styled

const Table = ({ columns, data, onEdit, onDelete }) => {
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
                <Td key={column.accessor}>{row[column.accessor]}</Td>
              ))}
              {(onEdit || onDelete) && (
                <Td>
                  {onEdit && (
                    <ButtonEdit onClick={() => onEdit(row)}>Editar</ButtonEdit>
                  )}
                  {onDelete && (
                    <ButtonDelete onClick={() => onDelete(row)}>
                      Deletar
                    </ButtonDelete>
                  )}
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </TableContent>
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
};

export default Table;
