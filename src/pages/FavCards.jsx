import jwt_decode from "jwt-decode";

import { Box, CircularProgress, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

import CardComponent from "../components/CardComponent";
import ButtonComponent from "../components/ButtonComponent";
import { toast } from "react-toastify";
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";

const FavCardsPage = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
  const navigate = useNavigate();
  let qparams = useQueryParams();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  useEffect(() => {
    axios
      .get("/cards/cards")
      .then(({ data }) => {
        let dataArr = Object.entries(data);
        setCardsArr(
          dataArr.filter((card) =>
            card[1]["likes"].includes(jwt_decode(localStorage.token)._id)
          )
        );
      })
      .catch((err) => {
        toast.error("Error from the server");
      });
  }, []);

  const delete1 = (id) => {
    setCardsArr(cardsArr.filter((card) => card[1]._id !== id));
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
    navigate(`/edit/${id}`); 
  };

  if (!cardsArr) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <h1>fav page</h1>
      <h3>Here you can see your favorite business cards</h3>
      <Grid container spacing={2}>
        {cardsArr.map((item) => (
          <Grid item sm={6} md={4} xs={12} key={item[1]._id + Date.now()}>
            <CardComponent
              id={item[1]._id}
              phone={item[1].phone}
              address={
                item[1].street + " " + item[1].houseNumber + ", " + item[1].city
              }
              cardNumber={item[1].bizNumber}
              title={item[1].title}
              subTitle={item[1].subTitle}
              description={item[1].description}
              img={item[1].image ? item[1].image.url : ""}
              deleteFav={delete1}
              onDelete={handleDeleteFromInitialCardsArr}
              onEdit={handleEditFromInitialCardsArr}
              canEdit={
                payload &&
                (payload.biz || payload.isAdmin) &&
                item[1].user_id == jwt_decode(localStorage.token)._id
              }
              canDelete={
                (payload && payload.isAdmin) ||
                (payload.biz &&
                  item[1].user_id == jwt_decode(localStorage.token)._id)
              }
              canFav={payload}
              isFavCards={
                localStorage.token &&
                item[1].likes.includes(jwt_decode(localStorage.token)._id)
              }
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FavCardsPage;
