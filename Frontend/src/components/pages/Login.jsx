import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

import "./Login.css";

export default function Login() {
  // const [bool, setBool] = useState({ gdje: <Navigate to="/setup" /> });

  // const dataFetch = async () => {
  //   const data = await (
  //     await fetch("http://localhost:8080/email/get-all")
  //   ).json();
  //   if (data.length > 0) {
  //     setBool((bool.gdje = <Navigate to="/login" />));
  //   }
  // };

  // useEffect(() => {
  //   dataFetch();
  // }, []);

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  function handleCallbackResponse(response) {
    // console.log("Encoded JWT ID token: " + response.credential);
    const userObject = jwt_decode(response.credential);
    // console.log(userObject);
    setUser(userObject);
  }

  useEffect(() => {
    if (user !== null) {
      navigate("/", { state: { user } });
    }

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
  }, [user]);

  return (
    <div className="Login">
      <h1>Company Database</h1>
      <h2>Login with your google account to proceed:</h2>
      <br />

      <div id="signInDiv"></div>
    </div>
  );
}
