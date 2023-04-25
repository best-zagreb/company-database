import {
  Container,
  Box,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";

import { AddCircle as AddCircleIcon } from "@mui/icons-material";

import { useState, useEffect, useContext } from "react";

import ToastContext from "../../context/ToastContext";
import DeleteAlertContext from "../../context/DeleteAlertContext";

import UserForm from "../forms/UserForm";

import SearchBar from "./partial/SearchBar";
import TableComponent from "./partial/TableComponent";

export default function Users() {
  const { handleOpenToast } = useContext(ToastContext);
  const { setOpenDeleteAlert, setObject, setEndpoint, setPopulateObjects } =
    useContext(DeleteAlertContext);

  const [openUserFormModal, setOpenUserFormModal] = useState(false);
  const [user, setUser] = useState();

  const [tableItems, setTableItems] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const [loading, setLoading] = useState(true);

  async function populateUsers() {
    setLoading(true);

    const JWToken = JSON.parse(localStorage.getItem("loginInfo")).JWT;

    const serverResponse = await fetch("http://localhost:8080/users/", {
      method: "GET",
      headers: { googleTokenEncoded: JWToken.credential },
    });

    if (serverResponse.ok) {
      const json = await serverResponse.json();

      setTableItems(json);
      setSearchResults(json);
    } else {
      handleOpenToast({
        type: "error",
        info: "An unknown error accured whilst trying to get users.",
      });
    }

    setLoading(false);
  }

  function handleEdit(user) {
    setUser(user);
    setOpenUserFormModal(true);
  }

  async function handleDelete(user) {
    setObject({ type: "User", name: user.firstName + " " + user.lastName });
    setEndpoint("http://localhost:8080/users/" + user.id);
    setPopulateObjects({ function: populateUsers });

    setOpenDeleteAlert(true);
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
        <SearchBar
          type="users"
          tableItems={tableItems}
          setSearchResults={setSearchResults}
        />

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
        {loading ? (
          <Box sx={{ display: "grid", placeItems: "center" }}>
            <CircularProgress size={100} />
          </Box>
        ) : searchResults?.length <= 0 ? (
          <Typography variant="h4" align="center">
            {"No users :("}
          </Typography>
        ) : (
          <TableComponent
            type="users"
            searchResults={searchResults}
            setSearchResults={setSearchResults}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          ></TableComponent>
        )}
      </Container>
    </>
  );
}
