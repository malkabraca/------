import { Box, CircularProgress, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

import CardComponent from "../components/CardComponent";
import { toast } from "react-toastify";
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";
import CreatComponentNew from "../components/CreatComponentNew";

const HomePage = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
  const navigate = useNavigate();
  let qparams = useQueryParams();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  useEffect(() => {
    axios
      .get("/cards/cards")
      .then(({ data }) => {
        filterFunc(data);
      })
      .catch((err) => {
        toast.error("err from axios" + "" + err.response.data);
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
      setCardsArr(
        data.filter(
          (card) =>
            card.title.startsWith(filter) || card.bizNumber.startsWith(filter)
        )
      );
      return;
    }
    if (originalCardsArr) {
      /*
        when all loaded and states loaded
      */
      let newOriginalCardsArr = JSON.parse(JSON.stringify(originalCardsArr));
      setCardsArr(
        newOriginalCardsArr.filter(
          (card) =>
            card.title.startsWith(filter) || card.bizNumber.startsWith(filter)
        )
      );
    }
  };
  useEffect(() => {
    filterFunc();
  }, [qparams.filter]);
  const handleDeleteFromInitialCardsArr = async (id) => {
    try {
      await axios.delete("/cards/" + id);
      setCardsArr((newCardsArr) =>
        newCardsArr.filter((item) => item._id != id)
      );
    } catch (err) {
      toast.error(err.response.data);
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
  const deleteHome = () => {};

  return (
    <Box>
      <h1>Cards Page</h1>
      <h3>Here you can find your favorite business cards</h3>
      <Grid container spacing={2}>
        {cardsArr.map((item) => (
          <Grid item sm={6} md={4} xs={12} key={item._id + Date.now()}>
            <CardComponent
              id={item._id}
              title={item.title}
              subTitle={item.subTitle}
              description={item.description}
              img={item.image ? item.image.url : ""}
              phone={item.phone}
              address={
                item.state +
                " " +
                item.country +
                " " +
                item.city +
                " " +
                item.street +
                " " +
                item.houseNumber
              }
              cardNumber={item.bizNumber}
              onDelete={handleDeleteFromInitialCardsArr}
              onEdit={handleEditFromInitialCardsArr}
              onInfor={handleMoreInformationFromInitialCardsArr}
              canEdit={
                payload &&
                (payload.biz || payload.isAdmin) &&
                item.user_id == jwt_decode(localStorage.token)._id
              }
              canDelete={
                payload &&
                (payload.isAdmin ||
                  (payload.biz &&
                    item.user_id == jwt_decode(localStorage.token)._id))
              }
              canFav={payload}
              deleteFav={deleteHome}
              isFavCards={
                localStorage.token &&
                item.likes.includes(jwt_decode(localStorage.token)._id)
              }
            />
          </Grid>
        ))}
      </Grid>
      <CreatComponentNew canCreate={payload && payload.biz} />
    </Box>
  );
};
export default HomePage;
