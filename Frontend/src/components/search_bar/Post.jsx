import { TableCell, TableRow, Button, IconButton } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function UserPost({ user, editHandler, handleDelete }) {
  return (
    <TableRow key={user.id}>
      <TableCell>{user.firstName}</TableCell>
      <TableCell>{user.lastName}</TableCell>
      <TableCell
        sx={{
          display: { xs: "none", sm: "table-cell" },
        }}
      >
        {user.nickname ? user.nickname : ""}
      </TableCell>
      <TableCell>{user.loginEmailString}</TableCell>
      <TableCell
        sx={{
          display: { xs: "none", md: "table-cell" },
        }}
      >
        {user.authority}
      </TableCell>
      <TableCell>
        <IconButton
          size="small"
          aria-label="edit user"
          onClick={(e) => editHandler(e, user)}
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
          aria-label="delete user"
          onClick={(e) => handleDelete(e, user.loginEmailString)}
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
    </TableRow>
  );
}

function CompanyPost({ company, handleDelete }) {
  return (
    <TableRow key={company.id}>
      <TableCell>{company.companyName}</TableCell>
      <TableCell>{company.industry}</TableCell>
      <TableCell>{company.ABC}</TableCell>
      <TableCell>{company.budgetPlanning}</TableCell>
      <TableCell>{company.website}</TableCell>
      <TableCell>
        <Button
          variant="outlined"
          size="large"
          onClick={(e) => handleDelete(e, company.companyName)}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}

export { UserPost, CompanyPost };
