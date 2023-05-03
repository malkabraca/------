import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ROUTES from "../routes/ROUTES";
import validateEditSchema, {
  validateEditCardParamsSchema,
} from "../validation/editValidation";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import CreateEditComponent from "../components/CreateAndEditComponent";

const EditCardPage = () => {
  const { id } = useParams();

  const [inputState, setInputState] = useState(null);

  const [inputsErrorsState, setInputsErrorsState] = useState([]);
  const navigate = useNavigate();
 
  useEffect(() => {
    (async () => {
      try {
        const errors = validateEditCardParamsSchema({ id });
        if (errors) {
          navigate("/");
          return;
        }
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
        if (data.zipCode == null) {
          newInputState.zipCode = "";
        }
        delete newInputState.image;
        delete newInputState.likes;
        delete newInputState._id;
        delete newInputState.user_id;
        delete newInputState.bizNumber;
        delete newInputState.createdAt;
        delete newInputState.__v;
        delete newInputState.address;
        setInputState(newInputState);
      } catch (err) {
        toast.error("Error from the server"+""+ err.response.data);
      }
    })();
  }, [id]);
  const handleSaveBtnClick = async (ev) => {
    try {
      const joiResponse = validateEditSchema(inputState);
      setInputsErrorsState(joiResponse);
      if (!joiResponse) {
        await axios.put("/cards/" + id, inputState);
        navigate(ROUTES.HOME);
      }
    } catch (err) {
      console.log("err", err);
      toast.error("Error from the server"+""+err.response.data);
    }
  };

  const handleCancelBtnClick = (ev) => {
    navigate(ROUTES.HOME);
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
  };

  if (!inputState) {
    return <CircularProgress />;
  }
  const keys = Object.keys(inputState);
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <EditIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit card
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
          src={inputState.url ? inputState.url : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
        />
      <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {keys.map((item) => (
              <CreateEditComponent
                key={item}
                item={item}
                inputState={inputState}
                handleInputChange={handleInputChange}
                inputsErrorsState={inputsErrorsState}
              />
            ))}
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSaveBtnClick}
              >
                Save
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleCancelBtnClick}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default EditCardPage;
