import { TableCell, TableRow, IconButton } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Link from "@mui/material/Link";

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
      <TableCell
        sx={{
          display: { xs: "none", sm: "table-cell" },
        }}
      >
        {user.loginEmail}
      </TableCell>
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
          onClick={(e) => editHandler(e, user, user.id)}
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
          onClick={(e) => handleDelete(e, user.id)}
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

function CompanyPost({ company }) {
  return (
    <TableRow key={company.id} className={company.name}>
      <TableCell>{company.name}</TableCell>
      <TableCell
        sx={{
          display: { xs: "none", sm: "table-cell" },
        }}
      >
        {company.domain}
      </TableCell>
      <TableCell
        sx={{
          display: { xs: "none", sm: "table-cell" },
        }}
      >
        {company.abcCategory}
      </TableCell>
      <TableCell
        sx={{
          display: { xs: "none", md: "table-cell" },
        }}
      >
        {company.budgetPlanningMonth}
      </TableCell>
      <TableCell>
        <Link href={company.webUrl}>{company.webUrl}</Link>
      </TableCell>
    </TableRow>
  );
}

function ProjectPost({ project }) {
  return (
    <TableRow key={project.id} className={project.name}>
      <TableCell>{project.name}</TableCell>
      <TableCell
        sx={{
          display: { xs: "none", sm: "table-cell" },
        }}
      >
        {project.category}
      </TableCell>
      <TableCell>{project.IdFRResp}</TableCell>
      <TableCell
        sx={{
          display: { xs: "none", sm: "table-cell" },
        }}
      >
        {project.endDate}
      </TableCell>
      <TableCell
        sx={{
          display: { xs: "none", md: "table-cell" },
        }}
      >
        {project.FRgoal}
      </TableCell>
    </TableRow>
  );
}

export { UserPost, CompanyPost, ProjectPost };
