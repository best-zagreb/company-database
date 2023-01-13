import { useState, useEffect } from "react";

import data from "./data";

import {
  TableSortLabel,
  TableCell,
  TableHead,
  Paper,
  TableContainer,
  TableRow,
  TableBody,
  Table,
  Button,
  Container,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { CompanySearchBar } from "../search_bar/SearchBar";
import { CompanyListPage } from "../search_bar/ListPage";

import CompanyForm from "../forms/CompanyForm";

export default function Companies() {
  const [openCompanyFormModal, setOpenCompanyFormModal] = useState(false);

  const filterTypes = [
    {
      value: "Company name",
    },
    {
      value: "Industry",
    },
    {
      value: "ABC categorization",
    },
    {
      value: "Budget planning month",
    },
    {
      value: "Webpage URL",
    },
  ];

  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  function fetchCompanies() {
    const JWToken = JSON.parse(localStorage.getItem("loginInfo")).JWT;
    fetch("http://159.65.127.217:8080/companies/", {
      method: "GET",
      headers: { googleTokenEncoded: JWToken.credential },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status === 401) {
          console.log(json);
          // display error
        } else {
          console.log(json)
          setPosts(json);
          setSearchResults(json);
          //let newData = data.sort((a, b) => a.name.localeCompare(b.name))
        }
      });
    //console.log("Fetchali smo usere, ps samo su importani iz data.js za probu");
    //  let newData = data.sort((a, b) => a.name.localeCompare(b.name));
    // setPosts(newData);
    // setSearchResults(newData);
  }

  const [filterBy, setFilterBy] = useState("Company name");
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
    if (filterBy === "Company name") {
      console.log("Filtriramo po company");
      let filtrirana = searchResults.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      console.log(filtrirana);
      setSearchResults(filtrirana);
    } else if (filterBy === "Industry") {
      console.log("Filtriramo po industry");
      let filtrirana = searchResults.sort((a, b) =>
        a.domain.localeCompare(b.domain)
      );
      setSearchResults(filtrirana);
    } else if (filterBy === "ABC categorization") {
      console.log("Filtriramo po ABC");
      let filtrirana = searchResults.sort((a, b) =>
        a.abcCategory.localeCompare(b.abcCategory)
      );
      console.log(filtrirana);
      setSearchResults(filtrirana);
    } else if (filterBy === "Budget planning month") {
      console.log("Filtriramo po budget monthu");
      let filtrirana = searchResults.sort((a, b) =>
        a.budgetPlanningMonth.localeCompare(b.budgetPlanningMonth)
      );
      setSearchResults(filtrirana);
    } else if (filterBy === "Webpage URL") {
      console.log("Filtriramo po urlu");
      let filtrirana = searchResults.sort((a, b) =>
        a.webUrl.localeCompare(b.webUrl)
      );
      setSearchResults(filtrirana);
    }
  }

  useEffect(() => {
     fetchCompanies();
  }, []);

  return (
    <>
      <CompanyForm
        openModal={openCompanyFormModal}
        setOpenModal={setOpenCompanyFormModal}
        fetchCompanies={fetchCompanies}
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
        <CompanySearchBar posts={posts} setSearchResults={setSearchResults} />

        <Button
          variant="contained"
          size="medium"
          startIcon={<AddCircleIcon />}
          onClick={() => setOpenCompanyFormModal(true)}
        >
          Add company
        </Button>
      </Container>

      <Container maxWidth="false">
        <TableContainer component={Paper}>
          <Table size="small" aria-label="companies table">
            <TableHead>
              <TableRow>
                {filterTypes.map((cellName) => (
                  <TableCell
                    key={cellName.value}
                    sx={
                      cellName.value === "Industry" ||
                      cellName.value === "ABC categorization"
                        ? { display: { xs: "none", sm: "table-cell" } }
                        : cellName.value === "Budget planning month"
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
              <CompanyListPage searchResults={searchResults} />
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
