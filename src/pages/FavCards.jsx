import jwt_decode from "jwt-decode";

import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

import CardComponent from "../components/CardComponent";
import { toast } from "react-toastify";
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";
import CreatComponentNew from "../components/CreatComponentNew";

const FavCardsPage = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
  const navigate = useNavigate();
  let qparams = useQueryParams();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  useEffect(() => {
    axios
    .get("/cards/get-my-fav-cards")
      .then(({ data }) => {
        filterFunc(data)
      })
      .catch((err) => {
        toast.error("There is an error,");
      });
  }, []);

  const delete1 = (id) => {
    setCardsArr(cardsArr.filter((card) => card._id !== id));
  };

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
      setCardsArr(data.filter((card) => card.title.startsWith(filter)||card.bizNumber.startsWith(filter)));
      return;
    }
    if (originalCardsArr) {
      /*
        when all loaded and states loaded
      */
      let newOriginalCardsArr = JSON.parse(JSON.stringify(originalCardsArr));
      setCardsArr(
        newOriginalCardsArr.filter((card) => card.title.startsWith(filter)||card.bizNumber.startsWith(filter))
      );
    }
  };
  useEffect(() => {
    filterFunc();
  }, [qparams.filter]);
  const handleDeleteFromInitialCardsArr = async (id) => {
    try {
      if (!payload) {
        return;
      }
      await axios.delete("/cards/" + id); 
      setCardsArr((newCardsArr) =>
        newCardsArr.filter((item) => item._id != id)
      );
    } catch (err) {
      toast.error("error when deleting"+""+ err.response.data);
    }
  };
 const handleEditFromInitialCardsArr = (id) => {
    const cardToEdit = cardsArr.find((card) => card._id == id);
    navigate(`/edit/${id}`, { state: { user_id: cardToEdit.user_id } });
  };

  const handleMoreInformationFromInitialCardsArr = (id) => {
    navigate(`/infor/${id}`);
  };
  if (!cardsArr) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <h1>fav page</h1>
      <h3>Here you can see your favorite business cards</h3>
      {originalCardsArr.length === 0 ? (
        <Box>
        <Typography>You didn't created cards</Typography>
        <CreatComponentNew canCreate={payload && payload.biz}/>
        </Box>
      ) :(
      <Grid container spacing={2}>
        {cardsArr.map((item) => (
          <Grid item sm={6} md={4} xs={12} key={item._id + Date.now()}>
            <CardComponent
              id={item._id}
              phone={item.phone}
              address={
                item.street + " " + item.houseNumber + ", " + item.city
              }
              cardNumber={item.bizNumber}
              title={item.title}
              subTitle={item.subTitle}
              description={item.description}
              img={item.image ? item.image.url : ""}
              deleteFav={delete1}
              onDelete={handleDeleteFromInitialCardsArr}
              onEdit={handleEditFromInitialCardsArr}
              onInfor={handleMoreInformationFromInitialCardsArr}
              canEdit={
                payload &&
                (payload.biz || payload.isAdmin) &&
                item.user_id == jwt_decode(localStorage.token)._id
              }
              canDelete={
                (payload && payload.isAdmin) ||
                (payload.biz &&
                  item.user_id == jwt_decode(localStorage.token)._id)
              }
              canFav={payload}
              
              isFavCards={
                localStorage.token &&
                item.likes.includes(jwt_decode(localStorage.token)._id)
              }
            />
          </Grid>
        ))}
      </Grid>
      )}
    </Box>
  );
};

export default FavCardsPage;
