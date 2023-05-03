import * as React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CoPresentTwoToneIcon from "@mui/icons-material/CoPresentTwoTone";
import InfoIcon from "@mui/icons-material/Info";
import { useSelector } from "react-redux";

const Footer = () => {
  const [value, setValue] = React.useState(0);
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        // position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: "background.paper",
        boxShadow: "0px -1px 3px rgba(0, 0, 0, 0.25)",
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{ maxWidth: 500, width: "100%" }}
      >
        <BottomNavigationAction
          label="About"
          icon={<InfoIcon />}
          component={Link}
          to="/about"
        />
        {payload&&(<BottomNavigationAction
          label="Favorites"
          icon={<FavoriteIcon />}
          component={Link}
          to="/favCards"
        />)}
        {payload&& (payload.biz || payload.isAdmin)&&(<BottomNavigationAction
          label="My Cards"
          icon={<CoPresentTwoToneIcon />}
          component={Link}
          to="/myCards"
        />)}
      </BottomNavigation>
    </Box>
  );
};

export default Footer;
