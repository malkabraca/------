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
import { Fragment, useState } from "react";
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
  canFav,
  deleteFav,
  isFav,
}) => {
  const [favState, setfavState] = useState(isFav);
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
  
  const isDarkTheme = useSelector(
    (bigPie) => bigPie.darkThemeSlice.isDarkTheme
  );
  
  const handleLoveBtnClick = async () => {
    try {
      await axios.patch("/cards/card-like/" + id);
      deleteFav(id);
      setfavState(!favState);
    } catch (err) {
      console.log("error when change fav", err.response.data);
    }
  };
  return (
<Card className="cardrspon">
  <CardActionArea onClick={handleonInforBtnClick}>
    <CardMedia component="img" image={img} className="imgcard"/>
  </CardActionArea>
  <CardHeader title={title} subheader={subTitle}></CardHeader>
  <CardContent>
    <Typography>{"Phone: " + phone}</Typography>
    <Typography>{"Address: " + address}</Typography>
    <Typography>{"Card number:" + cardNumber}</Typography>
  </CardContent>
  <CardActions
    sx={{
      display: "flex",
      justifyContent: "space-between",
      flexDirection: { xs: "column", sm: "row" },
    }}
  >
    <Box 
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: { xs: "flex-start", sm: "center" },
        flex: { xs: 1, sm: "unset" },
      }}
    >
      {canDelete && (
        <Fragment>
          <IconButton
            color="primary"
            aria-label="add to shopping cart"
            onClick={handleDeleteBtnClick}
            sx={{ mr: { xs: 1, sm: 2 } }}
          >
            <DeleteOutlineIcon />
          </IconButton>
        </Fragment>
      )}
      {canEdit && (
        <Fragment>
          <IconButton
            color="primary"
            aria-label="add to shopping cart"
            onClick={handleEditBtnClick}
            sx={{ mr: { xs: 1, sm: 2 } }}
          >
            <CreateIcon />
          </IconButton>
        </Fragment>
      )}
    </Box>

    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: { xs: "flex-end", sm: "center" },
        flex: { xs: 1, sm: "unset" },
      }}
    >
      <IconButton color="primary" aria-label="add to shopping cart" sx={{ mr: { xs: 1, sm: 2 } }}>
        <CallIcon />
      </IconButton>
      {canFav && (<IconButton
        color="primary"
        aria-label="add to shopping cart"
        onClick={handleLoveBtnClick}
        sx={{ mr: { xs: 1, sm: 2 } }}
      >
        <FavoriteIcon
              style={favState ? { color: "red" } : { color: "blue" }}
            />
      </IconButton>)}
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