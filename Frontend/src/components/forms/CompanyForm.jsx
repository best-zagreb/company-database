import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
  TextField,
  Autocomplete,
  MenuItem,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

import "./Form.css";

import { useState, useContext, useEffect } from "react";

import ToastContext from "../../context/ToastContext";

const newCompany = {
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

const abcCategories = [
  {
    value: "A",
    label: "A",
  },
  {
    value: "B",
    label: "B",
  },
  {
    value: "C",
    label: "C",
  },
];

const months = [
  { value: "January", label: "January" },
  { value: "February", label: "February" },
  { value: "March", label: "March" },
  { value: "April", label: "April" },
  { value: "May", label: "May" },
  { value: "June", label: "June" },
  { value: "July", label: "July" },
  { value: "August", label: "August" },
  { value: "September", label: "September" },
  { value: "October", label: "October" },
  { value: "November", label: "November" },
  { value: "December", label: "December" },
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

export default function CompanyForm({
  company,
  openModal,
  setOpenModal,
  populateCompanies,
}) {
  const { handleOpenToast } = useContext(ToastContext);

  const [companiesForSectors, setCompaniesForSectors] = useState([]);

  async function fetchCompaniesForSectors() {
    const JWToken = JSON.parse(localStorage.getItem("loginInfo")).JWT;

    try {
      const serverResponse = await fetch("http://localhost:8080/companies/", {
        method: "GET",
        headers: { googleTokenEncoded: JWToken.credential },
      });

      if (serverResponse.ok) {
        const json = await serverResponse.json();

        // console.log(json);
        setCompaniesForSectors(json);
      } else {
        handleOpenToast({
          type: "error",
          info: "A server error occurred whilst fetching companies for Sector input field.",
        });
      }
    } catch (error) {
      handleOpenToast({
        type: "error",
        info: "An error occurred whilst trying to connect to server.",
      });
    }
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (
      nameIsValid &&
      sectorIsValid &&
      countryIsValid &&
      zipCodeIsValid &&
      adressIsValid &&
      doContactIsValid
    ) {
      newCompany.name = name;
      newCompany.domain = sector;
      newCompany.abcCategory = abcCategorization.toLowerCase();
      newCompany.budgetPlanningMonth = budgetMonth;
      newCompany.country = country;
      newCompany.zipCode = zipCode;
      newCompany.address = address;
      newCompany.webUrl = url;
      newCompany.contactInFuture = doContact;

      //console.log(company);

      const JWToken = JSON.parse(localStorage.getItem("loginInfo")).JWT;

      const serverResponse = await fetch("http://localhost:8080/companies/", {
        method: "POST",
        headers: {
          googleTokenEncoded: JWToken.credential,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCompany),
      });

      if (serverResponse.ok) {
        handleOpenToast({
          type: "success",
          info: "Company " + newCompany.name + " added.",
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
          info: "FR responsible privileges are required for manipulating companies.",
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
  const [sector, setSector] = useState();
  const [sectorIsValid, setSectorIsValid] = useState();
  const [abcCategorization, setAbcCategorization] = useState();
  const [abcCategorizationIsValid, setAbcCategorizationIsValid] = useState();
  const [budgetMonth, setBudgetMonth] = useState();
  const [budgetMonthIsValid, setBudgetMonthIsValid] = useState();
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

  useEffect(() => {
    fetchCompaniesForSectors();

    setSector(company?.domain);
    setSectorIsValid(company ? true : false);
    setAbcCategorization(company?.abcCategorization || abcCategories[0].value);
    setAbcCategorizationIsValid(true);
    setBudgetMonth(company?.budgetMonth || months[0].value);
    setBudgetMonthIsValid(true);
  }, [openModal]);

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

              <Autocomplete
                options={companiesForSectors
                  .map((company) => company.domain)
                  .filter(
                    (domain, index, array) => array.indexOf(domain) === index
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
                inputValue={sector || ""}
                onInputChange={(event, value) => {
                  setSector(value);
                  setSectorIsValid(value.length >= 2 && value.length <= 35);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Sector"
                    placeholder="IT"
                    required
                    fullWidth
                    margin="dense"
                  />
                )}
              />

              <TextField
                label="ABC categorization"
                required
                fullWidth
                select
                margin="dense"
                helperText={
                  !abcCategorizationIsValid && "Invalid ABC categorization"
                }
                value={abcCategorization}
                error={!abcCategorizationIsValid}
                onChange={(e) => {
                  const input = e.target.value;

                  setAbcCategorizationIsValid(
                    abcCategories
                      .map((category) => category.value)
                      .includes(input)
                  );

                  setAbcCategorization(input);
                }}
              >
                {abcCategories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Budget planning month"
                required
                fullWidth
                select
                margin="dense"
                helperText={
                  !budgetMonthIsValid && "Invalid budget planning month"
                }
                value={budgetMonth}
                error={!budgetMonthIsValid}
                onChange={(e) => {
                  const input = e.target.value;

                  setBudgetMonthIsValid(
                    months.map((month) => month.value).includes(input)
                  );

                  setBudgetMonth(input);
                }}
              >
                {months.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
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
