import { useState, useEffect } from "react";

import UserForm from "../forms/UserForm";
import EditUserForm from "../forms/EditUserForm";

import {
  Button,
  TableCell,
  TableHead,
  Paper,
  TableContainer,
  TableRow,
  TableBody,
  Table,
  TableSortLabel,
  Container,
} from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";

import { UserSearchBar, CompanySearchBar } from "../search_bar/SearchBar";
import { UserListPage } from "../search_bar/ListPage";

export default function Users() {
  const [openUserFormModal, setOpenUserFormModal] = useState(false);
  const [openEditFormModal, setEditFormModal] = useState(false);
  const [bestUser, setUser] = useState([]);
  const [id, setId] = useState();

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
        setPosts(json);
        setSearchResults(json);
      });
  }
  const filterTypes = [
    {
      value: "Name",
    },
    {
      value: "Surname",
    },
    {
      value: "Nickname",
    },
    {
      value: "E-mail",
    },
    {
      value: "Max authorization level",
    },
  ];

  const handleDelete = (e, id) => {
    let JWToken = JSON.parse(localStorage.getItem("loginInfo")).JWT;

    fetch("http://159.65.127.217:8080/users/" + id, {
      method: "DELETE",
      headers: {
        googleTokenEncoded: JWToken.credential,
      },
    }).then((response) => fetchUsers());
  };

  function handleEdit(e, user) {
    setEditFormModal(true);
    setUser(user);
    setId(user.id);
  }

  const [filterBy, setFilterBy] = useState("Name");
  const [filterDirection, setFilterDirection] = useState("asc");

  const handleFilterResults = (property) => (event) => {
    let filterByCategory = property;
    if (filterByCategory === filterBy) {
      reverseFunction();
    } else {
      setFilterBy(filterByCategory);
      filterFunction(filterByCategory);
      setFilterDirection("asc");
    }
  };

  function reverseFunction() {
    let reversana = searchResults.reverse();

    setFilterDirection((oldFilterDirection) => {
      if (oldFilterDirection === "asc") return "desc";
      else return "asc";
    });
    setSearchResults(reversana);
  }

  function filterFunction(filterBy) {
    let filtrirana;

    if (filterBy === "Name") {
      filtrirana = searchResults.sort((a, b) =>
        a.firstName.localeCompare(b.firstName)
      );
    } else if (filterBy === "Surname") {
      filtrirana = searchResults.sort((a, b) =>
        a.lastName.localeCompare(b.lastName)
      );
    } else if (filterBy === "Nickname") {
      filtrirana = searchResults.sort((a, b) =>
        a.nickname.localeCompare(b.nickname)
      );
    } else if (filterBy === "E-mail") {
      filtrirana = searchResults.sort((a, b) =>
        a.loginEmail.localeCompare(b.loginEmail)
      );
    } else if (filterBy === "Max authorization level") {
      filtrirana = searchResults.sort((a, b) =>
        a.authority.localeCompare(b.authority)
      );
    }

    setSearchResults(filtrirana);
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
        id={id}
        fetchUsers={fetchUsers}
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
                {filterTypes.map((cellName) => (
                  <TableCell
                    key={cellName.value}
                    sx={
                      cellName.value === "Nickname" ||
                      cellName.value === "E-mail"
                        ? { display: { xs: "none", sm: "table-cell" } }
                        : cellName.value === "Max authorization level"
                        ? {
                            display: { xs: "none", md: "table-cell" },
                          }
                        : { undefined }
                    }
                  >
                    {cellName.value}
                    <TableSortLabel
                      active={filterBy === cellName.value}
                      direction={
                        filterBy === cellName.value ? filterDirection : "asc"
                      }
                      onClick={handleFilterResults(cellName.value)}
                    ></TableSortLabel>
                  </TableCell>
                ))}
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <UserListPage
                searchResults={searchResults}
                editHandler={handleEdit}
                handleDelete={handleDelete}
              />
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
