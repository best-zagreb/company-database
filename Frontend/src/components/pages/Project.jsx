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
  Tooltip,
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
  LockOpen as LockOpenIcon,
  Clear as RemoveIcon,
} from "@mui/icons-material/";

import * as moment from "moment";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

function handleRemoveProjectMember(e, id) {
  // TODO: make a DELETE request na /projects/{id}/teamMembers/{id} and then update frTeamMembers list
  console.log("Deleting a team member is not yet implemented!");
}

export default function Project() {
  const { projectId } = useParams();
  const navigate = useNavigate();

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

  async function handleEditProject() {
    setProject(project);
    setOpenProjectFormModal(true);
  }

  function navigateProjects() {
    navigate("/projects");
  }

  async function handleDeleteProject() {
    setObject({ type: "Project", name: project.name });
    setEndpoint("/projects/" + project.id);
    setFetchUpdatedData({ function: navigateProjects });

    setOpenDeleteAlert(true);
  }

  async function handleSoftLockProject() {
    setLoading(true);
    const JWToken = JSON.parse(localStorage.getItem("loginInfo")).JWT;
    try {
      const serverResponse = await fetch(
        "/api/projects/softLock/" + project.id,
        {
          method: "PUT",
          headers: { googleTokenEncoded: JWToken.credential },
        }
      );
      if (serverResponse.ok) {
        const json = await serverResponse.json();
        project.softLocked = json;
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
    setFetchUpdatedData({ function: fetchProject });

    setOpenDeleteAlert(true);
  }

  useEffect(() => {
    fetchProject();
  }, []);

  return (
    <>
      <ProjectForm
        object={project}
        openModal={openProjectFormModal}
        setOpenModal={setOpenProjectFormModal}
        fetchUpdatedData={fetchProject}
      />

      <CollaborationForm
        object={collaboration}
        openModal={openCollaborationFormModal}
        setOpenModal={setOpenCollaborationFormModal}
        fetchUpdatedData={fetchProject}
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
            display="inline"
            sx={{
              paddingBlock: 2,
              float: "right",
            }}
          >
            <Tooltip title="Soft lock" key="Soft lock">
              <IconButton
                size="small"
                aria-label="soft lock project"
                onClick={(e) => handleSoftLockProject(e)}
                sx={{
                  width: 40,
                  height: 40,

                  margin: 0.125,

                  color: "white",
                  backgroundColor: "#1976d2",
                  borderRadius: 1,
                }}
              >
                {project.softLocked ? (
                  <LockOpenIcon
                    sx={{
                      width: 30,
                      height: 30,
                    }}
                  />
                ) : (
                  <LockIcon
                    sx={{
                      width: 30,
                      height: 30,
                    }}
                  />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit" key="Edit">
              <IconButton
                disabled={project.softLocked}
                aria-label="edit project"
                onClick={(e) => handleEditProject(e)}
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
            </Tooltip>
            <Tooltip title="Delete" key="Delete">
              <IconButton
                disabled={project.softLocked}
                aria-label="delete project"
                onClick={(e) => handleDeleteProject(e)}
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
            </Tooltip>
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
              {project.name}
            </Typography>

            <Accordion defaultExpanded sx={{ marginBlock: 2 }}>
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
                        "Fr responsible: " +
                        project.frresp?.firstName +
                        " " +
                        project.frresp?.lastName
                      }
                    />
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemText primary={"Fr goal: " + project.frgoal} />
                  </ListItem>

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

                  <ListItem disablePadding>
                    <ListItemText
                      primary={
                        "Second ping date: " +
                        (project.secondPingDate
                          ? moment(project.secondPingDate).format("DD.MM.YYYY")
                          : "")
                      }
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
                  TEAM MEMBERS
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {project.frTeamMembers?.map((frTeamMember) => (
                  <Box key={frTeamMember.id} sx={{ marginBlock: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography>
                        {frTeamMember.firstName + " " + frTeamMember.lastName}
                      </Typography>
                      <Box>
                        <IconButton
                          disabled={project.softLocked}
                          aria-label="delete frTeamMember"
                          onClick={(e) =>
                            handleRemoveProjectMember(e, frTeamMember.id)
                          }
                          sx={{
                            width: 20,
                            height: 20,

                            margin: 0.125,

                            color: "white",
                            backgroundColor: "#1976d2",
                            borderRadius: 1,
                          }}
                        >
                          <RemoveIcon
                            sx={{
                              width: 15,
                              height: 15,
                            }}
                          />
                        </IconButton>
                      </Box>
                    </Box>
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
              data={project.collaborations}
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
            ) : project.collaborations?.length <= 0 ? (
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
