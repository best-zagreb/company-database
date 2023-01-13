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

import "./Form.css";

const company = {
  companyName: null,
  industry: null,
  abcCategorization: null,
  budgetPlanningMonth: null,
  country: null,
  town: null,
  zipCode: null,
  adress: null,
  websiteUrl: null,
  description: null,
  doContact: null,
  employees: null,
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

export default function UserForm({ openModal, setOpenModal, fetchCompanys }) {
  const onSubmit = (e) => {
    e.preventDefault();

    let token = JSON.stringify(
      JSON.parse(localStorage.getItem("loginInfo")).JWT
    );

    if (
      nameIsValid &&
      industryIsValid &&
      countryIsValid &&
      zipCodeIsValid &&
      adressIsValid &&
      doContactIsValid
    ) {
      company.companyName = name;
      company.industry = industry;
      company.abcCategorization = abcCategorization;
      company.budgetPlanningMonth = budgetMonth;
      company.country = country;
      company.town = town;
      company.zipCode = zipCode;
      company.adress = address;
      company.websiteUrl = url;
      company.description = description;
      company.doContact = doContact;
      company.employees = employees;
      console.log(company);

      //Uncomment this when the backend is done

      fetch("http://localhost:8080/companies", {
        method: "POST",
        headers: {
          Authorization: "Basic " + window.btoa("admin:pass"),
          "Content-Type": "application/json",
          googleTokenEncoded: token,
        },
        body: JSON.stringify(company),
      })
        .then((response) => response.json())
        .then((json) => {
          // if error display error toast
          console.log(json);

          // if success display success toast, close modal and update users list
          setOpenModal(false);
          fetchCompanys();
        });
    }
  };

  const [name, setName] = useState();
  const [industry, setIndustry] = useState();
  const [abcCategorization, setabcCategorization] = useState();
  const [budgetMonth, setBudgetMonth] = useState();
  const [country, setCountry] = useState();
  const [town, setTown] = useState();
  const [zipCode, setZipCode] = useState();
  const [address, setAdress] = useState();
  const [url, setUrl] = useState();
  const [description, setDescription] = useState();
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

  const [townIsValid, setTownlIsValid] = useState(false);
  const handleTownChange = (e) => {
    const input = e.target.value;
    if (input.length >= 2 && input.length <= 56) {
      setTownlIsValid(true);
      setTown(input);
    }
  };

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

  const [descriptionIsValid, setDescriptionIsValid] = useState(false);
  const handleDescriptionChange = (e) => {
    const input = e.target.value;
    if (input.length <= 475) {
      setDescriptionIsValid(true);
    } else {
      setDescriptionIsValid(false);
    }

    setDescription(input);
  };

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

              <TextField
                id="outlined"
                label="Town"
                type="text"
                fullWidth
                margin="dense"
                placeholder="Zagreb"
                inputProps={{ minLength: 2, maxLength: 56 }}
                onChange={handleTownChange}
              />

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
                placeholder="best.hr"
                onChange={handleUrlChange}
              />

              <TextField
                id="outlined-multiline-static"
                label="Description"
                fullWidth
                multiline
                minRows={2}
                maxRows={4}
                margin="dense"
                inputProps={{ maxLength: 475 }}
                onChange={handleDescriptionChange}
              />

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
