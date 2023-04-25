import {
  Card,
  CardActionArea,
  CardMedia,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Button,
  ThemeProvider,
  Chip,
  Icon,
  IconButton,
  Box,
  Checkbox,
} from "@mui/material";
import PropTypes from "prop-types";
import { Fragment } from "react";
import CreateIcon from "@mui/icons-material/Create";
import CallIcon from "@mui/icons-material/Call";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { useSelector } from "react-redux";
import { FavoriteBorder } from "@mui/icons-material";

const CardComponent = ({
  img,
  title,
  subTitle,
  description,
  id,
  phone,
  address,
  cardNumber,
  onDelete,
  onEdit,
  onInfor,
  canEdit,
  canDelete,
  deleteFav,
}) => {
  const handleDeleteBtnClick = () => {
    console.log("id", id);
    onDelete(id);
  };
  const handleEditBtnClick = () => {
    onEdit(id);
  };
  const handleonInforBtnClick = () => {
    console.log("loggg");
    onInfor(id);
  };
  // const changeTheme = () => {
  //   dispatch(darkThemeActions.changeTheme());
  // };
  const isDarkTheme = useSelector(
    (bigPie) => bigPie.darkThemeSlice.isDarkTheme
  );
  
  const handleLoveBtnClick = async () => {
    try {
      await axios.patch("/cards/card-like/" + id);
      deleteFav(id);
    } catch (err) {
      console.log("error when change fav", err.response.data);
    }
  };
  return (
    <Card square raised>
      <CardActionArea onClick={handleonInforBtnClick} >
        <CardMedia component="img" image={img} />
      </CardActionArea>
      <CardHeader title={title} subheader={subTitle}></CardHeader>
      <CardContent>
        <Typography>{"Phone: " + phone}</Typography>
        <Typography>{"Address: " + address}</Typography>
        <Typography>{"Card number:" + cardNumber}</Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* <Box sx={{ display: "flex", flex: 1, justifyContent: "flex-start" }}>
          {canDelete ? (
            <Fragment>
              <IconButton
                color="primary"
                aria-label="add to shopping cart"
                onClick={handleDeleteBtnClick}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Fragment>
          ) : (
            ""
          )}
          {canEdit ? (
            <Fragment>
              <IconButton
                color="primary"
                aria-label="add to shopping cart"
                onClick={handleEditBtnClick}
              >
                <CreateIcon />
              </IconButton>
            </Fragment>
          ) : (
            ""
          )}
        </Box> */}
        <Box sx={{ display: "flex", flex: 1, justifyContent: "flex-start" }}>
          {canDelete ? (
            <Fragment>
              <IconButton
                color="primary"
                aria-label="add to shopping cart"
                onClick={handleDeleteBtnClick}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Fragment>
          ) : (
            ""
          )}
          {canEdit ? (
            <Fragment>
              <IconButton
                color="primary"
                aria-label="add to shopping cart"
                onClick={handleEditBtnClick}
              >
                <CreateIcon />
              </IconButton>
            </Fragment>
          ) : (
            ""
          )}
        </Box>
        
        
        <Box sx={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
          <IconButton color="primary" aria-label="add to shopping cart">
            <CallIcon />
          </IconButton>
          {/* <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} /> */}
          <IconButton color="primary" aria-label="add to shopping cart" onClick={handleLoveBtnClick}>
            <FavoriteIcon  />
          </IconButton>
        </Box>
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