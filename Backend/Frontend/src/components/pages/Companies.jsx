import { useState, useEffect } from "react";

import CompanyForm from "../forms/CompanyForm";
import data from "./data";


import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import {
  Box,
  TextField,
  TableCell,
  TableHead,
  Paper,
  TableContainer,
  TableRow,
  TableBody,
  Table,
  RadioGroup,
  Radio,
  FormControlLabel
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

import {CompanySearchBar} from "../search_bar/SearchBar";
import {CompanyListPage} from "../search_bar/ListPage";
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
  

  function fetchUsers() {
    // OVO ODKOMENTIRAT KAD SE NAMJESTI BACKEND!
    // fetch("http://159.65.127.217:8080/companies/get-companies", {
    //   method: "GET",
    //   headers: { Authorization: "Basic " + window.btoa("admin:pass") },
    // })
    //   .then((response) => response.json())
    //   .then((json) => {
    //     if (json.status === 401) {
    //       console.log(json);
    //       // display error
    //     } else {
    //       setPosts(json);
    //       setSearchResults(json);
    //     }
    //   });
    console.log("Fetchali smo usere, ps samo su importani iz data.js za probu");
    let newData = data.sort((a,b) => (a.companyName.localeCompare(b.companyName)))
    setPosts(newData);
    setSearchResults(newData);
  }


  const [filterBy, setFilterBy] = useState("Company name");
  const [filterDirection, setFilterDirection] = useState("a-z");

  useEffect(() => {
    fetchUsers();
  }, []);


  const handleFilterResults = (e) => {
    const input = e.target.value;
    setFilterBy(input)
    filterFunction(input)
  }

  const handleAZChange = (e) => {
    const input = e.target.value;
    setFilterDirection(input)
    reverseFunction()
  }

  function reverseFunction() {
    console.log("reversamo ju")
    let obrnuta = searchResults.reverse()
    setSearchResults(obrnuta)
  }

  function filterFunction (filterBy){
    console.log("u funkciji filtriranja smo")
    if(filterBy === "Company name"){
        console.log("Filtriramo po company")
        let filtrirana = searchResults.sort((a,b) => (a.companyName.localeCompare(b.companyName)))
        console.log(filtrirana)
        setSearchResults(filtrirana)
        
    }
    else if(filterBy === "Industry"){
        console.log("Filtriramo po industry")
        let filtrirana = searchResults.sort((a,b) => (a.industry.localeCompare(b.industry)))
        setSearchResults(filtrirana)
    }
    else if(filterBy === "ABC categorization"){
        console.log("Filtriramo po ABC")
        let filtrirana = searchResults.sort((a,b) => (a.ABC.localeCompare(b.ABC)))
        console.log(filtrirana)
        setSearchResults(filtrirana)
    }
    else if(filterBy === "Budget planning month"){
        console.log("Filtriramo po budget monthu")
        let filtrirana = searchResults.sort((a,b) => (a.budgetPlanning.localeCompare(b.budgetPlanning)))
        setSearchResults(filtrirana)
    }
    else if(filterBy === "Webpage URL"){
        console.log("Filtriramo po urlu")
        let filtrirana = searchResults.sort((a,b) => (a.website.localeCompare(b.website)))
        setSearchResults(filtrirana)
    }
  }



  return (
    <>
      <Button
        variant="contained"
        size="large"
        startIcon={<AddCircleIcon />}
        onClick={() => setOpenCompanyFormModal(true)}
      >
        Add company
      </Button>

      <CompanyForm
        openModal={openCompanyFormModal}
        setOpenModal={setOpenCompanyFormModal}
        fetchUsers={fetchUsers}
      />

      <CompanySearchBar
        posts={posts}
        setSearchResults={setSearchResults}
        id="trazilica"
      />

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
            onChange = {handleAZChange}
    >
            <FormControlLabel value="a-z" control={<Radio />} label="A-Z" />
            <FormControlLabel value="z-a" control={<Radio />} label="Z-A" />
            
    </RadioGroup>
    

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
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
    </>
  );
}
