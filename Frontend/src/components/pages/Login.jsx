import { useEffect, useState, useContext, forwardRef } from "react";

import { Typography, Box, Snackbar, Alert as MuiAlert } from "@mui/material";

import UserContext from "../../context/UserContext";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login({ setUserIsLoggedIn }) {
  const [msgModalOpen, setMsgModalOpen] = useState(false);
  const [message, setMessage] = useState();

  const { setUser } = useContext(UserContext);

  function handleCallbackResponse(response) {
    fetch("http://159.65.127.217:8080/users/login", {
      method: "GET",
      headers: {
        googleTokenEncoded: response.credential,
      },
    }).then(async (response) => {
      if (response.status === 200) {
        const json = await response.json();

        setMessage({
          type: "success",
          info: "Login successful.",
          autoHideDuration: 1000,
        });

        const loginInfo = {
          JWT: response,
          lastLogin: new Date(),
          persistentLoginDaysDuration: 7, // change later to be pulled for user settings from database
        };
        localStorage.setItem("loginInfo", JSON.stringify(loginInfo));

        setUser(json);
        setTimeout(() => {
          setUserIsLoggedIn(true);
        }, 1000);
      } else if (response.status === 404) {
        setMessage({
          type: "error",
          info: "You do not have access to Company Database. If you believe this is a mistake, contact your administrator at email@example.com.",
          autoHideDuration: 5000,
        });
      }

      handleOpenMsgModal();

      return;
    });
  }

  function handleOpenMsgModal() {
    if (msgModalOpen) {
      setMsgModalOpen(false);

      setTimeout(() => {
        setMsgModalOpen(true);
      }, 500);
    } else {
      setMsgModalOpen(true);
    }
  }

  function handleCloseMsgModal(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setMsgModalOpen(false);
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "56088533156-igg1fia7dcuntrlp1gn1m3qns48hbp41.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      type: "icon",
      theme: "outline",
      size: "large",
      shape: "pill",
    });
  }, [message]);

  return (
    <Box
      sx={{
        height: "100vh",

        display: "flex",
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

      <Box sx={{ transform: "scale(1.75)", margin: 2 }} id="signInDiv"></Box>

      {message && (
        <Snackbar
          open={msgModalOpen}
          sx={{ maxWidth: "480px" }}
          autoHideDuration={message.autoHideDuration}
          onClose={handleCloseMsgModal}
        >
          <Alert onClose={handleCloseMsgModal} severity={message.type}>
            {message.info}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
}
