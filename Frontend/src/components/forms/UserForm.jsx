import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";

import { useState, useContext, useEffect } from "react";

import ToastContext from "../../context/ToastContext";

import "./Form.css";

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
    value: "Admin",
    label: "Admin",
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
  user,
  openUserFormModal,
  setOpenUserFormModal,
  populateUsers,
}) {
  const { handleOpenToast } = useContext(ToastContext);

  useEffect(() => {
    if (user) {
      setName(user.firstName);
      setNameIsValid(true);
      setSurname(user.lastName);
      setSurnameIsValid(true);
      setNickname(user.nickname);
      setNicknameIsValid(true);
      setLoginEmail(user.loginEmail);
      setLoginEmailIsValid(true);
      setNotificationEmail(user.notificationEmail);
      setNotificationEmailIsValid(true);
      setAuthLevel(
        user.authority.charAt(0) + user.authority.slice(1).toLowerCase()
      );
      setAuthLevelIsValid(true);
      setDescription(user.description);
      setDescriptionIsValid(true);
    } else {
      setName("");
      setSurname("");
      setNickname("");
      setLoginEmail("");
      setNotificationEmail("");
      setAuthLevel(authLevels[0].value);
      setDescription("");
    }
  }, [user]);

  async function onSubmit(e) {
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
      const JWToken = JSON.parse(localStorage.getItem("loginInfo")).JWT;

      if (!user) {
        // create new user object
        user = {
          firstName: name,
          lastName: surname,
          nickname: nickname,
          loginEmail: loginEmail,
          notificationEmail: notificationEmail,
          authority: authLevel.toUpperCase(),
          description: description,
        };

        let serverResponse = await fetch("http://159.65.127.217:8080/users/", {
          method: "POST",
          headers: {
            googleTokenEncoded: JWToken.credential,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        // later to be changed to 201 Created
        if (serverResponse.status === 200) {
          handleOpenToast({
            type: "success",
            info: "User " + user.firstName + " " + user.lastName + " added.",
            autoHideDuration: 1000,
          });

          setOpenUserFormModal(false);
          populateUsers();
        } else if (serverResponse.status === 400) {
          handleOpenToast({
            type: "error",
            info: "Invalid user details.",
            autoHideDuration: 5000,
          });
        } else if (serverResponse.status === 403) {
          handleOpenToast({
            type: "error",
            info: "Administrator privileges are needed for manipulating users.",
            autoHideDuration: 5000,
          });
        } else {
          handleOpenToast({
            type: "error",
            info: "An unknown error accured whilst trying to add user.",
            autoHideDuration: 5000,
          });
        }
      } else {
        // update existing user object so id stays the same
        user.firstName = name;
        user.lastName = surname;
        user.nickname = nickname;
        user.loginEmail = loginEmail;
        user.notificationEmail = notificationEmail;
        user.authority = authLevel.toUpperCase();
        user.description = description;

        let serverResponse = await fetch(
          "http://159.65.127.217:8080/users/" + user.id,
          {
            method: "PUT",
            headers: {
              googleTokenEncoded: JWToken.credential,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          }
        );

        if (serverResponse.status === 200) {
          handleOpenToast({
            type: "success",
            info: "User " + user.firstName + " " + user.lastName + " updated.",
            autoHideDuration: 1000,
          });

          setOpenUserFormModal(false);
          populateUsers();
        } else if (serverResponse.status === 400) {
          handleOpenToast({
            type: "error",
            info: "Invalid user details.",
            autoHideDuration: 5000,
          });
        } else if (serverResponse.status === 403) {
          handleOpenToast({
            type: "error",
            info: "Administrator privileges are needed for manipulating users.",
            autoHideDuration: 5000,
          });
        } else {
          handleOpenToast({
            type: "error",
            info: "An unknown error accured whilst trying to update user.",
            autoHideDuration: 5000,
          });
        }
      }
    }
  }

  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [nickname, setNickname] = useState();
  const [loginEmail, setLoginEmail] = useState();
  const [notificationEmail, setNotificationEmail] = useState();
  const [authLevel, setAuthLevel] = useState();
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
  const [authLevelIsValid, setAuthLevelIsValid] = useState(true);
  const handleAuthLevelChange = (e) => {
    const input = e.target.value;
    if (input === "Observer" || input === "Moderator" || input === "Admin") {
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
        open={openUserFormModal}
        onClose={() => {
          setOpenUserFormModal(false);
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openUserFormModal}>
          <Box className="Box">
            <h2>{!user ? "Add new user" : "Update existing user"}</h2>

            <form onSubmit={onSubmit}>
              <TextField
                label="Name"
                type="text"
                required
                fullWidth
                margin="dense"
                placeholder="Jane"
                value={name}
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
                label="Surname"
                type="text"
                required
                fullWidth
                margin="dense"
                placeholder="Doe"
                value={surname}
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
                label="Nickname"
                type="text"
                fullWidth
                margin="dense"
                value={nickname}
                inputProps={{ maxLength: 35 }}
                error={!nicknameIsValid}
                helperText={
                  !nicknameIsValid && "Nickname must be under 35 characters"
                }
                onChange={handleNicknameChange}
              />

              <TextField
                label="Login email"
                type="text"
                required
                fullWidth
                margin="dense"
                placeholder="jane.doe@best.hr"
                value={loginEmail}
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
                label="Notification email"
                type="text"
                required
                fullWidth
                margin="dense"
                placeholder="jane.doe@gmail.com"
                value={notificationEmail}
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

              <Select
                label="Authorization level"
                required
                fullWidth
                margin="dense"
                value={authLevel}
                error={!authLevelIsValid}
                onChange={handleAuthLevelChange}
              >
                {authLevels.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>

              <TextField
                label="Description"
                fullWidth
                multiline
                minRows={2}
                maxRows={4}
                margin="dense"
                value={description}
                inputProps={{ maxLength: 475 }}
                error={!descriptionIsValid}
                helperText={
                  !descriptionIsValid &&
                  "Description must be under 475 characters"
                }
                onChange={handleDescriptionChange}
              />

              <div className="action-btns">
                <Button
                  variant="outlined"
                  onClick={() => {
                    setOpenUserFormModal(false);
                  }}
                >
                  Cancel
                </Button>

                <Button variant="contained" type="submit">
                  {!user ? "Add user" : "Update user"}
                </Button>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
