import * as React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ErrorIcon from "@mui/icons-material/Error";
import CoPresentTwoToneIcon from "@mui/icons-material/CoPresentTwoTone";
import InfoIcon from "@mui/icons-material/Info";
import ROUTES from "../routes/ROUTES";
import About from "../pages/About";
import { Grid } from "@mui/material";

// const Footer = () => {
//   const [value, setValue] = React.useState(0);

//   return (
//     <Box sx={{ width: 500, margin: "auto" }}>
//           <BottomNavigation
//             showLabels
//             value={value}
//             onChange={(event, newValue) => {
//               setValue(newValue);
//             }}
//           >
//             <BottomNavigationAction
//               label="About"
//               icon={<InfoIcon />}
//               component={Link}
//               to="/about"
//             />
//             <BottomNavigationAction
//               label="Favorites"
//               icon={<FavoriteIcon />}
//               component={Link}
//               to="/favCards"
//             />
//             <BottomNavigationAction
//               label="My Cards"
//               icon={<CoPresentTwoToneIcon />}
//               component={Link}
//               to="/myCards"
//             />
//           </BottomNavigation>
//     </Box>
//   );
// };
// export default Footer;



// import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
// import InfoIcon from "@mui/icons-material/Info";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import CoPresentTwoToneIcon from "@mui/icons-material/CoPresentTwoTone";

const Footer = () => {
  const [value, setValue] = React.useState(0);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        position: "fixed",
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
        <BottomNavigationAction
          label="Favorites"
          icon={<FavoriteIcon />}
          component={Link}
          to="/favCards"
        />
        <BottomNavigationAction
          label="My Cards"
          icon={<CoPresentTwoToneIcon />}
          component={Link}
          to="/myCards"
        />
      </BottomNavigation>
    </Box>
  );
};

export default Footer;
