// const About = () => {
//     return <h1>About </h1>;
//   };
  
  
//   export default About;
  

  import { Container, Typography } from "@mui/material";

const About = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>About Us</Typography>
      <Typography variant="body1" gutterBottom>
        At [Business Name], we are dedicated to helping businesses of all sizes reach their full potential through effective advertising strategies. Our team of experienced professionals has a proven track record of success, and we are committed to delivering results for our clients.
      </Typography>
      <Typography variant="body1" gutterBottom>
        We offer a wide range of advertising services, including digital marketing, social media advertising, print advertising, and more. We work closely with our clients to understand their unique needs and develop customized advertising solutions that meet their goals and budget.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Our mission is to help businesses succeed by providing them with the tools and resources they need to thrive in today's competitive marketplace. We are passionate about what we do, and we are committed to delivering exceptional service and results to our clients.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Thank you for considering [Business Name] for your advert ising needs. We look forward to working with you and helping your business reach new heights!
      </Typography>
    </Container>
  );
};

export default About;