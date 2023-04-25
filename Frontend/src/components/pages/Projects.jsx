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
// import DeleteAlertContext from "../../context/DeleteAlertContext";

import ProjectForm from "./../forms/ProjectForm";

import SearchBar from "./partial/SearchBar";
import TableComponent from "./partial/TableComponent";

const tableColumns = [
  { key: "name", label: "Project name" },
  { key: "category", label: "Category", xsHide: true },
  { key: "frresp", label: "FR responsible" },
  { key: "endDate", label: "Project end date", xsHide: true },
  { key: "frgoal", label: "FR goal", xsHide: true },
];

export default function Projects() {
  const { handleOpenToast } = useContext(ToastContext);

  const [openFormModal, setOpenFormModal] = useState(false);

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  async function populateTable() {
    setLoading(true);

    const JWToken = JSON.parse(localStorage.getItem("loginInfo")).JWT;

    try {
      const serverResponse = await fetch("http://localhost:8080/projects/", {
        method: "GET",
        headers: { googleTokenEncoded: JWToken.credential },
      });

      if (serverResponse.ok) {
        const json = await serverResponse.json();

        setData(json);
      } else {
        handleOpenToast({
          type: "error",
          info: "A server error occurred whilst fetching data.",
        });
      }
    } catch (error) {
      handleOpenToast({
        type: "error",
        info: "An error occurred whilst trying to fetch data.",
      });
    }

    setLoading(false);
  }

  // function handleEdit(project) {
  //   setUser(project);
  //   setOpenFormModal(true);
  // }

  // async function handleDelete(project) {
  //   setObject({ type: "Project", name: project.name });
  //   setEndpoint("http://localhost:8080/projects/" + project.id);
  //   setPopulateObjects({ function: populateTable });

  //   setOpenDeleteAlert(true);
  // }

  useEffect(() => {
    populateTable();
  }, []);

  return (
    <>
      <ProjectForm
        openModal={openFormModal}
        setOpenModal={setOpenFormModal}
        populateProjects={populateTable}
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
        <SearchBar type="projects" data={data} setData={setData} />

        <Button
          variant="contained"
          size="medium"
          startIcon={<AddCircleIcon />}
          onClick={() => setOpenFormModal(true)}
        >
          Add project
        </Button>
      </Container>

      <Container maxWidth="false">
        {loading ? (
          <Box sx={{ display: "grid", placeItems: "center" }}>
            <CircularProgress size={100} />
          </Box>
        ) : data?.length <= 0 ? (
          <Typography variant="h4" align="center">
            {"No users :("}
          </Typography>
        ) : (
          <TableComponent
            tableColumns={tableColumns}
            data={data}
            setData={setData}
            // handleEdit={handleEdit}
            // handleDelete={handleDelete}
          ></TableComponent>
        )}
      </Container>
    </>
  );
}
