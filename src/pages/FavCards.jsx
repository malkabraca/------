import { Box, Grid } from "@mui/material";
import CardComponent from "../components/CardComponent";

const FavCards = () =>{
    return(
        <Box>
        <Grid container spacing={2}>
          {cardsArr.map((item) => (
            <Grid item xs={4} key={item._id + Date.now()}>
              <CardComponent
                id={item._id}
                title={item.title}
                subTitle={item.subTitle}
                description={item.description}
                img={item.image ? item.image.url : ""}
                phone={item.phone}
                address={item.state+" "+item.country+" "+item.city+" "+item.street+" "+item.houseNumber}
                cardNumber={item.bizNumber}
                onDelete={handleDeleteFromInitialCardsArr}
                onEdit={handleEditFromInitialCardsArr}
                canEdit={payload && (payload.biz || payload.isAdmin)}
                canDelete={payload && (payload.isAdmin)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
}

export  default FavCards;