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
import UserForm from "../forms/UserForm";

import SearchBar from "./partial/SearchBar";
import TableComponent from "./partial/TableComponent";

const tableColumns = [
  {
    key: "companyName",
    label: "Company name",
  },
  {
    key: "projectName",
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

const userInfo = {
  loginEmail: "john.doe@gmail.com",
  authority: "ADMINISTRATOR",
  firstName: "John",
  lastName: "Doe",
  softLock: false,
  notificationEmail: "john.doe@gmail.com",
  description: "Default humanoid being.",
  nickname: "JD",
  projects: [
    {
      id: 1,
      name: "Javor",
      authority: "Member",
    }
  ],
  collaborations: [
    {
      id: 1,
      companyName: "Company",
      projectName: "Project",
      responsible: "John Doe",
      contact: "Jane Smith",
      priority: false,
      category: "FINANCIAL",
      status: "CONTACTED",
      comment:
        "Sample comment 1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa a daw dawdawwd awdawda dwd ",
      achievedValue: 75,
    }
  ],
};

export default function User() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const { handleOpenToast } = useContext(ToastContext);
  const { setOpenDeleteAlert, setObject, setEndpoint, setPopulateObjects } =
    useContext(DeleteAlertContext);

  const [openContactFormModal, setOpenContactFormModal] = useState(false);
  const [openUserFormModal, setOpenUserFormModal] = useState(false);
  const [contact, setContact] = useState();
  const [openCollaborationFormModal, setOpenCollaborationFormModal] =
    useState(false);
  const [collaboration, setCollaboration] = useState();

  const [user, setUser] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const [loading, setLoading] = useState(true);

  async function fetchUser() {
    setLoading(true);

    const JWToken = JSON.parse(localStorage.getItem("loginInfo")).JWT;

    try {
      const serverResponse = await fetch(
        "/api/users/" + userId,
        {
          method: "GET",
          headers: { googleTokenEncoded: JWToken.credential },
        }
      );
      if (serverResponse.ok) {
        const json = await serverResponse.json();

        setUser(json);
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


  async function handleEditUser() {
      setUser(user);
      setOpenUserFormModal(true);
  }

  function navigateCompanies() {
      navigate("/companies")
  }

  async function handleDeleteUser() {
      setObject({ type: "User", name: user.name });
      setEndpoint("/companies/" + user.id);
      setPopulateObjects({ function: navigateCompanies });

      setOpenDeleteAlert(true);
  }

  async function handleSoftLockUser() {
    setLoading(true);
    const JWToken = JSON.parse(localStorage.getItem("loginInfo")).JWT;
    try {
      const serverResponse = await fetch(
        "/api/companies/softLock/" + user.id,
        {
          method: "PUT",
          headers: { googleTokenEncoded: JWToken.credential },
        }
      );
      if (serverResponse.ok) {
          const json = await serverResponse.json();
          user.softLock = json;
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
    setPopulateObjects({ function: fetchUser });

    setOpenDeleteAlert(true);
  }

  useEffect(() => {
    fetchUser();

    setSearchResults(
      userInfo.collaborations.sort((a, b) => (b.priority ? 1 : -1))
    ); // TODO: remove when backend is connected
  }, []);

  return (
    <>
      <UserForm
        user={userInfo}
        openModal={openUserFormModal}
        setOpenModal={setOpenUserFormModal}
        populateCompanies={fetchUser}
      />

      <ContactForm
        contact={contact}
        openModal={openContactFormModal}
        setOpenModal={setOpenContactFormModal}
        fetchData={fetchUser}
      />

      <CollaborationForm
        collaboration={collaboration}
        openModal={openCollaborationFormModal}
        setOpenModal={setOpenCollaborationFormModal}
        fetchData={fetchUser}
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
              navigate("/users");
            }}
            sx={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,

              marginBlock: 2,
            }}
          >
            Users
          </Button>

            <Box display="inline"
                sx = {{
                  paddingBlock: 2,
                  float: 'right'
                }}
            >
                <IconButton
                  aria-label="edit user"
                  onClick={(e) => handleEditUser(e)}
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
                  aria-label="delete user"
                  onClick={(e) => handleDeleteUser(e)}
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
                    aria-label="soft lock user"
                    onClick={(e) => handleSoftLockUser(e)}
                    sx={{
                      width: 40,
                      height: 40,

                      margin: 0.125,

                      color: "white",
                      backgroundColor: "#1976d2",
                      borderRadius: 1,
                    }}
                >
                  { user.softLock ?
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
              {userInfo.firstName + ' ' + userInfo.lastName}
            </Typography>

            <Accordion defaultExpanded sx={{ marginBlock: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  sx={{
                    textTransform: "uppercase",
                  }}
                >
                  USER INFO
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List dense>
                  <ListItem disablePadding>
                    <ListItemText primary={"Login email: " + userInfo.loginEmail} />
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemText
                      primary={"Authority: " + userInfo.authority}
                    />
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemText
                      primary={"Notification email: " + userInfo.notificationEmail}
                    />
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemText primary={"Nickname: " + userInfo.nickname} />
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemText
                      primary={"Description: " + userInfo.description}
                      sx={{ maxHeight: 60, overflowY: "auto" }}
                    />
                  </ListItem>
                </List>
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
                  PROJECTS
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {userInfo.projects?.map((project) => (
                  <Box key={project.id} sx={{ marginBlock: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography>
                        {project.name}
                      </Typography>
                    </Box>

                    <List dense>
                      <ListItem>
                        <ListItemText
                          primary={"    - " + project.authority}
                          sx={{ overflow: "hidden" }}
                        />
                      </ListItem>
                    </List>
                  </Box>
                ))}
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
              data={userInfo.collaborations}
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
            ) : userInfo.collaborations?.length <= 0 ? (
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
