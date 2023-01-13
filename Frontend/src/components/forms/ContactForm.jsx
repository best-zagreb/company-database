import { useState } from "react";

import { Backdrop, Box, Modal, Fade, Button, TextField } from "@mui/material";

import "./Form.css";

const contact = {
  firstName: null,
  lastName: null,
  email: null,
  tel: null,
  position: null,
  description: null,
};

export default function ContactForm({
  openModal,
  setOpenModal,
  fetchContacts,
}) {
  const onSubmit = (e) => {
    e.preventDefault();

//     contact.firstName = name;
//     contact.lastName = surname;
//     contact.email = nickname;
//     contact.tel = loginEmail;
//     contact.position = notificationEmail;
//     contact.description = description;
//     // console.log(user);

//     const JWToken = JSON.parse(localStorage.getItem("loginInfo")).JWT;
//     fetch("http://159.65.127.217:8080/companies/" + company.id + "/contacts", {
//       method: "POST",
//       headers: {
//         googleTokenEncoded: JWToken.credential,

//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(contact),
//     })
//       .then((response) => response.json())
//       .then((json) => {
//         // if error display error toast
//         console.log(json);

//         // if success display success toast, close modal and update contacts list
//         setOpenModal(false);
//       });
  };

  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [email, setEmail] = useState();
  const [tel, setTel] = useState();
  const [position, setPosition] = useState();
  const [description, setDescription] = useState();

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
                id="outlined"
                label="Name"
                type="text"
                required
                fullWidth
                margin="dense"
                placeholder="Jane"
                inputProps={{ minLength: 2, maxLength: 35 }}
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
