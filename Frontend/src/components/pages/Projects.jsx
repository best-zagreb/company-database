import {
  TableSortLabel,
  TableCell,
  TableHead,
  Paper,
  TableContainer,
  TableRow,
  TableBody,
  Table,
  Container,
  Button,
} from "@mui/material";

import { AddCircle as AddCircleIcon } from "@mui/icons-material";

import { useState, useEffect, useContext } from "react";

import ToastContext from "../../context/ToastContext";

import ProjectForm from "./../forms/ProjectForm";

import { ProjectListPage } from "./partial/ListPage";
import { ProjectSearchBar } from "./partial/SearchBar";

const filterTypes = [
  {
    value: "Project name",
  },
  {
    value: "Category",
  },
  {
    value: "FR responsible",
  },
  {
    value: "Project end date",
  },
  {
    value: "FR goal",
  },
];

export default function Projects() {
  const { handleOpenToast } = useContext(ToastContext);

  const [openProjectFormModal, setOpenProjectFormModal] = useState(false);

  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  async function populateProjects() {
    const JWToken = JSON.parse(localStorage.getItem("loginInfo")).JWT;

    const serverResponse = await fetch("http://159.65.127.217:8080/projects/", {
      method: "GET",
      headers: { googleTokenEncoded: JWToken.credential },
    });

    if (serverResponse.ok) {
      const json = await serverResponse.json();

      setPosts(json);
      setSearchResults(json);
      //let newData = data.sort((a, b) => a.name.localeCompare(b.name))
    } else {
      handleOpenToast({
        type: "error",
        info: "An unknown error accured whilst trying to get projects.",
      });
    }
  }

  const [filterBy, setFilterBy] = useState("Project name");
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

    if (filterBy === "Project name") {
      filtrirana = searchResults.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filterBy === "Category") {
      filtrirana = searchResults.sort((a, b) =>
        a.category.localeCompare(b.category)
      );
    } else if (filterBy === "FR responsible") {
      filtrirana = searchResults.sort((a, b) => {
        (a.frresp.firstName + " " + a.frresp.lastName).localeCompare(
          b.frresp.firstName + " " + b.frresp.lastName
        );
      });
    } else if (filterBy === "Project end date") {
      filtrirana = searchResults.sort((a, b) => {
        if (a.endDate < b.endDate) return -1;
        else if (a.endDate === b.endDate) return 0;
        else return 1;
      });
    } else if (filterBy === "FR goal") {
      filtrirana = searchResults.sort((a, b) => {
        if (a.frgoal < b.frgoal) return -1;
        else if (a.frgoal === b.frgoal) return 0;
        else return 1;
      });
    }

    setSearchResults(filtrirana);
  }

  useEffect(() => {
    populateProjects();
  }, []);

  return (
    <>
      <ProjectForm
        openModal={openProjectFormModal}
        setOpenModal={setOpenProjectFormModal}
        populateProjects={populateProjects}
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
        <ProjectSearchBar posts={posts} setSearchResults={setSearchResults} />

        <Button
          variant="contained"
          size="medium"
          startIcon={<AddCircleIcon />}
          onClick={() => setOpenProjectFormModal(true)}
        >
          Add project
        </Button>
      </Container>

      <Container maxWidth="false">
        <TableContainer component={Paper}>
          <Table size="small" aria-label="projects table">
            <TableHead>
              <TableRow>
                {filterTypes.map((cellName) => (
                  <TableCell
                    key={cellName.value}
                    sx={
                      cellName.value === "Project end date" ||
                      cellName.value === "Category"
                        ? { display: { xs: "none", sm: "table-cell" } }
                        : cellName.value === "FR goal"
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
              </TableRow>
            </TableHead>
            <TableBody>
              <ProjectListPage searchResults={searchResults} />
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
