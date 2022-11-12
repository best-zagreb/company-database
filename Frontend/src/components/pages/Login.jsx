import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

import "./Login.css";

export default function Login({ setIsLoggedIn }) {
  function handleCallbackResponse(response) {
    // console.log("Encoded JWT ID token: " + response.credential);
    const userObject = jwt_decode(response.credential);
    // console.log(userObject);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: userObject.email,
    };
    fetch("/users/get-user", options).then((response) => {
      if (response.status === 401) {
        // display error msg toast
      } else {
        setIsLoggedIn(true);
      }
    });

    setIsLoggedIn(true); // for testing, delete when connected to backend
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
  }, []);

  return (
    <div className="Login">
      <h1>Company Database</h1>
      <h2>Login with your google account to proceed:</h2>
      <br />

      <div id="signInDiv"></div>
    </div>
  );
}
