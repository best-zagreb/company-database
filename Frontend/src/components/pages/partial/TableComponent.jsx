import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableBody,
  IconButton,
  Link,
  Box,
  Tooltip,
} from "@mui/material";
import {
  Visibility as DetailsIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

import { useState } from "react";
import moment from "moment";

export default function TableComponent({
  tableColumns,
  searchResults,
  setSearchResults,
  handleView,
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
        } else if (key === "frresp") {
          (a[key].firstName + " " + a[key].lastName).localeCompare(
            b[key].firstName + " " + b[key].lastName
          );
        } else {
          // toString needed when sorting numbers
          return a[key].toString().localeCompare(b[key].toString());
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

          <TableCell align="center">Actions</TableCell>
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

            <TableCell>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.5,
                  flexWrap: "wrap",
                }}
              >
                <Tooltip title="Details">
                  <IconButton
                    size="small"
                    onClick={() => handleView(data)}
                    sx={{
                      color: "white",
                      backgroundColor: "#1976d2",
                      borderRadius: 1,
                    }}
                  >
                    <DetailsIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                  <IconButton
                    size="small"
                    onClick={() => handleEdit(data)}
                    sx={{
                      color: "white",
                      backgroundColor: "#1976d2",
                      borderRadius: 1,
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(data)}
                    sx={{
                      color: "white",
                      backgroundColor: "#1976d2",
                      borderRadius: 1,
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
