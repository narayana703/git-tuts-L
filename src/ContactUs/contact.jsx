import {
  Grid,
  Container,
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Zoom,
  Card,
  Paper,
} from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { UserContext, SnackbarContext } from "../components/UserContext";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import EmailIcon from "@mui/icons-material/Email";
import SendIcon from "@mui/icons-material/Send";
import PlaceIcon from "@mui/icons-material/Place";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Header } from "../components/header";
import img from "../assets/contact-bg.png";
import HomeIcon from "@mui/icons-material/Home";
import CallIcon from "@mui/icons-material/Call";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Start } from "@mui/icons-material";
import { useParams } from "react-router-dom";




export const ContactNow = () => {
  const { tkn, setTkn } = useContext(UserContext);
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [mob, setMob] = useState("");
  // console.log(mob, 'mob_mob_mob')
  const [sub, setSub] = useState("0");
  const [msg, setMsg] = useState("");
  const [wait, setWait] = useState(false);

  const [loc, setLoc] = useState("");

  const [error, setError] = useState(0);

  const [metadata, setMetadata] = useState();

  const { snack, setSnack } = useContext(SnackbarContext);


let id=useParams()

  const ContactNow = (e) => {
    e.preventDefault();
    setError(0);
    if (name === "") {
      setError(1);
      setSnack({
        message: "Please Enter your name..",
        type: "error",
        open: true,
        direction: "center",
      });
    } else if (mob.length !== 10) {
      setError(2);
      setSnack({
        message: "Please Enter a Valid 10-digit Mobile number..",
        type: "error",
        open: true,
        direction: "center",
      });
    } else if (loc === "") {
      setError(5);
      setSnack({
        message: "Please Give your Location..",
        type: "error",
        open: true,
        direction: "center",
      });
    } 
    
     
    else if (msg === "") {
      setSnack({
        message: "Please Enter your Message..",
        type: "error",
        open: true,
        direction: "center",
      });
      setError(4);
    } else {
      setWait(true);

      const formData = {};
      formData.name = name;
      formData.mobile = mob;
      formData.email = email;
      formData.location = loc;
      formData.message = msg;
      
      axios.post("/user/contactnow", formData).then((res) => {
        if (res.data.status) {
          setWait(false);

          setSnack({
            message: res.data.msg,
            type: "success",
            open: true,
            direction: "center",
          });
        } else {
          setWait(false);

          setSnack({
            message: res.data.msg,
            type: "error",
            open: true,
            direction: "center",
          });
        }
      });
    }
  };
  const jumbotroncss = {
    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url(${img}) `,
    opacity: 0.8,
    backgroundAttachment: "fixed",
    color: "#fff",
    minHeight: "250px",
    // marginTop: "15px",
    marginBottom: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <div>
      {/* <Header /> */}
      <Helmet>
        <title>Contact Us | Buy or Sell or Rent Property Online</title>
      </Helmet>
      <div className="jumbotron text-center" style={jumbotroncss}>
        <Paper style={{ opacity: "0.5", width: "80%" }}>
          <Typography variant="h2">Contact Us</Typography>
        </Paper>
      </div>
      <br /> <br />
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ textAlign: "Start" }}>
          CONTACT
        </Typography>
        <br />
        <Grid
          container
          spacing={{ xs: 5, md: 10 }}
          direction="row"
          justifyContent="space-evenly"
          alignItems="flex-start"
          // padding={2}
        >
          <Grid
            item
            sx={10}
            sm={10}
            md={6}
            lg={6}
            xl={6}
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
             
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
               <Grid 
                 sx={{ml:"8.5%",}}
               >
                 <Typography variant="subtitle1" sx={{ textAlign: "justify" }}>
                 &nbsp;&nbsp; Welcome to BHR properties real estate online portal! We value your feedback and inquiries. Whether you're a prospective buyer, seller, or have general questions, we're here to assist you. Contact our dedicated team through the information below to get in touch with us:
                </Typography>
                </Grid>
                {/* <br/> */}
            
              {/* <Grid
                item
                xs={1}
                sm={1}
                md={1}
                lg={1}
                xl={1}
                sx={{ textAlign: "Start" }}
              >
                <HomeIcon style={{ color: "red" }} />
              </Grid> */}
              {/* <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                <Typography sx={{ textAlign: "Start" }} variant="h5">
                  <b>Corporate Office</b>
                </Typography>
             

                <Typography variant="subtitle1" sx={{ textAlign: "justify" }}>
                  Plot No.2386, 3rd & 4th floors, Rd Number 38,Gachibowli,
                  Hyderabad, Telangana 500034.
                </Typography>
              </Grid> */}
            </Grid>

            <br />
         
            <Grid
              container
              spacing={{ xs: 1, md: 1 }}
              direction="row"
              justifyContent="space-around"
              alignItems="flex-start"
            >
              <Grid
                item
                xs={1}
                sm={1}
                md={1}
                lg={1}
                xl={1}
                sx={{ textAlign: "Start" }}
              >
                <CallIcon style={{ color: "red" }} />
              </Grid>

              <Grid item xs={11} sm={11} md={5} lg={5} xl={5}>
                <Typography variant="body1" sx={{ textAlign: "justify" }}>
                  <b>Customer Care :</b> <br />
                  +91 8688945694 
                  <br />
                  7am to 7pm
                </Typography>
              </Grid>

              <Grid
                item
                xs={1}
                sm={1}
                md={1}
                lg={1}
                xl={1}
                sx={{ textAlign: "Start" }}
              >
                <MailOutlineIcon style={{ color: "red" }} />
              </Grid>
              <Grid
                item
                xs={11}
                sm={11}
                md={5}
                lg={5}
                xl={5}
                sx={{ textAlign: "justify" }}
              >
                <Typography variant="body1">
                  <b>Contact Email: </b>
                  <br />
                  contact@bhrproperties.in 
                </Typography>
              </Grid>
      
            <br/>
            <Grid  item
                xs={10}
                sm={10}
                md={10}
                lg={10}
                xl={10}>
                  <br />
            <Typography variant="subtitle1" sx={{ textAlign: "justify" }}>
            &nbsp;&nbsp; Don't hesitate to reach out if you need assistance with property listings, pricing, or any other real estate-related concerns. We strive to provide exceptional customer service and look forward to hearing from you. Let us help you make your real estate dreams a reality!
            </Typography>
              </Grid>
              </Grid><br/>
          </Grid>
          {/* ============== */}
    
       
          <Grid
            item
            sx={10}
            sm={10}
            md={6}
            lg={6}
            xl={6}
            container
            alignItems="flex-start"
          >

            <Typography variant="h5">We'd love to hear from you</Typography>
            <br />
            <form onSubmit={ContactNow }>
            <Grid
             container
          spacing={{ xs: 1, md: 1}}
          direction="row"
          justifyContent="space-evenly"
          alignItems="flex-start"
          // padding={2}
            >
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <TextField
              label=" Name *"
              variant="outlined"
              fullWidth
              size="small"
              error={error === 1 && true}
              type={"text"}
              value={name}
              sx={{ mt: 1 }}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            </Grid>
                 <Grid item xs={6} sm={6} md={6} lg={6} xl={6} >
                <TextField
                  label="Mobile *"
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{ mt: 1 }}
                  error={error === 2 && true}
                  type={"number"}
                  value={mob}
                  onChange={(e) => {
                    setMob(e.target.value);
                  }}
                />
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              size="small"
              type={"text"}
              value={email}
              sx={{ mt: 1 }}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            </Grid>
       
      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <TextField
              label="Location *"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mt: 1 }}
              error={error === 5 && true}
              type={"text"}
              value={loc}
              onChange={(e) => {
                setLoc(e.target.value);
              }}
            />
</Grid>
     </Grid>
     
  

            <TextField
              label="Message *"
              variant="outlined"
              fullWidth
              size="small"
              error={error === 4 && true}
              type={"text"}
              sx={{ mt: 3 }}
              value={msg}
              multiline
              rows={5}
              onChange={(e) => {
                setMsg(e.target.value);
              }}
            />
            
        

            <Typography
              veriant="h3"
             sx={{mt:4,mb:5,  textAlign: "justify" }}
            >
              {" "}
              <b style={{ color: "#ffc107" }}> Disclaimer:</b> &nbsp;I authorize BHR
              Group and its representatives to Call, SMS, Email or WhatsApp me
              about its products and offers. This consent overrides any
              registration for DND / NDNC.
            </Typography>

            <Button
              variant="contained"
              type="submit"
              style={{ width: "100%", height: 50, backgroundColor: "#060847" }}
              disabled={wait}
              className="linkstyle"
            >
             <Typography variant="h6" > {wait ? "Please Wait.." : "Submit"}</Typography >
            </Button>
            </form>
          </Grid>
         
       
        </Grid>
        <br/>
      
        {/* <Grid>
      
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.260381986894!2d78.35841707598398!3d17.44724720107639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93e22b231641%3A0xcc0b655faca8565!2sArawinz%20Soft%20Solutions!5e0!3m2!1sen!2sin!4v1684322289912!5m2!1sen!2sin"
         style={{ width: "100%", height: 600, }}  ></iframe>
    

         
        </Grid> */}
       <br/> <br/> <br/>
       
      </Container>
      
    </div>
  );
};

