import "./Header.css";
import { Link, Outlet, useLocation } from "react-router-dom";

import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Header() {
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
          </ul>

          <Button variant="contained">
            <AddCircleIcon />
            Create project
          </Button>
        </nav>

        <div className="menu">
          {/* replace ime prezime with nickname if exists, otherwise with name and surname from database */}
          <p className="username">Ime Prezime</p>

          <Link to="/login">
            <Button variant="outlined" size="large">
              <LogoutIcon />
            </Button>
          </Link>
        </div>
      </header>

      <Outlet />
    </>
  );
}
