import { FaFilePdf, FaFileImage, FaFileWord, FaFileAlt } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";
import { GrChapterNext } from "react-icons/gr";
import { BsSkipBackward } from "react-icons/bs";
import { MdBlock } from "react-icons/md";
import PropTypes from "prop-types";
import { useContext } from "react";
import { ApiUrlContext } from "../../Context/ApiUrlProvider";
import { 
  ButtonDelete, 
  ButtonEdit, 
  ButtonsDiv, 
  DivContentTable, 
  Link, 
  TableContent, 
  TableWrapper, 
  Tbody, 
  Td, 
  Th, 
  Thead, 
  Title, 
  Tr, 
  PageInfo, 
  NavigationButton 
} from "./TableStyled";

const getFileIcon = (url) => {
  if (!url) return <MdBlock style={{ color: "red", fontSize: "20px" }} />;

  const ext = url.split(".").pop().toLowerCase();

  const icons = {
    pdf: <FaFilePdf style={{ color: "red", fontSize: "20px" }} />,
    image: <FaFileImage style={{ color: "blue", fontSize: "20px" }} />,
    word: <FaFileWord style={{ color: "blue", fontSize: "20px" }} />,
    default: <FaFileAlt style={{ color: "gray", fontSize: "20px" }} />,
  };

  if (["jpg", "jpeg", "png", "gif"].includes(ext)) return icons.image;
  if (["doc", "docx"].includes(ext)) return icons.word;
  return icons[ext] || icons.default;
};

const formatDate = (date) => {
  if (!date) return "N/A";
  const parsedDate = new Date(date);
  return isNaN(parsedDate) ? "Data inválida" : parsedDate.toLocaleDateString("pt-BR");
};

const Table = ({ columns, data, onEdit, onDelete, back, next, currentPage, totalPages }) => {
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
            {data.map((row) => (
              <Tr key={row.id}>
                {columns.map((column) => (
                  <Td key={column.accessor} data-label={column.header}>
                    {[ 
                      "activo", 
                      "pendencia", 
                      "muda_fase", 
                      "concedido", 
                      "obrigatorio", 
                      "entregue"
                    ].includes(column.accessor) ? (
                      row[column.accessor] ? (
                        <CiCircleCheck style={{ color: "green", fontSize: "15px" }} />
                      ) : (
                        <MdBlock style={{ color: "red", fontSize: "15px" }} />
                      )
                    ) : column.accessor === "arquivoUrl" ? (
                      row[column.accessor] ? (
                        <Link
                          href={`${baseUrl}${row[column.accessor]}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: "flex", alignItems: "center", gap: "5px" }}
                        >
                          {getFileIcon(row[column.accessor])}
                          Visualizar
                        </Link>
                      ) : (
                        <MdBlock style={{ color: "red", fontSize: "15px" }} />
                      )
                    ) : column.accessor === "faseProcesso" ? (
                      row.faseProcesso?.nome || "Sem fase"
                    ) : column.accessor.toLowerCase().includes("data") ? (
                      formatDate(row[column.accessor])
                    ) : (
                      row[column.accessor] || "N/A"
                    )}
                  </Td>
                ))}
                {(onEdit || onDelete) && (
                  <Td data-label="Ações">
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
        <NavigationButton onClick={back} disabled={currentPage === 0}>
          <BsSkipBackward />
        </NavigationButton>

        <PageInfo>
          Página {currentPage + 1} de {totalPages}
        </PageInfo>

        <NavigationButton
          onClick={next}
          disabled={currentPage === totalPages - 1}
        >
          <GrChapterNext />
        </NavigationButton>
      </ButtonsDiv>
    </DivContentTable>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({ accessor: PropTypes.string.isRequired, header: PropTypes.string.isRequired })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  back: PropTypes.func,
  next: PropTypes.func,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default Table;