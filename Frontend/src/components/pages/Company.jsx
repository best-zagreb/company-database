import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Button,
  Link,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  ExpandMore as ExpandMoreIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Work as WorkIcon,
  Description as DescriptionIcon,
  AddCircle as AddCircleIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Lock as LockIcon,
  LockOpen as LockOpenIcon
} from "@mui/icons-material/";

import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ToastContext from "../../context/ToastContext";
import DeleteAlertContext from "../../context/DeleteAlertContext";

import ContactForm from "../forms/ContactForm";
import CollaborationForm from "../forms/CollaborationForm";
import CompanyForm from "../forms/CompanyForm";

import SearchBar from "./partial/SearchBar";
import TableComponent from "./partial/TableComponent";

const tableColumns = [
  {
    key: "name",
    label: "Project name",
  },
  {
    key: "responsible",
    label: "Responsible",
    xsHide: true,
  },
  {
    key: "status",
    label: "Status",
    centerContent: true,
  },
  {
    key: "contact",
    label: "Contact",
    xsHide: true,
  },
  {
    key: "category",
    label: "Category",
    notSortable: true,
    centerContent: true,
    xsHide: true,
    mdHide: true,
  },
  {
    key: "achievedValue",
    label: "Value",
    xsHide: true,
  },
  {
    key: "comment",
    label: "Comment",
    xsHide: true,
    mdHide: true,
    showTooltip: true,
  },
];

function handleEditContact(e, id) {
  // TODO: make a PUT request na /companies/{id}/contacts/{id} and then update contacts list
  console.log("Editing a contact is not yet implemented!");
  // setEditFormModal(true);
}

function handleDeleteContact(e, id) {
  // TODO: make a DELETE request na /companies/{id}/contacts/{id} and then update contacts list
  console.log("Deleting a contact is not yet implemented!");
}

