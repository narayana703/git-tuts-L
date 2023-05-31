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
    Slide,
  } from "@mui/material";
  import { useState, useContext, useEffect } from "react";
  import { UserContext, SnackbarContext } from "../components/UserContext";
  import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
  import EmailIcon from "@mui/icons-material/Email";
  import SendIcon from '@mui/icons-material/Send';
  import PlaceIcon from '@mui/icons-material/Place';
  import {Helmet} from "react-helmet";
  import axios from "axios";
  import { Header } from "../components/header";
import { useParams } from "react-router-dom";
  
  export const EnquiryForm = (props) => {
    const { tkn, setTkn } = useContext(UserContext);
    const {propCat,setPropCat,uid, setUId,user,token}=useContext(UserContext)
    const [name, setName] = useState(`${user.user_name}`);
    const [email, setEmail] = useState("");
    const [mob, setMob] = useState("");
    const [msg, setMsg] = useState("");
    const [wait, setWait] = useState(false);  
    const [error, setError] = useState(0);
  
   
    const { snack, setSnack } = useContext(SnackbarContext);
   let id=useParams()

  
    const contactNow = (e) => {
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
      } 
         else {
        setWait(true);
  
       console.log(id,"id")
        const formData=new FormData()
        formData.append("cand_name",name)
        formData.append("cand_mob",mob)
        formData.append("cand_email",email)
        formData.append("propid",id.id)
        formData.append("userid",user.user_id)
       
        
  
        formData.message = msg;
        axios.post("/user/contact_eqnuiry", formData,  {
            headers: { tkn: token },
          }).then((res) => {
          if (res.data.status===1) {
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
  
    return (
      <div>
        {/* <Header /> */}
        
        <Container maxWidth="lg">
            
          <Box m={4}>
          
            <form onSubmit={contactNow}>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <Grid item xs={12}>
                  <Typography
                    variant="h4"
                    style={{ color: "#060847" }}
                    className="text-center"
                    gutterBottom
                  >
                    Enquiry Form
                  </Typography>
                  <hr style={{ color: "#060847" }} />
                </Grid>
             
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        margin: 3,
                        padding: 3,
                        mt: 5,
                        boxShadow: 5,
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    >
                      <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                        spacing={3}
                      >
                        <Grid item xs={12}>
                          <Typography
                            variant="h4"
                            style={{ color: "#060847" }}
                            className="text-center"
                            gutterBottom
                          >
                        
                            Give your Details
                          </Typography>
                          <hr style={{ color: "#060847", width:'80%' }} />
                          <Typography variant="body1" style={{ color: "#060847", pb:2 }}>
                          Please fill out the form below with your information. 
                          <br/>
                          We will contact you as soon as possible. 
                          </Typography>
                        </Grid>
                       
                        <Grid item xs={12}>
                          
                          <TextField
                            label="Name *"
                            variant="outlined"
                            fullWidth
                            id="outlined-basic"
                            
                            error={error === 1 && true}
                            type={"text"}
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="Mobile *"
                            variant="outlined"
                            fullWidth
                           
                            error={error === 2 && true}
                            type={"number"}
                            value={mob}
                            onChange={(e) => {
                              setMob(e.target.value);
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            
                            type={"text"}
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                          />
                        </Grid>
                       
  
                        <Grid item xs={12} >
                        <Button variant="contained" type="submit" style={{ m: 2, backgroundColor: wait ? "white" : "#060847", width: "60%", color: wait ? "black" : "white" }}> <SendIcon /> &nbsp; Submit Details</Button>
  
                          
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
             
  
      
              </Grid>
            </form>
          </Box>
        </Container>
      </div>
    );
  };