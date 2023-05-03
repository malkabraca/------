import { Avatar, Box, IconButton } from "@mui/material";
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
          <Avatar sx={{ bgcolor: blue[700] }}size="large"  onClick={btnCraet}>+ </Avatar>
      ) : (
        " "
      )}
    </Box>
  );
};
export default CreatComponentNew;
