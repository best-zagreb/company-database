import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
  TextField,
  MenuItem,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

import "./Form.css";

import { useState, useContext } from "react";

import ToastContext from "../../context/ToastContext";

const company = {
  name: null,
  domain: null,
  abcCategory: null, //char
  budgetPlanningMonth: null,
  country: null,
  zipCode: null, //int
  address: null,
  webUrl: null,
  contactInFuture: null, //bool
};

const ABC = [
  {
    value: "A",
  },
  {
    value: "B",
  },
  {
    value: "C",
  },
];

const months = [
  { value: "January" },
  { value: "February" },
  { value: "March" },
  { value: "April" },
  { value: "May" },
  { value: "June" },
  { value: "July" },
  { value: "August" },
  { value: "September" },
  { value: "October" },
  { value: "November" },
  { value: "December" },
];

const isValidUrl = (urlString) => {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator
  return !!urlPattern.test(urlString);
};

function validateURL(website) {
  if (isValidUrl(website)) return true;
  else return false;
}

export default function UserForm({
  openModal,
  setOpenModal,
  populateCompanies,
}) {
  const { handleOpenToast } = useContext(ToastContext);

  async function onSubmit(e) {
    e.preventDefault();

    if (
      nameIsValid &&
      industryIsValid &&
      countryIsValid &&
      zipCodeIsValid &&
      adressIsValid &&
      doContactIsValid
    ) {
      company.name = name;
      company.domain = industry;
      company.abcCategory = abcCategorization.toLowerCase();
      company.budgetPlanningMonth = budgetMonth;
      company.country = country;
      company.zipCode = zipCode;
      company.address = address;
      company.webUrl = url;
      company.contactInFuture = doContact;

      //console.log(company);

      const JWToken = JSON.parse(localStorage.getItem("loginInfo")).JWT;

      const serverResponse = await fetch("http://localhost:8080/companies/", {
        method: "POST",
        headers: {
          googleTokenEncoded: JWToken.credential,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(company),
      });

      if (serverResponse.ok1) {
        handleOpenToast({
          type: "success",
          info: "Company " + company.name + " added.",
        });

        setOpenModal(false);
        populateCompanies();
      } else if (serverResponse.status === 400) {
        handleOpenToast({
          type: "error",
          info: "Company with those details cannot be added.",
        });
      } else if (serverResponse.status === 403) {
        handleOpenToast({
          type: "error",
          info: "FR responsible privileges are needed for manipulating companies.",
        });
      } else {
        handleOpenToast({
          type: "error",
          info: "An unknown error accured whilst trying to add company.",
        });
      }
    }
  }

  const [name, setName] = useState();
  const [industry, setIndustry] = useState();
  const [abcCategorization, setabcCategorization] = useState();
  const [budgetMonth, setBudgetMonth] = useState();
  const [country, setCountry] = useState();
  //const [town, setTown] = useState();
  const [zipCode, setZipCode] = useState();
  const [address, setAdress] = useState();
  const [url, setUrl] = useState();
  //const [description, setDescription] = useState();
  const [doContact, setDoContact] = useState();

  const [nameIsValid, setNameIsValid] = useState(false);
  const handleNameChange = (e) => {
    const input = e.target.value;
    if (input.length >= 2 && input.length <= 35) {
      setNameIsValid(true);
      setName(input);
    }
  };

  const [industryIsValid, setIndustryIsValid] = useState(false);
  const handleIndustryChange = (e) => {
    const input = e.target.value;
    if (input.length >= 2 && input.length <= 35) {
      setIndustryIsValid(true);
      setIndustry(input);
    }
  };

  const handleabcChange = (e) => {
    const input = e.target.value;
    setabcCategorization(input);
  };

  const handleBudgetPlanningMonth = (e) => {
    const input = e.target.value;
    setBudgetMonth(input);
  };

  const [countryIsValid, setCountryIsValid] = useState(false);
  const handleCountryChange = (e) => {
    const input = e.target.value;
    if (input.length >= 2 && input.length <= 56) {
      setCountryIsValid(true);
      setCountry(input);
    }
  };

  const [zipCodeIsValid, setNotificationEmailIsValid] = useState(false);
  const handleZipCodeChange = (e) => {
    const input = e.target.value;
    if (input.length == 5 && !isNaN(input)) setNotificationEmailIsValid(true);
    setZipCode(input);
  };

  // const [townIsValid, setTownlIsValid] = useState(false);
  // const handleTownChange = (e) => {
  //   const input = e.target.value;
  //   if (input.length >= 2 && input.length <= 56) {
  //     setTownlIsValid(true);
  //     setTown(input);
  //   }
  // };

  const [adressIsValid, setAdresslIsValid] = useState(false);
  const handleAdressChange = (e) => {
    const input = e.target.value;
    if (input.length >= 2 && input.length <= 56) {
      setAdresslIsValid(true);
      setAdress(input);
    }
  };

  const [urlIsValid, setUrlIsValid] = useState(false);
  const handleUrlChange = (e) => {
    const input = e.target.value;
    if (isValidUrl(input)) {
      setUrlIsValid(true);

      setUrl(input);
    }
  };

  // const [descriptionIsValid, setDescriptionIsValid] = useState(false);
  // const handleDescriptionChange = (e) => {
  //   const input = e.target.value;
  //   if (input.length <= 475) {
  //     setDescriptionIsValid(true);
  //   } else {
  //     setDescriptionIsValid(false);
  //   }

  //   setDescription(input);
  // };

  const [doContactIsValid, setDoContactIsValid] = useState(true);
  const handleDoContactChange = (e) => {
    const input = e.target.value;
    setDoContactIsValid(true);
    if (input === "yes") {
      setDoContact(true);
    } else {
      setDoContact(false);
    }
  };

  return (
    <div>
      <Modal
        className="FormModal"
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
            <h2>Add a new Company</h2>

            <form onSubmit={onSubmit}>
              <TextField
                id="outlined"
                label="Name"
                type="text"
                required
                fullWidth
                margin="dense"
                placeholder="Company of Heroes"
                inputProps={{ minLength: 2, maxLength: 35 }}
                onChange={handleNameChange}
              />

              <TextField
                id="outlined"
                label="Industry"
                type="text"
                required
                fullWidth
                margin="dense"
                placeholder="IT"
                inputProps={{ minLength: 2, maxLength: 35 }}
                onChange={handleIndustryChange}
              />

              <TextField
                id="outlined-select-authorization-level"
                select
                label="ABC categorization"
                fullWidth
                margin="dense"
                onChange={handleabcChange}
              >
                {ABC.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                id="outlined-select-authorization-level"
                select
                label="Budget planning month"
                fullWidth
                margin="dense"
                onChange={handleBudgetPlanningMonth}
              >
                {months.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                id="outlined"
                label="Country"
                required
                type="text"
                fullWidth
                margin="dense"
                inputProps={{ minLength: 4, maxLength: 56 }}
                onChange={handleCountryChange}
              />

              <TextField
                id="outlined"
                label="ZIP code"
                type="text"
                required
                fullWidth
                margin="dense"
                placeholder="10000"
                inputProps={{ minLength: 5, maxLength: 5 }}
                onChange={handleZipCodeChange}
              />

              {/* <TextField
                id="outlined"
                label="Town"
                type="text"
                fullWidth
                margin="dense"
                placeholder="Zagreb"
                inputProps={{ minLength: 2, maxLength: 56 }}
                onChange={handleTownChange}
              /> */}

              <TextField
                id="outlined"
                label="Adress"
                type="text"
                required
                fullWidth
                margin="dense"
                inputProps={{ minLength: 2, maxLength: 56 }}
                onChange={handleAdressChange}
              />

              <TextField
                id="outlined"
                label="Webpage URL"
                type="text"
                fullWidth
                margin="dense"
                placeholder="https://best.hr"
                onChange={handleUrlChange}
              />

              {/* <TextField
                id="outlined-multiline-static"
                label="Description"
                fullWidth
                multiline
                minRows={2}
                maxRows={4}
                margin="dense"
                inputProps={{ maxLength: 475 }}
                onChange={handleDescriptionChange}
              /> */}

              <FormLabel id="demo-radio-buttons-group-label">
                Contact in future
              </FormLabel>
              <RadioGroup
                row
                name="radio-buttons-group"
                defaultValue="yes"
                required
                onChange={handleDoContactChange}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>

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
                  Add company
                </Button>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
