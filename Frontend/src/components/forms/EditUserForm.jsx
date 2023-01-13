import { useState } from "react";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import "./Form.css";

const user = {
  name: "",
  surname: "",
  nickname: "",
  loginEmail: "",
  notificationEmail: "",
  authLevel: "",
  description: "",
};

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

function ValidateEmail(inputEmail) {
  const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (inputEmail.match(mailformat)) {
    return true;
  } else {
    return false;
  }
}

export default function UserForm({
  openModal,
  setOpenModal,
  fetchUsers,
  bestuser,
  id,
}) {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("van");

    if (
      nameIsValid &&
      surnameIsValid &&
      nicknameIsValid &&
      loginEmailIsValid &&
      notificationEmailIsValid &&
      authLevelIsValid &&
      descriptionIsValid
    ) {
      console.log("unutra");
      user.name = name;
      user.surname = surname;
      user.nickname = nickname;
      user.loginEmail = loginEmail;
      user.notificationEmail = notificationEmail;
      user.authLevel = authLevel;
      user.description = description;
      console.log(user);

      const JWToken = JSON.parse(localStorage.getItem("loginInfo")).JWT;

      fetch("http://159.65.127.217:8080/users/" + id, {
        method: "PUT",
        headers: {
          googleTokenEncoded: JWToken.credential,

          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((json) => {
          // if error display error toast
          console.log(json);

          // if success display success toast, close modal and update users list
          setOpenModal(false);
          fetchUsers();
        });
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [nickname, setNickname] = useState();
  const [loginEmail, setLoginEmail] = useState();
  const [notificationEmail, setNotificationEmail] = useState();
  const [authLevel, setAuthLevel] = useState("Observer");
  const [description, setDescription] = useState();

  const [nameIsValid, setNameIsValid] = useState(true);
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
  const [surnameIsValid, setSurnameIsValid] = useState(true);
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
  const [loginEmailIsValid, setLoginEmailIsValid] = useState(true);
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
    useState(true);
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
  const [authLevelIsValid, setAuthLevelIsValid] = useState(true);
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

  return (
    <div>
      <Modal
        className="FormModal"
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box className="Box">
            <h2>Edit the user</h2>

            <form onSubmit={onSubmit}>
              <TextField
                id="outlined"
                defaultValue={bestuser.name}
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
                defaultValue={bestuser.surname}
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
                defaultValue={bestuser.nickname}
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
                defaultValue={bestuser.loginEmail}
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
                defaultValue={bestuser.notificationEmail}
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
                defaultValue={bestuser.authLevel}
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
                defaultValue={bestuser.description}
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
                  Edit user
                </Button>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
