import { Navigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import "./Login.css";

import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";

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

  return (
    <div className="Login">
      <div>
        <h1>Login with your google account:</h1>

        <Link to="/">
          <Button
            variant="outlined"
            sx={{
              width: "60%",
              aspectRatio: "1",
              margin: "5%",
              borderRadius: "50%",
            }}
          >
            <GoogleIcon
              sx={{
                width: "100%",
                height: "100%",
              }}
            />
          </Button>
        </Link>
      </div>
    </div>
  );
}
