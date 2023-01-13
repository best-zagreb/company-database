import { useState, useEffect } from "react";
// import "./pages.css";

import data from "./projects_data";

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

import AddCircleIcon from "@mui/icons-material/AddCircle";

import CompanyForm from "../forms/CompanyForm";
import { ProjectListPage } from "../search_bar/ListPage";
import { ProjectSearchBar } from "../search_bar/SearchBar";

export default function Projects() {
  const [openCompanyFormModal, setOpenCompanyFormModal] = useState(false);

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

  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  function fetchProjects() {
    const JWToken = JSON.parse(localStorage.getItem("loginInfo")).JWT;
    fetch("http://159.65.127.217:8080/projects/", {
      method: "GET",
      googleTokenEncoded: JWToken.credential,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.status === 401) {
          console.log(json);
          // display error
        } else {
          let newData = json.sort((a, b) => a.name.localeCompare(b.name));
          setPosts(newData);
          setSearchResults(newData);
        }
      });
    // let newData = data.sort((a,b) => (a.name.localeCompare(b.name)))
    // setPosts(newData);
    // setSearchResults(newData);
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
    if (filterBy === "Project name") {
      console.log("Filtriramo po imenu projekta");
      let filtrirana = searchResults.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      console.log(filtrirana);
      setSearchResults(filtrirana);
    } else if (filterBy === "Category") {
      console.log("Filtriramo po kategoriji");
      let filtrirana = searchResults.sort((a, b) =>
        a.category.localeCompare(b.category)
      );
      setSearchResults(filtrirana);
    } else if (filterBy === "FR responsible") {
      console.log("Filtriramo po FR responsible");
      let filtrirana = searchResults.sort((a, b) => {
        if (a.IdFRResp < b.IdFRResp) return -1;
        else if (a.IdFRResp === b.IdFRResp) return 0;
        else return 1;
      });
      console.log(filtrirana);
      setSearchResults(filtrirana);
    } else if (filterBy === "Project end date") {
      console.log("Filtriramo po budget datumu kraja projekta");
      let filtrirana = searchResults.sort((a, b) => a.endDate < b.endDate);
      setSearchResults(filtrirana);
    } else if (filterBy === "FR goal") {
      console.log("Filtriramo po FR cilju");
      let filtrirana = searchResults.sort((a, b) => {
        if (a.FRgoal < b.FRgoal) return -1;
        else if (a.FRgoal === b.FRgoal) return 0;
        else return 1;
      });
      setSearchResults(filtrirana);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <CompanyForm
        openModal={openCompanyFormModal}
        setOpenModal={setOpenCompanyFormModal}
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
          onClick={() => setOpenCompanyFormModal(true)}
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
