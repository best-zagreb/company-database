import "./Header.css";

import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";

import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";

import UserContext from "../context/UserContext";

export default function Header({ setUserIsLoggedIn }) {
  const { user } = useContext(UserContext);

  function logoutUser() {
    localStorage.removeItem("loginInfo");

    setUserIsLoggedIn(false);
  }

  return (
    <>
      <header className="header">
        <nav>
          <ul>
            <li>
              <Link to="/">CDB</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li>
              <Link to="/companies">Companies</Link>
            </li>

            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>

          {/* <Button variant="contained">
            <AddCircleIcon />
            Create project
          </Button> */}
        </nav>

        <div className="menu">
          <p className="username">
            {!user
              ? "Unknown user"
              : user.nickname
              ? user.nickname
              : user.firstName + " " + user.lastName}
          </p>

          <Button variant="outlined" size="large" onClick={logoutUser}>
            <LogoutIcon />
          </Button>
        </div>
      </header>

      <Outlet />
    </>
  );
}
