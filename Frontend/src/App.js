import { Route, Routes } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import CssBaseline from "@mui/material/CssBaseline";

import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import Login from "./components/pages/Login";
import Users from "./components/pages/Users";
import EditUser from "./components/pages/EditUser";

import Header from "./components/Header";

export default function App() {
  return (
    <>
      <CssBaseline enableColorScheme />

      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />

          <Route path="users">
            <Route index element={<Users />} />

            <Route path="edit/:id" element={<EditUser />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="login" element={<Login />} />
      </Routes>
    </>
  );
}
