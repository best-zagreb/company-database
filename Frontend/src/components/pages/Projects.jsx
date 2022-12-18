import { useState, useEffect } from "react";
import "./pages.css"

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
  Table
} from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';



export default function Projects() {
  const [projects, setProjects] = useState([]);

  function fetchProjects() {
    //Odkomentirati kad se napise backend
    // fetch("http://159.65.127.217:8080/users/get-projects", {
    //   method: "GET",
    //   headers: { Authorization: "Basic " + window.btoa("admin:pass") },
    // })
    //   .then((response) => response.json())
    //   .then((json) => {
    //     if (json.status === 401) {
    //       console.log(json);
    //       // display error
    //     } else {
    //       setProjects(json);
    //     }
    //   });
  }

  const buttonNames = [
    {value: "CULTURAL EXCHANGE"},
    {value: "ENGINEERING COMPETITION"},
    {value: "BEST COURSES"},
    {value: "REGIONAL MEETING"},
    {value: "MOTIVATIONAL WEEKEND"},
    {value: "ANNUAL PARTNERSHIPS"},
    {value: "CARRER DAY"},
    {value: "HACKATHONS"},
    {value: "BEST DESIGN DAYS"},
    {value: "OTHERS"},
  ];


  const handleClick = (e) => {
    var gumb = document.getElementById(e.target.id)
    console.log(gumb.innerText)
    setSelectedButton(gumb.innerText)
    setButtons(prevArray => {
      let indeks = null;
      for(let i = 0 ;  i < prevArray.length ; i++) {
        if(prevArray[i].props.id === gumb.innerText) {
          indeks = i;
          console.log(indeks)
        }
      }
      const newArray = prevArray.filter(function (button) {
        return button.props.id !== gumb.innerText;
    });
      const noviGumb = 
        <Button
            variant="contained"
            id = {gumb.innerText}
            size="small"
            startIcon={<AddCircleIcon />}
            onClick = {handleClick}
          > 
          {gumb.innerText} 
      </Button>
      newArray.splice(indeks, 0, noviGumb)
      setSelectedButton(noviGumb.props.id)
      return newArray
    })
  }

  function renderList(){
    console.log("renderali smo")
    setRenderLista(true)
    console.log(renderLista)
 }


  const results = buttonNames.map((post) => (
    <Button
      variant="contained"
      id = {post.value}
      size="large"
      startIcon={<AddCircleIcon />}
      onClick = {handleClick}
    > {post.value} </Button>
  ));

  const[buttons, setButtons] = useState(results)
  const[selectedButton, setSelectedButton] = useState()
  const[renderLista, setRenderLista] = useState(false)

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    renderList();
  }, [selectedButton]);

 
  return (
    <>
    <div className="gumbi">
      {buttons}
    </div>

    {renderLista && 
      <h2>{selectedButton}</h2> 
    }

    {renderLista &&
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Projekt 1" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Projekt 2" />
            </ListItemButton>
          </ListItem>
        </List>
  
    }

      {/* <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Surname</TableCell>
              <TableCell>Nickname</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Max authorization level</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
          </TableBody>
        </Table>
      </TableContainer> */}
    </>
  );
}
