import { FaFilePdf, FaFileImage, FaFileWord, FaFileAlt } from "react-icons/fa";

const getFileIcon = (url) => {
  if (!url) return <MdBlock style={{ color: "red", fontSize: "15px" }} />;

  const ext = url.split(".").pop().toLowerCase();

  if (ext === "pdf") return <FaFilePdf style={{ color: "red", fontSize: "20px" }} />;
  if (["jpg", "jpeg", "png", "gif"].includes(ext))
    return <FaFileImage style={{ color: "blue", fontSize: "20px" }} />;
  if (["doc", "docx"].includes(ext))
    return <FaFileWord style={{ color: "blue", fontSize: "20px" }} />;
  
  return <FaFileAlt style={{ color: "gray", fontSize: "20px" }} />;
};

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
                    {column.accessor === "activo" ||
                    column.accessor === "pendencia" ||
                    column.accessor === "muda_fase" ||
                    column.accessor === "concedido" ? (
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
                      row.faseProcesso ? (
                        <>{row.faseProcesso.nome || "Sem fase"}</>
                      ) : (
                        "Sem fase"
                      )
                    ) : (
                      row[column.accessor] || "N/A"
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
