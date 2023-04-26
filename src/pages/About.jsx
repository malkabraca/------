// const About = () => {
//     return <h1>About </h1>;
//   };
  
  
//   export default About;
  

  import { Container, Typography } from "@mui/material";

const About = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h3" gutterBottom>About Us</Typography>
      <Typography variant="h5" gutterBottom>on this page you can find explanation about using the application </Typography>
      <Typography variant="body1" gutterBottom>
      Our platform offers a simple and intuitive interface that allows you to post your business card with all the necessary information, including your name, phone number, email address, and physical address. You can also include additional details, such as your job title, company name, and website, to help potential contacts learn more about you and your business.
      </Typography>
      <Typography variant="body1" gutterBottom>
      One of the unique features of our platform is the ability to mark your favorite business cards by clicking on the heart button. This feature makes it easy for you to keep track of the contacts you want to follow up with and stay in touch with over time.
      </Typography>
      <Typography variant="body1" gutterBottom>
      At our platform, we take your privacy seriously and ensure that your personal information is protected. We use the latest encryption technologies and security measures to keep your data safe and secure.

      </Typography>
      <Typography variant="body1" gutterBottom>
      Whether you are looking to connect with potential clients, partners, or collaborators, our business card exchange platform offers a convenient and effective way to build and grow your professional network. Join us today and start expanding your business opportunities!
      </Typography>
    </Container>
  );
};

export default About;


