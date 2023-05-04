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
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Box,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useState, useContext, useEffect } from "react";

import ToastContext from "../../context/ToastContext";

import TextInput from "./partial/TextInput";

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
  { value: "Unknown", label: "Unknown" },
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
];

const months = [
  { value: "Unknown", label: "Unknown" },
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
  const [countriesForAddress, setCountriesForAddress] = useState([]);
  // const [townsForAddress, setTownsForAddress] = useState([]);
  const [loadingButton, setLoadingButton] = useState(false);

  const [name, setName] = useState();
  const [sector, setSector] = useState();
  const [abcCategorization, setAbcCategorization] = useState();
  const [budgetMonth, setBudgetMonth] = useState();
  const [country, setCountry] = useState();
  //const [town, setTown] = useState();
  const [zipCode, setZipCode] = useState();
  const [address, setAdress] = useState();
  const [url, setUrl] = useState();
  //const [description, setDescription] = useState();
  const [contactInFuture, setContactInFuture] = useState();

  const [nameIsValid, setNameIsValid] = useState(false);
  const [sectorIsValid, setSectorIsValid] = useState();
  const [abcCategorizationIsValid, setAbcCategorizationIsValid] = useState();
  const [budgetPlanningMonthIsValid, setBudgetPlanningMonthIsValid] =
    useState();
  const [countryIsValid, setCountryIsValid] = useState(false);
  // const [townIsValid, setTownIsValid] = useState(false);
  const [zipCodeIsValid, setZipCodeIsValid] = useState(false);
  const [adressIsValid, setAdressIsValid] = useState(false);
  const [urlIsValid, setUrlIsValid] = useState(false);
  const [contactInFutureIsValid, setContactInFutureIsValid] = useState(true);

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
  async function fetchCountriesForAddress() {
    try {
      const serverResponse = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,cca2",
        {
          method: "GET",
        }
      );

      if (serverResponse.ok) {
        const json = await serverResponse.json();

        // console.log(json);
        setCountriesForAddress(json);
      } else {
        handleOpenToast({
          type: "error",
          info: "A server error occurred whilst fetching companies for Country input field.",
        });
      }
    } catch (error) {
      handleOpenToast({
        type: "error",
        info: "An error occurred whilst trying to connect to server.",
      });
    }
  }
  async function fetchCitiesForAddress(inputValue) {
    try {
      const serverResponse = await fetch(
        "http://api.geonames.org/postalCodeSearchJSON?maxRows=250&username=crazyfreak" +
          "&placename_startsWith=" +
          encodeURIComponent(inputValue || " ") +
          "&country=" +
          encodeURIComponent(
            countriesForAddress.find((c) => c.name.official === country)
              ?.cca2 || ""
          ),
        {
          method: "GET",
        }
      );

      if (serverResponse.ok) {
        const json = await serverResponse.json();

        // console.log(json.postalCodes);
        setTownsForAddress(json.postalCodes);
      } else {
        handleOpenToast({
          type: "error",
          info: "A server error occurred whilst fetching companies for Town input field.",
        });
      }
    } catch (error) {
      handleOpenToast({
        type: "error",
        info: "An error occurred whilst trying to connect to server.",
      });
    }
  }

  async function submit(e) {
    e.preventDefault();

    if (
      nameIsValid &&
      sectorIsValid &&
      countryIsValid &&
      zipCodeIsValid &&
      adressIsValid &&
      contactInFutureIsValid
    ) {
      newCompany.name = name;
      newCompany.domain = sector;
      newCompany.abcCategory =
        abcCategorization === abcCategories[0].value ? null : abcCategorization;
      newCompany.budgetPlanningMonth =
        budgetMonth === months[0].value ? null : budgetMonth;
      newCompany.country = country;
      newCompany.zipCode = zipCode;
      newCompany.address = address;
      newCompany.webUrl = url;
      newCompany.contactInFuture = contactInFuture;

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

  const handleZipCodeChange = (e) => {
    const input = e.target.value;
    if (input.length == 5 && !isNaN(input)) setZipCodeIsValid(true);
    setZipCode(input);
  };

  // const handleTownChange = (e) => {
  //   const input = e.target.value;
  //   if (input.length >= 2 && input.length <= 56) {
  //     setTownIsValid(true);
  //     setTown(input);
  //   }
  // };

  const handleAdressChange = (e) => {
    const input = e.target.value;
    if (input.length >= 2 && input.length <= 56) {
      setAdressIsValid(true);
      setAdress(input);
    }
  };

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

  const handleDoContactChange = (e) => {
    const input = e.target.value;
    setContactInFutureIsValid(true);
    if (input === "yes") {
      setContactInFuture(true);
    } else {
      setContactInFuture(false);
    }
  };

  useEffect(() => {
    setName(company?.name);
    setSector(company?.domain);
    setAbcCategorization(company?.abcCategorization || abcCategories[0].value);
    setBudgetMonth(company?.budgetMonth || months[0].value);
    setCountry(company?.country);
    // setTown(company?.town);
    setZipCode(company?.zipCode);

    setNameIsValid(company ? true : false);
    setSectorIsValid(company ? true : false);
    setAbcCategorizationIsValid(true);
    setBudgetPlanningMonthIsValid(true);
    setCountryIsValid(company ? true : false);
    setTownIsValid(company ? true : false);
    setZipCodeIsValid(company ? true : false);

    fetchCompaniesForSectors();
    fetchCountriesForAddress();
    // fetchCitiesForAddress();
  }, [openModal]);

  return (
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
              {!company ? "Add company" : "Update company"}
            </Typography>

            <Box
              sx={{
                overflowY: "auto",
              }}
            >
              <TextInput
                labelText={"Company name"}
                placeholderText={"Vision <O>"}
                isRequired
                helperText={{
                  error: "Company name must be between 2 and 35 characters",
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
                options={companiesForSectors
                  .map((company) => company.domain)
                  .filter(
                    (domain, index, array) => array.indexOf(domain) === index
                  )
                  .sort((a, b) => {
                    return a.localeCompare(b);
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
                fullWidth
                select
                margin="dense"
                helperText={
                  !budgetPlanningMonthIsValid && "Invalid budget planning month"
                }
                value={budgetMonth}
                error={!budgetPlanningMonthIsValid}
                onChange={(e) => {
                  const input = e.target.value;

                  setBudgetPlanningMonthIsValid(
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

              <Autocomplete
                options={countriesForAddress
                  .map((country) => country.name.official)
                  .sort((a, b) => {
                    return a.localeCompare(b);
                  })}
                filterOptions={(options, { inputValue }) =>
                  options.filter((option) =>
                    option.toLowerCase().includes(inputValue.toLowerCase())
                  )
                }
                clearOnEscape
                openOnFocus
                freeSolo
                inputValue={country || ""}
                onInputChange={(event, value) => {
                  setCountry(value);
                  setCountryIsValid(value.length >= 4 && value.length <= 56);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Country"
                    placeholder="Croatia"
                    required
                    fullWidth
                    margin="dense"
                  />
                )}
              />

              {/* <Autocomplete
                options={townsForAddress
                  .map((town) => town.placeName)
                  .filter(
                    (placeName, index, array) =>
                      array.indexOf(placeName) === index
                  )
                  .sort((a, b) => {
                    return a.localeCompare(b);
                  })}
                filterOptions={(options, { inputValue }) =>
                  options.filter((option) =>
                    option.toLowerCase().includes(inputValue.toLowerCase())
                  )
                }
                clearOnEscape
                openOnFocus
                freeSolo
                inputValue={town || ""}
                onInputChange={(event, value) => {
                  setTown(value);
                  if (country === "")
                    setCountry(
                      countriesForAddress.find(
                        (c) =>
                          c.cca2 ===
                          townsForAddress.find(
                            (town) => town.placeName === value
                          )?.countryCode
                      )?.name.official || ""
                    ); // set country based on chosen town
                  fetchCitiesForAddress(value);
                  // setTownIsValid(value.length >= 2 && value.length <= 56);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Town"
                    placeholder="El Pueblo de Nuestra Senora, Reina de los Angeles del Rio Porciuncula"
                    required
                    fullWidth
                    margin="dense"
                  />
                )}
              /> */}

              <TextField
                disabled={!countryIsValid}
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
                label="Address"
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
                // disabled={
                //   !(
                //     nameIsValid &&
                //     categoryIsValid &&
                //     startDateIsValid &&
                //     endDateIsValid &&
                //     FRRespIDIsValid &&
                //     FRGoalIsValid &&
                //     firstPingDateIsValid &&
                //     secondPingDateIsValid
                //   )
                // }
              >
                {/* span needed because of bug */}
                <span>{!company ? "Add company" : "Update company"}</span>
              </LoadingButton>
            </Box>
          </FormControl>
        </Fade>
      </Modal>
    </Backdrop>
  );
}
