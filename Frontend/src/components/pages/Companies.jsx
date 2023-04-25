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
import { AddCircle as AddCircleIcon } from "@mui/icons-material";

import { useState, useEffect, useContext } from "react";

import ToastContext from "../../context/ToastContext";

import SearchBar from "./partial/SearchBar";
import ListPage from "./partial/ListPage";

import CompanyForm from "../forms/CompanyForm";

export default function Companies() {
  const { handleOpenToast } = useContext(ToastContext);

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

  const [tableItems, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  async function populateCompanies() {
    const JWToken = JSON.parse(localStorage.getItem("loginInfo")).JWT;

    const serverResponse = await fetch("http://localhost:8080/companies/", {
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
        info: "An unknown error accured whilst trying to get companies.",
      });
    }
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
    let filtrirana;

    if (filterBy === "Company name") {
      filtrirana = searchResults.sort((a, b) => a.name.localeCompare(b.name));
      setSearchResults(filtrirana);
    } else if (filterBy === "Industry") {
      filtrirana = searchResults.sort((a, b) =>
        a.domain.localeCompare(b.domain)
      );
      setSearchResults(filtrirana);
    } else if (filterBy === "ABC categorization") {
      filtrirana = searchResults.sort((a, b) =>
        a.abcCategory.localeCompare(b.abcCategory)
      );
      setSearchResults(filtrirana);
    } else if (filterBy === "Budget planning month") {
      filtrirana = searchResults.sort((a, b) =>
        a.budgetPlanningMonth.localeCompare(b.budgetPlanningMonth)
      );
      setSearchResults(filtrirana);
    } else if (filterBy === "Webpage URL") {
      filtrirana = searchResults.sort((a, b) =>
        a.webUrl.localeCompare(b.webUrl)
      );
    }

    setSearchResults(filtrirana);
  }

  useEffect(() => {
    populateCompanies();
  }, []);

  return (
    <>
      <CompanyForm
        openModal={openCompanyFormModal}
        setOpenModal={setOpenCompanyFormModal}
        populateCompanies={populateCompanies}
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
          type="companies"
          tableItems={tableItems}
          setSearchResults={setSearchResults}
        />

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
                      cellName.value === "ABC categorization" ||
                      cellName.value === "Budget planning month" ||
                      cellName.value === "Webpage URL"
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
              <ListPage type="company" searchResults={searchResults} />
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
