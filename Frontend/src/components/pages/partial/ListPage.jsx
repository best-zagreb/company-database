import { TableCell, TableRow, IconButton, Link } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

const columns = {
  user: [
    { key: "firstName" },
    { key: "lastName" },
    { key: "nickname", xsHide: true },
    { key: "loginEmail", xsHide: true },
    { key: "authority", xsHide: true },
  ],
  company: [
    { key: "name" },
    { key: "domain" },
    { key: "abcCategory", xsHide: true },
    {
      key: "budgetPlanningMonth",
      xsHide: true,
    },
    { key: "webUrl", xsHide: true },
  ],
  project: [
    { key: "name" },
    { key: "category", xsHide: true },
    { key: "frresp" },
    { key: "endDate", xsHide: true },
    { key: "frgoal", xsHide: true },
  ],
};

export default function ListPage({
  type,
  searchResults,
  handleEdit,
  handleDelete,
}) {
  return (
    <>
      {searchResults?.length > 0 &&
        searchResults.map((data) => (
          <TableRow key={data.id}>
            {columns[type].map((column) => {
              const value = data[column.key];
              const xsHide = column.xsHide;

              return (
                <TableCell
                  key={column.key}
                  sx={{
                    display: {
                      xs: xsHide ? "none" : "table-cell",
                      md: "table-cell",
                    },
                  }}
                >
                  {column.key === "frresp" ? (
                    value.firstName + " " + value.lastName
                  ) : column.key === "webUrl" ? (
                    <Link href={value} target="_blank" rel="noopener">
                      {value}
                    </Link>
                  ) : (
                    value
                  )}
                </TableCell>
              );
            })}

            {type === "user" && (
              <TableCell>
                <IconButton
                  size="small"
                  aria-label="edit"
                  onClick={() => handleEdit(data)}
                  sx={{
                    margin: 0.25,
                    color: "white",
                    backgroundColor: "#1976d2",
                    borderRadius: 1,
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  aria-label="delete"
                  onClick={() => handleDelete(data)}
                  sx={{
                    margin: 0.25,
                    color: "white",
                    backgroundColor: "#1976d2",
                    borderRadius: 1,
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            )}
          </TableRow>
        ))}
    </>
  );
}
