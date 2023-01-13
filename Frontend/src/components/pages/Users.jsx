import { useState, useEffect } from "react";

import UserForm from "../forms/UserForm";
import EditUserForm from "../forms/EditUserForm";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import {
  TableCell,
  TableHead,
  Paper,
  TableContainer,
  TableRow,
  TableBody,
  Table,
  Container,
} from "@mui/material";

import { UserSearchBar, CompanySearchBar } from "../search_bar/SearchBar";
import { UserListPage } from "../search_bar/ListPage";

export default function Users() {
  const [openUserFormModal, setOpenUserFormModal] = useState(false);
  const [openEditFormModal, setEditFormModal] = useState(false);
  const [bestUser, setUser] = useState([]);

  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  function fetchUsers() {
    const JWToken = JSON.parse(localStorage.getItem("loginInfo")).JWT;
    fetch("http://159.65.127.217:8080/users/", {
      method: "GET",
      headers: { googleTokenEncoded: JWToken.credential },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status === 401) {
          console.log(json);
          // display error
        } else {
          setPosts(json);
          setSearchResults(json);
        }
      });
  }

  const handleDelete = (e, email) => {
    e.preventDefault();

    // TODO: sad se salje id u endpointu, ne email u tijelu
    fetch("http://159.65.127.217:8080/users/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Basic " + window.btoa("admin:pass"),

        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then((response) => response.json())
      .then((json) => {
        fetchUsers();
      });
  };

  function editHandler(e, user) {
    e.preventDefault();
    setEditFormModal(true);
    setUser(user);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <UserForm
        openModal={openUserFormModal}
        setOpenModal={setOpenUserFormModal}
        fetchUsers={fetchUsers}
      />
      <EditUserForm
        openModal={openEditFormModal}
        setOpenModal={setEditFormModal}
        bestuser={bestUser}
      />

      <Container
        maxWidth="false"
        sx={{
          paddingBlock: 1.5,

          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
        }}
      >
        <UserSearchBar posts={posts} setSearchResults={setSearchResults} />

        <Button
          variant="contained"
          size="medium"
          startIcon={<AddCircleIcon />}
          onClick={() => setOpenUserFormModal(true)}
        >
          Add user
        </Button>
      </Container>

      <Container maxWidth="false">
        <TableContainer component={Paper}>
          <Table size="small" aria-label="users table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Surname</TableCell>
                <TableCell
                  sx={{
                    display: { xs: "none", sm: "table-cell" },
                  }}
                >
                  Nickname
                </TableCell>
                <TableCell>E-mail</TableCell>
                <TableCell
                  sx={{
                    display: { xs: "none", md: "table-cell" },
                  }}
                >
                  Max authorization level
                </TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchResults ? (
                <UserListPage
                  searchResults={searchResults}
                  editHandler={editHandler}
                  handleDelete={handleDelete}
                />
              ) : (
                "No users in database"
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
