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

function Post({ user, editHandler, handleDelete }) {
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

export default Post;
