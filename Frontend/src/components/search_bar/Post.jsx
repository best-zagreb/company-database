import {
  Box,
  TextField,
  TableCell,
  TableHead,
  Paper,
  TableContainer,
  TableRow,
  TableBody,
  Table,
} from "@mui/material";
import Button from "@mui/material/Button";
import Users from "../pages/Users";

function UserPost({ user, editHandler, handleDelete }) {
  return (
    <TableRow key={user.id} className={user.lastName}>
      <TableCell>{user.firstName}</TableCell>
      <TableCell>{user.lastName}</TableCell>
      <TableCell>{user.nickname ? user.nickname : ""}</TableCell>
      <TableCell>{user.loginEmailString}</TableCell>
      <TableCell>{user.authority}</TableCell>
      <TableCell>
        <Button
          variant="outlined"
          size="large"
          onClick={(e) => editHandler(e, user)}
        >
          Edit
        </Button>

        <Button
          variant="outlined"
          size="large"
          onClick={(e) => handleDelete(e, user.loginEmailString)}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}

function CompanyPost({ company, handleDelete }) {
  return (
    <TableRow key={company.id} className={company.companyName}>
      <TableCell>{company.companyName}</TableCell>
      <TableCell>{company.industry}</TableCell>
      <TableCell>{company.ABC }</TableCell>
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

export {UserPost,CompanyPost}
