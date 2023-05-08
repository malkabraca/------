import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";
import { Avatar, Grid, Switch } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import SearchPartial from "./SearchPartial";
import ROUTES from "../../routes/ROUTES";
import { darkThemeActions } from "../../store/darkTheme";
import NavLinkComponent from "./NavLinkComponent";
import { authActions } from "../../store/auth";
import Hamburger from "./hamburger";

const pages = [
  {
    label: <img src="../1.png" alt="logo" className="logo"></img>,
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

const MuiNavbar = () => {
  const isLoggedIn = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn
  );
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  const dispatch = useDispatch();
  const isDarkTheme = useSelector(
    (bigPie) => bigPie.darkThemeSlice.isDarkTheme
  );

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
                  />
                ) : (
                  <NavLinkComponent key={page.url} {...page} />
                )
              )
            : ""}
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
