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

import Link from "@mui/material/Link";

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
    <TableRow key={company.id} className={company.name}>
      <TableCell>{company.name}</TableCell>
      <TableCell>{company.domain}</TableCell>
      <TableCell>{company.abcCategory }</TableCell>
      <TableCell>{company.budgetPlanningMonth}</TableCell>
      <TableCell><Link href = {company.webUrl}>{company.webUrl}</Link></TableCell>
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

function ProjectPost({ project , handleDelete }) {
  return (
    <TableRow key={project.id} className={project.name}>
      <TableCell>{project.name}</TableCell>
      <TableCell>{project.category}</TableCell>
      <TableCell>{project.IdFRResp }</TableCell>
      <TableCell>{project.endDate}</TableCell>
      <TableCell>{project.FRgoal}</TableCell>
      <TableCell>
        <Button
          variant="outlined"
          size="large"
          onClick={(e) => handleDelete(e, project.name)}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}

export {UserPost,CompanyPost, ProjectPost}
