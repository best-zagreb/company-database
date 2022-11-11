import { Route, Routes } from "react-router-dom";
import { useEffect, useContext } from "react";
import {
  UserContextProvider,
  UserContext,
} from "./components/contexts/UserContext";

import "./App.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import CssBaseline from "@mui/material/CssBaseline";

import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import Login from "./components/pages/Login";
import Users from "./components/pages/Users";
import UserForm from "./components/forms/UserForm";
import DeleteUser from "./components/pages/DeleteUser";

import Header from "./components/Header";

export default function App() {
  return (
    <>
      <CssBaseline enableColorScheme />

      <UserContext.Provider>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />

            <Route path="users">
              <Route index element={<Users />} />
              <Route path="new" element={<UserForm />} />
              <Route path="edit/:id" element={<UserForm />} />
              <Route path="delete/:id" element={<DeleteUser />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="login" element={<Login />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}
