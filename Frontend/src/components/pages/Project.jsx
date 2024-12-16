import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import {
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  ExpandMore as ExpandMoreIcon,
  AddCircle as AddCircleIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Lock as LockIcon,
  LockOpen as LockOpenIcon,
  Clear as ClearIcon,
} from "@mui/icons-material/";

import moment from "moment";

import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import UserContext from "../../context/UserContext";
import ToastContext from "../../context/ToastContext";
import DeleteAlertContext from "../../context/DeleteAlertContext";

import CollaborationForm from "../forms/CollaborationForm";
import ProjectForm from "../forms/ProjectForm";

import SearchBar from "./partial/SearchBar";
import TableComponent from "./partial/TableComponent";

const tableColumns = [
  {
    key: "name",
    label: "Company name",
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

function handleRemoveProjectMember(id) {
  // TODO: make a DELETE request na /projects/{id}/teamMembers/{id} and then update frTeamMembers list
  console.log("Deleting a team member is not yet implemented!");
}

export default function Project() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const { handleOpenToast } = useContext(ToastContext);
  const { setOpenDeleteAlert, setObject, setEndpoint, setFetchUpdatedData } =
    useContext(DeleteAlertContext);

  const [openProjectFormModal, setOpenProjectFormModal] = useState(false);
  const [project, setProject] = useState([]);
  const [openCollaborationFormModal, setOpenCollaborationFormModal] =
    useState(false);
  const [collaboration, setCollaboration] = useState();

  const [searchResults, setSearchResults] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingSoftLockButton, setLoadingSoftLockButton] = useState(false);

  async function fetchProject() {
    setLoading(true);

    const JWToken = JSON.parse(localStorage.getItem("loginInfo")).JWT;

    try {
      const serverResponse = await fetch("/api/projects/" + projectId, {
        method: "GET",
        headers: { googleTokenEncoded: JWToken.credential },
      });
      if (serverResponse.ok) {
        const json = await serverResponse.json();

        setProject(json);
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

  function handleEditProject() {
    setOpenProjectFormModal(true);
  }

  function navigateProjects() {
    navigate("/projects");
  }

  function handleDeleteProject() {
    setObject({ type: "Project", name: project.name });
    setEndpoint("/api/projects/" + project.id);
    setFetchUpdatedData({ function: navigateProjects });

    setOpenDeleteAlert(true);
  }

  async function handleSoftLockProject() {
    setLoadingSoftLockButton(true);

    const JWToken = JSON.parse(localStorage.getItem("loginInfo")).JWT;

    try {
      const serverResponse = await fetch(
        "/api/projects/" + project.id + "/softLock",
        {
          method: "PATCH",
          headers: { googleTokenEncoded: JWToken.credential },
        }
      );
      if (serverResponse.ok) {
        const json = await serverResponse.json();
        project.softLocked = json;

        handleOpenToast({
          type: "success",
          info: `Project ${project.name} soft locked.`,
        });
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

    setLoadingSoftLockButton(false);
  }

  function handleEditCollaboration(collaboration) {
    setCollaboration(collaboration);
    setOpenCollaborationFormModal(true);
  }

  function handleDeleteCollaboration(collaboration) {
    setObject({ type: "Collaboration", name: collaboration.name });
    setEndpoint("/api/collaborations/" + collaboration.id);
    setFetchUpdatedData({ function: fetchProject });

    setOpenDeleteAlert(true);
  }

  useEffect(() => {
    fetchProject();
  }, []);

  return (
    <>
      <ProjectForm
        openModal={openProjectFormModal}
        setOpenModal={setOpenProjectFormModal}
        fetchUpdatedData={fetchProject}
        object={project}
      />

      <CollaborationForm
        openModal={openCollaborationFormModal}
        setOpenModal={setOpenCollaborationFormModal}
        fetchUpdatedData={fetchProject}
        object={collaboration}
        project={project}
        company={null}
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 0.5,
            }}
          >
            <Button
              variant="contained"
              startIcon={<KeyboardArrowLeftIcon />}
              onClick={() => {
                navigate("/projects");
              }}
              sx={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,

                marginBlock: 2,
              }}
            >
              Projects
            </Button>

            <Box
              sx={{
                marginRight: 2,

                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.5,
              }}
            >
              <Tooltip
                title={project.softLocked ? "Soft unlock" : "Soft lock"}
                key="Soft lock"
              >
                <IconButton
                  size="small"
                  onClick={handleSoftLockProject}
                  sx={{
                    color: "white",
                    backgroundColor: "#1976d2",

                    borderRadius: 1,
                  }}
                >
                  {loadingSoftLockButton ? (
                    <CircularProgress
                      size={17}
                      sx={{
                        color: "white",
                      }}
                    />
                  ) : project.softLocked ? (
                    <LockOpenIcon />
                  ) : (
                    <LockIcon />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit" key="Edit">
                <IconButton
                  size="small"
                  disabled={project.softLocked}
                  onClick={handleEditProject}
                  sx={{
                    color: "white",
                    backgroundColor: "#1976d2",

                    borderRadius: 1,
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete" key="Delete">
                <IconButton
                  size="small"
                  disabled={project.softLocked}
                  onClick={handleDeleteProject}
                  sx={{
                    color: "white",
                    backgroundColor: "#1976d2",

                    borderRadius: 1,
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <Box
            sx={{
              marginBottom: 2,
              marginInline: 2,
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
              {project.name}
            </Typography>

            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  sx={{
                    textTransform: "uppercase",
                  }}
                >
                  PROJECT INFO
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List dense>
                  <ListItem disablePadding>
                    <ListItemText primary={"Category: " + project.category} />
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemText primary={"Type: " + project.type} />
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemText
                      primary={
                        "Start date: " +
                        moment(project.startDate).format("DD.MM.YYYY")
                      }
                    />
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemText
                      primary={
                        "End date: " +
                        moment(project.endDate).format("DD.MM.YYYY")
                      }
                    />
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemText
                      primary={
                        "Project responsible: " +
                        project.frresp?.firstName +
                        " " +
                        project.frresp?.lastName
                      }
                    />
                  </ListItem>

                  {/* TODO: user.maxAuthLevel >= 3 
                  || (user.maxAuthLevel >= 2 && user is responsible for that project) 
                  || (user.maxAuthLevel >= 1 && user is project member) */}
                  {user?.maxAuthLevel >= 3 && (
                    <ListItem disablePadding>
                      <ListItemText
                        primary={"Project goal: " + project.frgoal}
                      />
                    </ListItem>
                  )}

                  {/* TODO: user.maxAuthLevel >= 3 
                  || (user.maxAuthLevel >= 2 && user is responsible for that project) 
                  || (user.maxAuthLevel >= 1 && user is project member) */}
                  {user?.maxAuthLevel >= 3 && (
                    <ListItem disablePadding>
                      <ListItemText
                        primary={
                          "First ping date: " +
                          (project.firstPingDate
                            ? moment(project.firstPingDate).format("DD.MM.YYYY")
                            : "")
                        }
                      />
                    </ListItem>
                  )}

                  {/* TODO: user.maxAuthLevel >= 3 
                  || (user.maxAuthLevel >= 2 && user is responsible for that project) 
                  || (user.maxAuthLevel >= 1 && user is project member) */}
                  {user?.maxAuthLevel >= 3 && (
                    <ListItem disablePadding>
                      <ListItemText
                        primary={
                          "Second ping date: " +
                          (project.secondPingDate
                            ? moment(project.secondPingDate).format(
                                "DD.MM.YYYY"
                              )
                            : "")
                        }
                      />
                    </ListItem>
                  )}
                </List>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  sx={{
                    textTransform: "uppercase",
                  }}
                >
                  Project members
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {project.frTeamMembers?.length > 0 ? (
                  <List dense>
                    {project.frTeamMembers.map((member) => (
                      <ListItem key={member.id} disableGutters disablePadding>
                        <ListItemText
                          primary={member.firstName + " " + member.lastName}
                        />

                        {/* TODO: user.maxAuthLevel >= 4 
                      || (user.maxAuthLevel >= 3 && user is creator of that project) 
                      || (user.maxAuthLevel >= 2 && user is project responsible for that project) */}
                        {user?.maxAuthLevel >= 4 && (
                          <IconButton
                            onClick={handleRemoveProjectMember(member.id)}
                            size={"small"}
                            sx={{
                              width: 20,
                              height: 20,

                              color: "white",
                              backgroundColor: "#1976d2",
                              borderRadius: 1,
                            }}
                          >
                            <ClearIcon />
                          </IconButton>
                        )}
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="h6" align="center" gutterBottom>
                    {"No project members :("}
                  </Typography>
                )}

                {/* TODO: user.maxAuthLevel >= 4 
                || (user.maxAuthLevel >= 3 && user is creator of that project) 
                || (user.maxAuthLevel >= 2 && user is project responsible for that project) */}
                {user?.maxAuthLevel >= 4 && (
                  <Box sx={{ display: "grid", placeItems: "center" }}>
                    <Button
                      variant="contained"
                      startIcon={<AddCircleIcon />}
                      onClick={() => setOpenContactFormModal(true)}
                    >
                      Add project member
                    </Button>
                  </Box>
                )}
              </AccordionDetails>
            </Accordion>
          </Box>
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
              data={project.collaborations}
              setSearchResults={setSearchResults}
            />

            {/* TODO: user.maxAuthLevel >= 4 
            || (user.maxAuthLevel >= 3 && user is creator of that project) 
            || (user.maxAuthLevel >= 2 && user is project responsible for that project) */}
            {user?.maxAuthLevel >= 4 && (
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
            )}
          </Container>

          {/* TODO: user.maxAuthLevel >= 3 
          || (user.maxAuthLevel >= 2 && user is responsible for that project) 
          || (user.maxAuthLevel >= 1 && user is project member) */}
          {user?.maxAuthLevel >= 3 && (
            <Container maxWidth="false">
              {loading ? (
                <Box sx={{ display: "grid", placeItems: "center" }}>
                  <CircularProgress size={100} />
                </Box>
              ) : project.collaborations?.length > 0 ? (
                <TableComponent
                  tableColumns={tableColumns}
                  searchResults={searchResults}
                  setSearchResults={setSearchResults}
                  // TODO: handleView={handleView} when we add activites

                  // TODO: user.maxAuthLevel >= 4
                  // || (user.maxAuthLevel >= 3 && user is creator of that project)
                  // || (user.maxAuthLevel >= 2 && user is project responsible for that project)
                  // || (user.maxAuthLevel >= 1 && user is responsible for the company in that collaboration)
                  handleEdit={
                    user?.maxAuthLevel >= 4 && handleEditCollaboration
                  }
                  // TODO: user.maxAuthLevel >= 4
                  // || (user.maxAuthLevel >= 3 && user is creator of that project)
                  // || (user.maxAuthLevel >= 2 && user is project responsible for that project)
                  handleDelete={
                    user?.maxAuthLevel >= 4 && handleDeleteCollaboration
                  }
                />
              ) : (
                <Typography variant="h4" align="center">
                  {"No collaborations :("}
                </Typography>
              )}
            </Container>
          )}
        </Box>
      </Box>
    </>
  );
}
