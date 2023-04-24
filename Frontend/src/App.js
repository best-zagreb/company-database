import { CssBaseline } from "@mui/material";

import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import UserContext from "./context/UserContext";
import ToastContext from "./context/ToastContext";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Setup from "./components/pages/Setup";
import Login from "./components/pages/Login";
import NotFound from "./components/pages/NotFound";
import Home from "./components/pages/Home";
import Users from "./components/pages/Users";
import Projects from "./components/pages/Projects";
import Companies from "./components/pages/Companies";
import Company from "./components/pages/Company";

import Header from "./components/Header";
import Toast from "./components/Toast";
import DeleteAlert from "./components/forms/DeleteAlert";

export default function App() {
  const { setUser } = useContext(UserContext);
  const { handleOpenToast } = useContext(ToastContext);

  const [appIsSetup, setAppIsSetup] = useState(true);
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  async function loginUser(JWToken) {
    const serverResponse = await fetch("http://localhost:8080/users/login", {
      method: "GET",
      headers: {
        googleTokenEncoded: JWToken.credential,
      },
    });

    if (serverResponse.ok) {
      handleOpenToast({
        type: "info",
        info: "Login successful.",
      });

      const loginInfo = {
        JWT: JWToken,
        lastLogin: new Date(),
        automaticLoginDaysDuration: 7, // change later to be pulled for user settings from database or smth
      };
      localStorage.setItem("loginInfo", JSON.stringify(loginInfo));

      const json = await serverResponse.json();
      setUser(json);

      setUserIsLoggedIn(true);
    } else if (serverResponse.status === 404) {
      handleOpenToast({
        type: "error",
        info: "You do not have access to Company Database. If you believe this is a mistake, contact your administrator at email@example.com.",
      });
    }
  }

  useEffect(() => {
    // if (!appIsSetup) {
    //   navigate("/setup");
    // } else
    if (!userIsLoggedIn) {
      const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));

      if (
        loginInfo !== null &&
        (new Date() - Date.parse(Date(loginInfo.lastLogin))) /
          (1000 * 3600 * 24) <
          loginInfo.automaticLoginDaysDuration
      ) {
        // if JWT of user exists in local storage and user has logged in the last X days
        const JWToken = JSON.parse(localStorage.getItem("loginInfo")).JWT;
        loginUser(JWToken);
      } else {
        navigate("/login");
      }
    } else {
      if (location.pathname !== "/login") navigate(location.pathname);
      else navigate("/");
    }
  }, [userIsLoggedIn]);

  return (
    <>
      <CssBaseline enableColorScheme />
      <Routes>
        <Route
          path="/"
          element={<Header setUserIsLoggedIn={setUserIsLoggedIn} />}
        >
          <Route index element={<Home />} />

          <Route path="users">
            <Route index element={<Users />} />
          </Route>

          <Route path="projects">
            <Route index element={<Projects />} />
          </Route>

          <Route path="companies" element={<Companies />} />

          <Route path="companies/:id">
            <Route index element={<Company />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="login" element={<Login loginUser={loginUser} />} />
        {/* <Route path="setup" element={<Setup setAppIsSetup={setAppIsSetup} />} /> */}
      </Routes>

      <Toast></Toast>

      <DeleteAlert></DeleteAlert>
    </>
  );
}
