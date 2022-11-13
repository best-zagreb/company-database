import { useState, useEffect } from "react";

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
  const [bestUser, setUser] = useState([]);

  const handleDelete = (e, email) => {
    e.preventDefault();

    console.log(email);
    fetch("http://159.65.127.217:8080/users/delete-user/", {
      method: "DELETE",
      headers: {
        Authorization: "Basic " + window.btoa("admin:pass"),

        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: "jane.doe@gmail.com" }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      });
  };

  function editHandler(e, user) {
    e.preventDefault();
    setEditFormModal(true);
    setUser(user);
  }

  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch("http://159.65.127.217:8080/users/get-users", {
      method: "GET",
      headers: { Authorization: "Basic " + window.btoa("admin:pass") },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status === 401) {
          // display error
        } else {
          setPosts(json);
          setSearchResults(json);
        }
      });
  }, []);

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

      <SearchBar
        posts={posts}
        setSearchResults={setSearchResults}
        id="trazilica"
      />

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Surname</TableCell>
              <TableCell>Nickname</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Authorization level</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <ListPage
              searchResults={searchResults}
              editHandler={editHandler}
              handleDelete={handleDelete}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
