import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ROUTES from "../routes/ROUTES";
import { CircularProgress, CssBaseline } from "@mui/material";
import atom from "../logo.svg";
import { toast } from "react-toastify";
import InformationComponent from "../components/InformationComponent";

const InformationCard = () => {
  const { id } = useParams();
  const [inputState, setInputState] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/cards/card/" + id);
      let newInputState = {
        ...data,
      };
      if (data.image && data.image.url) {
        newInputState.url = data.image.url;
      } else {
        newInputState.url = "";
      }
      if (data.image && data.image.alt) {
        newInputState.alt = data.image.alt;
      } else {
        newInputState.alt = "";
      }
      delete newInputState.image;
      delete newInputState.likes;
      delete newInputState._id;
      delete newInputState.user_id;
      delete newInputState.bizNumber;
      delete newInputState.address;
      delete newInputState.__v;
      setInputState(newInputState);
    })();
  }, [id]);
  
  if (!inputState) {
    return <CircularProgress color="secondary" />;
  }

  const handleCancelBtnClick = (ev) => {
    navigate(ROUTES.HOME);
  };

  if (!inputState) {
    return <CircularProgress />;
  }
  let cardsArrIn = Object.keys(inputState);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          More details
        </Typography>
        <Box
          component="img"
          sx={{
            height: 180,
            width: 250,
            maxHeight: { xs: 180, md: 167 },
            maxWidth: { xs: 250, md: 250 },
          }}
          alt={inputState.alt ? inputState.alt : ""}
          src={
            inputState.url
              ? inputState.url
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
        />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {cardsArrIn.map((item) => (
              <InformationComponent
                inputState={inputState}
                key={item + Date.now()}
                item={item}
              />
            ))}
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end">
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 1, mb: 1 }}
            color="primary"
            onClick={handleCancelBtnClick}
          >
            Back to home page.
          </Button>
        </Grid>
      </Box>
    </Container>
  );
};
export default InformationCard;
