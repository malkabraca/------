import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

import CardComponent from "../components/CardComponent";
import ButtonComponent from "../components/ButtonComponent";
import { toast } from "react-toastify";
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";
import CreatComponentNew from "../components/CreatComponentNew";
import jwt_decode from "jwt-decode";


const MyCards =()=>{
    const [originalCardsArr, setOriginalCardsArr] = useState(null);
    const [cardsArr, setCardsArr] = useState(null);
    const navigate = useNavigate();
    let qparams = useQueryParams();
    const payload = useSelector((bigPie) => bigPie.authSlice.payload);
  
    useEffect(() => {
      /*
        useEffect cant handle async ()=>{}
        this is why we use the old promise way
      */
      axios
        .get("cards/my-cards")
        .then(({ data }) => {
          console.log("data", data);
          // setCardsArr(data);
          filterFunc(data);
        })
        .catch((err) => {
          console.log("err from axios", err);
  
          toast.error("Oops");
        });
    }, []);
    const filterFunc = (data) => {
      if (!originalCardsArr && !data) {
        return;
      }
      let filter = "";
      if (qparams.filter) {
        filter = qparams.filter;
      }
      if (!originalCardsArr && data) {
        /*
          when component loaded and states not loaded
        */
        setOriginalCardsArr(data);
        setCardsArr(data.filter((card) => card.title.startsWith(filter)));
        return;
      }
      if (originalCardsArr) {
        /*
          when all loaded and states loaded
        */
        let newOriginalCardsArr = JSON.parse(JSON.stringify(originalCardsArr));
        setCardsArr(
          newOriginalCardsArr.filter((card) => card.title.startsWith(filter))
        );
      }
    };
    useEffect(() => {
      filterFunc();
    }, [qparams.filter]);
    const handleDeleteFromInitialCardsArr = async (id) => {
      // let newCardsArr = JSON.parse(JSON.stringify(cardsArr));
      // newCardsArr = newCardsArr.filter((item) => item.id != id);
      // setCardsArr(newCardsArr);
      try {
        await axios.delete("/cards/" + id); // /cards/:id
        setCardsArr((newCardsArr) =>
          newCardsArr.filter((item) => item._id != id)
        );
      } catch (err) {
        console.log("error when deleting", err.response.data);
      }
    };
    const handleEditFromInitialCardsArr = (id) => {
      navigate(`/edit/${id}`); //localhost:3000/edit/123213
    };
  
    if (!cardsArr) {
      return <CircularProgress />;
    }
  
    return (
      <Box>
            <h1>My Cards</h1>
      <h3>Here you can find business cards you created</h3>
        {cardsArr.length === 0 ? (
        <Box>
        <Typography>You didn't created cards</Typography>
        <CreatComponentNew canCreate={payload && payload.biz}/>
        </Box>
      ) :(
      <Box>
        <Grid container spacing={2}>
          {cardsArr.map((item) => (
            <Grid item sm={6} md={4} xs={12}  key={item._id + Date.now()}>
              <CardComponent
                id={item._id}
                title={item.title}
                subTitle={item.subTitle}
                description={item.description}
                img={item.image ? item.image.url : ""}
                onDelete={handleDeleteFromInitialCardsArr}
                onEdit={handleEditFromInitialCardsArr}
                // canEdit={payload && (payload.biz || payload.isAdmin)}
                // canDelete={payload && (payload.isAdmin)}
                canEdit={
                  payload &&
                  (payload.biz || payload.isAdmin) &&
                  item.user_id == jwt_decode(localStorage.token)._id
                }
                // canDelete={payload && (payload.isAdmin)}
                canDelete={
                  payload &&
                  (payload.isAdmin ||
                    (payload.biz &&
                      item.user_id == jwt_decode(localStorage.token)._id))
                }
                canFav={payload}
              />
            </Grid>
          ))}
       
        </Grid>
        <CreatComponentNew canCreate={payload && payload.biz}/>
        </Box>
    )}
    </Box>
    );
  };
export default MyCards