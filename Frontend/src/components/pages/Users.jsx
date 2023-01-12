import { useState, useEffect } from "react";
import UserForm from "../forms/UserForm";
import EditUserForm from "../forms/EditUserForm";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import TableSortLabel from '@mui/material/TableSortLabel';
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
} from "@mui/material";

import {UserSearchBar, CompanySearchBar} from "../search_bar/SearchBar";
import {UserListPage} from "../search_bar/ListPage";


export default function Users() {
  const [openUserFormModal, setOpenUserFormModal] = useState(false);
  const [openEditFormModal, setEditFormModal] = useState(false);
  const [bestUser, setUser] = useState([]);

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

  const handleDelete = (e, email) => {
    e.preventDefault();

    fetch("http://159.65.127.217:8080/users/delete-user/", {
      method: "DELETE",
      headers: {
        Authorization: "Basic " + window.btoa("admin:pass"),

        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then((response) => response.json())
      .then((json) => {
        fetchUsers();
      });
  };

  function editHandler(e, user) {
    e.preventDefault();
    setEditFormModal(true);
    setUser(user);
  }

  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  function fetchUsers() {
    fetch("http://159.65.127.217:8080/users/get-users", {
      method: "GET",
      headers: { Authorization: "Basic " + window.btoa("admin:pass") },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        if (json.status === 401) {
          console.log(json);
          // display error
        } else {
          setPosts(json);
          setSearchResults(json);
        }
      });
  }

  const [filterBy, setFilterBy] = useState("Name");
  const [filterDirection, setFilterDirection] = useState("asc");

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleFilterResults = (property) => (event) => {
    let filterByCategory = property
    if(filterByCategory === filterBy) {
      reverseFunction()
    }
    else{
      setFilterBy(filterByCategory)
      filterFunction(filterByCategory)
      setFilterDirection('asc')
    }
    
  };


  function reverseFunction() {
    let reversana = searchResults.reverse()

    setFilterDirection(oldFilterDirection => {
      if(oldFilterDirection === 'asc') return 'desc'
      else return 'asc'
    })
    setSearchResults(reversana)
  }

  function filterFunction (filterBy){
    
    if(filterBy === "Name"){
        console.log("Filtriramo po name")
        let filtrirana = searchResults.sort((a,b) => (a.firstName.localeCompare(b.firstName)))
        console.log(filtrirana)
        setSearchResults(filtrirana)
        
    }
    else if(filterBy === "Surname"){
        console.log("Filtriramo po surname")
        let filtrirana = searchResults.sort((a,b) => (a.lastName.localeCompare(b.lastName)))
        setSearchResults(filtrirana)
    }
    else if(filterBy === "Nickname"){
        console.log("Filtriramo po nickname")
        let filtrirana = searchResults.sort((a,b) => (a.nickname.localeCompare(b.nickname)))
        console.log(filtrirana)
        setSearchResults(filtrirana)
    }
    else if(filterBy === "E-mail"){
        console.log("Filtriramo po mailu")
        let filtrirana = searchResults.sort((a,b) => (a.loginEmailString.localeCompare(b.loginEmailString)))
        setSearchResults(filtrirana)
    }
    else if(filterBy === "Max authorization level"){
        console.log("Filtriramo po auth levelu")
        let filtrirana = searchResults.sort((a,b) => (a.authority.localeCompare(b.authority)))
        setSearchResults(filtrirana)
    }
  }

  return (
    <>
      <Button
        variant="contained"
        size="large"
        startIcon={<AddCircleIcon />}
        onClick={() => setOpenUserFormModal(true)}
      >
        Add user
      </Button>

      <UserForm
        openModal={openUserFormModal}
        setOpenModal={setOpenUserFormModal}
        fetchUsers={fetchUsers}
      />
      <EditUserForm
        openModal={openEditFormModal}
        setOpenModal={setEditFormModal}
        bestuser={bestUser}
      />

      <UserSearchBar
        posts={posts}
        setSearchResults={setSearchResults}
        id="trazilica"
      />

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
          <TableRow>
                {filterTypes.map((cellName) => (
                  <TableCell
                    key={cellName.value}
                  >
                    {cellName.value}
                    <TableSortLabel
                      active={filterBy === cellName.value}
                      direction={filterBy === cellName.value ? filterDirection : "asc"}
                      onClick={handleFilterResults(cellName.value)}
                    >
                    </TableSortLabel>
                  </TableCell>
                ))}
            <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <UserListPage
              searchResults={searchResults}
              editHandler={editHandler}
              handleDelete={handleDelete}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
