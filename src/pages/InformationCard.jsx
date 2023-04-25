import { useState, useEffect } from "react";
import Button from "@mui/material/Button"
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
        setInputState(newInputState);
      })();
    }, [id]);
    const handeleBtnClick = async (ev) => {
      await axios.put("/cards/" + id, inputState);
      navigate(ROUTES.HOME);
    };
    if (!inputState) {
      return <CircularProgress color="secondary" />;
    }

  const handleCancelBtnClick = (ev) => {
    navigate(ROUTES.HOME);
  };

  if (!inputState) {
    return <CircularProgress />;
  }

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
            height: 233,
            width: 350,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt={inputState.alt ? inputState.alt : ""}
          src={inputState.url ? inputState.url : atom}
        />
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>
                <h4>Url:</h4>
                {inputState.url ? inputState.url : " "}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <h4>Title:</h4>
                {inputState.title}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <h4>SubTitle: </h4>
                {inputState.subTitle}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <h4> Description:</h4>
                {inputState.description}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <h4>Phone:</h4>
                {inputState.phone}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <h4>Stata:</h4>
                {inputState.state}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <h4> Country:</h4>
                {inputState.country}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <h4>City:</h4>
                {inputState.city}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <h4>Street:</h4>
                {inputState.street}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <h4>House Number:</h4>

                {inputState.houseNumber}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <h4>Zip Code:</h4>

                {inputState.zipCode}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <h4>Email:</h4>
                {inputState.email}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <h4>Web:</h4>
                {inputState.web}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <h4>Create dAt: </h4>
                {inputState.createdAt}
              </Typography>
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
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default InformationCard;
