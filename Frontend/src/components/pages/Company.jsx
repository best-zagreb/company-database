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
} from "@mui/icons-material/";

import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ToastContext from "../../context/ToastContext";
import DeleteAlertContext from "../../context/DeleteAlertContext";

import ContactForm from "../forms/ContactForm";
import CollaborationForm from "../forms/CollaborationForm";

import SearchBar from "./partial/SearchBar";
import TableComponent from "./partial/TableComponent";

// TODO: prikazni primjer, kasnije samo svugdje zamjeni companyInfo sa company state-om
const companyInfo = {
  name: "Oracle d.o.o.",
  domain: "IT",
  abcCategory: "A",
  budgetPlanningMonth: "January",
  country: "Hrvatska",
  zipCode: "10000",
  townName: "Zagreb",
  address: "Jarunska ulica 2",
  webURL: "https://firma.com",
  description:
    " bave se tim i tim bave se tim i tim bave se tim i tim bave se tim i tim bave se tim i tim bave se tim i tim bave se tim i tim bave se tim i tim bave se tim i tim bave se tim i tim bave se tim i tim bave se tim i tim",
  contactInFuture: false,
  contacts: [
    {
      id: 0,
      firstName: "Javor",
      lastName: "Javorčević",
      email: "javor.javorcevic@gmail.com",
      tel: "098776224",
      position: "HR specialist",
      description: "Main contact",
    },
    {
      id: 1,
      firstName: "Javor",
      lastName: "Javorčević",
      email: "javor.javorcevic@gmail.com",
      tel: "098776224",
      position: "HR specialist",
      description: "Main contact",
    },
    {
      id: 2,
      firstName: "Javor",
      lastName: "Javorčević",
      email: "javor.javorcevic@gmail.com",
      tel: "098776224",
      position: "HR specialist",
      description: "Main contact",
    },
  ],
  collaborations: [
    {
      id: 1,
      name: "Project 1 nameeeeeeeeeeeeeeeeeeeeeeeee aewadddddddddddddd",
      responsible: "John Doe",
      contact: "Jane Smith",
      priority: false,
      category: "FINANCIAL",
      status: "CONTACTED",
      comment:
        "Sample comment 1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa a daw dawdawwd awdawda dwd ",
      achievedValue: 75,
    },
    {
      id: 2,
      name: "Project 2",
      responsible: "John Doe",
      contact: "Jane Smith",
      priority: false,
      category: "ACADEMIC",
      status: "OFFER_SENT",
      comment: "Sample comment 2",
      achievedValue: 50,
    },
    {
      id: 3,
      name: "Project 3",
      responsible: "John Doe",
      contact: "Jane Smith",
      priority: true,
      category: "MATERIAL",
      status: "SUCCESSFUL",
      comment: "Sample comment 3",
      achievedValue: 100,
    },
    {
      id: 4,
      name: "Project 4",
      responsible: "John Doe",
      contact: "Jane Smith",
      priority: false,
      category: "FINANCIAL_MATERIAL",
      status: "UNSUCCESSFUL",
      comment: "Sample comment 3",
      achievedValue: 100,
    },
    {
      id: 5,
      name: "Project 5",
      responsible: "John Doe",
      contact: "Jane Smith",
      priority: true,
      category: "FINANCIAL_ACADEMIC",
      status: "PINGED",
      comment: "Sample comment 3",
      achievedValue: 100,
    },
    {
      id: 6,
      name: "Project 6",
      responsible: "John Doe",
      contact: "Jane Smith",
      priority: false,
      category: "MATERIAL_ACADEMIC",
      status: "MEETING_HELD",
      comment: "Sample comment 3",
      achievedValue: 100,
    },
    {
      id: 7,
      name: "Project 7",
      responsible: "John Doe",
      contact: "Jane Smith",
      priority: true,
      category: "awdadwawdawda",
      status: "udjkwahndiuawk",
      comment: "Sample comment 3",
      achievedValue: 100,
    },
    {
      id: 8,
      name: "Project 8 nameeeeeeeeeeeeeeeeeeeeeeeee aewadddddddddddddd",
      responsible: "John Doe",
      contact: "Jane Smith",
      priority: false,
      category: "FINANCIAL_MATERIAL_ACADEMIC",
      status: "CONTACTED",
      comment:
        "Sample comment 1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa a daw dawdawwd awdawda dwd ",
      achievedValue: 75,
    },
    {
      id: 9,
      name: "Project 1 nameeeeeeeeeeeeeeeeeeeeeeeee aewadddddddddddddd",
      responsible: "John Doe",
      contact: "Jane Smith",
      priority: false,
      category: "FINANCIAL",
      status: "CONTACTED",
      comment:
        "Sample comment 1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa a daw dawdawwd awdawda dwd ",
      achievedValue: 75,
    },
    {
      id: 10,
      name: "Project 2",
      responsible: "John Doe",
      contact: "Jane Smith",
      priority: false,
      category: "ACADEMIC",
      status: "OFFER_SENT",
      comment: "Sample comment 2",
      achievedValue: 50,
    },
    {
      id: 11,
      name: "Project 3",
      responsible: "John Doe",
      contact: "Jane Smith",
      priority: true,
      category: "MATERIAL",
      status: "SUCCESSFUL",
      comment: "Sample comment 3",
      achievedValue: 100,
    },
    {
      id: 12,
      name: "Project 4",
      responsible: "John Doe",
      contact: "Jane Smith",
      priority: false,
      category: "FINANCIAL_MATERIAL",
      status: "UNSUCCESSFUL",
      comment: "Sample comment 3",
      achievedValue: 100,
    },
    {
      id: 13,
      name: "Project 5",
      responsible: "John Doe",
      contact: "Jane Smith",
      priority: true,
      category: "FINANCIAL_ACADEMIC",
      status: "PINGED",
      comment: "Sample comment 3",
      achievedValue: 100,
    },
    {
      id: 14,
      name: "Project 6",
      responsible: "John Doe",
      contact: "Jane Smith",
      priority: false,
      category: "MATERIAL_ACADEMIC",
      status: "MEETING_HELD",
      comment: "Sample comment 3",
      achievedValue: 100,
    },
    {
      id: 15,
      name: "Project 7",
      responsible: "John Doe",
      contact: "Jane Smith",
      priority: true,
      category: "awdadwawdawda",
      status: "udjkwahndiuawk",
      comment: "Sample comment 3",
      achievedValue: 100,
    },
    {
      id: 16,
      name: "Project 8 nameeeeeeeeeeeeeeeeeeeeeeeee aewadddddddddddddd",
      responsible: "John Doe",
      contact: "Jane Smith",
      priority: false,
      category: "FINANCIAL_MATERIAL_ACADEMIC",
      status: "CONTACTED",
      comment:
        "Sample comment 1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa a daw dawdawwd awdawda dwd ",
      achievedValue: 75,
    },
    {
      id: 17,
      name: "Project 1 nameeeeeeeeeeeeeeeeeeeeeeeee aewadddddddddddddd",
      responsible: "John Doe",
      contact: "Jane Smith",
      priority: false,
      category: "FINANCIAL",
      status: "CONTACTED",
      comment:
        "Sample comment 1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa a daw dawdawwd awdawda dwd ",
      achievedValue: 75,
    },
    {
      id: 18,
      name: "Project 2",
      responsible: "John Doe",
      contact: "Jane Smith",
      priority: false,
      category: "ACADEMIC",
      status: "OFFER_SENT",
      comment: "Sample comment 2",
      achievedValue: 50,
    },
    {
      id: 19,
      name: "Project 3",
      responsible: "John Doe",
      contact: "Jane Smith",
      priority: true,
      category: "MATERIAL",
      status: "SUCCESSFUL",
      comment: "Sample comment 3",
      achievedValue: 100,
    },
    {
      id: 20,
      name: "Project 4",
      responsible: "John Doe",
      contact: "Jane Smith",
      priority: false,
      category: "FINANCIAL_MATERIAL",
      status: "UNSUCCESSFUL",
      comment: "Sample comment 3",
      achievedValue: 100,
    },
    {
      id: 21,
      name: "Project 5",
      responsible: "John Doe",
      contact: "Jane Smith",
      priority: true,
      category: "FINANCIAL_ACADEMIC",
      status: "PINGED",
      comment: "Sample comment 3",
      achievedValue: 100,
    },
    {
      id: 22,
      name: "Project 6",
      responsible: "John Doe",
      contact: "Jane Smith",
      priority: false,
      category: "MATERIAL_ACADEMIC",
      status: "MEETING_HELD",
      comment: "Sample comment 3",
      achievedValue: 100,
    },
    {
      id: 23,
      name: "Project 7",
      responsible: "John Doe",
      contact: "Jane Smith",
      priority: true,
      category: "awdadwawdawda",
      status: "udjkwahndiuawk",
      comment: "Sample comment 3",
      achievedValue: 100,
    },
    {
      id: 24,
      name: "Project 8 nameeeeeeeeeeeeeeeeeeeeeeeee aewadddddddddddddd",
      responsible: "John Doe",
      contact: "Jane Smith",
      priority: false,
      category: "FINANCIAL_MATERIAL_ACADEMIC",
      status: "CONTACTED",
      comment:
        "Sample comment 1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa a daw dawdawwd awdawda dwd ",
      achievedValue: 75,
    },
  ],
};

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
  const { companyName } = useParams();
  const navigate = useNavigate();

  const { handleOpenToast } = useContext(ToastContext);
  const { setOpenDeleteAlert, setObject, setEndpoint, setPopulateObjects } =
    useContext(DeleteAlertContext);

  const [openContactFormModal, setOpenContactFormModal] = useState(false);
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
        "/api/companies/" + decodeURIComponent(companyName),
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

  function handleEditCollaboration(collaboration) {
    setCollaboration(collaboration);
    setOpenCollaborationFormModal(true);
  }

  function handleDeleteCollaboration(collaboration) {
    setObject({ type: "Collaboration", name: collaboration.name });
    setEndpoint("/api/collaborations/" + collaboration.id);
    setPopulateObjects({ function: fetchCompany });

    setOpenDeleteAlert(true);
  }

  useEffect(() => {
    fetchCompany();

    // sort the rows by prirority attribute on first load
    setSearchResults(
      companyInfo.collaborations.sort((a, b) => (b.priority ? 1 : -1))
    ); // TODO: remove when backend is connected
  }, []);

  return (
    <>
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
              {companyInfo.name}
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
                    <ListItemText primary={"Domain: " + companyInfo.domain} />
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemText
                      primary={"ABC Category: " + companyInfo.abcCategory}
                    />
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemText
                      primary={
                        "Budget planning month: " +
                        companyInfo.budgetPlanningMonth
                      }
                    />
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemText primary={"Country: " + companyInfo.country} />
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemText primary={"Town: " + companyInfo.townName} />
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemText primary={"Address: " + companyInfo.address} />
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemText
                      primary={
                        <Typography sx={{ fontSize: 10.5 }}>
                          Web:{" "}
                          <Link
                            href={companyInfo.webURL}
                            underline="hover"
                            target="_blank"
                            rel="noopener"
                          >
                            {companyInfo.webURL}
                          </Link>
                        </Typography>
                      }
                    />
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemText
                      primary={"Description: " + companyInfo.description}
                      sx={{ maxHeight: 60, overflowY: "auto" }}
                    />
                  </ListItem>
                </List>

                {companyInfo.contactInFuture === false && (
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
                {companyInfo.contacts.map((contact) => (
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
              data={companyInfo.collaborations}
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
            ) : companyInfo.collaborations?.length <= 0 ? (
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
