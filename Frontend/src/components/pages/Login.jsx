import { useEffect } from "react";
import jwt_decode from "jwt-decode";

import "./Login.css";

export default function Login({ setIsLoggedIn }) {
  function handleCallbackResponse(response) {
    // console.log("Encoded JWT ID token: " + response.credential);
    const userObject = jwt_decode(response.credential);
    // console.log(userObject);

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
        // console.log(json);
        if (json.length > 0) {
          setIsLoggedIn(true);
        } else {
          console.error(
            "You do not have access to Company Database. If you believe this is a mistake, contact your administrator at email@example.com."
          );
        }
      });
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
