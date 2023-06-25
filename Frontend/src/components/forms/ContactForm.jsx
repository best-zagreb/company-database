import { useState } from "react";

import { Backdrop, Box, Modal, Fade, Button, TextField } from "@mui/material";

import "./Form.css";

export default function ContactForm({
  openModal,
  setOpenModal,
  fetchContacts,
  company,
  contact,
}) {
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [email, setEmail] = useState();
  const [tel, setTel] = useState();
  const [position, setPosition] = useState();
  const [description, setDescription] = useState();

  const contactTemplate = {
    firstName: null,
    lastName: null,
    email: null,
    tel: null,
    position: null,
    description: null,
  };

  function onSubmit(e) {
    e.preventDefault();

    contactTemplate.firstName = name;
    contactTemplate.lastName = surname;
    contactTemplate.email = email;
    contactTemplate.tel = tel;
    contactTemplate.position = position;
    contactTemplate.description = description;
    // console.log(contactTemplate);

    const JWToken = JSON.parse(localStorage.getItem("loginInfo")).JWT;
    // fetch("/companies/" + company.id + "/contacts", {
    //   method: "POST",
    //   headers: {
    //     googleTokenEncoded: JWToken.credential,

    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(contact),
    // })
    //   .then((response) => response.json())
    //   .then((json) => {
    //     // if error display error toast
    //     console.log(json);

    //     // if success display success toast, close modal and update contacts list
    //     setOpenModal(false);
    //   });
  }

  const handleNameChange = (e) => {
    const input = e.target.value;

    setName(input);
  };
  const handleSurnameChange = (e) => {
    const input = e.target.value;

    setSurname(input);
  };
  const handleEmailChange = (e) => {
    const input = e.target.value;

    setEmail(input);
  };
  const handleTelChange = (e) => {
    const input = e.target.value;

    setTel(input);
  };
  const handlePositionChange = (e) => {
    const input = e.target.value;

    setPosition(input);
  };
  const handleDescriptionChange = (e) => {
    const input = e.target.value;

    setDescription(input);
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
            <h2>Add new contact</h2>

            <form onSubmit={onSubmit}>
              <TextField
                label="Name"
                type="text"
                required
                fullWidth
                margin="dense"
                placeholder="Jane"
                inputProps={{ minLength: 2, maxLength: 35 }}
                onChange={handleNameChange}
              />

              <TextField
                label="Surname"
                type="text"
                required
                fullWidth
                margin="dense"
                placeholder="Doe"
                inputProps={{ minLength: 2, maxLength: 35 }}
                onChange={handleSurnameChange}
              />

              <TextField
                label="Email"
                type="text"
                required
                fullWidth
                margin="dense"
                placeholder="jane.doe@best.hr"
                inputProps={{ minLength: 2, maxLength: 35 }}
                onChange={handleEmailChange}
              />

              <TextField
                label="Tel"
                type="text"
                fullWidth
                margin="dense"
                placeholder="0987654321"
                inputProps={{ minLength: 2, maxLength: 35 }}
                onChange={handleTelChange}
              />

              <TextField
                label="Position"
                type="text"
                fullWidth
                margin="dense"
                placeholder="PR"
                inputProps={{ minLength: 2, maxLength: 35 }}
                onChange={handlePositionChange}
              />

              <TextField
                label="Description"
                fullWidth
                multiline
                minRows={2}
                maxRows={4}
                margin="dense"
                inputProps={{ maxLength: 475 }}
                onChange={handleDescriptionChange}
              />

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
                  Add contact
                </Button>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
