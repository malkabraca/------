import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";
import { Avatar, Grid, Switch } from "@mui/material";
import { NavLink } from "react-router-dom";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import SearchPartial from "./SearchPartial";
import ROUTES from "../../routes/ROUTES";
import { darkThemeActions } from "../../store/darkTheme";
import NavLinkComponent from "./NavLinkComponent";
import { authActions } from "../../store/auth";
import Hamburger from "./hamburger";

// access to all
const pages = [
  {
    // className="logo"
    label: <img src="../2.png"  alt="logo" className="logo"></img>,
    url: ROUTES.HOME,
  },
  {
    label: "About",
    url: ROUTES.ABOUT,
  },
];

//not logged in users
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

//logged in users
const authedPages = [
  {
    label: "FavCards",
    url: ROUTES.FAVCARD,
  },
];
const authedPagesAvatar = [
  {
    label: <Avatar src="/broken-image.jpg" />,
    url: ROUTES.PROFILE,
  },
];
const authedPagesLogout = [

  {
    label: "Logout",
    url: ROUTES.LOGOUT,
  },
];


//biz pages
const bizPages = [
  {
    label: "MyCards",
    url: "/myCards",
  },
];
//admin pages
const adminPages = [
  {
    label: "SANDBOX",
    url: "/sandBox",
  },
];

const MuiNavbar = () => {
  const isLoggedIn = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn
  );
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  // const [anchorElNav, setAnchorElNav] = React.useState(null);
  const dispatch = useDispatch();
  const isDarkTheme = useSelector(
    (bigPie) => bigPie.darkThemeSlice.isDarkTheme
  );

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  const changeTheme = () => {
    dispatch(darkThemeActions.changeTheme());
  };

  const logoutClick = () => {
    localStorage.clear();
    dispatch(authActions.logout());
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          {/* main navbar */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <NavLinkComponent key={page.url} {...page} />
            ))}
            {isLoggedIn
              ? authedPages.map((page) =>
                  page.url === ROUTES.LOGOUT ? (
                    <NavLinkComponent
                      key={page.url}
                      {...page}
                      onClick={logoutClick}
                      // sx={{ display: "flex", justifyContent: "flex-end" }}
                    />
                  ) : (
                    <NavLinkComponent key={page.url} {...page} />
                  )
                )
              : notAuthPages.map((page) => (
                  <NavLinkComponent key={page.url} {...page} />
                ))}
            {isLoggedIn && payload.biz
              ? bizPages.map((page) => (
                  <NavLinkComponent key={page.url} {...page} />
                ))
              : ""}
            {isLoggedIn && payload.isAdmin
              ? adminPages.map((page) => (
                  <NavLinkComponent key={page.url} {...page} />
                ))
              : ""}
                     {isLoggedIn
            ? authedPagesLogout.map((page) =>
                page.url === ROUTES.LOGOUT ? (
                  <NavLinkComponent
                    key={page.url}
                    {...page}
                    onClick={logoutClick}
                    // sx={{ display: "flex", justifyContent: "flex-end" }}
                  />
                ) : (
                  <NavLinkComponent key={page.url} {...page} />
                )
              )
            : ""}
          </Box>
          <SearchPartial />
          <Box
            sx={{
              my: 2,
              p: 1,
            }}
          >
            <Typography sx={{ display: { xs: "none", md: "inline" } }}>
              {isDarkTheme ? "Dark" : "Light"} Mode
            </Typography>
            {/* <Switch checked={isDarkTheme} onChange={changeTheme} /> */}
            <IconButton onClick={changeTheme}>
              {isDarkTheme ? <WbSunnyIcon /> : <DarkModeIcon />}
            </IconButton>
          </Box>
          {isLoggedIn
            ? authedPagesAvatar.map((page) =>
                page.url === ROUTES.LOGOUT ? (
                  <NavLinkComponent
                    key={page.url}
                    {...page}
                    onClick={logoutClick}
                    // sx={{ display: "flex", justifyContent: "flex-end" }}
                  />
                ) : (
                  <NavLinkComponent key={page.url} {...page} />
                )
              )
            : ""}
          {/* hamburger with menu */}

          {/* if the current page and the link is the same then it will change the color of the link */}
          {/*           
          <Box
            sx={{
              flexGrow: 1,
              flex: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
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
                <MenuItem
                  key={"miniLinks" + page.url}
                  onClick={handleCloseNavMenu}
                >
                  <NavLink to={page.url}>
                 
                    {({ isActive }) => (
                      <Typography
                        sx={{
                          textAlign: "center",
                          color: `${isActive ? "red" : ""}`,
                        }}
                      >
                        {page.label}
                      </Typography>
                    )}
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
          <Typography
            sx={{
              my: 2,
              display: { xs: " none", md: "block" },
              p: 1,
            }}
          ></Typography>

          <Hamburger />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MuiNavbar;
