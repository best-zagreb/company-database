import { useState, useEffect } from "react";

import CompanyForm from "../forms/CompanyForm";
import data from "./data";
import {
  TextField,
  TableSortLabel,
  TableCell,
  TableHead,
  Paper,
  TableContainer,
  TableRow,
  TableBody,
  Table,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  MenuItem,
  Container,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { CompanySearchBar } from "../search_bar/SearchBar";
import { CompanyListPage } from "../search_bar/ListPage";
export default function Companies() {
  const [openCompanyFormModal, setOpenCompanyFormModal] = useState(false);

  const handleDelete = (e, companyName) => {
    e.preventDefault();
    // OVO ODKOMENTIRAT KAD SE NAMJESTI BACKEND!
    // fetch("http://159.65.127.217:8080/companies/delete-company/", {
    //   method: "DELETE",
    //   headers: {
    //     Authorization: "Basic " + window.btoa("admin:pass"),

    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ companyName : companyName }),
    // })
    //   .then((response) => response.json())
    //   .then((json) => {
    //     fetchUsers();
    //   });
    console.log("We have deleted company named : " + companyName);
  };

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
          setPosts(json);
          setSearchResults(json);
        }
      });
    //console.log("Fetchali smo usere, ps samo su importani iz data.js za probu");
    // let newData = data.sort((a, b) => a.name.localeCompare(b.name));
    setPosts(newData);
    setSearchResults(newData);
  }

  const [filterBy, setFilterBy] = useState("Company name");
  const [filterDirection, setFilterDirection] = useState("asc");

  useEffect(() => {
    // fetchCompanies();
  }, []);

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

  return (
    <>
      <CompanyForm
        openModal={openCompanyFormModal}
        setOpenModal={setOpenCompanyFormModal}
        fetchUsers={fetchCompanies}
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

      {/* <Container maxWidth="false">
        <TextField
          select
          label="Filter by"
          fullWidth
          margin="dense"
          defaultValue="Company name"
          onChange={handleFilterResults}
        >
          {filterTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>

        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          defaultValue="a-z"
          onChange={handleAZChange}
        >
          <FormControlLabel value="a-z" control={<Radio />} label="A-Z" />
          <FormControlLabel value="z-a" control={<Radio />} label="Z-A" />
        </RadioGroup>
      </Container> */}

      {/* <Container maxWidth="false">
        <TableContainer component={Paper}>
          <Table size="small" aria-label="companies table">
            <TableHead>
              <TableRow>
                <TableCell>Company name</TableCell>
                <TableCell>Industry</TableCell>
                <TableCell>ABC</TableCell>
                <TableCell>Budget planning</TableCell>
                <TableCell>Website</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <CompanyListPage
                searchResults={searchResults}
                handleDelete={handleDelete}
              />
            </TableBody>
          </Table>
        </TableContainer>
      </Container> */}

      {/* <TextField
       
        select
        label="Filter by"
        fullWidth
        margin="dense"
        defaultValue="Company name"
        onChange={handleFilterResults}
        
    >
        {filterTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
        ))}
    </TextField> */}

      {/* <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            defaultValue="a-z"
            onChange = {handleAZChange}
    >
            <FormControlLabel value="a-z" control={<Radio />} label="A-Z" />
            <FormControlLabel value="z-a" control={<Radio />} label="Z-A" />
            
    </RadioGroup>
     */}

      <Container maxWidth="false">
        <TableContainer component={Paper}>
          <Table size="small" aria-label="companies table">
            <TableHead>
              <TableRow>
                {filterTypes.map((cellName) => (
                  <TableCell key={cellName.value}>
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
