import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import "./UserForm.css";

const authLevels = [
  {
    value: "Observer",
    label: "Observer",
  },
  {
    value: "Moderator",
    label: "Moderator",
  },
  {
    value: "Administrator",
    label: "Administrator",
  },
];

export default function UserForm() {
  const navigate = useNavigate();

  const [authLevel, setAuthLevel] = useState("Observer");
  const handleChange = (event) => {
    setAuthLevel(event.target.value);
  };

  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    navigate("/users");
  };
  const handlePost = () => {
    // post form
    handleClose();
  };

  return (
    <div>
      <Modal
        className="UserFormModal"
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box className="Box">
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Add new user
            </Typography>

            <form>
              <TextField
                id="outlined"
                label="Name"
                type="text"
                required
                fullWidth
                margin="dense"
                placeholder="Jane"
                inputProps={{ minlength: 2, maxlength: 35 }}
              />
              <TextField
                id="outlined"
                label="Surname"
                type="text"
                required
                fullWidth
                margin="dense"
                placeholder="Doe"
                inputProps={{ minlength: 2, maxlength: 35 }}
              />
              <TextField
                id="outlined"
                label="Nickname"
                type="text"
                fullWidth
                margin="dense"
                inputProps={{ minlength: 2, maxlength: 35 }}
              />

              <TextField
                id="outlined"
                label="Login email"
                type="text"
                required
                fullWidth
                margin="dense"
                helperText="User will login to CDB with this email"
                placeholder="jane.doe@best.hr"
                inputProps={{ minlength: 3, maxlength: 55 }}
              />
              <TextField
                id="outlined"
                label="Notification email"
                type="text"
                required
                fullWidth
                margin="dense"
                helperText="Notifications will be sent to this email"
                placeholder="jane.doe@gmail.com"
                inputProps={{ minlength: 3, maxlength: 55 }}
              />

              <TextField
                id="outlined-select-authorization-level"
                select
                label="Authorization level"
                required
                fullWidth
                margin="dense"
                value={authLevel}
                onChange={handleChange}
              >
                {authLevels.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                id="outlined-multiline-static"
                label="Description"
                fullWidth
                multiline
                minRows={2}
                maxRows={4}
                margin="dense"
                inputProps={{ maxlength: 475 }}
              />

              <div className="action-btns">
                <Button variant="outlined" onClick={handleClose}>
                  Cancel
                </Button>

                <Button variant="contained" onClick={handlePost}>
                  Add user
                </Button>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

// export default function NewUser() {
//   const [name, setName] = useState();
//   const navigate = useNavigate();

//   // TODO: post to correct URL
//   const namePost = async () => {
//     await fetch("http://localhost:8080/users/add-user", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ nickname: name, maxAuthLevel: "observer" }),
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     console.log("form submited " + name);
//     namePost().then((res) => {
//       // display success or error msg
//       navigate("/users");
//     });
//   };

//   return (
//     <>
//       <h1>New user form</h1>

//       {/* TODO: add form with inputs for all data */}
//       <form onSubmit={handleSubmit}>
//         <input onChange={(e) => setName(e.target.value)} value={name}></input>
//         <button type="submit">Click to submit</button>
//       </form>
//     </>
//   );
// }
