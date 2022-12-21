import "./Header.css";
import { Link, Outlet } from "react-router-dom";

import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Header({ setIsLoggedIn, userData }) {
  function onClick() {
    setIsLoggedIn(false);
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
          {/* replace ime prezime with nickname if exists, otherwise with firstName and lastName from database */}
          <p className="username">
            {userData ? userData.nickname : "Unknown user"}
          </p>

          <Button variant="outlined" size="large" onClick={onClick}>
            <LogoutIcon />
          </Button>
        </div>
      </header>

      <Outlet />
    </>
  );
}
