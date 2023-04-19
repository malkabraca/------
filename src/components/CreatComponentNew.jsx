import { Box, IconButton } from "@mui/material";
import { Fragment } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ROUTES from "../routes/ROUTES";
import { useNavigate } from "react-router-dom";

const CreatComponentNew = ({ canCreate }) => {
  const navigate = useNavigate();
  const btnCraet = () => {
    navigate(ROUTES.CREATE);
  };
  return (
    <Box sx={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
      {canCreate ? (
        <Fragment>
          <IconButton aria-label="delete" size="large" cn onClick={btnCraet}>
            <AddCircleIcon />
          </IconButton>
        </Fragment>
      ) : (
        " "
      )}
    </Box>
  );
};
export default CreatComponentNew;
