import FavoriteIcon from "@mui/icons-material/Favorite";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

import {
  Card,
  CardActionArea,
  CardMedia,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import { Fragment } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import axios from "axios";
import { useParams } from "react-router-dom";
//import { renderHook } from "@testing-library/react";
//import { handleFavBtnClick } from "../pages/FavCardsPage";
/*
    img
    title
    price
    description
    props = {
        img:"http://az837918.vo.msecnd.net/publishedimages/articles/1733/en-CA/images/1/free-download-this-stunning-alberta-scene-for-your-device-background-image-L-6.jpg"
        title:"nature"
        price:"112"
        description:"Here’s a gift to help bring a little more beauty to your life in September: An image of the world-famous Spirit Island at Maligne Lake in Alberta’s Jasper National Park, specially prepared to serve as a wallpaper or background image for your computer, tablet or mobile phone.
        Use the links below to download the wallpaper in the appropriate size, and enjoy the scene all month long. We’ll create another beautiful Alberta image next month for you to enjoy.
        If you want to see Spirit Island and Jasper National Park under the stars yourself (don’t forget to check out the park’s Dark Sky Festival from Oct. 14 to 23), scroll down for more information."
        id:1
        onDelete:handleDeleteFromInitialCardsArr
        onEdit:handleEditFromInitialCardsArr
    }
*/

// const CardComponent = (props) => { - - - }
const CardComponent = ({
  img,
  title,
  subTitle,
  phone,
  address,
  cardNumber,
  id,
  onDelete,
  onDeletefav,
  onEdit,
  canEdit,
  canDelete,
  canFav,
}) => {
  // const { _id } = useParams();

  const handleDeleteBtnClick = () => {
    console.log("id", id);
    onDelete(id);
  };
  const handleEditBtnClick = () => {
    onEdit(id);
  };
  const handleFavBtnClick = async () => {
    try {
      await axios.patch("/cards/card-like/" + id);
      onDeletefav(id);
    } catch (err) {
      console.log("error when change fav", err.response.data);
    }
  };
  //   try {
  //     axios.get("/cards/cards").then(({ data }) => {
  //       console.log("data", data);
  //       //  console.log("'cardsarr:", cardsArrToFilter);
  //       let dataArr = Object.entries(data);
  //       console.log("dataArr before change", dataArr);
  //       console.log("cardsArr after creating dataArr", data);
  //       setCardsArr(
  //         dataArr.filter((card) =>
  //           card[1]["likes"].includes(jwt_decode(localStorage.token)._id)
  //         )
  //       );
  //     });
  //   } catch (err) {
  //     console.log("err from axios", err);

  //     toast.error("Oops");
  //   }
  //};
  return (
    <Card square raised>
      <CardActionArea>
        <CardMedia component="img" image={img} />
      </CardActionArea>
      <CardHeader title={title} subheader={subTitle}></CardHeader>
      <CardContent>
        <hr />
        <Typography>{"Phone: " + phone}</Typography>
        <Typography>{"Address: " + address}</Typography>
        <Typography>{"Card Number: " + cardNumber}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="text"
          color="primary"
          sx={{
            flexGrow: 1,
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <PhoneIcon
            sx={{
              flexGrow: 1,
              flex: 1,
              display: "flex",
              justifyContent: "flex-end",
            }}
          />
        </Button>
        <Button
          variant="text"
          color="primary"
          sx={{
            flexGrow: 1,
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
          }}
          onClick={handleFavBtnClick}
        >
          <FavoriteIcon
            sx={{
              flexGrow: 1,
              flex: 1,
              display: "flex",
              justifyContent: "flex-end",
            }}
          />
        </Button>
        {canEdit ? (
          <Fragment>
            <Button variant="text" color="error" onClick={handleDeleteBtnClick}>
              Delete
            </Button>
            <Button variant="text" color="warning" onClick={handleEditBtnClick}>
              Edit
            </Button>
          </Fragment>
        ) : (
          ""
        )}
      </CardActions>
    </Card>
  );
};

CardComponent.propTypes = {
  id: PropTypes.string,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  canEdit: PropTypes.bool,
};

CardComponent.defaultProps = {
  img: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
  subTitle: "",
  canEdit: false,
};

export default CardComponent;
