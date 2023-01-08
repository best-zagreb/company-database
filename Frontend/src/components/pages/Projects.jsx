import { useState, useEffect } from "react";
import "./pages.css"

import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import Button from "@mui/material/Button";
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
  //const [firstPass, setFirstPass] = useState(false);

  // useEffect(() => {
  //   console.log("First pass now is: " + firstPass);
  // }, [firstPass]);

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
  
  let botun = ""
  const handleClick = (e) => {
  
    var gumb = document.getElementById(e.target.id)
    if(gumb.innerText === botun) {
      return
    }
    setButtons(prevArray => {
      let indeksGumba = null;
      let indeksMinusa = null;
      let tekstMinusa = null;
      for(let i = 0 ;  i < prevArray.length ; i++) {
        if(prevArray[i].props.id === gumb.innerText) {
          indeksGumba = i;
        }
        if(prevArray[i].props.ikona === "minus"){
          indeksMinusa = i;
          tekstMinusa = prevArray[i].props.id;
        }
      }
      const niArray = prevArray.filter(function (button) {
        return (button.props.id !== gumb.innerText)
       });

       const newArray = niArray.filter(function (button) {
        return (button.props.ikona !== "minus")
       });

      const noviGumb = 
        <Button
            variant="outlined"
            id = {gumb.innerText}
            ikona = "minus"
            size="large"
            startIcon={<RemoveCircleOutlineIcon />}
            onClick = {handleClick}
          > 
          {gumb.innerText} 
      </Button>

      const stariGumb = 
      <Button
          variant="contained"
          id = {tekstMinusa}
          ikona = "plus"
          size="large"
          startIcon={<AddCircleIcon />}
          onClick = {handleClick}
        > 
        {tekstMinusa} 
      </Button>

      if(stariGumb.props.id){
        newArray.splice(indeksMinusa, 0, stariGumb)
      }
      newArray.splice(indeksGumba, 0, noviGumb)
      botun = gumb.innerText
      setSelectedButton(botun)
      return newArray
    })
  }

  const results = buttonNames.map((post) => (
    <Button
      variant="contained"
      id = {post.value}
      size="large"
      ikona = "plus"
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
    setRenderLista(true);
  }, []);

  return (
    <>
    <div className="gumbi">
      {buttons}
    </div>
    {renderLista && 
      <div>
          <h2 className="project-topic">{selectedButton}</h2> 
          <ul>
              <li key = "1">Projekt 1</li>
              <li key = "2">Projekt 2</li>
          </ul>
      </div>
    }
    </>
  );
}
