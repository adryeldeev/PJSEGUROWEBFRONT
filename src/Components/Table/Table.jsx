import PropTypes from "prop-types";
import { CiCircleCheck } from "react-icons/ci";
import { GrChapterNext } from "react-icons/gr";
import { BsSkipBackward } from "react-icons/bs";
import { MdBlock } from "react-icons/md";
import {
  DivContentTable,
  TableContent,
  TableWrapper,
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
  Link,
} from "./TableStyled";
import { useContext } from "react";
import { ApiUrlContext } from '../../Context/ApiUrlProvider';

const Table = ({ columns, data, onEdit, onDelete, back, next }) => {
  const baseUrl = useContext(ApiUrlContext);

  return (
    <DivContentTable>
      <Title>Resultados</Title>
      <TableWrapper>
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
                    {column.accessor === 'activo' ||
                    column.accessor === 'pendencia' ||
                    column.accessor === 'muda_fase' ||
                    column.accessor === 'concedido' ? (
                      row[column.accessor] ? (
                        <CiCircleCheck style={{ color: 'green', fontSize: '15px' }} />
                      ) : (
                        <MdBlock style={{ color: 'red', fontSize: '15px' }} />
                      )
                    ) : column.accessor === 'arquivoUrl' ? (
                      row[column.accessor] ? (
                        <Link href={`${baseUrl}${row[column.accessor]}`} target="_blank" rel="noopener noreferrer">
                          Visualizar
                        </Link>
                      ) : (
                        <MdBlock style={{ color: 'red', fontSize: '15px' }} />
                      )
                    ) : column.accessor === 'faseProcesso' ? (
                      // Aqui garantimos que estamos acessando o nome da fase corretamente
                      row.faseProcesso ? (
                        <>{row.faseProcesso.nome || 'Sem fase'}</>
                      ) : (
                        'Sem fase'
                      )
                    ) : (
                      row[column.accessor] || 'N/A' // Exibe 'N/A' se a propriedade não existir
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
      </TableWrapper>
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
