import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableBody,
  IconButton,
  Link,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

import { useState } from "react";
import moment from "moment";

export default function TableComponent({
  tableColumns,
  searchResults,
  setSearchResults,
  type,
  handleEdit,
  handleDelete,
}) {
  const [sortBy, setSortBy] = useState("");
  const [sortDirection, setSortDirection] = useState("desc");

  function handleSort(column) {
    if (column === sortBy) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      setSearchResults([...searchResults].reverse());
    } else {
      setSortDirection("desc");
      setSortBy(column);

      sortTable(column);
    }
  }

  function sortTable(column) {
    const key = tableColumns.find((item) => item.label === column)?.key;

    if (!key) return;

    setSearchResults(
      searchResults.sort((a, b) => {
        if (a[key] === null) {
          return 1;
        } else if (b[key] === null) {
          return -1;
        } else {
          return a[key].localeCompare(b[key]);
        }
      })
    );
  }

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          {tableColumns.map((column) => (
            <TableCell
              key={column.key}
              sx={{
                display: {
                  xs: column.xsHide ? "none" : "table-cell",
                  md: "table-cell",
                },
              }}
            >
              {column.label}
              <TableSortLabel
                active={sortBy === column.key}
                direction={sortDirection}
                onClick={() => handleSort(column.label)}
              />
            </TableCell>
          ))}

          {type === "users" && <TableCell>Actions</TableCell>}
        </TableRow>
      </TableHead>
      <TableBody>
        {searchResults.map((data) => (
          <TableRow key={data.id}>
            {tableColumns.map((column) => {
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
                    <Link href={value} target="_blank">
                      {value}
                    </Link>
                  ) : column.key === "endDate" ? (
                    moment(value).format("DD.MM.YYYY.")
                  ) : (
                    value
                  )}
                </TableCell>
              );
            })}

            {type === "users" && (
              <TableCell>
                <IconButton
                  size="small"
                  onClick={() => handleEdit(data)}
                  sx={{
                    marginInline: 0.25,
                    color: "white",
                    backgroundColor: "#1976d2",
                    borderRadius: 1,
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDelete(data)}
                  sx={{
                    marginInline: 0.25,
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
      </TableBody>
    </Table>
  );
}
