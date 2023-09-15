import { useEffect, useState, useContext } from "react";

import { Typography, Box, CircularProgress } from "@mui/material";
import ToastContext from "../../context/ToastContext";
import UserForm from "../forms/UserForm";

export default function Login({ loginUser, loading }) {
  const [openFormModal, setOpenFormModal] = useState(false);
  const { handleOpenToast } = useContext(ToastContext);


  function handleCallbackResponse(response) {
    loginUser(response);
  }

  async function shouldSetup() {
      try {
        const serverResponse = await fetch(
          "/api/users/shouldSetup",
          {
            method: "GET",
          }
        );

        if (serverResponse.ok) {
          const json = await serverResponse.json();

          if(json == true) {
            setOpenFormModal(true);
          }
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
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "752759618287-1lja8mifkd72vo7250c2e9rl0b18mkic.apps.googleusercontent.com",
      callback: handleCallbackResponse,

      // TODO: use redirect instead of popup
      // ux_mode: "redirect",
    });

    google.accounts.id.renderButton(
      document.getElementById("signInWithGoogleButton"),
      {
        type: "icon",
        theme: "outline",
        size: "large",
        shape: "pill",
      }
    );

    google.accounts.id.prompt();

    shouldSetup();
  }, []);

  useEffect(() => {
      if(openFormModal == false) {
        shouldSetup();
      }
  }, [openFormModal]);

  return (
    <>
    <UserForm
      object={null}
      openModal={openFormModal}
      setOpenModal={setOpenFormModal}
      fetchUpdatedData={function() {}}
    />
    <Box
      sx={{
        height: "100%",

        display: loading ? "none" : "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h2" align="center" gutterBottom>
        Company Database
      </Typography>
      <Typography variant="h4" align="center" gutterBottom>
        Login with your google account to proceed:
      </Typography>

      <Box
        sx={{
          transform: "scale(1.75)",
          margin: 2,
        }}
        id="signInWithGoogleButton"
      ></Box>
    </Box>
    </>
  );
}
