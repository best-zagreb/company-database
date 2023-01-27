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

import { AddCircle as AddCircleIcon } from "@mui/icons-material";

import { useState, useEffect, useContext } from "react";

import ToastContext from "../../context/ToastContext";

import UserForm from "../forms/UserForm";
import EditUserForm from "../forms/EditUserForm";

import { UserSearchBar, CompanySearchBar } from "./parts/SearchBar";
import { UserListPage } from "./parts/ListPage";

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

export default function Users() {
  const { handleOpenToast } = useContext(ToastContext);

  const [openUserFormModal, setOpenUserFormModal] = useState(false);
  const [openEditFormModal, setEditFormModal] = useState(false);
  const [bestUser, setUser] = useState([]);
  const [id, setId] = useState();

  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  async function populateUsers() {
    const JWToken = JSON.parse(localStorage.getItem("loginInfo")).JWT;

    const serverResponse = await fetch("http://159.65.127.217:8080/users/", {
      method: "GET",
      headers: { googleTokenEncoded: JWToken.credential },
    });

    if (serverResponse.status === 200) {
      const json = await serverResponse.json();

      setPosts(json);
      setSearchResults(json);
    } else {
      handleOpenToast({
        type: "error",
        info: "An unknown error accured whilst trying to get users.",
        autoHideDuration: 5000,
      });
    }
  }

  async function handleDelete(user) {
    const JWToken = JSON.parse(localStorage.getItem("loginInfo")).JWT;

    const serverResponse = await fetch(
      "http://159.65.127.217:8080/users/" + user.id,
      {
        method: "DELETE",
        headers: {
          googleTokenEncoded: JWToken.credential,
        },
      }
    );

    if (serverResponse.status === 200) {
      handleOpenToast({
        type: "success",
        info: "User " + user.firstName + " " + user.lastName + " deleted.",
        autoHideDuration: 1000,
      });

      // refresh list
      populateUsers();
    } else if (serverResponse.status === 404) {
      handleOpenToast({
        type: "error",
        info:
          "User " + user.firstName + " " + user.lastName + " doesn't exist.",
        autoHideDuration: 5000,
      });

      // refresh list
      populateUsers();
    } else {
      handleOpenToast({
        type: "error",
        info: "An unknown error accured.",
        autoHideDuration: 5000,
      });
    }
  }

  function handleEdit(user) {
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

  function reverseFunction() {
    let reversana = searchResults.reverse();

    setFilterDirection((oldFilterDirection) => {
      if (oldFilterDirection === "asc") return "desc";
      else return "asc";
    });
    setSearchResults(reversana);
  }

  useEffect(() => {
    populateUsers();
  }, []);

  return (
    <>
      <UserForm
        openModal={openUserFormModal}
        setOpenModal={setOpenUserFormModal}
        populateUsers={populateUsers}
      />
      <EditUserForm
        openModal={openEditFormModal}
        setOpenModal={setEditFormModal}
        bestuser={bestUser}
        id={id}
        populateUsers={populateUsers}
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
