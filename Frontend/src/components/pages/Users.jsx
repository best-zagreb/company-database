import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usersData } from "../../data/users"; // temp data created with mockaroo

import UserForm from "../forms/UserForm";
import EditUserForm from "../forms/EditUserForm";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
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

export default function Users() {
  const [openUserFormModal, setOpenUserFormModal] = useState(false);
  const [openEditFormModal, setEditFormModal] = useState(false);
  const[bestUser,setUser] = useState([])

  // TODO: add correct url to get data from
  // const [users, setUsers] = useState([]);

  // const fetchUsers = async () => {
  //   const data = await fetch("https://localhost:8080/users/get-all").json();

  //   setUsers(data);
  // };

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  //zanemari endpoint ceka se zadnja verzija backenda
  const deleteUser = async (userid) => {
    await fetch("http://localhost:8080/users/delete-user/" + userid, {
      method: "POST",
    });
  };

  const handleDelete = (e, userid) => {
    e.preventDefault();

    console.log("user" + userid + " Deleted");
    deleteUser(userid).then((res) => {
      // display success or error msg
      navigate("/users");
    });
  };
  let navigate = useNavigate();

  function editHandler(e, userid) {
    e.preventDefault();

    navigate(`edit/${userid}`);
  }

  function search(e) {
    e.preventDefault();
    console.log(document.getElementById("search").value);
  }

  return (
    <>
      <Button
        variant="contained"
        size="large"
        startIcon={<AddCircleIcon />}
        onClick={() => setOpenUserFormModal(true)}
      >
        Add user
      </Button>

      <UserForm
        openModal={openUserFormModal}
        setOpenModal={setOpenUserFormModal}
        
      />
         <EditUserForm
        openModal={openEditFormModal}
        setOpenModal={setEditFormModal}
        bestuser={bestUser}
        
      />

      <Box m={1}>
        <TextField id="search" label="Search" variant="filled" />
        <Button variant="contained" size="small" onClick={(e) => search(e)}>
          Search
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User Nickname</TableCell>
              <TableCell>Edit User</TableCell>
              <TableCell>Delete User</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersData.map((user) => (
              <TableRow key={user.id} className={user.nickname}>
                <TableCell>{user.nickname}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={(e) => {setEditFormModal(true)
                                      setUser(user)}}
                  >
                    Edit user
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={(e) => handleDelete(e, user.id)}
                  >
                    Delete user
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
