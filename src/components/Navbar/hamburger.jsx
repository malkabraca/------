import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ROUTES from "../../routes/ROUTES";
import { authActions } from "../../store/auth";
import NavLinkComponent from "./NavLinkComponent"
const pages = [
  {
    label: <img src="../1.png" className="logo" alt="logo"></img>,
    url: ROUTES.HOME,
  },
  {
    label: "About",
    url: ROUTES.ABOUT,
  },
];
const notAuthPages = [
  {
    label: "Register",
    url: ROUTES.REGISTER,
  },
  {
    label: "Login",
    url: ROUTES.LOGIN,
  },
];

const authedPages = [ {
  label: "FavCards",
  url: ROUTES.FAVCARD,
},
{
  label: "Logout",
  url: ROUTES.LOGOUT,
},];

const bizPages = [
  {
    label: "MyCards",
    url: "/myCards",
  },
];
const adminPages = [
  {
    label: "SandBox",
    url: "/sandBox",
  },
];

const Hamburger = () => {
  const isLoggedIn = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn
  );
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const logoutClick = () => {
    localStorage.clear();
    dispatch(authActions.logout());
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        flex: 1,
        display: { xs: "flex", md: "none" },
        justifyContent: "flex-end",
      }}
    >
      <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
        <MenuIcon />
      </IconButton>

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
          display: { xs: "block", md: "none" },
        }}
      >
         {pages.map((page) => (
          <NavLinkComponent onClick={handleCloseNavMenu} key={page.url} {...page} />
        ))}
       {isLoggedIn
              ? authedPages.map((page) =>
                  page.url === ROUTES.LOGOUT ? (
                    <NavLinkComponent 
                      key={page.url}
                      {...page}
                      onClick={logoutClick}
                    />
                  ) : (
                    <NavLinkComponent onClick={handleCloseNavMenu} key={page.url} {...page} />
                  )
                )
              : notAuthPages.map((page) => (
                  <NavLinkComponent onClick={handleCloseNavMenu} key={page.url} {...page} />
                ))}
        {isLoggedIn && payload.biz
          ? bizPages.map((page) => <NavLinkComponent onClick={handleCloseNavMenu} key={page.url} {...page} />)
          : ""}
        {isLoggedIn && payload.isAdmin
          ? adminPages.map((page) => <NavLinkComponent onClick={handleCloseNavMenu} key={page.url} {...page} />)
          : ""}
      </Menu>
    </Box>
  );
};
export default Hamburger;
