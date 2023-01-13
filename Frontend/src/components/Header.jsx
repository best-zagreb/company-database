import { Link, Outlet } from "react-router-dom";
import { useContext, useState } from "react";

import "./Header.css";

import UserContext from "../context/UserContext";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Container,
  Button,
  Tooltip,
} from "@mui/material";

import {
  Menu as MenuIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material/";

export default function Header({ setUserIsLoggedIn }) {
  const { user } = useContext(UserContext);

  function logoutUser() {
    localStorage.removeItem("loginInfo");

    setUserIsLoggedIn(false);
  }

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="false">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}>
              <Tooltip title="Open app menu">
                <IconButton
                  size="large"
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              </Tooltip>

              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", sm: "none" },
                }}
              >
                <MenuItem
                  className="nav-menu-item"
                  onClick={handleCloseNavMenu}
                >
                  <Link to="/">CDB</Link>
                </MenuItem>
                <MenuItem
                  className="nav-menu-item"
                  onClick={handleCloseNavMenu}
                >
                  <Link to="/projects">Projects</Link>
                </MenuItem>
                <MenuItem
                  className="nav-menu-item"
                  onClick={handleCloseNavMenu}
                >
                  <Link to="/companies">Companies</Link>
                </MenuItem>
                <MenuItem
                  className="nav-menu-item"
                  onClick={handleCloseNavMenu}
                >
                  <Link to="/users">Users</Link>
                </MenuItem>
              </Menu>
            </Box>

            <Box
              className="nav"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "flex" },
                gap: "min(2%, 1rem)",
              }}
            >
              <Link to="/" underline="hover">
                CDB
              </Link>
              <Link to="/projects" underline="hover">
                Projects
              </Link>
              <Link to="/companies" underline="hover">
                Companies
              </Link>
              <Link to="/users" underline="hover">
                Users
              </Link>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open account menu">
                <Button
                  variant="text"
                  onClick={handleOpenUserMenu}
                  endIcon={<ExpandMoreIcon />}
                  sx={{ color: "#fff" }}
                >
                  {!user
                    ? "Unknown user"
                    : user.nickname
                    ? user.nickname
                    : user.firstName + " " + user.lastName}
                </Button>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {/* TODO:
                 <MenuItem onClick={handleCloseUserMenu}>
                  <Button
                    variant="text"
                    startIcon={<SettingsIcon />}
                    sx={{ color: "#333" }}
                  >
                    Settings
                  </Button>
                </MenuItem> */}
                <MenuItem onClick={(handleCloseUserMenu, logoutUser)}>
                  <Button
                    variant="text"
                    startIcon={<LogoutIcon />}
                    sx={{ color: "#333" }}
                  >
                    Logout
                  </Button>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Outlet />
    </>
  );
}

