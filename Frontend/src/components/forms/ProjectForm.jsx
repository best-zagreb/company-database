import {
  Backdrop,
  Modal,
  Fade,
  Button,
  TextField,
  Autocomplete,
  MenuItem,
  Typography,
  FormControl,
  Box,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useState, useContext, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";

import UserContext from "../../context/UserContext";
import ToastContext from "../../context/ToastContext";

import TextInput from "./partial/TextInput";

import "./Form.css";

const projectTypes = [
  {
    value: "External",
    label: "External",
  },
  {
    value: "Internal",
    label: "Internal",
  },
];

export default function ProjectForm({
  project,
  populateProjects,
  openModal,
  setOpenModal,
}) {
  const { user } = useContext(UserContext);
  const { handleOpenToast } = useContext(ToastContext);

  const [usersForFRResp, setUsersForFRResp] = useState([]);
  const [projectsForCategories, setProjectsForCategories] = useState([]);
  const [loadingButton, setLoadingButton] = useState(false);

  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [type, setType] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [FRRespID, setFRRespID] = useState();
  const [FRGoal, setFRGoal] = useState();
  const [firstPingDate, setFirstPingDate] = useState();
  const [secondPingDate, setSecondPingDate] = useState();

  const [nameIsValid, setNameIsValid] = useState();
  const [categoryIsValid, setCategoryIsValid] = useState();
  const [typeIsValid, setTypeIsValid] = useState();
  const [startDateIsValid, setStartDateIsValid] = useState();
  const [endDateIsValid, setEndDateIsValid] = useState();
  const [FRRespIDIsValid, setFRRespIDIsValid] = useState();
  const [FRGoalIsValid, setFRGoalIsValid] = useState();
  const [firstPingDateIsValid, setFirstPingDateIsValid] = useState();
  const [secondPingDateIsValid, setSecondPingDateIsValid] = useState();

  async function fetchUsersForFRResp() {
    const JWToken = JSON.parse(localStorage.getItem("loginInfo")).JWT;

    try {
      const serverResponse = await fetch("http://localhost:8080/users/", {
        method: "GET",
        headers: { googleTokenEncoded: JWToken.credential },
      });

      if (serverResponse.ok) {
        const json = await serverResponse.json();

        // console.log(json);
        setUsersForFRResp(json);
      } else {
        handleOpenToast({
          type: "error",
          info: "A server error occurred whilst fetching users for FR responsible input field.",
        });
      }
    } catch (error) {
      handleOpenToast({
        type: "error",
        info: "An error occurred whilst trying to connect to server.",
      });
    }
  }

  async function fetchProjectsForCategories() {
    const JWToken = JSON.parse(localStorage.getItem("loginInfo")).JWT;

    try {
      const serverResponse = await fetch("http://localhost:8080/projects/", {
        method: "GET",
        headers: { googleTokenEncoded: JWToken.credential },
      });

      if (serverResponse.ok) {
        const json = await serverResponse.json();

        // console.log(json);
        setProjectsForCategories(json);
      } else {
        handleOpenToast({
          type: "error",
          info: "A server error occurred whilst fetching projects for Category input field.",
        });
      }
    } catch (error) {
      handleOpenToast({
        type: "error",
        info: "An error occurred whilst trying to connect to server.",
      });
    }
  }

  async function submit() {
    if (
      !nameIsValid ||
      !categoryIsValid ||
      !startDateIsValid ||
      !endDateIsValid ||
      !FRRespIDIsValid ||
      !FRGoalIsValid ||
      !firstPingDateIsValid ||
      !secondPingDateIsValid
    ) {
      return;
    }

    setLoadingButton(true);
    const JWToken = JSON.parse(localStorage.getItem("loginInfo")).JWT;
    const projectData = {
      idCreator: user.id,
      name: name.trim(),
      category: category.trim(),
      type: type.trim().toUpperCase(),
      startDate: startDate,
      endDate: endDate,
      idFRResp: FRRespID, // TODO: change to it extracts the id from user
      frgoal: FRGoal !== "" ? FRGoal : null,
      firstPingDate: firstPingDate,
      secondPingDate: secondPingDate,
    };

    const request = {
      method: project ? "PUT" : "POST",
      headers: {
        googleTokenEncoded: JWToken.credential,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    };

    const serverResponse = await fetch(
      `http://localhost:8080/projects/${project?.id ?? ""}`,
      request
    );

    if (serverResponse.ok) {
      handleOpenToast({
        type: "success",
        info:
          "Project " +
          projectData.name +
          " " +
          (project ? "updated" : "added") +
          ".",
      });

      setOpenModal(false);
      populateProjects();
    } else if (serverResponse.status === 400) {
      handleOpenToast({
        type: "error",
        info: "Invalid project details.",
      });
    } else if (serverResponse.status === 403) {
      handleOpenToast({
        type: "error",
        info: "Moderator privileges are required for manipulating projects.",
      });
    } else if (serverResponse.status === 404) {
      handleOpenToast({
        type: "error",
        info: "Project with id " + project.id + " does not exist.",
      });
    } else {
      handleOpenToast({
        type: "error",
        info:
          "An unknown error occurred whilst trying to " +
          (project ? "update" : "add") +
          " project.",
      });
    }

    setLoadingButton(false);
  }

  useEffect(() => {
    fetchUsersForFRResp();
    fetchProjectsForCategories();

    setName(project?.name);
    setCategory(project?.category);
    setType(
      project?.type.charAt(0) + project?.type.slice(1).toLowerCase() ||
        projectTypes[0].value
    );
    setStartDate(project?.startDate || moment());
    setEndDate(project?.endDate || moment().add(6, "months"));
    setFRRespID(project?.frresp.id);
    setFRGoal(project?.frgoal);
    setFirstPingDate(project?.firstPingDate);
    setSecondPingDate(project?.secondPingDate);

    // optional and predefined fields are always valid
    setNameIsValid(project ? true : false);
    setCategoryIsValid(project ? true : false);
    setTypeIsValid(true);
    setStartDateIsValid(true);
    setEndDateIsValid(true);
    setFRRespIDIsValid(project ? true : false);
    setFRGoalIsValid(true);
    setFirstPingDateIsValid(true);
    setSecondPingDateIsValid(true);
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
            setOpenModal(false);
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
                {!project ? "Add project" : "Update project"}
              </Typography>

              <Box
                sx={{
                  overflowY: "auto",
                }}
              >
                <TextInput
                  labelText={"Project name"}
                  isRequired
                  helperText={{
                    error: "Project name must be between 2 and 35 characters",
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

                <Autocomplete
                  options={projectsForCategories
                    .map((project) => project.category)
                    .filter(
                      (category, index, array) =>
                        array.indexOf(category) === index
                    )
                    .sort((a, b) => {
                      if (a === null) {
                        return 1;
                      } else if (b === null) {
                        return -1;
                      } else {
                        return a.localeCompare(b);
                      }
                    })}
                  filterOptions={(options, { inputValue }) =>
                    options.filter((option) =>
                      option.toLowerCase().includes(inputValue.toLowerCase())
                    )
                  }
                  clearOnEscape
                  openOnFocus
                  freeSolo
                  inputValue={category || ""}
                  onInputChange={(event, value) => {
                    setCategory(value);
                    setCategoryIsValid(value.length >= 2 && value.length <= 35);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Category"
                      placeholder="Hackathon"
                      required
                      fullWidth
                      margin="dense"
                      // InputLabelProps={{ shrink: true }}
                    />
                  )}
                />

                <TextField
                  label="Project type"
                  required
                  fullWidth
                  select
                  margin="dense"
                  helperText={!typeIsValid && "Invalid project type"}
                  value={type}
                  error={!typeIsValid}
                  onChange={(e) => {
                    const input = e.target.value;
                    if (
                      input === projectTypes[0].value ||
                      input === projectTypes[1].value
                    ) {
                      setTypeIsValid(true);
                    } else {
                      setTypeIsValid(false);
                    }

                    setType(input);
                  }}
                >
                  {projectTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <DatePicker
                  label="Start date"
                  required
                  displayWeekNumber
                  format="DD.MM.YYYY."
                  minDate={moment("1980-01-01")}
                  maxDate={moment().add(2, "years")}
                  value={startDate}
                  onChange={(date) => {
                    const input = date;
                    if (
                      input >= moment("1980-01-01") &&
                      input <= moment().add(2, "years")
                    ) {
                      setStartDateIsValid(true);
                    } else {
                      setStartDateIsValid(false);
                    }

                    setStartDate(input);
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      margin: "dense",
                      helperText: !startDateIsValid && "Invalid start date",
                      error: !startDateIsValid,
                    },
                  }}
                />
                <DatePicker
                  label="End date"
                  required
                  displayWeekNumber
                  format="DD.MM.YYYY."
                  minDate={startDate}
                  maxDate={moment().add(2, "years")}
                  value={endDate}
                  onChange={(date) => {
                    const input = date;
                    if (
                      input >= startDate &&
                      input <= moment().add(2, "years")
                    ) {
                      setEndDateIsValid(true);
                    } else {
                      setEndDateIsValid(false);
                    }

                    setEndDate(input);
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      margin: "dense",
                      helperText: !endDateIsValid && "Invalid end date",
                      error: !endDateIsValid,
                    },
                  }}
                />

                <Autocomplete
                  options={usersForFRResp}
                  clearOnEscape
                  openOnFocus
                  getOptionLabel={(option) =>
                    option.firstName + " " + option.lastName
                  }
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  filterOptions={(options, { inputValue }) =>
                    options.filter((option) =>
                      (option.firstName + " " + option.lastName)
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
                    )
                  }
                  onChange={(e, inputValue) => {
                    setFRRespID(inputValue?.id);
                    setFRRespIDIsValid(
                      usersForFRResp
                        .map((option) => option.id)
                        .includes(inputValue?.id)
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="FR responsible"
                      required
                      fullWidth
                      margin="dense"
                    />
                  )}
                />

                <TextInput
                  labelText={"FR goal"}
                  inputType={"number"}
                  placeholderText={"10000"}
                  helperText={{
                    error: "FR goal (if present) must be between 1 and 999999",
                    details: "",
                  }}
                  inputProps={{
                    min: 1,
                    max: 999999,
                    minLength: 1,
                    maxLength: 6,
                  }}
                  validationFunction={(input) => {
                    return (
                      input === null ||
                      input === "" ||
                      (input >= 1 &&
                        input <= 999999 &&
                        input.length >= 1 &&
                        input.length <= 6)
                    );
                  }}
                  value={FRGoal}
                  setValue={setFRGoal}
                  valueIsValid={FRGoalIsValid}
                  setValueIsValid={setFRGoalIsValid}
                ></TextInput>

                <DatePicker
                  label="First ping date"
                  displayWeekNumber
                  format="DD.MM.YYYY."
                  minDate={startDate}
                  maxDate={endDate}
                  onChange={(date) => {
                    const input = date;
                    if (
                      input === null ||
                      (input >= startDate && input <= endDate)
                    ) {
                      setFirstPingDateIsValid(true);
                    } else {
                      setFirstPingDateIsValid(false);
                    }

                    setFirstPingDate(input);
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      margin: "dense",
                      helperText:
                        !firstPingDateIsValid &&
                        "First ping date must be between project start and end date",
                      error: !firstPingDateIsValid,
                    },
                  }}
                />
                <DatePicker
                  label="Second ping date"
                  displayWeekNumber
                  format="DD.MM.YYYY."
                  minDate={firstPingDate || startDate}
                  maxDate={endDate}
                  onClick={(date) => {
                    const input = date;
                    if (
                      input === null ||
                      (input >= startDate && input <= endDate)
                    ) {
                      setSecondPingDateIsValid(true);
                    } else {
                      setSecondPingDateIsValid(false);
                    }

                    setSecondPingDate(input);
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      margin: "dense",
                      helperText:
                        !secondPingDateIsValid &&
                        "Second ping date must be between project start and end date",
                      error: !secondPingDateIsValid,
                    },
                  }}
                />
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
                    setOpenModal(false);
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
                      categoryIsValid &&
                      startDateIsValid &&
                      endDateIsValid &&
                      FRRespIDIsValid &&
                      FRGoalIsValid &&
                      firstPingDateIsValid &&
                      secondPingDateIsValid
                    )
                  }
                >
                  {/* span needed because of bug */}
                  <span>{!project ? "Add project" : "Update project"}</span>
                </LoadingButton>
              </Box>
            </FormControl>
          </Fade>
        </Modal>
      </Backdrop>
    </>
  );
}
