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

import { UserSearchBar } from "./partial/SearchBar";
import { UserListPage } from "./partial/ListPage";

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
  const [user, setUser] = useState();

  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  async function populateUsers() {
    const JWToken = JSON.parse(localStorage.getItem("loginInfo")).JWT;

    const serverResponse = await fetch("http://localhost:8080/users/", {
      method: "GET",
      headers: { googleTokenEncoded: JWToken.credential },
    });

    if (serverResponse.ok) {
      const json = await serverResponse.json();

      setPosts(json);
      setSearchResults(json);
    } else {
      handleOpenToast({
        type: "error",
        info: "An unknown error accured whilst trying to get users.",
      });
    }
  }

  async function handleDelete(user) {
    const JWToken = JSON.parse(localStorage.getItem("loginInfo")).JWT;

    const serverResponse = await fetch(
      "http://localhost:8080/users/" + user.id,
      {
        method: "DELETE",
        headers: {
          googleTokenEncoded: JWToken.credential,
        },
      }
    );

    if (serverResponse.ok) {
      handleOpenToast({
        type: "success",
        info: "User " + user.firstName + " " + user.lastName + " deleted.",
      });

      // refresh list
      populateUsers();
    } else if (serverResponse.status === 404) {
      handleOpenToast({
        type: "error",
        info:
          "User " + user.firstName + " " + user.lastName + " doesn't exist.",
      });

      // refresh list
      populateUsers();
    } else {
      handleOpenToast({
        type: "error",
        info: "An unknown error accured.",
      });
    }
  }

  function handleEdit(user) {
    setUser(user);
    setOpenUserFormModal(true);
  }

  const [filterBy, setFilterBy] = useState("Name");
  const [filterDirection, setFilterDirection] = useState("desc");

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
        user={user}
        openUserFormModal={openUserFormModal}
        setOpenUserFormModal={setOpenUserFormModal}
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
          onClick={() => {
            setUser();
            setOpenUserFormModal(true);
          }}
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