export default function Company() {
  const { companyId } = useParams();
  const navigate = useNavigate();

  const { handleOpenToast } = useContext(ToastContext);
  const { setOpenDeleteAlert, setObject, setEndpoint, setPopulateObjects } =
    useContext(DeleteAlertContext);

  const [openContactFormModal, setOpenContactFormModal] = useState(false);
  const [openCompanyFormModal, setOpenCompanyFormModal] = useState(false);
  const [contact, setContact] = useState();
  const [openCollaborationFormModal, setOpenCollaborationFormModal] =
    useState(false);
  const [collaboration, setCollaboration] = useState();

  const [company, setCompany] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const [loading, setLoading] = useState(true);

  async function fetchCompany() {
    setLoading(true);

    const JWToken = JSON.parse(localStorage.getItem("loginInfo")).JWT;

    try {
      const serverResponse = await fetch(
        "/companies/" + companyId,
        {
          method: "GET",
          headers: { googleTokenEncoded: JWToken.credential },
        }
      );
      if (serverResponse.ok) {
        const json = await serverResponse.json();

        setCompany(json);
        setSearchResults(
          json.collaborations
            .map((collaboration) => {
              return collaboration.name;
            })
            .sort((a, b) => (b.priority ? 1 : -1)) // sort the rows by prirority attribute on first load
        );
      } else {
        handleOpenToast({
          type: "error",
          info: "A server error occurred whilst fetching data.",
        });
      }
    } catch (error) {
      handleOpenToast({
        type: "error",
        info: "An error occurred whilst trying to connect to server.",
      });
    }

    setLoading(false);
  }

  async function handleEditCompany() {
      setCompany(company);
      setOpenCompanyFormModal(true);
  }

  function navigateCompanies() {
      navigate("/companies")
  }

  async function handleDeleteCompany() {
      setObject({ type: "Company", name: company.name });
      setEndpoint("/companies/" + company.id);
      setPopulateObjects({ function: navigateCompanies });

      setOpenDeleteAlert(true);
  }

  async function handleSoftLockCompany() {
    setLoading(true);
    const JWToken = JSON.parse(localStorage.getItem("loginInfo")).JWT;
    try {
      const serverResponse = await fetch(
        "/companies/softLock/" + company.id,
        {
          method: "PUT",
          headers: { googleTokenEncoded: JWToken.credential },
        }
      );
      if (serverResponse.ok) {
          const json = await serverResponse.json();
          company.softLock = json;
      } else {
          handleOpenToast({
            type: "error",
            info: "A server error occurred whilst soft locking.",
          });
      }
    } catch (error) {
        handleOpenToast({
          type: "error",
          info: "An error occurred whilst trying to connect to server.",
        });
    }
    setLoading(false);
  }

  function handleEditCollaboration(collaboration) {
    setCollaboration(collaboration);
    setOpenCollaborationFormModal(true);
  }

  function handleDeleteCollaboration(collaboration) {
    setObject({ type: "Collaboration", name: collaboration.name });
    setEndpoint("/collaborations/" + collaboration.id);
    setPopulateObjects({ function: fetchCompany });

    setOpenDeleteAlert(true);
  }

  useEffect(() => {
    fetchCompany();
  }, []);

  return (
    <>
      <CompanyForm
        company={company}
        openModal={openCompanyFormModal}
        setOpenModal={setOpenCompanyFormModal}
        populateCompanies={fetchCompany}
      />

      <ContactForm
        contact={contact}
        openModal={openContactFormModal}
        setOpenModal={setOpenContactFormModal}
        fetchData={fetchCompany}
      />

      <CollaborationForm
        collaboration={collaboration}
        openModal={openCollaborationFormModal}
        setOpenModal={setOpenCollaborationFormModal}
        fetchData={fetchCompany}
      />

      <Box
        sx={{
          display: "flex",

          maxHeight: "calc(100% - 64px)",
        }}
      >
        {/* details */}
        <Box
          sx={{
            flexBasis: "30%",

            overflowY: "auto",
          }}
        >
          <Button
            variant="contained"
            startIcon={<KeyboardArrowLeftIcon />}
            onClick={() => {
              navigate("/companies");
            }}
            sx={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,

              marginBlock: 2,
            }}
          >
            Companies
          </Button>

          <Box display="inline"
              sx = {{
                paddingBlock: 2,
                float: 'right'
              }}
          >
              <IconButton
                aria-label="edit company"
                onClick={(e) => handleEditCompany(e)}
                sx={{
                  width: 40,
                  height: 40,

                  margin: 0.125,

                  color: "white",
                  backgroundColor: "#1976d2",
                  borderRadius: 1,
                }}
              >
                <EditIcon
                  sx={{
                    width: 30,
                    height: 30,
                  }}
                />
              </IconButton>

              <IconButton
                aria-label="delete company"
                onClick={(e) => handleDeleteCompany(e)}
                sx={{
                  width: 40,
                  height: 40,

                  margin: 0.125,

                  color: "white",
                  backgroundColor: "#1976d2",
                  borderRadius: 1,
                }}
              >
                <DeleteIcon
                  sx={{
                    width: 30,
                    height: 30,
                  }}
                />
              </IconButton>

              <IconButton
                  aria-label="soft lock company"
                  onClick={(e) => handleSoftLockCompany(e)}
                  sx={{
                    width: 40,
                    height: 40,

                    margin: 0.125,

                    color: "white",
                    backgroundColor: "#1976d2",
                    borderRadius: 1,
                  }}
              >
                { company.softLock ?
                <LockOpenIcon
                    sx={{
                      width: 30,
                      height: 30,
                    }}
                /> :
                <LockIcon
                    sx={{
                      width: 30,
                      height: 30,
                    }}
                />
                }
              </IconButton>
            </Box>

          <Container
            sx={{
              marginBottom: 2,
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: 500,
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              {company.name}
            </Typography>

            <Accordion defaultExpanded sx={{ marginBlock: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  sx={{
                    textTransform: "uppercase",
                  }}
                >
                  COMPANY INFO
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List dense>
                  <ListItem disablePadding>
                    <ListItemText primary={"Domain: " + company.domain} />
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemText
                      primary={"ABC Category: " + company.abcCategory}
                    />
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemText
                      primary={
                        "Budget planning month: " +
                        company.budgetPlanningMonth
                      }
                    />
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemText primary={"Country: " + company.country} />
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemText primary={"Town: " + company.townName} />
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemText primary={"Address: " + company.address} />
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemText
                      primary={
                        <Typography sx={{ fontSize: 10.5 }}>
                          Web:{" "}
                          <Link
                            href={company.webURL}
                            underline="hover"
                            target="_blank"
                            rel="noopener"
                          >
                            {company.webURL}
                          </Link>
                        </Typography>
                      }
                    />
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemText
                      primary={"Description: " + company.description}
                      sx={{ maxHeight: 60, overflowY: "auto" }}
                    />
                  </ListItem>
                </List>

                {company.contactInFuture === false && (
                  <Typography
                    sx={{
                      marginTop: 1,

                      fontWeight: 700,
                      fontSize: "1.375rem",
                      textAlign: "center",
                      color: "red",
                    }}
                  >
                    DO NOT CONTACT
                  </Typography>
                )}
              </AccordionDetails>
            </Accordion>

            <Accordion
              sx={{
                marginBlock: 2,
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  sx={{
                    textTransform: "uppercase",
                  }}
                >
                  CONTACTS
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {company.contacts?.map((contact) => (
                  <Box key={contact.id} sx={{ marginBlock: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography>
                        {contact.firstName + " " + contact.lastName}
                      </Typography>
                      <Box>
                        <IconButton
                          aria-label="edit contact"
                          onClick={(e) => handleEditContact(e, contact.id)}
                          sx={{
                            width: 20,
                            height: 20,

                            margin: 0.125,

                            color: "white",
                            backgroundColor: "#1976d2",
                            borderRadius: 1,
                          }}
                        >
                          <EditIcon
                            sx={{
                              width: 15,
                              height: 15,
                            }}
                          />
                        </IconButton>

                        <IconButton
                          aria-label="delete contact"
                          onClick={(e) => handleDeleteContact(e, contact.id)}
                          sx={{
                            width: 20,
                            height: 20,

                            margin: 0.125,

                            color: "white",
                            backgroundColor: "#1976d2",
                            borderRadius: 1,
                          }}
                        >
                          <DeleteIcon
                            sx={{
                              width: 15,
                              height: 15,
                            }}
                          />
                        </IconButton>
                      </Box>
                    </Box>

                    <List dense>
                      <ListItem disablePadding>
                        <ListItemIcon sx={{ minWidth: 25 }}>
                          <EmailIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={contact.email}
                          sx={{
                            overflow: "hidden",
                          }}
                        />
                      </ListItem>

                      <ListItem disablePadding>
                        <ListItemIcon sx={{ minWidth: 25 }}>
                          <PhoneIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={contact.tel}
                          sx={{ overflow: "hidden" }}
                        />
                      </ListItem>

                      <ListItem disablePadding>
                        <ListItemIcon sx={{ minWidth: 25 }}>
                          <WorkIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={contact.position}
                          sx={{ overflow: "hidden" }}
                        />
                      </ListItem>

                      <ListItem disablePadding>
                        <ListItemIcon sx={{ minWidth: 25 }}>
                          <DescriptionIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={contact.description}
                          sx={{ overflow: "hidden" }}
                        />
                      </ListItem>
                    </List>
                  </Box>
                ))}

                <Box sx={{ display: "grid", placeItems: "center" }}>
                  <Button
                    variant="contained"
                    startIcon={<AddCircleIcon />}
                    onClick={() => setOpenContactFormModal(true)}
                  >
                    Add contact
                  </Button>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Container>
        </Box>

        {/* collaborations */}
        <Box
          sx={{
            flex: 1,

            overflowY: "auto",
          }}
        >
          <Container
            maxWidth="false"
            sx={{
              paddingBlock: 2,

              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 1,
            }}
          >
            <SearchBar
              type="collaborations"
              data={company.collaborations}
              setSearchResults={setSearchResults}
            />

            <Button
              variant="contained"
              size="medium"
              startIcon={<AddCircleIcon />}
              onClick={() => {
                setCollaboration();
                setOpenCollaborationFormModal(true);
              }}
            >
              Add collaboration
            </Button>
          </Container>

          <Container maxWidth="false">
            {loading ? (
              <Box sx={{ display: "grid", placeItems: "center" }}>
                <CircularProgress size={100} />
              </Box>
            ) : company.collaborations?.length <= 0 ? (
              <Typography variant="h4" align="center">
                {"No collaborations :("}
              </Typography>
            ) : (
              <TableComponent
                tableColumns={tableColumns}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                // TODO: handleView={handleView} when we add activites
                handleEdit={handleEditCollaboration}
                handleDelete={handleDeleteCollaboration}
              ></TableComponent>
            )}
          </Container>
        </Box>
      </Box>
    </>
  );
}
