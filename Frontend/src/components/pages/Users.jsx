import { useState, useEffect } from "react";
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

import SearchBar from "../search_bar/SearchBar";
import ListPage from "../search_bar/ListPage";
export default function Users() {
  const [openUserFormModal, setOpenUserFormModal] = useState(false);
  const [openEditFormModal, setEditFormModal] = useState(false);
  const[bestUser,setUser] = useState([])

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

  function editHandler(e, user) {
    e.preventDefault();
    setEditFormModal(true)
    setUser(user)
  }


  const [posts, setPosts] = useState([])
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
      setPosts(usersData)
      setSearchResults(usersData)
  }, [])
  

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

      <SearchBar posts = {posts}  setSearchResults = {setSearchResults} id = "trazilica"/>
     
    
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Surname</TableCell>
            <TableCell>Nickname</TableCell>
            <TableCell>E-mail</TableCell>
            <TableCell>Authorization level</TableCell>
            <TableCell>Edit User</TableCell>
            <TableCell>Delete User</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <ListPage searchResults = {searchResults} editHandler = {editHandler} handleDelete = {handleDelete} />
          </TableBody>
        </Table>
      </TableContainer>

    </>
  );
}
