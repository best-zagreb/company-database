import { useEffect, useState, useContext, forwardRef } from "react";
import jwt_decode from "jwt-decode";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import "./Login.css";

import UserContext from "../../context/UserContext";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login({ setUserIsLoggedIn }) {
  const [msgModalOpen, setMsgModalOpen] = useState(false);
  const [message, setMessage] = useState();

  const { setUser } = useContext(UserContext);

  function handleCallbackResponse(response) {
    // console.log("Encoded JWT ID token: " + response.credential);
    const userObject = jwt_decode(response.credential);

    fetch(
      "http://159.65.127.217:8080/users/get-user?email=" + userObject.email,
      {
        method: "GET",
        headers: {
          Authorization: "Basic " + window.btoa("admin:pass"),
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.length > 0) {
          // needs to be pulled out of login component so it can be user throughout the app
          setMessage({
            type: "success",
            info: "Login successful.",
            autoHideDuration: 2000,
          });
          handleOpenMsgModal();

          const loginInfo = {
            JWT: response,
            lastLogin: new Date(),
            persistentLoginDaysDuration: 7, // change later to be pulled for user settings from database
          };
          localStorage.setItem("loginInfo", JSON.stringify(loginInfo));

          setUser(json[0]);
          setUserIsLoggedIn(true);
        } else {
          setMessage({
            type: "error",
            info: "You do not have access to Company Database. If you believe this is a mistake, contact your administrator at email@example.com.",
            autoHideDuration: 5000,
          });
          handleOpenMsgModal();
        }
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
      theme: "outline",
      size: "large",
    });
  }, [msgModalOpen, message]);

  return (
    <div className="Login">
      <h1>Company Database</h1>
      <h2>Login with your google account to proceed:</h2>
      <br />

      <div id="signInDiv"></div>

      {message && (
        <Snackbar
          open={msgModalOpen}
          autoHideDuration={message.autoHideDuration}
          onClose={handleCloseMsgModal}
        >
          <Alert onClose={handleCloseMsgModal} severity={message.type}>
            {message.info}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}
