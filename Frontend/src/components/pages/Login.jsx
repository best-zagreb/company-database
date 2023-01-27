import { useEffect } from "react";

import { Typography, Box } from "@mui/material";

export default function Login({ loginUser }) {
  function handleCallbackResponse(response) {
    loginUser(response);
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "56088533156-igg1fia7dcuntrlp1gn1m3qns48hbp41.apps.googleusercontent.com",
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
  }, []);

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

      <Box
        sx={{ transform: "scale(1.75)", margin: 2 }}
        id="signInWithGoogleButton"
      ></Box>
    </Box>
  );
}
