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
        // console.log("data", data);
        //  console.log("'cardsarr:", cardsArrToFilter);
        let dataArr = Object.entries(data);
        // console.log("dataArr before change", dataArr);
        // console.log("cardsArr after creating dataArr", data);
        setCardsArr(
          dataArr.filter((card) =>
            card[1]["likes"].includes(jwt_decode(localStorage.token)._id)
          )
        );
      })
      // console.log("hi - cards Arr");
      // console.log("data Arr", dataArr);
      // console.log("data after filter", data);
      // console.log("cardes arr - :", cardsArr);
      .catch((err) => {
        console.log("err from axios", err);

        toast.error("Oops");
      });
    console.log("decrypted token -", jwt_decode(localStorage.token));
    console.log("cards after change", cardsArr);
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
    // doRefresh();
  };
  const handleEditFromInitialCardsArr = (id) => {
    navigate(`/edit/${id}`); //localhost:3000/edit/123213
  };

  if (!cardsArr) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <h1>fav page</h1>
      <h3>Here you can fav</h3>
      <Grid container spacing={2}>
        {cardsArr.map((item) => (
          <Grid item xs={4} key={item[1]._id + Date.now()}>
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
              // canEdit={payload && (payload.biz || payload.isAdmin)}
              canEdit={
                payload &&
                (payload.biz || payload.isAdmin) &&
                item[1].user_id == (jwt_decode(localStorage.token)._id)
              }
              // canDelete={payload && (payload.isAdmin)}
              canDelete={
                payload && payload.isAdmin||
                (payload.biz  &&
                item[1].user_id == jwt_decode(localStorage.token)._id)
              }
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};


export default FavCardsPage;
