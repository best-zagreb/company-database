import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

//prikazni primjer
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
};
const companyContacts = [
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
];

function handleEdit(e, id) {
  // TODO: make a PUT request na /companies/{id}/contacts/{id} and then update contacts list
  console.log("Editing a contact is not yet implemented!");
  // setEditFormModal(true);
}

function handleDelete(e, id) {
  // TODO: make a DELETE request na /companies/{id}/contacts/{id} and then update contacts list
  console.log("Deleting a contact is not yet implemented!");
}

export default function Company() {
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: fetch contacts sa GET /companies/{id}
    // TODO: fetch collabs sa GET /companies/{id}/collaborations
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          height: "90vh",
        }}
      >
        <Box
          className="details"
          sx={{
            flexBasis: "30%",
            minWidth: "175px",

            overflowY: "auto",

            paddingBlock: 2,
          }}
        >
          <Button
            variant="contained"
            startIcon={<KeyboardArrowLeftIcon />}
            onClick={() => {
              navigate("/companies");
            }}
            sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          >
            Companies
          </Button>

          <Container
            sx={{
              marginBlock: 2,
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
              Oracle d.o.o.
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
              <AccordionDetails className="scale">
                {companyContacts.map((contact) => (
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
                          onClick={(e) => handleEdit(e, contact.id)}
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
                          onClick={(e) => handleDelete(e, contact.id)}
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

        <Box
          className="collaborations"
          sx={{
            overflow: "auto",

            flex: 1,
            height: "100%",
            background: "linear-gradient(#e66465, #9198e5)",
          }}
        >
          {/* TODO: search, add collaboration button i tablica */}
          {/* <div>TEXT</div>
          <div>TEXT</div>
          <div>TEXT</div>
          <div>TEXT</div>
          <div>TEXT</div> */}
        </Box>
      </Box>
    </>
  );
}
