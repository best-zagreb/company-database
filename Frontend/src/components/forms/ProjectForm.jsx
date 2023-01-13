import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";


import "./UserForm.css";


const project = {
    idCreator: null,
    name: null,
    category: null,
    type: null,
    startDate: null,
    endDate: null,
    IdFRResp: null,
    FRgoal: null,
    firstPingDate: null,
    secondPingDate: null,
  };

  const typeConst = [
    {
      value: "intern",
    },
    {
        value: "extern",
      },
  ];


export default function UserForm({ openModal, setOpenModal, fetchUsers }) {
  const onSubmit = (e) => {
    e.preventDefault();

    if (
      nameIsValid &&
      categoryIsValid &&
      startDateIsValid &&
      endDateIsValid &&
      FRgoalIsValid &&
      firstPingDateIsValid &&
      secondPingDateIsValid
    ) {
      project.idCreator = IDCreator;
      project.name = name;
      project.category = category;
      project.type = type.toUpperCase();
      project.startDate = startDate;
      project.endDate = endDate;
      project.IdFRResp = parseInt(idFRResp);
      project.FRgoal = parseInt(FRgoal);
      project.firstPingDate = firstPingDate;
      project.secondPingDate = secondPingDate;
      console.log(project);

      //Uncomment this when the backend is done


      // fetch("http://159.65.127.217:8080/users/add-user/", {
      //   method: "POST",
      //   headers: {
      //     Authorization: "Basic " + window.btoa("admin:pass"),

      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(project),
      // })
      //   .then((response) => response.json())
      //   .then((json) => {
      //     // if error display error toast
      //     console.log(json);

      //     // if success display success toast, close modal and update users list
      //     setOpenModal(false);
      //     fetchUsers();
      //   });
    }
  };

  const [IDCreator, setIDCreator] = useState(); //ovdje dodati id trenutnog korisnika
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [type, setType] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [idFRResp, setidFRResp] = useState();
  const [FRgoal, setFRgoal] = useState();
  const [firstPingDate, setFirstPingDate] = useState();
  const [secondPingDate, setSecondPingDate] = useState();



  const [nameIsValid, setNameIsValid] = useState(false);
  const handleNameChange = (e) => {
    const input = e.target.value;
    if (input.length >= 2 && input.length <= 35) {
      setNameIsValid(true);
      setName(input);
    };
  }

  const [categoryIsValid, setCategoryIsValid] = useState(false);
  const handleCategoryChange = (e) => {
    const input = e.target.value;
    if (input.length >= 2 && input.length <= 35) {
      setCategoryIsValid(true);
      setCategory(input);
      };
    }

  const handleTypeChange = (e) => {
    const input = e.target.value;
    setType(input);
  }

  const [startDateIsValid, setStartDateIsValid] = useState(false);
  const handleStartDateChange = (e) => {
    const input = e.target.value;
    setStartDate(input);
  }


  const [endDateIsValid, setEndDateIsValid] = useState(false);
  const handleEndDateChange = (e) => {
    const input = e.target.value;
    setEndDate(input);
  }

  const [FRrepIDIsValid, setFRrepIDIsValid] = useState(false);
  const handleFRrepIDchange = (e) => {
    const input = e.target.value;
    setidFRResp(input);
  }

  const [FRgoalIsValid, setFRgoalIsValid] = useState(false);
  const handleFRgoalChange = (e) => {
    const input = e.target.value;
    setFRgoal(input);
  }

  const [firstPingDateIsValid, setFirstPingDateIsValid] = useState(false);
  const handleFirstPingChange = (e) => {
    const input = e.target.value;
    setFirstPingDate(input);
  }


  const [secondPingDateIsValid, setSecondPingDateIsValid] = useState(false);
  const handleSecondPingChange = (e) => {
    const input = e.target.value;
    setSecondPingDate(input);
  }
  
  return (
    <div>
      <Modal
        className="UserFormModal"
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box className="Box">
            <h2>Add a new project</h2>

            <form onSubmit={onSubmit}>
              <TextField
                id="outlined"
                label="Project name"
                type="text"
                required
                fullWidth
                margin="dense"
                placeholder="Project of Heroes"
                inputProps={{ minLength: 2, maxLength: 35 }}
                onChange={handleNameChange}
              />

              <TextField
                id="outlined"
                label="Category"
                type="text"
                required
                fullWidth
                margin="dense"
                placeholder="Hackathon"
                inputProps={{ minLength: 2, maxLength: 35 }}
                onChange={handleCategoryChange}
              />

              <TextField
                id="outlined-select-authorization-level"
                select
                label="Project type"
                fullWidth
                margin="dense"
                onChange={handleTypeChange}
              >
                {typeConst.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>


              <TextField
                id="outlined"
                label="Start date"
                required
                type="text"
                fullWidth
                margin="dense"
                placeholder="Date in format XXXX-YY-ZZ"
                inputProps={{ minLength: 10, maxLength: 10 }}
                onChange={handleStartDateChange}
              />

            <TextField
                id="outlined"
                label="End date"
                required
                type="text"
                fullWidth
                margin="dense"
                placeholder="Date in format XXXX-YY-ZZ"
                inputProps={{ minLength: 10, maxLength: 10 }}
                onChange={handleEndDateChange}
              />

              <TextField
                id="outlined"
                label="ID of FR responsible for project"
                type="text"
                required
                fullWidth
                margin="dense"
                placeholder="5"
                inputProps={{ minLength: 1, maxLength: 4 }}
                onChange={handleFRrepIDchange}
              />

               <TextField
                id="outlined"
                label="FR goal for this project"
                type="text"
                required
                fullWidth
                margin="dense"
                placeholder="1000000"
                inputProps={{ minLength: 1}}
                onChange={handleFRgoalChange}
              />

            <TextField
                id="outlined"
                label="First ping date"
                required
                type="text"
                fullWidth
                margin="dense"
                placeholder="Date in format XXXX-YY-ZZ"
                inputProps={{ minLength: 10, maxLength: 10 }}
                onChange={handleFirstPingChange}
              />

            <TextField
                id="outlined"
                label="Second ping date"
                required
                type="text"
                fullWidth
                margin="dense"
                placeholder="Date in format XXXX-YY-ZZ"
                inputProps={{ minLength: 10, maxLength: 10 }}
                onChange={handleSecondPingChange}
              />

              <div className="action-btns">
                <Button
                  variant="outlined"
                  onClick={() => {
                    setOpenModal(false);
                  }}
                >
                  Cancel
                </Button>

                <Button variant="contained" type="submit">
                  Add project
                </Button>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}