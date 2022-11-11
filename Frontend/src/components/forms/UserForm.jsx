import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
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

const user = {
  name: "",
  surname: "",
  nickname: "",
  loginEmail: "",
  notificationEmail: "",
  authLevel: "",
  description: "",
};

function ValidateEmail(inputEmail) {
  const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (inputEmail.match(mailformat)) {
    return true;
  } else {
    return false;
  }
}

export default function UserForm() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [nickname, setNickname] = useState();
  const [loginEmail, setLoginEmail] = useState();
  const [notificationEmail, setNotificationEmail] = useState();
  const [authLevel, setAuthLevel] = useState("Observer");
  const [description, setDescription] = useState();

  const [nameIsValid, setNameIsValid] = useState(false);
  const [nameDirty, setNameDirty] = useState(false);
  const handleNameChange = (e) => {
    const input = e.target.value;
    if (input.length >= 2 && input.length <= 35) {
      setNameIsValid(true);
    } else {
      setNameIsValid(false);
    }

    setName(input);
  };
  const [surnameIsValid, setSurnameIsValid] = useState(false);
  const [surnameDirty, setSurnameDirty] = useState(false);
  const handleSurnameChange = (e) => {
    const input = e.target.value;
    if (input.length >= 2 && input.length <= 35) {
      setSurnameIsValid(true);
    } else {
      setSurnameIsValid(false);
    }

    setSurname(input);
  };
  const [nicknameIsValid, setNicknameIsValid] = useState(true);
  const handleNicknameChange = (e) => {
    const input = e.target.value;
    if (input.length <= 35) {
      setNicknameIsValid(true);
    } else {
      setNicknameIsValid(false);
    }

    setNickname(input);
  };
  const [loginEmailIsValid, setLoginEmailIsValid] = useState(false);
  const [loginEmailDirty, setLoginEmailDirty] = useState(false);
  const handleLoginEmailChange = (e) => {
    const input = e.target.value;
    if (ValidateEmail(input)) {
      setLoginEmailIsValid(true);
    } else {
      setLoginEmailIsValid(false);
    }

    setLoginEmail(input);
  };
  const [notificationEmailIsValid, setNotificationEmailIsValid] =
    useState(false);
  const [notificationEmailDirty, setNotificationEmailDirty] = useState(false);
  const handleNotificationEmailChange = (e) => {
    const input = e.target.value;
    if (ValidateEmail(input)) {
      setNotificationEmailIsValid(true);
    } else {
      setNotificationEmailIsValid(false);
    }

    setNotificationEmail(input);
  };
  const [authLevelIsValid, setAuthLevelIsValid] = useState(false);
  const [authLevelDirty, setAuthLevelDirty] = useState(false);
  const handleAuthLevelChange = (e) => {
    const input = e.target.value;
    if (
      input === "Observer" ||
      input === "Moderator" ||
      input === "Administrator"
    ) {
      setAuthLevelIsValid(true);
    } else {
      setAuthLevelIsValid(false);
    }

    setAuthLevel(input);
  };
  const [descriptionIsValid, setDescriptionIsValid] = useState(true);
  const handleDescriptionChange = (e) => {
    const input = e.target.value;
    if (input.length <= 475) {
      setDescriptionIsValid(true);
    } else {
      setDescriptionIsValid(false);
    }

    setDescription(input);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      nameIsValid &&
      surnameIsValid &&
      nicknameIsValid &&
      loginEmailIsValid &&
      notificationEmailIsValid &&
      authLevelIsValid &&
      descriptionIsValid
    ) {
      user.name = name;
      user.surname = surname;
      user.nickname = nickname;
      user.loginEmail = loginEmail;
      user.notificationEmail = notificationEmail;
      user.authLevel = authLevel;
      user.description = description;
      console.log(user);
      // post user

      handleClose();
    }
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/users");
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
            <h2>Add new user</h2>

            <form onSubmit={onSubmit}>
              <TextField
                id="outlined"
                label="Name"
                type="text"
                required
                fullWidth
                margin="dense"
                placeholder="Jane"
                inputProps={{ minLength: 2, maxLength: 35 }}
                onBlur={() => {
                  setNameDirty(true);
                }}
                error={nameDirty && !nameIsValid}
                helperText={
                  nameDirty &&
                  !nameIsValid &&
                  "Name must be between 2 and 35 characters"
                }
                onChange={handleNameChange}
              />
              <TextField
                id="outlined"
                label="Surname"
                type="text"
                required
                fullWidth
                margin="dense"
                placeholder="Doe"
                inputProps={{ minLength: 2, maxLength: 35 }}
                onBlur={() => {
                  setSurnameDirty(true);
                }}
                error={surnameDirty && !surnameIsValid}
                helperText={
                  surnameDirty &&
                  !surnameIsValid &&
                  "Surname must be between 2 and 35 characters"
                }
                onChange={handleSurnameChange}
              />
              <TextField
                id="outlined"
                label="Nickname"
                type="text"
                fullWidth
                margin="dense"
                inputProps={{ maxLength: 35 }}
                error={!nicknameIsValid}
                helperText={
                  !nicknameIsValid && "Nickname must be under 35 characters"
                }
                onChange={handleNicknameChange}
              />

              <TextField
                id="outlined"
                label="Login email"
                type="text"
                required
                fullWidth
                margin="dense"
                placeholder="jane.doe@best.hr"
                inputProps={{ minLength: 6, maxLength: 55 }}
                onBlur={() => {
                  setLoginEmailDirty(true);
                }}
                error={loginEmailDirty && !loginEmailIsValid}
                helperText={
                  loginEmailDirty && !loginEmailIsValid
                    ? "Invalid email or email length"
                    : "User will login to CDB with this email"
                }
                onChange={handleLoginEmailChange}
              />
              <TextField
                id="outlined"
                label="Notification email"
                type="text"
                required
                fullWidth
                margin="dense"
                placeholder="jane.doe@gmail.com"
                inputProps={{ minLength: 6, maxLength: 55 }}
                onBlur={() => {
                  setNotificationEmailDirty(true);
                }}
                error={notificationEmailDirty && !notificationEmailIsValid}
                helperText={
                  notificationEmailDirty && !notificationEmailIsValid
                    ? "Invalid email or email length"
                    : "App notifications will be sent to this email"
                }
                onChange={handleNotificationEmailChange}
              />

              <TextField
                id="outlined-select-authorization-level"
                select
                label="Authorization level"
                required
                fullWidth
                margin="dense"
                value={authLevel}
                onBlur={() => {
                  setAuthLevelDirty(true);
                }}
                error={authLevelDirty && !authLevelIsValid}
                helperText={
                  authLevelDirty &&
                  !authLevelIsValid &&
                  "Invalid authorization level"
                }
                onChange={handleAuthLevelChange}
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
                inputProps={{ maxLength: 475 }}
                error={!descriptionIsValid}
                helperText={
                  !descriptionIsValid && "Nickname must be under 475 characters"
                }
                onChange={handleDescriptionChange}
              />

              <div className="action-btns">
                <Button variant="outlined" onClick={handleClose}>
                  Cancel
                </Button>

                <Button variant="contained" type="submit">
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
//     namePost().then((res) => {
//       // display success or error msg
//       navigate("/users");
//     });
//   };

//   );
// }
