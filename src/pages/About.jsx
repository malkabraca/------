import { Margin } from "@mui/icons-material";
import { Box, Container, Typography } from "@mui/material";

const About = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h3" gutterBottom>
        About Us
      </Typography>
      <Typography variant="h5" gutterBottom>
        Welcome to our business advertising site!{" "}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Our platform is designed to help businesses showcase their products and
        services to potential clients in an easy and efficient manner. Here, you
        can create a business card that includes all your essential details,
        such as your business name, phone number, address, and more.
      </Typography>
      <Typography variant="body1" gutterBottom>
        What sets our platform apart is our easy-to-use interface, which allows
        advertisers to edit their business details as and when necessary. This
        means that you can keep your business card updated with the latest
        information, ensuring that potential clients always have access to the
        most accurate details about your business.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Another unique feature of our platform is the ability to bookmark your
        favorite business cards by clicking the heart button. This feature makes
        it easy for you to follow the contacts you want to follow up with and
        keep in touch with them over time.
      </Typography>
      <Typography variant="body1" gutterBottom>
        At our platform, we believe that every business deserves the opportunity
        to showcase their products and services in the best possible light.
        That's why we've designed a platform that's not only easy to use but
        also highly effective in reaching potential clients.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Thank you for choosing our platform to advertise your business. We look
        forward to helping you grow your business and reach new heights of
        success!
      </Typography>
      {/* <Box>
      <Typography variant="h6" gutterBottom>
      Below is an example of a business card:
      </Typography>
      </Box>
      <img src="card.png" alt="cart" /> */}
         <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography variant="h6" gutterBottom> Below is an example of a business card: </Typography> 
          <img src="card.png" alt="cart" /> 
        </Box>
    </Container>
  );
};

export default About;
