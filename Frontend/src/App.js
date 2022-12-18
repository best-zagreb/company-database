import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import CssBaseline from "@mui/material/CssBaseline";

import Setup from "./components/pages/Setup";
import Login from "./components/pages/Login";
import NotFound from "./components/pages/NotFound";
import Home from "./components/pages/Home";
import Users from "./components/pages/Users";
import Projects from "./components/pages/Projects";
import Companies from "./components/pages/Companies";
import Company from "./components/pages/Company";
import Header from "./components/Header";
//import Project from "./components/pages/Project";

export default function App() {
  const [appIsSetup, setAppIsSetup] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // if (!appIsSetup) {
    //   navigate("/setup");
    // } else
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [appIsSetup, isLoggedIn]);

  return (
    <>
      <CssBaseline enableColorScheme />

      <Routes>
        <Route path="/" element={<Header setIsLoggedIn={setIsLoggedIn} />}>
          <Route index element={<Home />} />

          <Route path="users">
            <Route index element={<Users />} />
          </Route>

          <Route path="projects">
            <Route index element={<Projects />} />
          </Route>

          <Route path="companies">
            <Route index element={<Companies />} />
          </Route>

          <Route path="companies/:companyName">
            <Route index element={<Company />} />
          </Route>

         

          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        {/* <Route path="setup" element={<Setup setAppIsSetup={setAppIsSetup} />} /> */}
      </Routes>
    </>
  );
}
