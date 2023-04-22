import { Avatar, Box, IconButton } from "@mui/material";
import { Fragment } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ROUTES from "../routes/ROUTES";
import { useNavigate } from "react-router-dom";
import { blue, deepOrange, deepPurple, green } from "@mui/material/colors";

const CreatComponentNew = ({ canCreate }) => {
  const navigate = useNavigate();
  const btnCraet = () => {
    navigate(ROUTES.CREATE);
  };
  return (
    <Box sx={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
      {canCreate ? (
        // <Fragment>
        //   <IconButton aria-label="delete" size="large" cn onClick={btnCraet}variant="filled"  color="primary">
        //     <AddCircleIcon />
        //   </IconButton>
        // </Fragment>
          <Avatar sx={{ bgcolor: blue[700] }}size="large"  onClick={btnCraet}>+ </Avatar>
      ) : (
        " "
      )}
    </Box>
  );
};
export default CreatComponentNew;
