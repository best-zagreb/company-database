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

// TODO: move tableColumn from here to Page component so its passed as a prop to TableComponent
const tableColumns = {
  users: [
    { key: "firstName", label: "Name" },
    { key: "lastName", label: "Surname" },
    { key: "nickname", label: "Nickname", xsHide: true },
    { key: "loginEmail", label: "E-mail", xsHide: true },
    { key: "authority", label: "Max authorization level", xsHide: true },
  ],
  companies: [
    { key: "name" },
    { key: "domain" },
    { key: "abcCategory", xsHide: true },
    {
      key: "budgetPlanningMonth",
      xsHide: true,
    },
    { key: "webUrl", xsHide: true },
  ],
  projects: [
    { key: "name" },
    { key: "category", xsHide: true },
    { key: "frresp" },
    { key: "endDate", xsHide: true },
    { key: "frgoal", xsHide: true },
  ],
};

export default function TableComponent({
  type,
  searchResults,
  setSearchResults,
  handleEdit,
  handleDelete,
  // tableColumns
}) {
  const [sortBy, setSortBy] = useState("Name");
  const [sortDirection, setSortDirection] = useState("desc");

  function handleFilter(column) {
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
    const key = tableColumns[type].find((item) => item.label === column)?.key;

    if (!key) return;

    setSearchResults(
      searchResults.sort((a, b) => {
        if (a[key] == null || b[key] == null) {
          return 0;
        }
        return a[key].localeCompare(b[key]);
      })
    );
  }

  return (
    <Table size="small" aria-label="table">
      <TableHead>
        <TableRow>
          {tableColumns[type].map((column) => (
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
                onClick={() => handleFilter(column.label)}
              />
            </TableCell>
          ))}

          {type === "users" && <TableCell>Actions</TableCell>}
        </TableRow>
      </TableHead>
      <TableBody>
        {searchResults.map((data) => (
          <TableRow key={data.id}>
            {tableColumns[type].map((column) => {
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
      </TableBody>
    </Table>
  );
}
