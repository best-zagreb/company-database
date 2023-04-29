import {
  Backdrop,
  Modal,
  Fade,
  Button,
  TextField,
  MenuItem,
  Typography,
  FormControl,
  Box,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useState, useContext, useEffect } from "react";

import ToastContext from "../../context/ToastContext";

import TextInput from "./partial/TextInput";

const authLevels = [
  {
    value: "Observer",
    label: "Observer",
  },
  {
    value: "FR team member",
    label: "FR team member",
  },
  {
    value: "FR responsible",
    label: "FR responsible",
  },
  {
    value: "Moderator",
    label: "Moderator",
  },
  {
    value: "Admin",
    label: "Administrator",
  },
];

export default function UserForm({
  user,
  openUserFormModal: openModal,
  setOpenUserFormModal,
  populateUsers,
}) {
  const { handleOpenToast } = useContext(ToastContext);

  const [loadingButton, setLoadingButton] = useState(false);

  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [nickname, setNickname] = useState();
  const [loginEmail, setLoginEmail] = useState();
  const [notificationEmail, setNotificationEmail] = useState();
  const [authLevel, setAuthLevel] = useState();
  const [description, setDescription] = useState();

  const [nameIsValid, setNameIsValid] = useState();
  const [surnameIsValid, setSurnameIsValid] = useState();
  const [nicknameIsValid, setNicknameIsValid] = useState();
  const [loginEmailIsValid, setLoginEmailIsValid] = useState();
  const [notificationEmailIsValid, setNotificationEmailIsValid] = useState();
  const [authLevelIsValid, setAuthLevelIsValid] = useState();
  const [descriptionIsValid, setDescriptionIsValid] = useState();

  async function submit() {
    if (
      !nameIsValid ||
      !surnameIsValid ||
      !nicknameIsValid ||
      !loginEmailIsValid ||
      !notificationEmailIsValid ||
      !authLevelIsValid ||
      !descriptionIsValid
    ) {
      return;
    }

    setLoadingButton(true);

    const JWToken = JSON.parse(localStorage.getItem("loginInfo")).JWT;

    const newUser = {
      firstName: name.trim(),
      lastName: surname.trim(),
      nickname: nickname && nickname !== "" ? nickname.trim() : null,
      loginEmail: loginEmail.trim(),
      notificationEmail: notificationEmail.trim(),
      authority: authLevel.trim().toUpperCase(),
      description:
        description && description !== "" ? description.trim() : null,
    };

    const request = {
      method: user ? "PUT" : "POST",
      headers: {
        googleTokenEncoded: JWToken.credential,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    };

    const serverResponse = await fetch(
      `http://localhost:8080/users/${user?.id ?? ""}`,
      request
    );

    if (serverResponse.ok) {
      handleOpenToast({
        type: "success",
        info: `User ${newUser.firstName} ${newUser.lastName} ${
          user ? "updated" : "added"
        }.`,
      });
      setOpenUserFormModal(false);
      populateUsers();
    } else if (serverResponse.status === 400) {
      handleOpenToast({
        type: "error",
        info: "Invalid user details.",
      });
    } else if (serverResponse.status === 403) {
      handleOpenToast({
        type: "error",
        info: "Administrator privileges are required for manipulating users.",
      });
    } else if (serverResponse.status === 404) {
      handleOpenToast({
        type: "error",
        info: "User with id " + user.id + " does not exist.",
      });
    } else {
      handleOpenToast({
        type: "error",
        info:
          "An unknown error occurred whilst trying to " +
          (user ? "update" : "add") +
          " user.",
      });
    }

    setLoadingButton(false);
  }

  useEffect(() => {
    setName(user?.firstName);
    setSurname(user?.lastName);
    setNickname(user?.nickname || "");
    setLoginEmail(user?.loginEmail);
    setNotificationEmail(user?.notificationEmail);
    setAuthLevel(
      user?.authority.charAt(0) + user?.authority.slice(1).toLowerCase() ||
        authLevels[0].value
    );
    setDescription(user?.description);

    // optional and predefined fields are always valid
    setNameIsValid(user ? true : false);
    setSurnameIsValid(user ? true : false);
    setNicknameIsValid(true);
    setLoginEmailIsValid(user ? true : false);
    setNotificationEmailIsValid(user ? true : false);
    setAuthLevelIsValid(true);
    setDescriptionIsValid(true);
  }, [openModal]);

  return (
    <>
      <Backdrop open={openModal}>
        <Modal
          open={openModal}
          closeAfterTransition
          // submit on Enter key
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submit();
            }
          }}
          // close on Escape key
          onClose={() => {
            setOpenUserFormModal(false);
          }}
        >
          <Fade in={openModal}>
            <FormControl
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",

                maxWidth: "95%",
                width: "30rem",

                maxHeight: "95%",

                borderRadius: "1.5rem",
                padding: "1rem",

                backgroundColor: "whitesmoke",
                boxShadow: "#666 2px 2px 8px",
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{ textTransform: "uppercase", fontWeight: "bold" }}
              >
                {!user ? "Add user" : "Update user"}
              </Typography>

              <Box
                sx={{
                  overflowY: "auto",
                }}
              >
                <TextInput
                  labelText={"Name"}
                  isRequired
                  placeholderText={"Jane"}
                  helperText={{
                    error: "Name must be between 2 and 35 characters",
                    details: "",
                  }}
                  inputProps={{ minLength: 2, maxLength: 35 }}
                  validationFunction={(input) => {
                    return input.length >= 2 && input.length <= 35;
                  }}
                  value={name}
                  setValue={setName}
                  valueIsValid={nameIsValid}
                  setValueIsValid={setNameIsValid}
                ></TextInput>
                <TextInput
                  labelText={"Surname"}
                  isRequired
                  placeholderText={"Doe"}
                  helperText={{
                    error: "Surname must be between 2 and 35 characters",
                    details: "",
                  }}
                  inputProps={{ minLength: 2, maxLength: 35 }}
                  validationFunction={(input) => {
                    return input.length >= 2 && input.length <= 35;
                  }}
                  value={surname}
                  setValue={setSurname}
                  valueIsValid={surnameIsValid}
                  setValueIsValid={setSurnameIsValid}
                ></TextInput>
                <TextInput
                  labelText={"Nickname"}
                  helperText={{
                    error: "Nickname must be under 35 characters",
                    details: "",
                  }}
                  inputProps={{ maxLength: 35 }}
                  validationFunction={(input) => {
                    return input.length <= 35;
                  }}
                  value={nickname}
                  setValue={setNickname}
                  valueIsValid={nicknameIsValid}
                  setValueIsValid={setNicknameIsValid}
                ></TextInput>

                <TextInput
                  labelText={"Login email"}
                  isRequired
                  placeholderText={"jane.doe@gmail.com"}
                  helperText={{
                    error: "Invalid email or email length",
                    details: "User will login to CDB with this email",
                  }}
                  inputProps={{ minLength: 6, maxLength: 55 }}
                  validationFunction={(input) => {
                    const mailformat =
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
                    return (
                      input.length >= 6 &&
                      input.length <= 55 &&
                      input.match(mailformat)
                    );
                  }}
                  value={loginEmail}
                  setValue={setLoginEmail}
                  valueIsValid={loginEmailIsValid}
                  setValueIsValid={setLoginEmailIsValid}
                ></TextInput>
                <TextInput
                  labelText={"Notification email"}
                  isRequired
                  placeholderText={"jane.doe@gmail.com"}
                  helperText={{
                    error: "Invalid email or email length",
                    details: "App notifications will be sent to this email",
                  }}
                  inputProps={{ minLength: 6, maxLength: 55 }}
                  validationFunction={(input) => {
                    const mailformat =
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
                    return (
                      input.length >= 6 &&
                      input.length <= 55 &&
                      input.match(mailformat)
                    );
                  }}
                  value={notificationEmail}
                  setValue={setNotificationEmail}
                  valueIsValid={notificationEmailIsValid}
                  setValueIsValid={setNotificationEmailIsValid}
                ></TextInput>

                <TextField
                  label="Authorization level"
                  required
                  fullWidth
                  select
                  margin="dense"
                  helperText={
                    !authLevelIsValid && "Invalid authorization level"
                  }
                  value={authLevel}
                  error={!authLevelIsValid}
                  onChange={(e) => {
                    const input = e.target.value;
                    if (
                      authLevels.map((option) => option.value).includes(input)
                    ) {
                      setAuthLevelIsValid(true);
                    } else {
                      setAuthLevelIsValid(false);
                    }

                    setAuthLevel(input);
                  }}
                >
                  {authLevels.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      // temporary solution for not being able to change when FR levels
                      disabled={
                        option === authLevels[1] || option === authLevels[2]
                      }
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextInput
                  labelText={"Description"}
                  textFieldProps={{
                    multiline: true,
                    minRows: 2,
                    maxRows: 5,
                  }}
                  helperText={{
                    error: "Description must be under 475 characters",
                    details: "",
                  }}
                  inputProps={{ maxLength: 475 }}
                  validationFunction={(input) => {
                    return input.length <= 475;
                  }}
                  value={description}
                  setValue={setDescription}
                  valueIsValid={descriptionIsValid}
                  setValueIsValid={setDescriptionIsValid}
                ></TextInput>
              </Box>

              <Box
                sx={{
                  marginBlock: "3%",

                  display: "flex",
                  justifyContent: "space-between",
                  gap: 1,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => {
                    setOpenUserFormModal(false);
                  }}
                >
                  Cancel
                </Button>

                <LoadingButton
                  variant="contained"
                  onClick={submit}
                  loading={loadingButton}
                  disabled={
                    !(
                      nameIsValid &&
                      surnameIsValid &&
                      nicknameIsValid &&
                      loginEmailIsValid &&
                      notificationEmailIsValid &&
                      authLevelIsValid &&
                      descriptionIsValid
                    )
                  }
                >
                  {/* span needed because of bug */}
                  <span>{!user ? "Add user" : "Update user"}</span>
                </LoadingButton>
              </Box>
            </FormControl>
          </Fade>
        </Modal>
      </Backdrop>
    </>
  );
}
