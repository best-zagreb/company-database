import { useState, useEffect } from "react";
import "./pages.css";
import data from "./projects_data";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import TableSortLabel from '@mui/material/TableSortLabel';
import {ProjectListPage} from "../search_bar/ListPage";
import {ProjectSearchBar} from "../search_bar/SearchBar";

import {
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

import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import ProjectForm from "../forms/ProjectForm";

export default function Projects() {

  const [openProjectFormModal, setOpenProjectFormModal] = useState(false);
  const handleDelete = (e, projectName) => {
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
    console.log("We have deleted project named : " + projectName);
  };


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
    // fetch("http://159.65.127.217:8080/projects/get-projects", {
    //   method: "GET",
    //   headers: { Authorization: "Basic " + window.btoa("admin:pass") },
    // })
    //   .then((response) => response.json())
    //   .then((json) => {
    //     console.log(json)
    //     if (json.status === 401) {
    //       console.log(json);
    //       // display error
    //     } else {
    //       let newData = json.sort((a,b) => (a.name.localeCompare(b.name)))
    //       setPosts(newData);
    //       setSearchResults(newData);
    //     }
    //   });
    let newData = data.sort((a,b) => (a.name.localeCompare(b.name)))
    setPosts(newData);
    setSearchResults(newData);
  }

  const [filterBy, setFilterBy] = useState("Project name");
  const [filterDirection, setFilterDirection] = useState("asc");

  useEffect(() => {
    fetchProjects();
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
    
    if(filterBy === "Project name"){
        console.log("Filtriramo po imenu projekta")
        let filtrirana = searchResults.sort((a,b) => (a.name.localeCompare(b.name)))
        console.log(filtrirana)
        setSearchResults(filtrirana)
        
    }
    else if(filterBy === "Category"){
        console.log("Filtriramo po kategoriji")
        let filtrirana = searchResults.sort((a,b) => (a.category.localeCompare(b.category)))
        setSearchResults(filtrirana)
    }
    else if(filterBy === "FR responsible"){
        console.log("Filtriramo po FR responsible")
        let filtrirana = searchResults.sort((a,b) => {
          if(a.IdFRResp < b.IdFRResp) return -1
          else if(a.IdFRResp === b.IdFRResp) return 0
          else return 1
        })
        console.log(filtrirana)
        setSearchResults(filtrirana)
    }
    else if(filterBy === "Project end date"){
        console.log("Filtriramo po budget datumu kraja projekta")
        let filtrirana = searchResults.sort((a,b) => (a.endDate < b.endDate))
        setSearchResults(filtrirana)
    }
    else if(filterBy === "FR goal"){
        console.log("Filtriramo po FR cilju")
        let filtrirana = searchResults.sort((a,b) => {
          if(a.FRgoal < b.FRgoal) return -1
          else if(a.FRgoal === b.FRgoal) return 0
          else return 1
        })
        setSearchResults(filtrirana)
    }
  }

  return (
    <>
      <Button
        variant="contained"
        size="large"
        startIcon={<AddCircleIcon />}
        onClick={() => setOpenProjectFormModal(true)}
      >
        Add project
      </Button>

      <ProjectForm
        openModal={openProjectFormModal}
        setOpenModal={setOpenProjectFormModal}

      />

    <ProjectSearchBar
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
            <ProjectListPage
              searchResults={searchResults}
              handleDelete={handleDelete}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

  //const [firstPass, setFirstPass] = useState(false);

  // useEffect(() => {
  //   console.log("First pass now is: " + firstPass);
  // }, [firstPass]);

 
  // const buttonNames = [
  //   { value: "CULTURAL EXCHANGE" },
  //   { value: "ENGINEERING COMPETITION" },
  //   { value: "BEST COURSES" },
  //   { value: "REGIONAL MEETING" },
  //   { value: "MOTIVATIONAL WEEKEND" },
  //   { value: "ANNUAL PARTNERSHIPS" },
  //   { value: "CARRER DAY" },
  //   { value: "HACKATHONS" },
  //   { value: "BEST DESIGN DAYS" },
  //   { value: "OTHERS" },
  // ];

  // let botun = "";
  // const handleClick = (e) => {
  //   var gumb = document.getElementById(e.target.id);
  //   if (gumb.innerText === botun) {
  //     return;
  //   }
  //   setButtons((prevArray) => {
  //     let indeksGumba = null;
  //     let indeksMinusa = null;
  //     let tekstMinusa = null;
  //     for (let i = 0; i < prevArray.length; i++) {
  //       if (prevArray[i].props.id === gumb.innerText) {
  //         indeksGumba = i;
  //       }
  //       if (prevArray[i].props.ikona === "minus") {
  //         indeksMinusa = i;
  //         tekstMinusa = prevArray[i].props.id;
  //       }
  //     }
  //     const niArray = prevArray.filter(function (button) {
  //       return button.props.id !== gumb.innerText;
  //     });

  //     const newArray = niArray.filter(function (button) {
  //       return button.props.ikona !== "minus";
  //     });

  //     const noviGumb = (
  //       <Button
  //         variant="outlined"
  //         id={gumb.innerText}
  //         ikona="minus"
  //         size="large"
  //         startIcon={<RemoveCircleOutlineIcon />}
  //         onClick={handleClick}
  //       >
  //         {gumb.innerText}
  //       </Button>
  //     );

  //     const stariGumb = (
  //       <Button
  //         variant="contained"
  //         id={tekstMinusa}
  //         ikona="plus"
  //         size="large"
  //         startIcon={<AddCircleIcon />}
  //         onClick={handleClick}
  //       >
  //         {tekstMinusa}
  //       </Button>
  //     );

  //     if (stariGumb.props.id) {
  //       newArray.splice(indeksMinusa, 0, stariGumb);
  //     }
  //     newArray.splice(indeksGumba, 0, noviGumb);
  //     botun = gumb.innerText;
  //     setSelectedButton(botun);
  //     return newArray;
  //   });
  // };

  // const results = buttonNames.map((post) => (
  //   <Button
  //     variant="contained"
  //     id={post.value}
  //     size="large"
  //     ikona="plus"
  //     startIcon={<AddCircleIcon />}
  //     onClick={handleClick}
  //   >
  //     {" "}
  //     {post.value}{" "}
  //   </Button>
  // ));

  // const [buttons, setButtons] = useState(results);
  // const [selectedButton, setSelectedButton] = useState();
  // const [renderLista, setRenderLista] = useState(false);

  // useEffect(() => {
  //   fetchProjects();
  // }, []);

  // useEffect(() => {
  //   setRenderLista(true);
  // }, []);

  // return (
  //   <>
  //     <div className="gumbi">{buttons}</div>
  //     {renderLista && (
  //       <div>
  //         <h2 className="project-topic">{selectedButton}</h2>
  //         <ul>
  //           {/* <li key = "1">Projekt 1</li>
  //             <li key = "2">Projekt 2</li> */}
  //         </ul>
  //       </div>
  //     )}
  //   </>
  // );
}
