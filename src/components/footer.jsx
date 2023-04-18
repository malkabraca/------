import * as React from "react";
import { Link } from 'react-router-dom';
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ErrorIcon from "@mui/icons-material/Error";
import CoPresentTwoToneIcon from "@mui/icons-material/CoPresentTwoTone";
import InfoIcon from '@mui/icons-material/Info';
import ROUTES from "../routes/ROUTES";
import About from "../pages/About";

const Footer = () => {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: 500, margin: "auto" }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="About"
          icon={<InfoIcon />}
          component={Link}
          to="/about"
        />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction
          label="My Cards"
          icon={<CoPresentTwoToneIcon />}
        />
      </BottomNavigation>
    </Box>
  );
};
export default Footer;
