import {Box, TextField,TableCell, TableHead,Paper,TableContainer,TableRow,TableBody,Table } from "@mui/material";
import Button from "@mui/material/Button";
import Users from "../pages/Users";

function Post(props){
    return(
            <TableRow key={props.user.id} className={props.user.surname}>
              <TableCell>
                {props.user.name}
              </TableCell>
              <TableCell>
                {props.user.surname}
              </TableCell>
              <TableCell>
                {props.user.nickname}
              </TableCell>
              <TableCell>
                {props.user.loginEmail}
              </TableCell>
              <TableCell>
                {props.user.maxAuthLevel}
              </TableCell>
              <TableCell>
                <Button variant="outlined" size="large"
                  onClick={(e) => props.editHandler(e,props.user)}>
                  Edit user
                </Button>
              </TableCell>
              <TableCell>
                <Button variant="outlined" size="large"  
                  onClick={(e) => props.handleDelete(e,props.user.id)}>
                    
                  Delete user
                </Button>
              </TableCell>
            </TableRow>
    )
}

export default Post


